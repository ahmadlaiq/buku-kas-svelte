const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMaret2 = [
  // TANGGAL 16
  {
    tanggal: '2026-03-16',
    customer: 'Liya Ilma',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' } // tc
    ]
  },
  {
    tanggal: '2026-03-16',
    customer: 'Liya Ilma',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Smoothing Poni', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-16',
    customer: 'Mb Yanti',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 350000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-16',
    customer: 'Mb Yanti',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Makaroni', qty: 1, harga: 2000, jenis: 'BARANG' },
      { nama: 'Mie Lidi', qty: 1, harga: 1000, jenis: 'BARANG' },
      { nama: 'Qtela', qty: 1, harga: 2000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-16',
    customer: 'Lutviana',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 17
  {
    tanggal: '2026-03-17',
    customer: 'Mb Nur',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 80000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-17',
    customer: 'Mb Nur',
    items: [
      { nama: 'Jedai', qty: 1, harga: 16000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-17',
    customer: 'Lisha',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-17',
    customer: 'Bu Ari',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 140000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-17',
    customer: 'Mb Nita',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 2, harga: 10000, jenis: 'BARANG' } // total 20000
    ]
  },
  {
    tanggal: '2026-03-17',
    customer: 'Indah',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 55000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 18
  {
    tanggal: '2026-03-18',
    customer: 'Mb Dwi',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 170000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-18',
    customer: 'Silvia',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-18',
    customer: 'Yuni',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 130000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Creambath', qty: 1, harga: 0, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-18',
    customer: 'Tasya',
    items: [
      { nama: 'Creambath', qty: 2, harga: 60000, jenis: 'JASA' } // total 120000
    ]
  },
  {
    tanggal: '2026-03-18',
    customer: 'Novi',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 80000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 19
  {
    tanggal: '2026-03-19',
    customer: 'Vida',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Sera',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Nurul',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Ayu',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 310000, jenis: 'JASA' },
      { nama: 'Nail Art', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Nail Art Extension', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Ayu',
    items: [
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Hesti',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 70000, jenis: 'JASA' },
      { nama: 'Manicure', qty: 1, harga: 30000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Sapta',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Manicure', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Hani',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 320000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-19',
    customer: 'Dessy',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 20
  {
    tanggal: '2026-03-20',
    customer: 'Iin',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-20',
    customer: 'Nabila',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Jedai', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-20',
    customer: 'Arin',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 100000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-20',
    customer: 'Chintya',
    items: [
      { nama: 'Nail Art Extension', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 0, jenis: 'JASA' }, // price omitted or combined
      { nama: 'Jajan', qty: 1, harga: 2000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 24
  {
    tanggal: '2026-03-24',
    customer: 'Intan',
    items: [
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-24',
    customer: '-',
    items: [
      { nama: 'Remove Nail Art / Extension', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 25
  {
    tanggal: '2026-03-25',
    customer: 'Sumi',
    items: [
      { nama: 'Cuci Rambut', qty: 2, harga: 20000, jenis: 'JASA' }, // 40000
      { nama: 'Catok (Regular / Curly)', qty: 2, harga: 25000, jenis: 'JASA' } // 50000
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Qila',
    items: [
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 10000, jenis: 'BARANG' },
      { nama: 'Press On Nail', qty: 1, harga: 29000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Widya',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 350000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Widya',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Risma',
    items: [
      { nama: 'Potong Rata', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Nadin',
    items: [
      { nama: 'Potong + Cuci', qty: 1, harga: 30000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-25',
    customer: 'Lilis',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 26
  {
    tanggal: '2026-03-26',
    customer: 'Dinda',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-26',
    customer: 'Novi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 260000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-26',
    customer: 'Novi',
    items: [
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-26',
    customer: 'Silva',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 270000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // Skipped "Salon: vit 50.000" as per user request to only do income
  {
    tanggal: '2026-03-26',
    customer: 'Yuni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 27
  {
    tanggal: '2026-03-27',
    customer: '-',
    items: [
      { nama: 'Kripik Kaca', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Salma',
    items: [
      { nama: 'Potong Rata', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Safi',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 350000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Caya',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Jajan', qty: 1, harga: 14000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Shinta',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Press On Nail', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Mba Tias',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Bleaching', qty: 1, harga: 70000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Almira',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Cut',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-27',
    customer: 'Sulis',
    items: [
      { nama: 'Nail Art Kaki + Top Coat', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 28
  {
    tanggal: '2026-03-28',
    customer: 'Risma',
    items: [
      { nama: 'Treatment Rambut Rontok', qty: 1, harga: 120000, jenis: 'JASA' } // treatment rontok
    ]
  },
  {
    tanggal: '2026-03-28',
    customer: 'Dinda',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-28',
    customer: 'putri',
    items: [
      { nama: 'Smoothing Express', qty: 1, harga: 260000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-28',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-28',
    customer: 'Mb Nita',
    items: [
      { nama: 'Smoothing Express', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-28',
    customer: '-',
    items: [
      { nama: 'Ikat Rambut / Kuncir', qty: 2, harga: 3500, jenis: 'BARANG' } // 7000
    ]
  },
  // TANGGAL 29
  {
    tanggal: '2026-03-29',
    customer: 'Lutfi',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-29',
    customer: 'maya',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 165000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-29',
    customer: 'Fira',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 260000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-29',
    customer: 'Luluk',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-29',
    customer: 'Nurul',
    items: [
      { nama: 'Remove Nail Art / Extension', qty: 1, harga: 320000, jenis: 'JASA' } // remove extent 32.000 wait, 32.000
    ]
  },
  {
    tanggal: '2026-03-29',
    customer: 'Selvia',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // TANGGAL 30
  {
    tanggal: '2026-03-30',
    customer: 'Saroh',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-30',
    customer: 'Ana',
    items: [
      { nama: 'Treatment Kutu', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-30',
    customer: 'Siti',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-30',
    customer: 'Indah',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-03-30',
    customer: 'Wawa',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 380000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-03-30',
    customer: 'Ima',
    items: [
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  }
];

// fixing remove extent on line 363 -> 32000, not 320000
dataMaret2[58].items[0].harga = 32000;

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

    console.log('Memulai injeksi data transaksi bulan Maret (Tanggal 16-30)...');

    for (const trx of dataMaret2) {
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
