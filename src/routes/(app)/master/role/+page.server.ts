import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;
  const search = url.searchParams.get('search') || '';
  const statusFilter = url.searchParams.get('status') || 'semua';

  const where: any = {};
  if (search) {
    where.OR = [
      { nama: { contains: search, mode: 'insensitive' } },
      { deskripsi: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (statusFilter === 'aktif') where.is_aktif = true;
  if (statusFilter === 'nonaktif') where.is_aktif = false;

  try {
    const [roles, totalCount] = await Promise.all([
      prisma.role.findMany({ 
        where, 
        orderBy: { created_at: 'desc' }, 
        take: limit, 
        skip,
        include: { _count: { select: { users: true } } }
      }),
      prisma.role.count({ where })
    ]);
    return { roles, search, statusFilter, pagination: { page, limit, totalItems: totalCount, totalPages: Math.ceil(totalCount / limit) } };
  } catch (error) {
    return { roles: [], search, statusFilter, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const deskripsi = data.get('deskripsi') as string;
    if (!nama) return fail(400, { error: 'Nama role harus diisi' });
    try {
      await prisma.role.create({ data: { nama, deskripsi: deskripsi || null } });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Nama role sudah ada' });
      return fail(500, { error: 'Gagal menambahkan role' });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const nama = data.get('nama') as string;
    const deskripsi = data.get('deskripsi') as string;
    if (!id || !nama) return fail(400, { error: 'Data tidak valid' });
    try {
      await prisma.role.update({ where: { id }, data: { nama, deskripsi: deskripsi || null } });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Nama role sudah ada' });
      return fail(500, { error: 'Gagal memperbarui role' });
    }
  },

  toggleAktif: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = data.get('is_aktif') === 'true';
    if (!id) return fail(400, { error: 'ID tidak valid' });
    try {
      await prisma.role.update({ where: { id }, data: { is_aktif: !current } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal mengubah status' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'ID tidak valid' });
    try {
      await prisma.role.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus role' });
    }
  }
};
