import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  // Get month from query param or default to Dec 2025 (where seed data is)
  // In a real app, you might default to new Date().toISOString().slice(0, 7);
  const currentMonth = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const withPenyusutan = url.searchParams.get('penyusutan') !== 'false';
  
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
  let totalBebanPenyusutan = 0;
  if (withPenyusutan) {
    const totalBebanPenyusutanResult = await prisma.bebanPenyusutan.aggregate({
      _sum: { nilai_penyusutan: true },
      where: {
        tanggal: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      }
    });
    totalBebanPenyusutan = totalBebanPenyusutanResult._sum.nilai_penyusutan || 0;
  }

  // Laba/Rugi
  const labaRugi = totalPendapatan - (totalPengeluaran + totalBebanPenyusutan);

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

  // Fetch all time data for trend chart
  const allPendapatan = await prisma.pendapatan.findMany({ select: { tanggal: true, jumlah: true } });
  const allPengeluaran = await prisma.pengeluaran.findMany({ select: { tanggal: true, jumlah: true } });
  const allPenyusutan = await prisma.bebanPenyusutan.findMany({ select: { tanggal: true, nilai_penyusutan: true } });

  const trendMap = new Map<string, { pendapatan: number, pengeluaran: number, penyusutan: number }>();
  
  const addToTrend = (tanggal: Date, type: 'pendapatan' | 'pengeluaran' | 'penyusutan', amount: number) => {
    const monthStr = tanggal.toISOString().slice(0, 7);
    if (!trendMap.has(monthStr)) {
      trendMap.set(monthStr, { pendapatan: 0, pengeluaran: 0, penyusutan: 0 });
    }
    trendMap.get(monthStr)![type] += amount;
  };

  allPendapatan.forEach(p => addToTrend(p.tanggal, 'pendapatan', p.jumlah));
  allPengeluaran.forEach(p => addToTrend(p.tanggal, 'pengeluaran', p.jumlah));
  allPenyusutan.forEach(p => addToTrend(p.tanggal, 'penyusutan', p.nilai_penyusutan));

  const sortedMonths = Array.from(trendMap.keys()).sort();
  const trendData = sortedMonths.map(month => {
    const data = trendMap.get(month)!;
    const pengeluaranTotal = data.pengeluaran + (withPenyusutan ? data.penyusutan : 0);
    const labaRugi = data.pendapatan - pengeluaranTotal;
    const dateObj = new Date(`${month}-01T00:00:00Z`);
    const monthName = dateObj.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

    return {
      monthLabel: monthName,
      pendapatan: data.pendapatan,
      pengeluaran: pengeluaranTotal,
      labaRugi
    };
  });

  return {
    selectedMonth: currentMonth,
    withPenyusutan,
    trendData,
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
