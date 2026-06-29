import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const menu = await prisma.menu.create({
    data: {
      nama: 'POS Kasir',
      path: '/pos-kasir',
      icon: '🛒',
      urutan: 2
    }
  });
  
  const roles = await prisma.role.findMany({
    where: {
      nama: {
        in: ['Owner', 'Kasir', 'Super Admin']
      }
    }
  });
  
  for (const role of roles) {
    await prisma.roleMenu.create({
      data: {
        role_id: role.id,
        menu_id: menu.id
      }
    });
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
