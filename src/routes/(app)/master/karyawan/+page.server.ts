import { fail } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
  try {
    const karyawan = await prisma.karyawan.findMany({
      orderBy: { created_at: 'desc' }
    });
    return { karyawan };
  } catch (error) {
    console.error('Error fetching karyawan:', error);
    return { karyawan: [] };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const no_hp = data.get('no_hp') as string;
    const posisi = data.get('posisi') as string;

    if (!nama) {
      return fail(400, { error: 'Nama karyawan harus diisi' });
    }

    try {
      await prisma.karyawan.create({
        data: {
          nama,
          no_hp: no_hp || null,
          posisi: posisi || null,
        }
      });
      return { success: true };
    } catch (error) {
      console.error('Error creating karyawan:', error);
      return fail(500, { error: 'Gagal menambahkan karyawan' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'ID tidak valid' });
    }

    try {
      await prisma.karyawan.delete({
        where: { id }
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting karyawan:', error);
      return fail(500, { error: 'Gagal menghapus karyawan' });
    }
  }
};
