import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { logActivity } from '$lib/server/logger';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { material: [], pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 } };
  
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;
  const search = url.searchParams.get('search') || '';
  const statusFilter = url.searchParams.get('status') || 'semua';

  const where: any = { jenis: 'BARANG', ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) };
  if (search) {
    where.OR = [
      { nama: { contains: search, mode: 'insensitive' } },
      { kategori: { contains: search, mode: 'insensitive' } },
      { barcode: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (statusFilter === 'aktif') where.is_aktif = true;
  if (statusFilter === 'nonaktif') where.is_aktif = false;

  try {
    const [material, totalCount] = await Promise.all([
      prisma.masterMaterial.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.masterMaterial.count({ where })
    ]);
    return { 
      material,
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
    console.error('Error fetching barang:', error);
    return { 
      material: [],
      search,
      statusFilter,
      pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 }
    };
  }
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const kategori = data.get('kategori') as string;
    const tipe_barang = data.get('tipe_barang') as string;
    const harga = data.get('harga') ? Number(data.get('harga')) : null;
    const barcode = data.get('barcode') as string;

    if (!nama) return fail(400, { error: 'Nama barang harus diisi' });

    try {
      await prisma.masterMaterial.create({
        data: { 
          nama, 
          jenis: 'BARANG', 
          kategori: kategori || null,
          tipe_barang: tipe_barang || null,
          harga, 
          barcode: barcode || null,
          tenant_id: locals.user.tenant_id!,
          user_id: locals.user.id
        }
      });
      await logActivity(locals.user.tenant_id!, locals.user.id, 'CREATE', 'Barang', `Menambahkan barang: ${nama}`);
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta?.target?.[0] || 'Field';
        return fail(400, { error: `${target} sudah digunakan` });
      }
      return fail(500, { error: 'Gagal menambahkan barang' });
    }
  },

  update: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const data = await request.formData();
    const id = Number(data.get('id'));
    const nama = data.get('nama') as string;
    const kategori = data.get('kategori') as string;
    const tipe_barang = data.get('tipe_barang') as string;
    const harga = data.get('harga') ? Number(data.get('harga')) : null;
    const barcode = data.get('barcode') as string;

    if (!id || !nama) return fail(400, { error: 'ID dan Nama barang harus diisi' });

    try {
      await prisma.masterMaterial.update({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
        data: { nama, kategori: kategori || null, tipe_barang: tipe_barang || null, harga, barcode: barcode || null }
      });
      return { success: true };
    } catch (error: any) {
      if (error.code === 'P2002') return fail(400, { error: 'Nama atau barcode barang sudah ada' });
      return fail(500, { error: 'Gagal memperbarui barang' });
    }
  },

  toggleAktif: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const data = await request.formData();
    const id = Number(data.get('id'));
    const current = data.get('is_aktif') === 'true';

    if (!id) return fail(400, { error: 'ID tidak valid' });

    try {
      await prisma.masterMaterial.update({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
        data: { is_aktif: !current }
      });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal mengubah status' });
    }
  },

  delete: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { error: 'Unauthorized' });
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'ID tidak valid' });

    try {
      const barang = await prisma.masterMaterial.findUnique({ where: { id } });
      await prisma.masterMaterial.delete({ where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) } });
      if (barang) {
        await logActivity(locals.user.tenant_id!, locals.user.id, 'DELETE', 'Barang', `Menghapus barang: ${barang.nama}`);
      }
      return { success: true };
    } catch (error) {
      console.error('Error deleting barang:', error);
      return fail(500, { error: 'Gagal menghapus barang' });
    }
  },
};
