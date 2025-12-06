import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const startOfMonth = new Date(`${month}-01T00:00:00Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  
  const data = await prisma.bebanPenyusutan.findMany({
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    },
    orderBy: [
      { tanggal: 'desc' },
      { created_at: 'desc' }
    ]
  });

  const totalResult = await prisma.bebanPenyusutan.aggregate({
    _sum: { nilai_penyusutan: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });

  return {
    bebanPenyusutan: data.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    total: totalResult._sum.nilai_penyusutan || 0,
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
      await prisma.bebanPenyusutan.create({
        data: {
          tanggal: new Date(tanggal),
          nama_aset,
          nilai_aset,
          umur_ekonomis,
          nilai_penyusutan
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Create beban penyusutan error:', error);
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.bebanPenyusutan.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete beban penyusutan error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
