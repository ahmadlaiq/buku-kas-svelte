const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataFebruari = [
  // TANGGAL 1
  {
    tanggal: '2026-02-01',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 2, harga: 10000, jenis: 'JASA' },
      { nama: 'Cuci + Catok', qty: 2, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-01',
    customer: 'Lek Nik',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 7
  {
    tanggal: '2026-02-07',
    customer: 'Eni',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 8
  {
    tanggal: '2026-02-08',
    customer: 'Andin',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-08',
    customer: 'Andin',
    items: [
      { nama: 'Cepol Kupu', qty: 2, harga: 3000, jenis: 'BARANG' }, // total 6000
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-08',
    customer: 'Novi',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }, // + potong
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-08',
    customer: 'Novi',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 9
  {
    tanggal: '2026-02-09',
    customer: 'Yusna',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-09',
    customer: 'Mb. Nur',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 210000, jenis: 'JASA' },
      { nama: 'Nail Art', qty: 2, harga: 40000, jenis: 'JASA' } // total 80000
    ]
  },
  {
    tanggal: '2026-02-09',
    customer: 'Mb. Nur',
    items: [
      { nama: 'Top Coat Glossy (Add-on)', qty: 2, harga: 10000, jenis: 'JASA' } // total 20000
    ]
  },
  {
    tanggal: '2026-02-09',
    customer: 'Mb. Nur',
    items: [
      { nama: 'Vitamin 5ml', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Basreng', qty: 2, harga: 500, jenis: 'BARANG' }, // total 1000
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-09',
    customer: 'Sasa',
    items: [
      { nama: 'Poni Down Perm', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 10
  {
    tanggal: '2026-02-10',
    customer: 'L. Jamilah',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 130000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-10',
    customer: 'Mb. Ainun',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 11
  {
    tanggal: '2026-02-11',
    customer: 'Diah',
    items: [
      { nama: 'Promo Cuci Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 12
  {
    tanggal: '2026-02-12',
    customer: 'Putri',
    items: [
      { nama: 'CBD Peptide', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 13
  {
    tanggal: '2026-02-13',
    customer: 'Anggi',
    items: [
      { nama: 'Promo Cuci Rambut', qty: 1, harga: 13000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Anggi',
    items: [
      { nama: 'Kepang', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Nail Art Kaki', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Mb. Rita',
    items: [
      { nama: 'Loreal Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Bunga',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Nail Art', qty: 1, harga: 0, jenis: 'JASA' } // included
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Bunga',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Bunga',
    items: [
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' },
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' },
      { nama: 'Macaroni Pedes', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Bunga',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-13',
    customer: 'Amel',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 14
  {
    tanggal: '2026-02-14',
    customer: 'pingki',
    items: [
      { nama: 'Potong + Catok', qty: 1, harga: 30000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-14',
    customer: 'Fira',
    items: [
      { nama: 'Loreal Spa', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-14',
    customer: 'Indah',
    items: [
      { nama: 'Promo Cuci Rambut', qty: 1, harga: 14000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-14',
    customer: 'Mb. Nita',
    items: [
      { nama: 'Promo Cuci Rambut', qty: 1, harga: 14000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-14',
    customer: 'Mb. Umi',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-14',
    customer: 'Mb. Umi',
    items: [
      { nama: 'Lem Kecil', qty: 1, harga: 5000, jenis: 'BARANG' },
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 15
  {
    tanggal: '2026-02-15',
    customer: 'Meyla',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Rina',
    items: [
      { nama: 'Loreal Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Tialaila',
    items: [
      { nama: 'Loreal Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Mb. In',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Indah',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Dinda',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Anak kecil',
    items: [
      { nama: 'Potong Rambut Anak', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-15',
    customer: 'Mb. Sum',
    items: [
      { nama: 'Catok Curly', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 16
  {
    tanggal: '2026-02-16',
    customer: 'Nanda',
    items: [
      { nama: 'Hair Mask Keratin', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-16',
    customer: 'Sera',
    items: [
      { nama: 'Moci', qty: 2, harga: 4000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 17
  {
    tanggal: '2026-02-17',
    customer: 'April',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 350000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-17',
    customer: 'Fita',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-17',
    customer: 'Nada',
    items: [
      { nama: 'Cuci Rambut', qty: 2, harga: 20000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Potong Poni', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 18
  {
    tanggal: '2026-02-18',
    customer: 'Keyla',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-18',
    customer: 'Keyla',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Jajan', qty: 1, harga: 6000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-18',
    customer: 'Keyla',
    items: [
      { nama: 'Mie Lidi', qty: 2, harga: 1000, jenis: 'BARANG' }, // total 2000
      { nama: 'Creambath', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-18',
    customer: 'Mb. Novi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Moci', qty: 2, harga: 4000, jenis: 'BARANG' } // 8000
    ]
  },
  {
    tanggal: '2026-02-18',
    customer: 'Mb. Novi',
    items: [
      { nama: 'Ceriping Pisang', qty: 1, harga: 6000, jenis: 'BARANG' },
      { nama: 'Jedai', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 19
  {
    tanggal: '2026-02-19',
    customer: 'Yusna',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-19',
    customer: 'Fitri',
    items: [
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-19',
    customer: 'Irna',
    items: [
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-19',
    customer: 'Putri',
    items: [
      { nama: 'CBD Peptide', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-19',
    customer: 'Maya',
    items: [
      { nama: 'Remove Nail Art / Extension', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 21
  {
    tanggal: '2026-02-21',
    customer: 'Karla',
    items: [
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-21',
    customer: 'Indri',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 22
  {
    tanggal: '2026-02-22',
    customer: 'Ulin',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-22',
    customer: 'Devi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' },
      { nama: 'Nail Art Kaki', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-22',
    customer: 'Devi',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-22',
    customer: 'putri',
    items: [
      { nama: 'Hair Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 25
  {
    tanggal: '2026-02-25',
    customer: 'Putri',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-25',
    customer: '-',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 27
  {
    tanggal: '2026-02-27',
    customer: 'Norma',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 160000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 28
  {
    tanggal: '2026-02-28',
    customer: 'Nadia',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Indah',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Iyan',
    items: [
      { nama: 'Permen', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Caya',
    items: [
      { nama: 'Kripik Kaca', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Ibuk',
    items: [
      { nama: 'Jajan', qty: 1, harga: 30000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-02-28',
    customer: 'Aisyah',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 80000, jenis: 'JASA' }
    ]
  }
];

async function seed() {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { nama: 'Salon Irna' }
    });

    if (!tenant) {
      console.log('Tenant Salon Irna tidak ditemukan.');
      return;
    }

    const superadmin = await prisma.user.findFirst({
      where: { tenant_id: tenant.id }
    });

    if (!superadmin) {
      console.log('User admin tidak ditemukan.');
      return;
    }

    console.log('Memulai injeksi data transaksi bulan Februari...');

    for (const trx of dataFebruari) {
      let cust = null;
      if (trx.customer && trx.customer !== '-') {
        cust = await prisma.customer.findFirst({
          where: { nama: trx.customer, tenant_id: tenant.id }
        });
        
        if (!cust) {
          cust = await prisma.customer.create({
            data: {
              nama: trx.customer,
              tenant_id: tenant.id,
              user_id: superadmin.id
            }
          });
        }
      }

      const deskripsiItems = [];
      const detailsToCreate = [];
      let grandTotal = 0;

      for (const item of trx.items) {
        let material = await prisma.masterMaterial.findFirst({
          where: { nama: item.nama, tenant_id: tenant.id }
        });

        if (!material) {
          console.log(`[INFO] Membuat master baru: ${item.nama}`);
          material = await prisma.masterMaterial.create({
            data: {
              nama: item.nama,
              jenis: item.jenis,
              kategori: item.jenis === 'JASA' ? 'Treatment Baru' : 'Barang Baru',
              harga: item.harga,
              stock: item.jenis === 'BARANG' ? 100 : 0,
              tenant_id: tenant.id,
              user_id: superadmin.id
            }
          });
        }

        const subtotal = item.harga * item.qty;
        grandTotal += subtotal;

        deskripsiItems.push(`${item.qty}x ${material.nama}`);

        detailsToCreate.push({
          material_id: material.id,
          qty: item.qty,
          harga_satuan: item.harga,
          subtotal: subtotal
        });
      }

      const customerName = cust ? cust.nama : 'Guest/Walk-in';
      const deskripsiLengkap = `Transaksi CASH - Pelanggan: ${customerName}. Item: ${deskripsiItems.join(', ')}`;
      
      const tanggalObj = new Date(trx.tanggal + 'T12:00:00Z');

      await prisma.pendapatan.create({
        data: {
          tanggal: tanggalObj,
          kategori: 'Penjualan Kasir',
          deskripsi: deskripsiLengkap,
          jumlah: grandTotal,
          tenant_id: tenant.id,
          user_id: superadmin.id,
          details: {
            create: detailsToCreate
          }
        }
      });
      console.log(`[OK] Inserted: ${trx.tanggal} - ${customerName} (Total: ${grandTotal})`);
    }

    console.log('Injeksi data selesai!');
  } catch (error) {
    console.error('Error saat injeksi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
