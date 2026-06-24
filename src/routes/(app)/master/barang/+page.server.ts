import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;

  try {
    const [material, totalCount] = await Promise.all([
      prisma.masterMaterial.findMany({
        where: { jenis: 'BARANG' },
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.masterMaterial.count({ where: { jenis: 'BARANG' } })
    ]);
    return { 
      material,
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
      pagination: { page: 1, limit: 25, totalItems: 0, totalPages: 0 }
    };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const kategori = data.get('kategori') as string;
    const hargaStr = data.get('harga') as string;
    const harga = hargaStr ? parseFloat(hargaStr) : 0;

    if (!nama) {
      return fail(400, { error: 'Nama barang harus diisi' });
    }

    try {
      await prisma.masterMaterial.create({
        data: {
          nama,
          jenis: 'BARANG',
          kategori: kategori || null,
          harga
        }
      });
      return { success: true };
    } catch (error: any) {
      console.error('Error creating barang:', error);
      if (error.code === 'P2002') {
        return fail(400, { error: 'Nama barang sudah ada' });
      }
      return fail(500, { error: 'Gagal menambahkan barang' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'ID tidak valid' });
    }

    try {
      await prisma.masterMaterial.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting barang:', error);
      return fail(500, { error: 'Gagal menghapus barang' });
    }
  }
};
