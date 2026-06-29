import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
  let menus: any[] = [];
  
  if (locals.user && locals.user.role_id) {
    const roleMenus = await prisma.roleMenu.findMany({
      where: { role_id: locals.user.role_id },
      include: { menu: true }
    });
    
    menus = roleMenus.map(rm => rm.menu).filter(m => m.is_aktif).sort((a, b) => a.urutan - b.urutan);
  }

  return {
    user: locals.user,
    menus
  };
};
