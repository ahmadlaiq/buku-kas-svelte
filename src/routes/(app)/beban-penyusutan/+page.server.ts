import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { bebanPenyusutan: [], total: 0, filters: { startDate: '', endDate: '', sortBy: 'tanggal', sortOrder: 'desc' }, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };

  // Get filter parameters
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');
  
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
  
  // Sorting
  const sortBy = url.searchParams.get('sortBy') || 'tanggal';
  const sortOrder = (url.searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const allowedSortFields = ['tanggal', 'nama_aset', 'nilai_aset', 'umur_ekonomis', 'nilai_penyusutan'];
  const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'tanggal';
  
  // Pagination
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    prisma.bebanPenyusutan.findMany({
      where,
      orderBy: [
        { [validatedSortBy]: sortOrder },
        { created_at: 'desc' }
      ],
      take: limit,
      skip
    }),
    prisma.bebanPenyusutan.count({ where })
  ]);

  const totalResult = await prisma.bebanPenyusutan.aggregate({
    _sum: { nilai_penyusutan: true },
    where
  });

  return {
    bebanPenyusutan: data.map((p: any) => ({
      ...p,
      tanggal: p.tanggal.toISOString().split('T')[0]
    })),
    total: totalResult._sum.nilai_penyusutan || 0,
    filters: {
      startDate: startDate || '',
      endDate: endDate || '',
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
    const nama_aset = formData.get('nama_aset') as string;
    const nilai_aset = parseFloat(formData.get('nilai_aset') as string);
    const umur_ekonomis = parseInt(formData.get('umur_ekonomis') as string);
    
    // Calculate monthly depreciation (umur is in months)
    const nilai_penyusutan = nilai_aset / umur_ekonomis;

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
          nilai_penyusutan,
          ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
          user_id: locals.user.id
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Create beban penyusutan error:', error);
      return fail(500, { error: 'Gagal menyimpan data' });
    }
  },

  update: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);
    const tanggal = formData.get('tanggal') as string;
    const nama_aset = formData.get('nama_aset') as string;
    const nilai_aset = parseFloat(formData.get('nilai_aset') as string);
    const umur_ekonomis = parseInt(formData.get('umur_ekonomis') as string);
    
    // Calculate monthly depreciation (umur is in months)
    const nilai_penyusutan = nilai_aset / umur_ekonomis;

    if (!id || !tanggal || !nama_aset || !nilai_aset || !umur_ekonomis || nilai_aset <= 0 || umur_ekonomis <= 0) {
      return fail(400, { error: 'Data tidak valid' });
    }

    try {
      await prisma.bebanPenyusutan.update({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
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
      console.error('Update beban penyusutan error:', error);
      return fail(500, { error: 'Gagal mengubah data' });
    }
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const formData = await request.formData();
    const id = parseInt(formData.get('id') as string);

    try {
      await prisma.bebanPenyusutan.delete({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) }
      });
      return { success: true };
    } catch (error) {
      console.error('Delete beban penyusutan error:', error);
      return fail(500, { error: 'Gagal menghapus data' });
    }
  }
};
