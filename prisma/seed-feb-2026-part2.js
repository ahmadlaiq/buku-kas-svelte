import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data part 2 for Feb 2026...');

  const pendapatanData = [
    // 15 Feb (Lanjutan)
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Indah: smoothing', jumlah: 290000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Indah: coloring', jumlah: 150000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Produk', deskripsi: 'Indah: shower', jumlah: 8000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Dinda: paket potong', jumlah: 45000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Anak kecil: potong', jumlah: 10000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Sum: catok curly', jumlah: 25000 },
    { tanggal: new Date('2026-02-15T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Sum: hair spray', jumlah: 5000 },

    // 16 Feb
    { tanggal: new Date('2026-02-16T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Nanda: Hair mask keratin', jumlah: 65000 },
    { tanggal: new Date('2026-02-16T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Sera: moci 2', jumlah: 8000 },

    // 17 Feb
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'April: smoothing', jumlah: 350000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Produk', deskripsi: 'April: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'April: mie', jumlah: 7000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Fita: smoothing', jumlah: 300000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Produk', deskripsi: 'Fita: vit inaura', jumlah: 50000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Nada: cuci rambut (2)', jumlah: 40000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Nada: catok', jumlah: 20000 },
    { tanggal: new Date('2026-02-17T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Nada: potong poni', jumlah: 5000 },

    // 18 Feb
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Keyla: smoothing', jumlah: 270000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Keyla: coloring', jumlah: 150000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Produk', deskripsi: 'Keyla: vit', jumlah: 50000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Produk', deskripsi: 'Keyla: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Keyla: jajan', jumlah: 6000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Keyla: mie lidi (2)', jumlah: 2000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Keyla: creambath', jumlah: 50000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Mb. Novi: smoothing', jumlah: 250000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Novi: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Mb. Novi: moci (2)', jumlah: 8000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Mb. Novi: ceriping pisang', jumlah: 6000 },
    { tanggal: new Date('2026-02-18T10:00:00Z'), kategori: 'Produk', deskripsi: 'Mb. Novi: jedai', jumlah: 8000 },

    // 19 Feb
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Yusna: cuci catok', jumlah: 40000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Fitri: moci', jumlah: 4000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Penjualan', deskripsi: 'Irna: moci', jumlah: 4000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri: CBD Peptide', jumlah: 75000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri: potong variasi', jumlah: 15000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri: catok', jumlah: 20000 },
    { tanggal: new Date('2026-02-19T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Maya: remove extention', jumlah: 50000 },

    // 21 Feb
    { tanggal: new Date('2026-02-21T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Karla: potong variasi', jumlah: 15000 },
    { tanggal: new Date('2026-02-21T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Indri: creambath', jumlah: 60000 },

    // 22 Feb
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Ulin: creambath', jumlah: 60000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Devi: smoothing', jumlah: 290000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Devi: nail art kaki', jumlah: 40000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Devi: top coat glossy', jumlah: 10000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Produk', deskripsi: 'Devi: vit', jumlah: 50000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Produk', deskripsi: 'Devi: shower cap', jumlah: 8000 },
    { tanggal: new Date('2026-02-22T10:00:00Z'), kategori: 'Layanan', deskripsi: 'putri: hair spa', jumlah: 75000 },

    // 25 Feb
    { tanggal: new Date('2026-02-25T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Putri: smoothing', jumlah: 290000 },
    { tanggal: new Date('2026-02-25T10:00:00Z'), kategori: 'Layanan', deskripsi: '-: smoothing', jumlah: 270000 },
    { tanggal: new Date('2026-02-25T10:00:00Z'), kategori: 'Produk', deskripsi: '-: shower cap', jumlah: 8000 },

    // 27 Feb
    { tanggal: new Date('2026-02-27T10:00:00Z'), kategori: 'Layanan', deskripsi: 'Norma: Coloring', jumlah: 160000 },
  ];

  for (const p of pendapatanData) {
    if (p.jumlah > 0) {
      await prisma.pendapatan.create({ data: p });
      console.log(`Inserted Pendapatan: ${p.deskripsi} - ${p.jumlah}`);
    } else {
      console.log(`Skipped (jumlah = 0): ${p.deskripsi}`);
    }
  }

  console.log('Seeding data part 2 for Feb 2026 finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
