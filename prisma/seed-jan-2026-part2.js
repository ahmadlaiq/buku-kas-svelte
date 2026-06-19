import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data part 2 for Jan 2026...');

  const pendapatanData = [
    // 19 Jan
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Bu Ton: Smoothing', jumlah: 280000 },
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Produk', deskripsi: 'Bu Ton: Vit inaura, jedai', jumlah: 58000 },
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Bu Ton: Qtela, Chitato', jumlah: 6000 },
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Irna: Tissu', jumlah: 18000 },
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'L. Jaroh: Jajan', jumlah: 8000 },
    { tanggal: new Date('2026-01-19T10:00:00Z'), kategori: 'Produk', deskripsi: 'L. Jaroh: Cepol', jumlah: 8000 },

    // 20 Jan
    { tanggal: new Date('2026-01-20T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Naning: Coloring', jumlah: 150000 },

    // 21 Jan
    { tanggal: new Date('2026-01-21T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Winda: Paket bundling', jumlah: 100000 },
    { tanggal: new Date('2026-01-21T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Winda: Serum, hair mask', jumlah: 30000 },

    // 24 Jan
    { tanggal: new Date('2026-01-24T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Yuni: Nail art, top coat', jumlah: 60000 },
    { tanggal: new Date('2026-01-24T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Yuni: Cuci + catok', jumlah: 40000 },
    { tanggal: new Date('2026-01-24T10:00:00Z'), kategori: 'Produk', deskripsi: 'Yuni: Hair spray', jumlah: 5000 },
    { tanggal: new Date('2026-01-24T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mey: Creambath', jumlah: 60000 },

    // 26 Jan
    { tanggal: new Date('2026-01-26T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Jessica: Treatment magia', jumlah: 120000 },
    { tanggal: new Date('2026-01-26T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Jessica: [Layanan kedua]', jumlah: 120000 },
    { tanggal: new Date('2026-01-26T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Jessica: Hair mask keratin', jumlah: 10000 },
    { tanggal: new Date('2026-01-26T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Nita: Ikat rambut', jumlah: 3500 },

    // 28 Jan
    { tanggal: new Date('2026-01-28T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Diana: Creambath + catok', jumlah: 80000 },
  ];

  const pengeluaranData = [
    { tanggal: new Date('2026-01-28T10:00:00Z'), kategori: 'Operasional', deskripsi: 'beli lampu 8 watt', jumlah: 40000 },
    { tanggal: new Date('2026-01-28T10:00:00Z'), kategori: 'Gaji', deskripsi: 'Gaji Ibuk', jumlah: 87000 },
    { tanggal: new Date('2026-01-28T10:00:00Z'), kategori: 'Gaji', deskripsi: 'Gaji L. Jaroh', jumlah: 210000 },
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
    await prisma.pengeluaran.create({ data: p });
    console.log(`Inserted Pengeluaran: ${p.deskripsi} - ${p.jumlah}`);
  }

  console.log('Seeding part 2 finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
