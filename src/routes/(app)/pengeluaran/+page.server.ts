import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/database';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  
  const data = db.prepare(`
    SELECT * FROM pengeluaran 
    WHERE strftime('%Y-%m', tanggal) = ?
    ORDER BY tanggal DESC, created_at DESC
  `).all(month);

  const total = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM pengeluaran 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  return {
    pengeluaran: data,
    total: total.total,
    selectedMonth: month
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const tanggal = formData.get('tanggal') as string;
    const kategori = formData.get('kategori') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const jumlah = parseFloat(formData.get('jumlah') as string);

    if (!tanggal || !kategori || !jumlah || jumlah <= 0) {
      return fail(400, { error: 'Data tidak valid' });
    }

    try {
      db.prepare(`
        INSERT INTO pengeluaran (tanggal, kategori, deskripsi, jumlah)
        VALUES (?, ?, ?, ?)
      `).run(tanggal, kategori, deskripsi || null, jumlah);

      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      db.prepare('DELETE FROM pengeluaran WHERE id = ?').run(id);
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
