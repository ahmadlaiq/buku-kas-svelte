const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMaret1 = [
  // TANGGAL 1
  {
    tanggal: '2026-03-01',
    customer: 'Anggun',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 20000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-01',
    customer: 'Anggun',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Conditioner', qty: 1, harga: 20000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-01',
    customer: 'Ulin',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 9000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-01',
    customer: 'Reva',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Smoothing', qty: 1, harga: 272000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-01',
    customer: 'Reva',
    items: [
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' },
      { nama: 'Mie Lidi', qty: 1, harga: 1000, jenis: 'BARANG' },
      { nama: 'Kerapu Snack', qty: 1, harga: 500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-01',
    customer: 'Reva',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 2
  {
    tanggal: '2026-03-02',
    customer: 'Nadia',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 3
  {
    tanggal: '2026-03-03',
    customer: 'Mb. Nur',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 330000, jenis: 'JASA' },
      { nama: 'Bleaching', qty: 1, harga: 70000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-03',
    customer: 'Mb. Nur',
    items: [
      { nama: 'Moci', qty: 1, harga: 4000, jenis: 'BARANG' },
      { nama: 'Chitato', qty: 1, harga: 2000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 4
  {
    tanggal: '2026-03-04',
    customer: 'Irna',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 5
  {
    tanggal: '2026-03-05',
    customer: 'Mb. Sum',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 6
  {
    tanggal: '2026-03-06',
    customer: 'Mb. Sum / Nayla',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 320000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-06',
    customer: 'Putri',
    items: [
      { nama: 'Hair Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 7
  {
    tanggal: '2026-03-07',
    customer: 'Mb. Susi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Norma',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Bu Tata',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Tia',
    items: [
      { nama: 'Rebonding', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Tia',
    items: [
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Dewi',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Septa',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Anggun',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Siti',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-07',
    customer: 'Siti',
    items: [
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 8
  {
    tanggal: '2026-03-08',
    customer: 'Rika',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-08',
    customer: 'Putri',
    items: [
      { nama: 'Nail Art Tangan + Kaki', qty: 1, harga: 115000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-08',
    customer: 'Mb Ana',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Lem Nail Art', qty: 3, harga: 3000, jenis: 'BARANG' } // 9000 for 3
    ]
  },
  {
    tanggal: '2026-03-08',
    customer: 'Mb Siti',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 0, jenis: 'BARANG' } // price omitted
    ]
  },
  // TANGGAL 9
  {
    tanggal: '2026-03-09',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 10
  {
    tanggal: '2026-03-10',
    customer: 'Wulan',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-10',
    customer: 'Wulan',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-10',
    customer: 'Iyan',
    items: [
      { nama: 'Jajan', qty: 1, harga: 10000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 12
  {
    tanggal: '2026-03-12',
    customer: 'Putri',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 130000, jenis: 'JASA' },
      { nama: 'Potong Poni', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-12',
    customer: 'Putri',
    items: [
      { nama: 'Nail Art Kaki', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-12',
    customer: 'Aisyah',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-12',
    customer: 'Devi',
    items: [
      { nama: 'Press On + Top Coat Glossy', qty: 1, harga: 90000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-12',
    customer: '-',
    items: [
      { nama: 'Press On Nail', qty: 2, harga: 75000, jenis: 'JASA' } // total 150000
    ]
  },
  // TANGGAL 13
  {
    tanggal: '2026-03-13',
    customer: 'Dinda',
    items: [
      { nama: 'Jajan', qty: 1, harga: 3000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-13',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-13',
    customer: '-',
    items: [
      { nama: 'Nail Art Kaki', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 14
  {
    tanggal: '2026-03-14',
    customer: 'Mey',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-14',
    customer: 'Mey',
    items: [
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-14',
    customer: 'Mb Tias',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Bleaching', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-14',
    customer: 'Sumi',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 100000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-14',
    customer: 'Patna',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 15
  {
    tanggal: '2026-03-15',
    customer: 'Shinta',
    items: [
      { nama: 'Potong + Cuci', qty: 1, harga: 30000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Dewi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 310000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Mey',
    items: [
      { nama: 'Nail Art Kaki Cat Eye', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Naya',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' }, // extention
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Naya',
    items: [
      { nama: 'Nail Art Extension Glossy', qty: 1, harga: 85000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Dini',
    items: [
      { nama: 'Nail Art Extension Glossy', qty: 1, harga: 70000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Aisyah',
    items: [
      { nama: 'Press On Glossy', qty: 1, harga: 90000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-15',
    customer: 'Caya',
    items: [
      { nama: 'Press On Glossy', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Moci', qty: 3, harga: 4000, jenis: 'BARANG' } // total 12000
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

    console.log('Memulai injeksi data transaksi bulan Maret (Tanggal 1-15)...');

    for (const trx of dataMaret1) {
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
