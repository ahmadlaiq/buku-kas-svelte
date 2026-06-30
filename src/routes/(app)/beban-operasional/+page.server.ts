import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { bebanOperasional: [], total: 0, selectedMonth: '', sortBy: 'tanggal', sortOrder: 'desc' };
  const month = url.searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const startOfMonth = new Date(`${month}-01T00:00:00Z`);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  
  // Sorting
  const sortBy = url.searchParams.get('sortBy') || 'tanggal';
  const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const allowedSortFields = ['tanggal', 'kategori', 'deskripsi', 'jumlah'];
  const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'tanggal';

  const data = await prisma.bebanOperasional.findMany({
    where: {
      ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    },
    orderBy: [
      { [validatedSortBy]: sortOrder },
      { created_at: 'desc' }
    ]
  });

  const totalResult = await prisma.bebanOperasional.aggregate({
    _sum: { jumlah: true },
    where: {
      ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
      tanggal: {
        gte: startOfMonth,
        lt: endOfMonth
      }
    }
  });

  return {
    bebanOperasional: data.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    total: totalResult._sum.jumlah || 0,
    selectedMonth: month,
    sortBy: validatedSortBy,
    sortOrder: sortOrder
  };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const tanggal = formData.get('tanggal') as string;
    const kategori = formData.get('kategori') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const jumlah = parseFloat(formData.get('jumlah') as string);

    if (!tanggal || !kategori || !jumlah || jumlah <= 0) {
      return fail(400, { error: 'Data tidak valid' });
    }

    try {
      await prisma.bebanOperasional.create({
        data: {
          tanggal: new Date(tanggal),
          kategori,
          deskripsi: deskripsi || null,
          jumlah,
          ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
          user_id: locals.user.id
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Create beban operasional error:', error);
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.bebanOperasional.delete({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete beban operasional error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
