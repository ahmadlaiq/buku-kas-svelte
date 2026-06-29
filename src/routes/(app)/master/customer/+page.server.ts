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
      { no_hp: { contains: search, mode: 'insensitive' } },
      { alamat: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (statusFilter === 'aktif') where.is_aktif = true;
  if (statusFilter === 'nonaktif') where.is_aktif = false;

  try {
    const [customer, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.customer.count({ where })
    ]);
    return { 
      customer,
      search,
      statusFilter,
      pagination: {
        page,
        limit,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching customer:', error);
    return { 
      customer: [],
      search,
      statusFilter,
      pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 }
    };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const no_hp = data.get('no_hp') as string;
    const alamat = data.get('alamat') as string;

    if (!nama) return fail(400, { error: 'Nama customer harus diisi' });

    try {
      await prisma.customer.create({
        data: { nama, no_hp: no_hp || null, alamat: alamat || null }
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating customer:', error);
      return fail(500, { error: 'Gagal menambahkan customer' });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const nama = data.get('nama') as string;
    const no_hp = data.get('no_hp') as string;
    const alamat = data.get('alamat') as string;

    if (!id || !nama) return fail(400, { error: 'Data tidak valid' });

    try {
      await prisma.customer.update({
        where: { id },
        data: { nama, no_hp: no_hp || null, alamat: alamat || null }
      });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal memperbarui customer' });
    }
  },

  toggleAktif: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = data.get('is_aktif') === 'true';

    if (!id) return fail(400, { error: 'ID tidak valid' });

    try {
      await prisma.customer.update({
        where: { id },
        data: { is_aktif: !current }
      });
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
      await prisma.customer.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus customer' });
    }
  }
};
