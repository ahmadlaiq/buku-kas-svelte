import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import db from '$lib/server/database';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  
  const data = db.prepare(`
    SELECT * FROM beban_penyusutan 
    WHERE strftime('%Y-%m', tanggal) = ?
    ORDER BY tanggal DESC, created_at DESC
  `).all(month);

  const total = db.prepare(`
    SELECT COALESCE(SUM(nilai_penyusutan), 0) as total 
    FROM beban_penyusutan 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  return {
    bebanPenyusutan: data,
    total: total.total,
    selectedMonth: month
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const tanggal = formData.get('tanggal') as string;
    const nama_aset = formData.get('nama_aset') as string;
    const nilai_aset = parseFloat(formData.get('nilai_aset') as string);
    const umur_ekonomis = parseInt(formData.get('umur_ekonomis') as string);
    
    // Calculate monthly depreciation
    const nilai_penyusutan = nilai_aset / (umur_ekonomis * 12);

    if (!tanggal || !nama_aset || !nilai_aset || !umur_ekonomis || nilai_aset <= 0 || umur_ekonomis <= 0) {
      return fail(400, { error: 'Data tidak valid' });
    }

    try {
      db.prepare(`
        INSERT INTO beban_penyusutan (tanggal, nama_aset, nilai_aset, umur_ekonomis, nilai_penyusutan)
        VALUES (?, ?, ?, ?, ?)
      `).run(tanggal, nama_aset, nilai_aset, umur_ekonomis, nilai_penyusutan);

      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    try {
      db.prepare('DELETE FROM beban_penyusutan WHERE id = ?').run(id);
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
