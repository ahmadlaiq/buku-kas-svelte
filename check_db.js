import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const materials = await prisma.masterMaterial.findMany({
        orderBy: { id: 'asc' }
    });
    console.log("Current DB Items:");
    for(const m of materials) {
        console.log(`ID: ${m.id} | Nama: ${m.nama} | Tenant: ${m.tenant_id}`);
    }
}

main().finally(() => prisma.$disconnect());
