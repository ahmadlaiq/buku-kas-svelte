import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Memindahkan 'Uang dagangan masuk' dari Pendapatan ke Pengeluaran...");

  // 1. Cari dan hapus data dari Pendapatan
  const pendapatanDihapus = await prisma.pendapatan.deleteMany({
    where: {
      deskripsi: "Uang dagangan masuk",
      jumlah: 150000,
      tanggal: new Date("2025-12-10"),
    },
  });

  console.log(`Menghapus ${pendapatanDihapus.count} data dari Pendapatan.`);

  // 2. Jika ada yang dihapus, masukkan ke Pengeluaran
  if (pendapatanDihapus.count > 0) {
    await prisma.pengeluaran.create({
      data: {
        tanggal: new Date("2025-12-10"),
        kategori: "Pembelian Produk",
        deskripsi: "Uang dagangan masuk",
        jumlah: 150000,
      },
    });
    console.log("✅ Berhasil memindahkan 'Uang dagangan masuk' ke Pengeluaran.");
  } else {
    console.log("Data 'Uang dagangan masuk' tidak ditemukan di Pendapatan (Mungkin sudah dihapus).");
  }
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
