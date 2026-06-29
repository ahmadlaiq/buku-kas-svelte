import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const [menus, roles] = await Promise.all([
      prisma.menu.findMany({
        include: { role_menus: true },
        orderBy: { urutan: 'asc' }
      }),
      prisma.role.findMany({
        where: { is_aktif: true },
        orderBy: { nama: 'asc' }
      })
    ]);
    return { menus, roles };
  } catch (error) {
    return { menus: [], roles: [] };
  }
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const nama = data.get('nama') as string;
    const path = data.get('path') as string;
    const icon = data.get('icon') as string;
    const urutan = Number(data.get('urutan')) || 0;
    
    if (!nama || !path) return fail(400, { error: 'Nama dan Path harus diisi' });

    try {
      await prisma.menu.create({ data: { nama, path, icon, urutan } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menambahkan menu' });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    const nama = data.get('nama') as string;
    const path = data.get('path') as string;
    const icon = data.get('icon') as string;
    const urutan = Number(data.get('urutan')) || 0;

    if (!id || !nama || !path) return fail(400, { error: 'Data tidak valid' });

    try {
      await prisma.menu.update({ where: { id }, data: { nama, path, icon, urutan } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal memperbarui menu' });
    }
  },

  updateRoles: async ({ request }) => {
    const data = await request.formData();
    const menu_id = Number(data.get('menu_id'));
    const role_ids = data.getAll('roles[]').map(id => Number(id));

    if (!menu_id) return fail(400, { error: 'Menu ID tidak valid' });

    try {
      await prisma.$transaction(async (tx) => {
        // Delete all existing role_menus for this menu
        await tx.roleMenu.deleteMany({ where: { menu_id } });
        // Create new role_menus
        if (role_ids.length > 0) {
          await tx.roleMenu.createMany({
            data: role_ids.map(role_id => ({ role_id, menu_id }))
          });
        }
      });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal mengatur akses menu' });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'ID tidak valid' });

    try {
      await prisma.menu.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Gagal menghapus menu' });
    }
  }
};
