import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = 25;
  const skip = (page - 1) * limit;

  try {
    const [customer, totalCount] = await Promise.all([
      prisma.customer.findMany({
        orderBy: { created_at: 'desc' },
        take: limit,
        skip
      }),
      prisma.customer.count()
    ]);
    return { 
      customer,
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

    if (!nama) {
      return fail(400, { error: 'Nama customer harus diisi' });
    }

    try {
      await prisma.customer.create({
        data: {
          nama,
          no_hp: no_hp || null,
          alamat: alamat || null,
        }
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating customer:', error);
      return fail(500, { error: 'Gagal menambahkan customer' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'ID tidak valid' });
    }

    try {
      await prisma.customer.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting customer:', error);
      return fail(500, { error: 'Gagal menghapus customer' });
    }
  }
};
