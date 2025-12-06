import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
  // Get current month data
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const startOfMonth = new Date(`${currentMonth}-01T00:00:00Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  // Total Pendapatan
  const totalPendapatanResult = await prisma.pendapatan.aggregate({
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });
  const totalPendapatan = totalPendapatanResult._sum.jumlah || 0;

  // Total Pengeluaran
  const totalPengeluaranResult = await prisma.pengeluaran.aggregate({
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });
  const totalPengeluaran = totalPengeluaranResult._sum.jumlah || 0;

  // Total Beban Operasional
  const totalBebanOperasionalResult = await prisma.bebanOperasional.aggregate({
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });
  const totalBebanOperasional = totalBebanOperasionalResult._sum.jumlah || 0;

  // Total Beban Penyusutan
  const totalBebanPenyusutanResult = await prisma.bebanPenyusutan.aggregate({
    _sum: { nilai_penyusutan: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });
  const totalBebanPenyusutan = totalBebanPenyusutanResult._sum.nilai_penyusutan || 0;

  // Laba/Rugi
  const labaRugi = totalPendapatan - (totalPengeluaran + totalBebanOperasional + totalBebanPenyusutan);

  // Recent transactions
  const recentPendapatan = await prisma.pendapatan.findMany({
    orderBy: [
      { tanggal: 'desc' },
      { created_at: 'desc' }
    ],
    take: 5,
    select: {
      id: true,
      tanggal: true,
      kategori: true,
      deskripsi: true,
      jumlah: true
    }
  });

  const recentPengeluaran = await prisma.pengeluaran.findMany({
    orderBy: [
      { tanggal: 'desc' },
      { created_at: 'desc' }
    ],
    take: 5,
    select: {
      id: true,
      tanggal: true,
      kategori: true,
      deskripsi: true,
      jumlah: true
    }
  });

  return {
    stats: {
      pendapatan: totalPendapatan,
      pengeluaran: totalPengeluaran,
      bebanOperasional: totalBebanOperasional,
      bebanPenyusutan: totalBebanPenyusutan,
      labaRugi
    },
    recentPendapatan: recentPendapatan.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    recentPengeluaran: recentPengeluaran.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    }))
  };
};
