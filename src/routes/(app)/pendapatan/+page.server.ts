import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url }) => {
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const startOfMonth = new Date(`${month}-01T00:00:00Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  
  const data = await prisma.pendapatan.findMany({
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

  const totalResult = await prisma.pendapatan.aggregate({
    _sum: { jumlah: true },
    where: {
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });

  return {
    pendapatan: data.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    total: totalResult._sum.jumlah || 0,
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
      await prisma.pendapatan.create({
        data: {
          tanggal: new Date(tanggal),
          kategori,
          deskripsi: deskripsi || null,
          jumlah
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Create pendapatan error:', error);
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.pendapatan.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete pendapatan error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
