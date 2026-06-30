import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
  let menus: any[] = [];
  
  if (locals.user) {
    if (locals.user.role_name === 'Super Admin') {
      menus = await prisma.menu.findMany({
        where: { is_aktif: true },
        orderBy: { urutan: 'asc' }
      });
    } else {
      const roleMenus = await prisma.roleMenu.findMany({
        where: { role_id: locals.user.role_id },
        include: { menu: true }
      });
      
      menus = roleMenus.map((rm: any) => rm.menu).filter((m: any) => m.is_aktif).sort((a: any, b: any) => a.urutan - b.urutan);
    }
  }

  return {
    user: locals.user,
    menus
  };
};
