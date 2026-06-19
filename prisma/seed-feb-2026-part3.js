import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data part 3 for Feb 2026...');

  const pendapatanData = [
    // Tanggal - (Assigned to 27 Feb based on context)
    { tanggal: new Date('2026-02-27T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Nadia: Smoothing', jumlah: 300000 },
    { tanggal: new Date('2026-02-27T10:00:00Z'), kategori: 'Produk', deskripsi: 'Nadia: vit', jumlah: 15000 },
    { tanggal: new Date('2026-02-27T10:00:00Z'), kategori: 'Produk', deskripsi: 'Nadia: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-27T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Dinda: cuci catok', jumlah: 40000 },

    // Tanggal 28
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Indah: cuci catok', jumlah: 40000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Iyan: permen', jumlah: 1000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Caya: kripik kaca', jumlah: 5000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Ibuk: jajan', jumlah: 30000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Aisyah: press on', jumlah: 80000 },
  ];

  const pengeluaranData = [
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Gaji', deskripsi: 'Gaji Fitri', jumlah: 750000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Gaji', deskripsi: 'Gaji Ibuk', jumlah: 285000 },
    { tanggal: new Date('2026-02-28T10:00:00Z'), kategori: 'Gaji', deskripsi: 'Gaji L. Jaroh', jumlah: 290000 },
  ];

  for (const p of pendapatanData) {
    if (p.jumlah > 0) {
      await prisma.pendapatan.create({ data: p });
      console.log(`Inserted Pendapatan: ${p.deskripsi} - ${p.jumlah}`);
    } else {
      console.log(`Skipped (jumlah = 0): ${p.deskripsi}`);
    }
  }

  for (const p of pengeluaranData) {
    if (p.jumlah > 0) {
      await prisma.pengeluaran.create({ data: p });
      console.log(`Inserted Pengeluaran: ${p.deskripsi} - ${p.jumlah}`);
    }
  }

  console.log('Seeding data part 3 for Feb 2026 finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
