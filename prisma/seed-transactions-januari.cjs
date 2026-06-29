const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataJanuari = [
  // 1 Jan
  {
    tanggal: '2026-01-01',
    customer: 'Tias',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 130000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 30000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-01',
    customer: 'Dana',
    items: [
      { nama: 'Cuci + Catok', qty: 2, harga: 40000, jenis: 'JASA' } // 80k
    ]
  },
  // 2 Jan
  {
    tanggal: '2026-01-02',
    customer: 'Ika',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 290000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 160000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-01-02',
    customer: 'Irna',
    items: [
      { nama: 'Mie / Pop Mie', qty: 1, harga: 5000, jenis: 'BARANG' },
      { nama: 'Jajan', qty: 1, harga: 2000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-02',
    customer: 'Iyan',
    items: [
      { nama: 'Permen', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  // 3 Jan
  {
    tanggal: '2026-01-03',
    customer: 'Diah',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // 4 Jan
  {
    tanggal: '2026-01-04',
    customer: 'Ica / Ciana',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Hair Mask (Eceran)', qty: 1, harga: 100000, jenis: 'BARANG' },
      { nama: 'Potong Rambut Anak', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-01-04',
    customer: 'Irna',
    items: [
      { nama: 'Moci', qty: 1, harga: 3000, jenis: 'BARANG' },
      { nama: 'Mie Lidi', qty: 1, harga: 1000, jenis: 'BARANG' },
      { nama: 'Tissue', qty: 1, harga: 1000, jenis: 'BARANG' }
    ]
  },
  // 5 Jan
  {
    tanggal: '2026-01-05',
    customer: 'tek Nik',
    items: [
      { nama: 'Moci', qty: 1, harga: 3000, jenis: 'BARANG' }
    ]
  },
  // 8 Jan
  {
    tanggal: '2026-01-08',
    customer: 'Imelda',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 250000, jenis: 'JASA' },
      { nama: 'Moci', qty: 1, harga: 3000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Air Mineral', qty: 1, harga: 3000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-08',
    customer: 'Umy',
    items: [
      { nama: 'Transaksi di Nota', qty: 1, harga: 337000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-01-08',
    customer: 'Faiz',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // 16 Jan
  {
    tanggal: '2026-01-16',
    customer: 'Wawa / nana',
    items: [
      { nama: 'Transaksi di Nota', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-01-16',
    customer: 'Sera',
    items: [
      { nama: 'Transaksi di Nota', qty: 1, harga: 140000, jenis: 'JASA' },
      { nama: 'Cepol Kupu', qty: 1, harga: 15000, jenis: 'BARANG' } // cepet kupu2
    ]
  },
  {
    tanggal: '2026-01-16',
    customer: 'Suci',
    items: [
      { nama: 'Transaksi di Nota', qty: 1, harga: 150000, jenis: 'JASA' }
    ]
  },
  // 17 Jan
  {
    tanggal: '2026-01-17',
    customer: 'Yusna',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-01-17',
    customer: 'Jaja Laiq',
    items: [
      { nama: 'Jajan', qty: 1, harga: 2500, jenis: 'BARANG' }
    ]
  },
  // 18 Jan
  {
    tanggal: '2026-01-18',
    customer: 'Putri, Pia',
    items: [
      { nama: 'Transaksi di Nota', qty: 1, harga: 90000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-18',
    customer: 'L. Ngat',
    items: [
      { nama: 'Jajan', qty: 1, harga: 3000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-18',
    customer: 'Winda',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 35000, jenis: 'JASA' }
    ]
  },
  // 19 Jan
  {
    tanggal: '2026-01-19',
    customer: 'Bu Ton',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Jedai', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Qtela', qty: 1, harga: 3000, jenis: 'BARANG' },
      { nama: 'Chitato', qty: 1, harga: 3000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-19',
    customer: 'L. Jaroh',
    items: [
      { nama: 'Jajan', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Cepol', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // 20 Jan
  {
    tanggal: '2026-01-20',
    customer: 'Mb. Naning',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }
    ]
  },
  // 21 Jan
  {
    tanggal: '2026-01-21',
    customer: 'Winda',
    items: [
      { nama: 'Paket Bundling', qty: 1, harga: 100000, jenis: 'JASA' },
      { nama: 'Serum & Hair Mask', qty: 1, harga: 30000, jenis: 'BARANG' }
    ]
  },
  // 24 Jan
  {
    tanggal: '2026-01-24',
    customer: 'Yuni',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-01-24',
    customer: 'Mey',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  // 26 Jan
  {
    tanggal: '2026-01-26',
    customer: 'Jessica',
    items: [
      { nama: 'Treatment Magia', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Layanan Tambahan (Di Nota)', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Hair Mask Keratin', qty: 1, harga: 10000, jenis: 'JASA' } // Or barang, usually JASA if treatment
    ]
  },
  {
    tanggal: '2026-01-26',
    customer: 'Mb. Nita',
    items: [
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 3500, jenis: 'BARANG' }
    ]
  },
  // 28 Jan
  {
    tanggal: '2026-01-28',
    customer: 'Diana',
    items: [
      { nama: 'Creambath + Catok', qty: 1, harga: 80000, jenis: 'JASA' }
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

    console.log('Memulai injeksi data transaksi bulan Januari...');

    let monthTotal = 0;

    for (const trx of dataJanuari) {
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
      
      monthTotal += grandTotal;
    }

    console.log('Injeksi data selesai!');
    console.log(`========================================`);
    console.log(`TOTAL PENDAPATAN BULAN JANUARI: Rp ${monthTotal.toLocaleString('id-ID')}`);
    console.log(`========================================`);
  } catch (error) {
    console.error('Error saat injeksi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
