import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { pendapatan: [], total: 0, filters: { startDate: '', endDate: '', kategori: 'all', sortBy: 'tanggal', sortOrder: 'desc' }, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };

  // Get filter parameters
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  const kategori = url.searchParams.get('kategori');
  // Build base where clause
  const baseWhere: any = { ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) };
  
  // Date range filter
  if (startDate || endDate) {
    baseWhere.tanggal = {};
    if (startDate) {
      baseWhere.tanggal.gte = new Date(startDate + 'T00:00:00Z');
    }
    if (endDate) {
      const endDateTime = new Date(endDate + 'T00:00:00Z');
      endDateTime.setDate(endDateTime.getDate() + 1); // Include the end date
      baseWhere.tanggal.lt = endDateTime;
    }
  }
  
  const queryWhere = { ...baseWhere };

  // Category filter on details
  if (kategori && kategori !== 'all') {
    queryWhere.details = {
      some: {
        kategori: kategori
      }
    };
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
    prisma.pendapatan.findMany({
      where: queryWhere,
      orderBy: [
        { [validatedSortBy]: sortOrder },
        { created_at: 'desc' }
      ],
      take: limit,
      skip,
      include: {
        details: {
          include: {
            material: true,
            karyawan: true
          }
        }
      }
    }),
    prisma.pendapatan.count({ where: queryWhere })
  ]);

  let total = 0;
  if (kategori && kategori !== 'all') {
    const detailAgg = await prisma.pendapatanDetail.aggregate({
      _sum: { subtotal: true },
      where: {
        kategori: kategori,
        pendapatan: baseWhere
      }
    });
    total = detailAgg._sum.subtotal || 0;
  } else {
    const totalResult = await prisma.pendapatan.aggregate({
      _sum: { jumlah: true },
      where: baseWhere
    });
    total = totalResult._sum.jumlah || 0;
  }

  return {
    pendapatan: data.map(p => {
      const categories = [...new Set(p.details.map((d: any) => d.kategori).filter(Boolean))];
      if (categories.length === 0) categories.push(p.kategori);
      return {
        ...p,
        tanggal: p.tanggal.toISOString().split('T')[0],
        displayCategories: categories
      };
    }),
    total: total,
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

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.pendapatan.delete({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete pendapatan error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
