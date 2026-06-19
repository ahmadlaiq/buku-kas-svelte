import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data for Feb 2026...');

  const pendapatanData = [
    // 1 Feb
    { tanggal: new Date('2026-02-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'potong 2x', jumlah: 20000 },
    { tanggal: new Date('2026-02-01T10:00:00Z'), kategori: 'Layanan', deskripsi: 'cuci catok 2x', jumlah: 80000 },
    { tanggal: new Date('2026-02-01T10:00:00Z'), kategori: 'Produk', deskripsi: 'Lek Nik: vitamin', jumlah: 50000 },
    
    // 7 Feb
    { tanggal: new Date('2026-02-07T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Eni: smoothing', jumlah: 290000 },

    // 8 Feb
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Andin: smoothing', jumlah: 270000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Produk', deskripsi: 'Andin: vit', jumlah: 50000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Andin: hairmask', jumlah: 10000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Produk', deskripsi: 'Andin: cepol kupu 2x', jumlah: 6000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Produk', deskripsi: 'Andin: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Novi: coloring + potong', jumlah: 150000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Novi: catok', jumlah: 15000 },
    { tanggal: new Date('2026-02-08T10:00:00Z'), kategori: 'Produk', deskripsi: 'Novi: vit rambut', jumlah: 50000 },

    // 9 Feb
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Yusna: cuci + catok', jumlah: 40000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nur: smoothing', jumlah: 210000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nur: nail art 2x', jumlah: 80000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nur: top coat glossy 2x', jumlah: 20000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Nur: vit 5ml', jumlah: 15000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Mb. Nur: basreng 2x', jumlah: 1000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Mb. Nur: moci', jumlah: 4000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Sasa: poni down perm', jumlah: 80000 },
    { tanggal: new Date('2026-02-09T10:00:00Z'), kategori: 'Produk', deskripsi: 'Sasa: shower cap', jumlah: 8000 },

    // 10 Feb
    { tanggal: new Date('2026-02-10T10:00:00Z'), kategori: 'Layanan', deskripsi: 'L. Jamilah: Coloring', jumlah: 130000 },
    { tanggal: new Date('2026-02-10T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Ainun: Smoothing', jumlah: 290000 },
    { tanggal: new Date('2026-02-10T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Ainun: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-10T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Ainun: hair mask', jumlah: 10000 },

    // 11 Feb
    { tanggal: new Date('2026-02-11T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Diah: promo cuci rambut', jumlah: 10000 },

    // 12 Feb
    { tanggal: new Date('2026-02-12T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri: CBD Peptide', jumlah: 75000 },

    // 13 Feb
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anggi: promo cuci rambut', jumlah: 13000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anggi: catok', jumlah: 20000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anggi: kepang', jumlah: 10000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anggi: nail art kaki', jumlah: 15000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anggi: top coat', jumlah: 5000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Rita: Loreal spa', jumlah: 75000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Bunga: smoothing + nail art', jumlah: 280000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Produk', deskripsi: 'Bunga: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Produk', deskripsi: 'Bunga: vit inaura', jumlah: 50000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Bunga: mie', jumlah: 7000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Bunga: moci', jumlah: 4000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Bunga: macaroni pedes', jumlah: 1000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Bunga: paket potong', jumlah: 45000 },
    { tanggal: new Date('2026-02-13T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Amel: cuci catok', jumlah: 40000 },

    // 14 Feb
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'pingki: potong catok', jumlah: 30000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Fira: Loreal spa', jumlah: 75000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Fira: potong', jumlah: 10000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Indah: promo cuci rambut', jumlah: 14000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nita: promo cuci rambut', jumlah: 14000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nita: potong', jumlah: 15000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Nita: catok', jumlah: 20000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Umi: Nail extention + top coat', jumlah: 120000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Umi: lem kecil', jumlah: 5000 },
    { tanggal: new Date('2026-02-14T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Mb. Umi: moci', jumlah: 4000 },

    // 15 Feb
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Meyla: Coloring', jumlah: 150000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Meyla: potong variasi', jumlah: 15000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Rina: Loreal spa', jumlah: 75000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Tialaila: Loreal spa (ditandai tanda // / sama)', jumlah: 75000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. In: Smoothing', jumlah: 280000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. In: coloring', jumlah: 150000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. In: shower cap', jumlah: 8000 },
  ];

  const pengeluaranData = [
    { tanggal: new Date('2026-02-01T10:00:00Z'), kategori: 'Peralatan', deskripsi: 'Pembesar daya', jumlah: 800000 },
    { tanggal: new Date('2026-02-20T10:00:00Z'), kategori: 'Operasional', deskripsi: 'wifi', jumlah: 100000 },
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

  console.log('Seeding data for Feb 2026 finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
