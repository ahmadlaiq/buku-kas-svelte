import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';
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
      { username: { contains: search, mode: 'insensitive' } },
      { full_name: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (statusFilter === 'aktif') where.is_aktif = true;
  if (statusFilter === 'nonaktif') where.is_aktif = false;

  try {
    const [users, roles, tenants, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        include: { role: true, tenant: true },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.role.findMany({ where: { is_aktif: true }, orderBy: { nama: 'asc' } }),
      prisma.tenant.findMany({ where: { is_aktif: true }, orderBy: { nama: 'asc' } }),
      prisma.user.count({ where })
    ]);
    return { users, roles, tenants, search, statusFilter, pagination: { page, limit, totalItems: totalCount, totalPages: Math.ceil(totalCount / limit) } };
  } catch (error) {
    return { users: [], roles: [], tenants: [], search, statusFilter, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username') as string;
    const full_name = data.get('full_name') as string;
    const password = data.get('password') as string;
    const role_id = data.get('role_id') ? Number(data.get('role_id')) : null;
    const tenant_id = data.get('tenant_id') ? Number(data.get('tenant_id')) : null;

    if (!username || !full_name || !password) return fail(400, { error: 'Username, nama lengkap, dan password harus diisi' });

    try {
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({ data: { username, full_name, password: hashed, role_id, tenant_id } });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Username sudah digunakan' });
      return fail(500, { error: 'Gagal menambahkan user' });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const username = data.get('username') as string;
    const full_name = data.get('full_name') as string;
    const password = data.get('password') as string;
    const role_id = data.get('role_id') ? Number(data.get('role_id')) : null;
    const tenant_id = data.get('tenant_id') ? Number(data.get('tenant_id')) : null;

    if (!id || !username || !full_name) return fail(400, { error: 'Data tidak valid' });

    try {
      const updateData: any = { username, full_name, role_id, tenant_id };
      if (password) updateData.password = await bcrypt.hash(password, 10);
      await prisma.user.update({ where: { id }, data: updateData });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Username sudah digunakan' });
      return fail(500, { error: 'Gagal memperbarui user' });
    }
  },

  toggleAktif: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = data.get('is_aktif') === 'true';
    if (!id) return fail(400, { error: 'ID tidak valid' });
    try {
      await prisma.user.update({ where: { id }, data: { is_aktif: !current } });
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
      await prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus user' });
    }
  }
};
