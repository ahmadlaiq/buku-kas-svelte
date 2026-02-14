import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Menghapus semua data pendapatan...");

  const deleted = await prisma.pendapatan.deleteMany({});

  console.log(`✅ Berhasil menghapus ${deleted.count} data pendapatan`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
