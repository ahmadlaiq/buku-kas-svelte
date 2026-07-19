import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
    const menus = await prisma.menu.findMany({select: {id: true}});
    const menuIds = menus.map(m => m.id);
    const deleted = await prisma.roleMenu.deleteMany({
        where: { menu_id: { notIn: menuIds } }
    });
    console.log('Deleted orphan role_menus:', deleted);
}

run().finally(() => prisma.$disconnect());
