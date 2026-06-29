const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMeiLanjutan = [
  // TANGGAL 6
  {
    tanggal: '2026-05-06',
    customer: 'Yuni',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Jajan', qty: 2, harga: 4000, jenis: 'BARANG' } // 8000 for 2
    ]
  },
  {
    tanggal: '2026-05-06',
    customer: 'Yuni',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Inaura (Besar)', qty: 1, harga: 55000, jenis: 'BARANG' } // "vit besar"
    ]
  },
  {
    tanggal: '2026-05-06',
    customer: 'Mel',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-06',
    customer: 'Ibuk',
    items: [
      { nama: 'Vitamin', qty: 4, harga: 48000, jenis: 'BARANG' } // 192000 for 4 -> 48000 each
    ]
  },
  // TANGGAL 7
  {
    tanggal: '2026-05-07',
    customer: 'Sapta',
    items: [
      { nama: 'Hair Spa', qty: 1, harga: 85000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 8
  {
    tanggal: '2026-05-08',
    customer: 'Nada',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }, // "Cuci rambut + catok"
      { nama: 'Air Mineral', qty: 1, harga: 4500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-08',
    customer: 'Nada',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Teh Javana', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 9
  {
    tanggal: '2026-05-09',
    customer: 'Mei',
    items: [
      { nama: 'Creambath', qty: 1, harga: 70000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-09',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-09',
    customer: 'Bu Mur',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Kepang', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-09',
    customer: 'Dewi',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-09',
    customer: 'Intan',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 10
  {
    tanggal: '2026-05-10',
    customer: 'Diah',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-10',
    customer: 'Caya',
    items: [
      { nama: 'Nail Art Kaki', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-10',
    customer: 'Irna',
    items: [
      { nama: 'Tissue', qty: 1, harga: 10000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-10',
    customer: 'Caya',
    items: [
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' }
    ]
  },
  // Skipped "Salon" since the prompt says input revenues only
  // TANGGAL 13
  {
    tanggal: '2026-05-13',
    customer: 'Lek Nik',
    items: [
      { nama: 'Semir Black / Brown', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Diana',
    items: [
      { nama: 'Creambath', qty: 1, harga: 55000, jenis: 'JASA' },
      { nama: 'Mie / Pop Mie', qty: 1, harga: 7000, jenis: 'BARANG' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Ulin',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Ulin',
    items: [
      // Catok is crossed out
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Reza',
    items: [
      { nama: 'Creambath', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Anisah',
    items: [
      { nama: 'Creambath', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Yuni',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Air Mineral Dingin', qty: 1, harga: 4000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Evi',
    items: [
      { nama: 'Creambath', qty: 1, harga: 25000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-13',
    customer: 'Sasa',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 14
  {
    tanggal: '2026-05-14',
    customer: 'Lia',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Hair Tonic', qty: 1, harga: 55000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-14',
    customer: 'Endin',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-14',
    customer: 'Fitri',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-14',
    customer: 'Risma',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 290000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 9000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 15
  {
    tanggal: '2026-05-15',
    customer: 'Puji',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 230000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura (Kecil)', qty: 1, harga: 15000, jenis: 'BARANG' } // vit kecil
    ]
  },
  {
    tanggal: '2026-05-15',
    customer: 'Puji',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 9000, jenis: 'BARANG' },
      { nama: 'Golda Coffee', qty: 1, harga: 4000, jenis: 'BARANG' } // Golda
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

    console.log('Memulai injeksi data transaksi bulan Mei (Tanggal 5-15)...');

    for (const trx of dataMeiLanjutan) {
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
