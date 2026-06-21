import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  try {
    const customer = await prisma.customer.findMany({
      orderBy: { created_at: 'desc' }
    });
    return { customer };
  } catch (error) {
    console.error('Error fetching customer:', error);
    return { customer: [] };
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
