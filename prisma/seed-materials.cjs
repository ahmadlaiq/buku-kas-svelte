const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JASA = [
  { nama: 'Potong Rambut', harga: 35000, kategori: 'Potong Rambut' },
  { nama: 'Potong Rambut Anak', harga: 25000, kategori: 'Potong Rambut' },
  { nama: 'Potong Rata', harga: 30000, kategori: 'Potong Rambut' },
  { nama: 'Potong Poni', harga: 15000, kategori: 'Potong Rambut' },
  { nama: 'Potong Variasi', harga: 40000, kategori: 'Potong Rambut' },
  { nama: 'Potong + Cuci', harga: 45000, kategori: 'Potong Rambut' },
  { nama: 'Potong + Catok', harga: 55000, kategori: 'Potong Rambut' },
  { nama: 'Potong + Perawatan Kutu', harga: 70000, kategori: 'Potong Rambut' },

  { nama: 'Cuci Rambut', harga: 15000, kategori: 'Perawatan Rambut' },
  { nama: 'Catok (Regular / Curly)', harga: 30000, kategori: 'Perawatan Rambut' },
  { nama: 'Cuci + Catok', harga: 40000, kategori: 'Perawatan Rambut' },
  { nama: 'Cuci + Catok Poni', harga: 25000, kategori: 'Perawatan Rambut' },
  { nama: 'Creambath', harga: 50000, kategori: 'Perawatan Rambut' },
  { nama: 'Creambath + Catok', harga: 75000, kategori: 'Perawatan Rambut' },
  { nama: 'Hair Spa (Regular / Anak)', harga: 60000, kategori: 'Perawatan Rambut' },
  { nama: 'Loreal Hair Spa', harga: 90000, kategori: 'Perawatan Rambut' },
  { nama: 'Hair Mask (Regular / Express)', harga: 55000, kategori: 'Perawatan Rambut' },
  { nama: 'Hair Mask Keratin', harga: 80000, kategori: 'Perawatan Rambut' },
  { nama: 'Vitamin + Hair Mask', harga: 65000, kategori: 'Perawatan Rambut' },
  { nama: 'Vitamin / Serum Rambut (Add-on)', harga: 10000, kategori: 'Perawatan Rambut' },
  { nama: 'Kepang', harga: 25000, kategori: 'Perawatan Rambut' },

  { nama: 'Smoothing Regular', harga: 150000, kategori: 'Chemical & Smoothing' },
  { nama: 'Smoothing Express', harga: 180000, kategori: 'Chemical & Smoothing' },
  { nama: 'Smoothing Poni', harga: 60000, kategori: 'Chemical & Smoothing' },
  { nama: 'Smoothing Keratin', harga: 250000, kategori: 'Chemical & Smoothing' },
  { nama: 'Rebonding', harga: 130000, kategori: 'Chemical & Smoothing' },
  { nama: 'Poni Down Perm', harga: 75000, kategori: 'Chemical & Smoothing' },
  { nama: 'Treatment Kutu', harga: 50000, kategori: 'Chemical & Smoothing' },
  { nama: 'Treatment Rontok', harga: 65000, kategori: 'Chemical & Smoothing' },
  { nama: 'Magia Scalp Treatment', harga: 120000, kategori: 'Chemical & Smoothing' },
  { nama: 'Cbd Peptide Treatment', harga: 100000, kategori: 'Chemical & Smoothing' },
  { nama: 'Keratin Treatment / Filler Keratin', harga: 150000, kategori: 'Chemical & Smoothing' },

  { nama: 'Coloring (Basic) / Toning', harga: 90000, kategori: 'Coloring' },
  { nama: 'Semir Black / Brown', harga: 50000, kategori: 'Coloring' },
  { nama: 'Bleaching (per proses)', harga: 60000, kategori: 'Coloring' },
  { nama: 'Coloring + Potong', harga: 120000, kategori: 'Coloring' },
  { nama: 'Coloring + Catok', harga: 115000, kategori: 'Coloring' },
  { nama: 'Smoothing + Coloring', harga: 230000, kategori: 'Coloring' },

  { nama: 'Manicure', harga: 45000, kategori: 'Nail Art' },
  { nama: 'Nail Art Tangan (Polos/Basic)', harga: 50000, kategori: 'Nail Art' },
  { nama: 'Nail Art Kaki', harga: 55000, kategori: 'Nail Art' },
  { nama: 'Nail Art Cat Eye', harga: 75000, kategori: 'Nail Art' },
  { nama: 'Nail Art Extension', harga: 120000, kategori: 'Nail Art' },
  { nama: 'Press On Nail', harga: 40000, kategori: 'Nail Art' },
  { nama: 'Top Coat Glossy (Add-on)', harga: 15000, kategori: 'Nail Art' },
  { nama: 'Remove Nail Art / Extension', harga: 25000, kategori: 'Nail Art' },

  { nama: 'Smoothing + Nail Art (Bundling)', harga: 190000, kategori: 'Lainnya' },
  { nama: 'Massage Punggung (Add-on)', harga: 20000, kategori: 'Lainnya' },
];

const BARANG = [
  { nama: 'Shampo', harga: 25000, kategori: 'Hair Care' },
  { nama: 'Conditioner', harga: 25000, kategori: 'Hair Care' },
  { nama: 'Paket Shampo + Conditioner', harga: 45000, kategori: 'Hair Care' },
  { nama: 'Hair Tonic', harga: 35000, kategori: 'Hair Care' },
  { nama: 'Hair Spray', harga: 45000, kategori: 'Hair Care' },
  { nama: 'Hair Mask CBD (Kemasan)', harga: 40000, kategori: 'Hair Care' },
  { nama: 'Moisture 525', harga: 60000, kategori: 'Hair Care' },
  { nama: 'Vitamin Rambut (Ellips / Kemasan)', harga: 15000, kategori: 'Hair Care' },
  { nama: 'Vitamin Inaura (Kecil)', harga: 20000, kategori: 'Hair Care' },
  { nama: 'Vitamin Inaura (Besar)', harga: 45000, kategori: 'Hair Care' },
  { nama: 'Serum + Vitamin Inaura', harga: 55000, kategori: 'Hair Care' },
  { nama: 'Vitamin Rambut Pipet / 5ml', harga: 5000, kategori: 'Hair Care' },

  { nama: 'Ikat Rambut / Kuncir', harga: 3000, kategori: 'Aksesoris' },
  { nama: 'Jepit / Cepet', harga: 5000, kategori: 'Aksesoris' },
  { nama: 'Jedai', harga: 10000, kategori: 'Aksesoris' },
  { nama: 'Cepol Kupu-kupu', harga: 12000, kategori: 'Aksesoris' },
  { nama: 'Roll Rambut', harga: 5000, kategori: 'Aksesoris' },
  { nama: 'Shower Cap', harga: 4000, kategori: 'Aksesoris' },
  { nama: 'Lem Nail Art / Rambut (Kecil)', harga: 7000, kategori: 'Aksesoris' },
  { nama: 'Lem Nail Art / Rambut (Besar)', harga: 15000, kategori: 'Aksesoris' },

  { nama: 'Vitamin Inaura + Shower Cap', harga: 22000, kategori: 'Bundling Retail' },
  { nama: 'Ikat Rambut + Masker', harga: 8000, kategori: 'Bundling Retail' },
  { nama: 'Free Hair Mask (Bonus/Promo)', harga: 0, kategori: 'Bundling Retail' },

  { nama: 'Roti', harga: 6000, kategori: 'Makanan' },
  { nama: 'Moci', harga: 8000, kategori: 'Makanan' },
  { nama: 'Mie / Pop Mie', harga: 7000, kategori: 'Makanan' },
  { nama: 'Mie Lidi', harga: 4000, kategori: 'Makanan' },
  { nama: 'Keripik Kaca', harga: 6000, kategori: 'Makanan' },
  { nama: 'Ceriping Pisang', harga: 7000, kategori: 'Makanan' },
  { nama: 'Makaroni Pedas', harga: 5000, kategori: 'Makanan' },
  { nama: 'Basreng', harga: 5000, kategori: 'Makanan' },
  { nama: 'Chitato / Qtela', harga: 6000, kategori: 'Makanan' },
  { nama: 'Permen', harga: 1000, kategori: 'Makanan' },
  { nama: 'Jajanan Salon / Kerapu', harga: 5000, kategori: 'Makanan' },

  { nama: 'Air Mineral', harga: 4000, kategori: 'Minuman' },
  { nama: 'Susu', harga: 6000, kategori: 'Minuman' },
  { nama: 'Golda Coffee', harga: 5000, kategori: 'Minuman' },
  { nama: 'Teh Javana', harga: 4000, kategori: 'Minuman' },
  { nama: 'Pikca / Minuman Cup', harga: 5000, kategori: 'Minuman' },

  { nama: 'Tissue', harga: 3000, kategori: 'Lain-lain' }
];

async function seed() {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { nama: 'Salon Irna' }
    });

    if (!tenant) {
      console.log("Tenant Salon Irna tidak ditemukan.");
      return;
    }

    const superadmin = await prisma.user.findFirst({
      where: { tenant_id: tenant.id }
    });

    if (!superadmin) {
      console.log("User admin tidak ditemukan.");
      return;
    }

    console.log("Menghapus data Pendapatan Detail...");
    await prisma.pendapatanDetail.deleteMany({
      where: { pendapatan: { tenant_id: tenant.id } }
    });

    console.log("Menghapus data Pendapatan...");
    await prisma.pendapatan.deleteMany({
      where: { tenant_id: tenant.id }
    });

    console.log("Menghapus data StockLog...");
    await prisma.stockLog.deleteMany({
      where: { tenant_id: tenant.id }
    });

    console.log("Menghapus data MasterMaterial lama...");
    await prisma.masterMaterial.deleteMany({
      where: { tenant_id: tenant.id }
    });

    console.log("Memasukkan JASA baru...");
    for (const j of JASA) {
      await prisma.masterMaterial.create({
        data: {
          jenis: 'JASA',
          kategori: j.kategori,
          nama: j.nama,
          harga: j.harga,
          stock: 0,
          tenant_id: tenant.id,
          user_id: superadmin.id
        }
      });
    }

    console.log("Memasukkan BARANG baru...");
    for (const b of BARANG) {
      await prisma.masterMaterial.create({
        data: {
          jenis: 'BARANG',
          kategori: b.kategori,
          nama: b.nama,
          harga: b.harga,
          stock: 100, // Beri stok default 100 untuk barang baru
          tenant_id: tenant.id,
          user_id: superadmin.id
        }
      });
    }

    console.log("Seeding berhasil!");
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
