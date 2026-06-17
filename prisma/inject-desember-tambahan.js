import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Tambahan Pendapatan
  const pendapatanData = [
    {
      tanggal: "2025-12-10",
      kategori: "Product",
      deskripsi: "Uang dagangan masuk",
      jumlah: 150000,
    },
  ];

  // Tambahan Pengeluaran
  const pengeluaranData = [
    {
      tanggal: "2025-12-06",
      kategori: "Lainnya",
      deskripsi: "Uang keluar untuk workshop",
      jumlah: 50000,
    },
    {
      tanggal: "2025-12-16",
      kategori: "Peralatan & Perlengkapan",
      deskripsi: "Uang keluar untuk pewangi",
      jumlah: 24000,
    },
    {
      tanggal: "2025-12-16",
      kategori: "Peralatan & Perlengkapan",
      deskripsi: "Uang keluar untuk aqua (19 + 35)",
      jumlah: 54000,
    },
    {
      tanggal: "2025-12-15",
      kategori: "Peralatan & Perlengkapan",
      deskripsi: "Uang keluar untuk alas press on + revie",
      jumlah: 66000,
    },
    {
      tanggal: "2025-12-10",
      kategori: "Utilitas (Listrik, Air)",
      deskripsi: "Naikin listrik",
      jumlah: 1300000,
    },
    {
      tanggal: "2025-12-20",
      kategori: "Peralatan & Perlengkapan",
      deskripsi: "Beli kabel",
      jumlah: 70000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Utilitas (Listrik, Air)",
      deskripsi: "Beli token listrik",
      jumlah: 100000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Pembelian Produk",
      deskripsi: "Kulaan jajan",
      jumlah: 79500,
    },
  ];

  console.log("Seeding data tambahan...");

  for (const data of pendapatanData) {
    await prisma.pendapatan.create({
      data: {
        tanggal: new Date(data.tanggal),
        kategori: data.kategori,
        deskripsi: data.deskripsi,
        jumlah: data.jumlah,
      },
    });
  }
  console.log(`✅ Successfully seeded ${pendapatanData.length} pendapatan records`);

  for (const data of pengeluaranData) {
    await prisma.pengeluaran.create({
      data: {
        tanggal: new Date(data.tanggal),
        kategori: data.kategori,
        deskripsi: data.deskripsi,
        jumlah: data.jumlah,
      },
    });
  }
  console.log(`✅ Successfully seeded ${pengeluaranData.length} pengeluaran records`);
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
