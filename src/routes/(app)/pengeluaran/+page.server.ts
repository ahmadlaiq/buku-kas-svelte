import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { pengeluaran: [], total: 0, filters: { startDate: '', endDate: '', kategori: 'all', sortBy: 'tanggal', sortOrder: 'desc' }, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };

  // Get filter parameters
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  const kategori = url.searchParams.get('kategori');
  
  // Build where clause
  const where: any = { ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) };
  
  // Date range filter
  if (startDate || endDate) {
    where.tanggal = {};
    if (startDate) {
      where.tanggal.gte = new Date(startDate + 'T00:00:00Z');
    }
    if (endDate) {
      const endDateTime = new Date(endDate + 'T00:00:00Z');
      endDateTime.setDate(endDateTime.getDate() + 1); // Include the end date
      where.tanggal.lt = endDateTime;
    }
  }
  
  // Category filter
  if (kategori && kategori !== 'all') {
    where.kategori = kategori;
  }
  
  // Sorting
  const sortBy = url.searchParams.get('sortBy') || 'tanggal';
  const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const allowedSortFields = ['tanggal', 'kategori', 'deskripsi', 'jumlah'];
  const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'tanggal';
  
  // Pagination
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    prisma.pengeluaran.findMany({
      where,
      orderBy: [
        { [validatedSortBy]: sortOrder },
        { created_at: 'desc' }
      ],
      take: limit,
      skip
    }),
    prisma.pengeluaran.count({ where })
  ]);

  const totalResult = await prisma.pengeluaran.aggregate({
    _sum: { jumlah: true },
    where
  });

  return {
    pengeluaran: data.map(p => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    total: totalResult._sum.jumlah || 0,
    filters: {
      startDate: startDate || '',
      endDate: endDate || '',
      kategori: kategori || 'all',
      sortBy: validatedSortBy,
      sortOrder: sortOrder
    },
    pagination: {
      page,
      limit,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
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
      await prisma.pengeluaran.create({
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
      console.error('Create pengeluaran error:', error);
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.pengeluaran.delete({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete pengeluaran error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
