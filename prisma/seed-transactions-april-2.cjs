const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataApril2 = [
  // TANGGAL 16
  {
    tanggal: '2026-04-16',
    customer: 'Putri',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 17
  {
    tanggal: '2026-04-17',
    customer: '-',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Moci', qty: 2, harga: 4000, jenis: 'BARANG' }, // total 8000
      { nama: 'Pikca / Minuman Cup', qty: 1, harga: 2000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 18
  {
    tanggal: '2026-04-18',
    customer: 'Dita',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 170000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura (Kecil)', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-18',
    customer: 'Nanda',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 160000, jenis: 'JASA' },
      { nama: 'Potong Poni', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-18',
    customer: 'Caya',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-18',
    customer: 'Caya',
    items: [
      { nama: 'Jajan', qty: 2, harga: 1000, jenis: 'BARANG' }, // total 2000
      { nama: 'Moci', qty: 5, harga: 4000, jenis: 'BARANG' }, // total 20000
      { nama: 'Mie Lidi', qty: 1, harga: 1000, jenis: 'BARANG' },
      { nama: 'Cepol Kupu', qty: 1, harga: 16000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-18',
    customer: 'Ayu',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 0, jenis: 'JASA' } // Since price is combined or omitted
    ]
  },
  // TANGGAL 19
  {
    tanggal: '2026-04-19',
    customer: 'Tasya',
    items: [
      { nama: 'Remove Nail Art / Extension', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-19',
    customer: 'Eni Salma',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 20
  {
    tanggal: '2026-04-20',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 21
  {
    tanggal: '2026-04-21',
    customer: 'Indri',
    items: [
      { nama: 'Promo Creambath + Durasi 30', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-21',
    customer: 'Caya',
    items: [
      { nama: 'Vitamin Inaura', qty: 1, harga: 55000, jenis: 'BARANG' },
      { nama: 'Jepit Rambut / Cepet', qty: 1, harga: 16000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-21',
    customer: 'Sapta',
    items: [
      { nama: 'Creambath', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-21',
    customer: 'Putri',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-21',
    customer: 'Putri',
    items: [
      { nama: 'Smoothing Keratin', qty: 1, harga: 260000, jenis: 'JASA' },
      { nama: 'Jajan', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-21',
    customer: 'Putri',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Cuci Rambut Anak', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 22
  {
    tanggal: '2026-04-22',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 2, harga: 10000, jenis: 'JASA' } // total 20000
    ]
  },
  {
    tanggal: '2026-04-22',
    customer: 'Yuni',
    items: [
      { nama: 'Creambath', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-22',
    customer: '-', // from "Tissue: Tissue 2"
    items: [
      { nama: 'Tissue', qty: 2, harga: 10000, jenis: 'BARANG' } // total 20000
    ]
  },
  {
    tanggal: '2026-04-22',
    customer: 'Ibuk',
    items: [
      { nama: 'Semir NYU', qty: 1, harga: 204000, jenis: 'JASA' },
      { nama: 'Treatment Kutu', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 25
  {
    tanggal: '2026-04-25',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-25',
    customer: 'Niken',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-25',
    customer: 'Ratna',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Hair Tonic', qty: 1, harga: 55000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-25',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-25',
    customer: 'Risma',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 26
  {
    tanggal: '2026-04-26',
    customer: 'Yunita',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-26',
    customer: 'Naning',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Massage Punggung', qty: 1, harga: 30000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-26',
    customer: 'Naning',
    items: [
      { nama: 'Hair Spa Anak', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Jajan', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-26',
    customer: 'Mayang',
    items: [
      { nama: 'Creambath', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Jedai', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-26',
    customer: 'Jarigati',
    items: [
      { nama: 'Promo Keratin', qty: 1, harga: 250000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 28
  {
    tanggal: '2026-04-28',
    customer: 'Yeni',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Kepang', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 29
  {
    tanggal: '2026-04-29',
    customer: 'Nada',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }, // toning
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-29',
    customer: 'Nada',
    items: [
      { nama: 'Potong Poni', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-29',
    customer: 'Reza',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 30
  {
    tanggal: '2026-04-30',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Putri',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 80000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Putri',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Jedai', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Vena',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 69000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Nabila',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Karla',
    items: [
      { nama: 'Creambath', qty: 2, harga: 60000, jenis: 'JASA' }, // total 120000
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Dina',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Dina',
    items: [
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-04-30',
    customer: 'Ibuk',
    items: [
      { nama: 'Dagangan Winong', qty: 1, harga: 495000, jenis: 'BARANG' }
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

    console.log('Memulai injeksi data transaksi bulan April (Tanggal 16-30)...');

    for (const trx of dataApril2) {
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
