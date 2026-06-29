const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMeiLanjutan3 = [
  // TANGGAL 15 (Lanjutan)
  {
    tanggal: '2026-05-15',
    customer: 'Nurul',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Manicure', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-15',
    customer: 'Anis',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 190000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Hair Spa', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-15',
    customer: 'Tia',
    items: [
      { nama: 'Hair Spa', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 16
  {
    tanggal: '2026-05-16',
    customer: 'Irna',
    items: [
      { nama: 'Moisture 525', qty: 1, harga: 35000, jenis: 'BARANG' }
    ]
  },
  // Skipped "Salon"
  {
    tanggal: '2026-05-16',
    customer: 'Ayu',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Jedai', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-16',
    customer: 'Syaroh',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-16',
    customer: 'Putri',
    items: [
      { nama: 'Hair Mask (Regular / Express)', qty: 1, harga: 35000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 17
  {
    tanggal: '2026-05-17',
    customer: 'Ana',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 110000, jenis: 'JASA' },
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-17',
    customer: 'Ana',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 200000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 9000, jenis: 'BARANG' },
      { nama: 'Hair Mask CBD (Kemasan)', qty: 3, harga: 6000, jenis: 'BARANG' } // 3 for 18000
    ]
  },
  {
    tanggal: '2026-05-17',
    customer: 'Nabila',
    items: [
      { nama: 'Conditioner', qty: 1, harga: 20000, jenis: 'BARANG' },
      { nama: 'Hair Mask CBD (Kemasan)', qty: 1, harga: 6000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-17',
    customer: 'Lula',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-17',
    customer: 'Diah',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 65000, jenis: 'JASA' } // t. kutu
    ]
  },
  // TANGGAL 18
  {
    tanggal: '2026-05-18',
    customer: 'Agita',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-18',
    customer: 'April',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Kepang', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-18',
    customer: 'Eva',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 19
  {
    tanggal: '2026-05-19',
    customer: 'Nazilla',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 2, harga: 20000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-19',
    customer: 'Nazilla',
    items: [
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' },
      { nama: 'Air Mineral', qty: 2, harga: 3500, jenis: 'BARANG' }, // 7000 total for 2
      { nama: 'Nail Art Extension', qty: 1, harga: 170000, jenis: 'JASA' } // Likely the 170k item
    ]
  },
  {
    tanggal: '2026-05-19',
    customer: 'Nazilla',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
      // nail art extension price omitted in original text
    ]
  },
  // TANGGAL 21
  {
    tanggal: '2026-05-21',
    customer: 'Angel',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Creambath', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-21',
    customer: 'Andin',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-21',
    customer: '-',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 22
  {
    tanggal: '2026-05-22',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Paket Shampo + Conditioner', qty: 1, harga: 40000, jenis: 'BARANG' } // Shampo + condi
    ]
  },
  {
    tanggal: '2026-05-22',
    customer: 'Caya',
    items: [
      { nama: 'Roti', qty: 1, harga: 4000, jenis: 'BARANG' },
      { nama: 'Permen', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-22',
    customer: 'Iyan',
    items: [
      { nama: 'Susu', qty: 2, harga: 3500, jenis: 'BARANG' }, // 7000 for 2
      { nama: 'Roti', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 23
  {
    tanggal: '2026-05-23',
    customer: 'Aprillia',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-23',
    customer: 'Anggun',
    items: [
      { nama: 'Paket potong tebal', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 24
  {
    tanggal: '2026-05-24',
    customer: 'Nada',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Susu', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-24',
    customer: 'Risma',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-24',
    customer: 'Nia',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 3500, jenis: 'BARANG' }
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

    console.log('Memulai injeksi data transaksi bulan Mei (Tanggal 15-24)...');

    for (const trx of dataMeiLanjutan3) {
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
