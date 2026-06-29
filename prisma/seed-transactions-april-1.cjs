const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataApril1 = [
  // TANGGAL 1
  {
    tanggal: '2026-04-01',
    customer: 'Diah',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-01',
    customer: 'Hana',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 170000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-01',
    customer: 'Sapna',
    items: [
      { nama: 'Hair Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 2
  {
    tanggal: '2026-04-02',
    customer: 'Laily',
    items: [
      { nama: 'Smoothing Express', qty: 1, harga: 280000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-02',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-02',
    customer: 'Reni',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Moci', qty: 2, harga: 4000, jenis: 'BARANG' } // 8000 total
    ]
  },
  {
    tanggal: '2026-04-02',
    customer: 'Aqila',
    items: [
      { nama: 'Potong Poni', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-02',
    customer: 'Anita',
    items: [
      { nama: 'Magia Scalp Treatment', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 3
  {
    tanggal: '2026-04-03',
    customer: 'Fira',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-03',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-03',
    customer: 'Tikah',
    items: [
      { nama: 'Remove Ext + Nail Art', qty: 1, harga: 108000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-03',
    customer: 'Eva',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-03',
    customer: 'Sasya',
    items: [
      { nama: 'Potong + Catok', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-03',
    customer: 'Mesya',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 4
  {
    tanggal: '2026-04-04',
    customer: 'Naning',
    items: [
      { nama: 'Hair Tonic', qty: 1, harga: 55000, jenis: 'BARANG' },
      { nama: 'Vitamin Inaura (Besar)', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Lia',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 2, harga: 170000, jenis: 'JASA' }, // total 340000
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Ayu',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Anisah',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 260000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Hilda',
    items: [
      { nama: 'Potong Rata', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Sindy',
    items: [
      { nama: 'Magia Scalp Treatment', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Arin',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 350000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Meysa',
    items: [
      { nama: 'Potong Rambut Anak', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-04',
    customer: 'Naning',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 350000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 5
  {
    tanggal: '2026-04-05',
    customer: 'Indri',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-05',
    customer: 'Devi',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-05',
    customer: 'Indri',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' } // tt glossy
    ]
  },
  {
    tanggal: '2026-04-05',
    customer: 'Ika',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Cuci Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Pikca / Minuman Cup', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-05',
    customer: 'Mey',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 230000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-05',
    customer: 'Mayang',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 110000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 8
  {
    tanggal: '2026-04-08',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-08',
    customer: 'Devi',
    items: [
      { nama: 'Remove Nail Art / Extension', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Nail Art Kaki', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-08',
    customer: 'Ifa',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 110000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-08',
    customer: 'Anisah',
    items: [
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Cuci Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 9
  {
    tanggal: '2026-04-09',
    customer: 'Novi',
    items: [
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 18000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 10
  {
    tanggal: '2026-04-10',
    customer: 'Yanti',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 3, harga: 10000, jenis: 'BARANG' } // total 30000
    ]
  },
  {
    tanggal: '2026-04-10',
    customer: 'Nur',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-10',
    customer: 'Nur',
    items: [
      { nama: 'Vitamin Rambut (Ellips)', qty: 7, harga: 2000, jenis: 'BARANG' }, // total 14000
      { nama: 'Jajan', qty: 3, harga: 4000, jenis: 'BARANG' }, // total 12000
      { nama: 'Vitamin Inaura (Besar)', qty: 1, harga: 55000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-10',
    customer: 'Norma',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 55000, jenis: 'BARANG' },
      { nama: 'Hair Mask CBD (Kemasan)', qty: 1, harga: 10000, jenis: 'BARANG' },
      { nama: 'Jajan', qty: 2, harga: 4000, jenis: 'BARANG' } // total 8000
    ]
  },
  {
    tanggal: '2026-04-10',
    customer: 'Bu Um',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 100000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-10',
    customer: 'Vena',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 11
  {
    tanggal: '2026-04-11',
    customer: 'Tika',
    items: [
      { nama: 'Magia Scalp Treatment', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-11',
    customer: 'Yusna',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-11',
    customer: 'Ayu',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 16000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 12
  {
    tanggal: '2026-04-12',
    customer: 'Ayu',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 2, harga: 6000, jenis: 'BARANG' } // total 12000
    ]
  },
  // TANGGAL 13
  {
    tanggal: '2026-04-13',
    customer: 'Nurul',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
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

    console.log('Memulai injeksi data transaksi bulan April (Tanggal 1-15)...');

    for (const trx of dataApril1) {
      // 1. Tangani Customer
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

      // 2. Tangani Item
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
