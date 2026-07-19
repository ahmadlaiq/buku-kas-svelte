import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Cari menu 'Scan Barang' dan hapus atau set nonaktif
    const deleted = await prisma.menu.deleteMany({
        where: { path: '/scan-barang' }
    });
    console.log("Deleted menu Scan Barang:", deleted);
}

main().finally(() => prisma.$disconnect());
