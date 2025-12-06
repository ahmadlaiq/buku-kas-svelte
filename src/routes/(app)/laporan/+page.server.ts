import type { PageServerLoad } from './$types';
import db from '$lib/server/database';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const [year, monthNum] = month.split('-');
  
  // Get all income
  const pendapatan = db.prepare(`
    SELECT kategori, SUM(jumlah) as total
    FROM pendapatan 
    WHERE strftime('%Y-%m', tanggal) = ?
    GROUP BY kategori
    ORDER BY total DESC
  `).all(month);

  const totalPendapatan = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM pendapatan 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  // Get all expenses
  const pengeluaran = db.prepare(`
    SELECT kategori, SUM(jumlah) as total
    FROM pengeluaran 
    WHERE strftime('%Y-%m', tanggal) = ?
    GROUP BY kategori
    ORDER BY total DESC
  `).all(month);

  const totalPengeluaran = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM pengeluaran 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  // Get operational costs
  const bebanOperasional = db.prepare(`
    SELECT kategori, SUM(jumlah) as total
    FROM beban_operasional 
    WHERE strftime('%Y-%m', tanggal) = ?
    GROUP BY kategori
    ORDER BY total DESC
  `).all(month);

  const totalBebanOperasional = db.prepare(`
    SELECT COALESCE(SUM(jumlah), 0) as total 
    FROM beban_operasional 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  // Get depreciation
  const bebanPenyusutan = db.prepare(`
    SELECT nama_aset as kategori, nilai_penyusutan as total
    FROM beban_penyusutan 
    WHERE strftime('%Y-%m', tanggal) = ?
    ORDER BY total DESC
  `).all(month);

  const totalBebanPenyusutan = db.prepare(`
    SELECT COALESCE(SUM(nilai_penyusutan), 0) as total 
    FROM beban_penyusutan 
    WHERE strftime('%Y-%m', tanggal) = ?
  `).get(month) as { total: number };

  // Calculate totals
  const totalBiaya = totalPengeluaran.total + totalBebanOperasional.total + totalBebanPenyusutan.total;
  const labaKotor = totalPendapatan.total - totalPengeluaran.total;
  const labaBersih = totalPendapatan.total - totalBiaya;

  return {
    selectedMonth: month,
    monthName: new Date(month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
    pendapatan,
    totalPendapatan: totalPendapatan.total,
    pengeluaran,
    totalPengeluaran: totalPengeluaran.total,
    bebanOperasional,
    totalBebanOperasional: totalBebanOperasional.total,
    bebanPenyusutan,
    totalBebanPenyusutan: totalBebanPenyusutan.total,
    totalBiaya,
    labaKotor,
    labaBersih
  };
};
