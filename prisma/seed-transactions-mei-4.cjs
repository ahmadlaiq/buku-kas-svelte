const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMeiAkhir = [
  // TANGGAL 25
  {
    tanggal: '2026-05-25',
    customer: 'Jessica',
    items: [
      { nama: 'Promo creambath + catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Sapta',
    items: [
      { nama: 'Promo creambath + catok + durasi', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Diah',
    items: [
      { nama: 'Promo creambath + catok + durasi', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Putri',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 65000, jenis: 'JASA' },
      { nama: 'Air Mineral', qty: 1, harga: 3500, jenis: 'BARANG' },
      { nama: 'Roti', qty: 2, harga: 4000, jenis: 'BARANG' } // 8000 for 2
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Putri',
    items: [
      { nama: 'Shampo', qty: 1, harga: 20000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Sasa',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Susi',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 48000, jenis: 'JASA' },
      { nama: 'Manicure', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-25',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 28
  {
    tanggal: '2026-05-28',
    customer: 'Nabila',
    items: [
      { nama: 'Conditioner', qty: 2, harga: 20000, jenis: 'BARANG' } // 40000 for 2
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Nita',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Nita',
    items: [
      { nama: 'Free Hair Mask', qty: 1, harga: 6000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Dea',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 284000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 6000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Ika',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 234800, jenis: 'JASA' },
      { nama: 'Teh Javana', qty: 1, harga: 3500, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 6000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Mb Sum',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-28',
    customer: 'Shofia',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 29
  {
    tanggal: '2026-05-29',
    customer: 'Anita',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-29',
    customer: 'Irna',
    items: [
      { nama: 'Air Mineral (3pcs)', qty: 1, harga: 9500, jenis: 'BARANG' },
      { nama: 'Golda Coffee', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 30
  {
    tanggal: '2026-05-30',
    customer: 'Heny',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-30',
    customer: 'Maurisa',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 190000, jenis: 'JASA' } // t. keratin
    ]
  },
  {
    tanggal: '2026-05-30',
    customer: 'Bilqis',
    items: [
      { nama: 'Promo creambath + catok', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-30',
    customer: 'Eni',
    items: [
      { nama: 'Creambath', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-30',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 31
  {
    tanggal: '2026-05-31',
    customer: 'Ila',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-31',
    customer: 'Ratna',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-31',
    customer: 'Ira',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Nail Art', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-31',
    customer: 'Sasa',
    items: [
      { nama: 'Promo cuci catok', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-31',
    customer: 'Jessica',
    items: [
      { nama: 'Promo cuci creambath + catok', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-31',
    customer: 'Jinoli',
    items: [
      { nama: 'Coloring + Catok', qty: 1, harga: 100000, jenis: 'JASA' },
      { nama: 'Roll Rambut', qty: 1, harga: 9000, jenis: 'BARANG' }
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

    console.log('Memulai injeksi data transaksi akhir bulan Mei (Tanggal 25-31)...');

    for (const trx of dataMeiAkhir) {
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
