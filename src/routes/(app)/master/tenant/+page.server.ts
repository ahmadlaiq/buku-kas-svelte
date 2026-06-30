import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import fs from 'fs';
import path from 'path';
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
      { alamat: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { no_hp: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (statusFilter === 'aktif') where.is_aktif = true;
  if (statusFilter === 'nonaktif') where.is_aktif = false;

  try {
    const [tenants, totalCount, allTenants] = await Promise.all([
      prisma.tenant.findMany({ where, orderBy: { created_at: 'desc' }, take: limit, skip }),
      prisma.tenant.count({ where }),
      prisma.tenant.findMany({
        include: { users: { where: { role: { nama: 'Owner' } }, take: 1 } }
      })
    ]);

    const totalActive = allTenants.filter(t => t.status === 'ACTIVE').length;
    const totalPending = allTenants.filter(t => t.status === 'PENDING').length;
    const estimatedMRR = allTenants.filter(t => t.status === 'ACTIVE').reduce((sum, t) => {
      if (t.paket === 'ENTERPRISE') return sum + 500000;
      if (t.paket === 'PRO') return sum + 250000;
      return sum + 100000;
    }, 0);

    return { 
      tenants, 
      allTenants,
      metrics: { totalActive, totalPending, estimatedMRR },
      search, 
      statusFilter, 
      pagination: { page, limit, totalItems: totalCount, totalPages: Math.ceil(totalCount / limit) } 
    };
  } catch (error) {
    return { tenants: [], allTenants: [], metrics: { totalActive: 0, totalPending: 0, estimatedMRR: 0 }, search, statusFilter, pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const alamat = data.get('alamat') as string;
    const no_hp = data.get('no_hp') as string;
    const email = data.get('email') as string;
    const medsos = data.get('medsos') as string;
    if (!nama) return fail(400, { error: 'Nama tenant harus diisi' });
    try {
      await prisma.tenant.create({ data: { nama, alamat: alamat || null, no_hp: no_hp || null, email: email || null, medsos: medsos || null } });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Nama tenant sudah ada' });
      return fail(500, { error: 'Gagal menambahkan tenant' });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const nama = data.get('nama') as string;
    const alamat = data.get('alamat') as string;
    const no_hp = data.get('no_hp') as string;
    const email = data.get('email') as string;
    const medsos = data.get('medsos') as string;
    if (!id || !nama) return fail(400, { error: 'Data tidak valid' });
    try {
      await prisma.tenant.update({ where: { id }, data: { nama, alamat: alamat || null, no_hp: no_hp || null, email: email || null, medsos: medsos || null } });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Nama tenant sudah ada' });
      return fail(500, { error: 'Gagal memperbarui tenant' });
    }
  },

  toggleAktif: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = data.get('is_aktif') === 'true';
    if (!id) return fail(400, { error: 'ID tidak valid' });
    try {
      await prisma.tenant.update({ where: { id }, data: { is_aktif: !current } });
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
      await prisma.tenant.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus tenant' });
    }
  },

  verifyPayment: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const duration_months = Number(data.get('duration_months'));
    const bukti_url = data.get('bukti_transfer_url') as string;
    
    if (!id || !duration_months || !bukti_url) {
      return fail(400, { error: 'Data tidak lengkap' });
    }

    try {
      const tenant = await prisma.tenant.findUnique({ where: { id } });
      let newExpired = new Date();
      if (tenant?.expired_at && tenant.expired_at > new Date()) {
        newExpired = new Date(tenant.expired_at);
      }
      newExpired.setMonth(newExpired.getMonth() + duration_months);

      await prisma.tenant.update({
        where: { id },
        data: {
          is_aktif: true,
          status: 'ACTIVE',
          expired_at: newExpired,
          bukti_transfer: bukti_url
        }
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return fail(500, { error: 'Gagal memproses pembayaran' });
    }
  }
};
