import type { PageServerLoad } from './$types';
import db from '$lib/server/database';

export const load: PageServerLoad = async () => {
  // Get current month data
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  // Total Pendapatan
  const totalPendapatan = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM pendapatan 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(currentMonth) as { total: number };

  // Total Pengeluaran
  const totalPengeluaran = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM pengeluaran 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(currentMonth) as { total: number };

  // Total Beban Operasional
  const totalBebanOperasional = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM beban_operasional 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(currentMonth) as { total: number };

  // Total Beban Penyusutan
  const totalBebanPenyusutan = db.prepare(`
    SELECT COALESCE(SUM(nilai_penyusutan), 0) as total 
    FROM beban_penyusutan 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(currentMonth) as { total: number };

  // Laba/Rugi
  const labaRugi = totalPendapatan.total - 
                   (totalPengeluaran.total + totalBebanOperasional.total + totalBebanPenyusutan.total);

  // Recent transactions
  const recentPendapatan = db.prepare(`
    SELECT id, tanggal, kategori, deskripsi, jumlah 
    FROM pendapatan 
    ORDER BY tanggal DESC, created_at DESC 
    LIMIT 5
  `).all();

  const recentPengeluaran = db.prepare(`
    SELECT id, tanggal, kategori, deskripsi, jumlah 
    FROM pengeluaran 
    ORDER BY tanggal DESC, created_at DESC 
    LIMIT 5
  `).all();

  return {
    stats: {
      pendapatan: totalPendapatan.total,
      pengeluaran: totalPengeluaran.total,
      bebanOperasional: totalBebanOperasional.total,
      bebanPenyusutan: totalBebanPenyusutan.total,
      labaRugi
    },
    recentPendapatan,
    recentPengeluaran
  };
};
