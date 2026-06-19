import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const withPenyusutan = url.searchParams.get('penyusutan') !== 'false';
  const startOfMonth = new Date(`${month}-01T00:00:00Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  
  // Get all income grouped by category
  const pendapatanData = await prisma.pendapatan.groupBy({
    by: ['kategori'],
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    },
    orderBy: {
      _sum: {
        jumlah: 'desc'
      }
    }
  });

  const pendapatan = pendapatanData.map(p => ({
    kategori: p.kategori,
    total: p._sum.jumlah || 0
  }));

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

  // Get all expenses grouped by category
  const pengeluaranData = await prisma.pengeluaran.groupBy({
    by: ['kategori'],
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    },
    orderBy: {
      _sum: {
        jumlah: 'desc'
      }
    }
  });

  const pengeluaran = pengeluaranData.map(p => ({
    kategori: p.kategori,
    total: p._sum.jumlah || 0
  }));

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

  // Get operational costs grouped by category
  /*
  const bebanOperasionalData = await prisma.bebanOperasional.groupBy({
    by: ['kategori'],
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    },
    orderBy: {
      _sum: {
        jumlah: 'desc'
      }
    }
  });

  const bebanOperasional = bebanOperasionalData.map(p => ({
    kategori: p.kategori,
    total: p._sum.jumlah || 0
  }));

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
  */

  // Get depreciation
  let bebanPenyusutan: any[] = [];
  let totalBebanPenyusutan = 0;

  if (withPenyusutan) {
    const bebanPenyusutanData = await prisma.bebanPenyusutan.findMany({
      where: {
        tanggal: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      },
      select: {
        nama_aset: true,
        nilai_penyusutan: true
      },
      orderBy: {
        nilai_penyusutan: 'desc'
      }
    });

    bebanPenyusutan = bebanPenyusutanData.map(p => ({
      kategori: p.nama_aset,
      total: p.nilai_penyusutan
    }));

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

  // Calculate totals
  const totalBiaya = totalPengeluaran + totalBebanPenyusutan; // Removed totalBebanOperasional
  const labaKotor = totalPendapatan - totalPengeluaran;
  const labaBersih = totalPendapatan - totalBiaya;

  return {
    selectedMonth: month,
    withPenyusutan,
    monthName: new Date(month).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
    pendapatan,
    totalPendapatan,
    pengeluaran,
    totalPengeluaran,
    // bebanOperasional,
    // totalBebanOperasional,
    bebanPenyusutan,
    totalBebanPenyusutan,
    totalBiaya,
    labaKotor,
    labaBersih
  };
};
