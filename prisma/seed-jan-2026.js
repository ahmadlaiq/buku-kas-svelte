import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data for Jan 2026...');

  const pendapatanData = [
    // 1 Jan
    { tanggal: new Date('2026-01-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Tias: Coloring', jumlah: 130000 },
    { tanggal: new Date('2026-01-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Tias: Vit + hair mask', jumlah: 80000 },
    { tanggal: new Date('2026-01-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Dana: Catok + cuci (2)', jumlah: 80000 },
    { tanggal: new Date('2026-01-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'L. Jaroh: Hair dryer + catok', jumlah: 0 },

    // 2 Jan
    { tanggal: new Date('2026-01-02T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ika: Smoothing + coloring', jumlah: 450000 },
    { tanggal: new Date('2026-01-02T10:00:00Z'), kategori: 'Produk', deskripsi: 'Ika: Shower cap, vit', jumlah: 58000 },
    { tanggal: new Date('2026-01-02T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ika: potong variasi', jumlah: 15000 },
    { tanggal: new Date('2026-01-02T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Irna: Pop mie, jajan', jumlah: 7000 },
    { tanggal: new Date('2026-01-02T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Iyan: permen', jumlah: 1000 },

    // 3 Jan
    { tanggal: new Date('2026-01-03T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Diah: cuci rambut', jumlah: 20000 },

    // 4 Jan
    { tanggal: new Date('2026-01-04T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ica / Ciana: Smoothing, coloring', jumlah: 430000 },
    { tanggal: new Date('2026-01-04T10:00:00Z'), kategori: 'Produk', deskripsi: 'Ica / Ciana: vit, shower cap', jumlah: 58000 },
    { tanggal: new Date('2026-01-04T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ica / Ciana: creambath, hair mask', jumlah: 160000 },
    { tanggal: new Date('2026-01-04T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ica / Ciana: potong anak', jumlah: 10000 },
    { tanggal: new Date('2026-01-04T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Irna: moci, mie lidi, tissue', jumlah: 5000 },

    // 5 Jan
    { tanggal: new Date('2026-01-05T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'tek Nik: moci', jumlah: 3000 },

    // 8 Jan
    { tanggal: new Date('2026-01-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Imelda: Smoothing, moci', jumlah: 253000 },
    { tanggal: new Date('2026-01-08T10:00:00Z'), kategori: 'Produk', deskripsi: 'Imelda: shower cap, air', jumlah: 11000 },
    { tanggal: new Date('2026-01-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Umy: dinota', jumlah: 337000 },
    { tanggal: new Date('2026-01-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Faiz: potong', jumlah: 10000 },

    // 16 Jan
    { tanggal: new Date('2026-01-16T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Wawa / nana: dinota', jumlah: 55000 },
    { tanggal: new Date('2026-01-16T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Sera: dinota, cepet kupu²', jumlah: 155000 },
    { tanggal: new Date('2026-01-16T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Suci: dinota', jumlah: 150000 },

    // 17 Jan
    { tanggal: new Date('2026-01-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Yusna: catok', jumlah: 20000 },
    { tanggal: new Date('2026-01-17T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Jaja Laiq: Jajan', jumlah: 2500 },

    // 18 Jan
    { tanggal: new Date('2026-01-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri, Pia: dinota, vit', jumlah: 140000 },
    { tanggal: new Date('2026-01-18T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'L. Ngat: Jajan', jumlah: 3000 },
    { tanggal: new Date('2026-01-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Winda: Cuci catok', jumlah: 35000 },
  ];

  const pengeluaranData = [
    { tanggal: new Date('2026-01-03T10:00:00Z'), kategori: 'Peralatan', deskripsi: 'inverter + bor', jumlah: 110000 },
    { tanggal: new Date('2026-01-20T10:00:00Z'), kategori: 'Operasional', deskripsi: 'bayar wifi', jumlah: 100000 },
  ];

  for (const p of pendapatanData) {
    if (p.jumlah > 0) {
      await prisma.pendapatan.create({
        data: p
      });
      console.log(`Inserted Pendapatan: ${p.deskripsi} - ${p.jumlah}`);
    } else {
      console.log(`Skipped (jumlah = 0): ${p.deskripsi}`);
    }
  }

  for (const p of pengeluaranData) {
    await prisma.pengeluaran.create({
      data: p
    });
    console.log(`Inserted Pengeluaran: ${p.deskripsi} - ${p.jumlah}`);
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
