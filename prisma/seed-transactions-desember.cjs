const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataDesember = [
  // 1 Des
  {
    tanggal: '2025-12-01',
    customer: 'Reni',
    items: [
      { nama: 'Nail Art Kaki', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Top Coat Glossy (Add-on)', qty: 1, harga: 10000, jenis: 'JASA' } // total 50k
    ]
  },
  {
    tanggal: '2025-12-01',
    customer: 'Yumna',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-01',
    customer: 'Syafira',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  // 2 Des
  {
    tanggal: '2025-12-02',
    customer: 'Sri Lestari',
    items: [
      { nama: 'Creambath', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ] // Total 75k
  },
  {
    tanggal: '2025-12-02',
    customer: 'Bu ...',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 300000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-02',
    customer: 'Anisah',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' },
      { nama: 'Vitamin Rambut', qty: 1, harga: 50000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-02',
    customer: 'Eni',
    items: [
      { nama: 'Nail Art Kaki', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Hair Mask Keratin', qty: 1, harga: 50000, jenis: 'JASA' }
    ]
  },
  // 4 Des
  {
    tanggal: '2025-12-04',
    customer: 'Adinda',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 235000, jenis: 'JASA' }
    ]
  },
  // 5 Des
  {
    tanggal: '2025-12-05',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 2, harga: 20000, jenis: 'JASA' }
    ]
  },
  // 7 Des
  {
    tanggal: '2025-12-07',
    customer: 'Reni',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 300000, jenis: 'JASA' }
    ]
  },
  // 8 Des
  {
    tanggal: '2025-12-08',
    customer: 'Sinta',
    items: [
      { nama: 'Creambath', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-08',
    customer: 'Nita',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 130000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-08',
    customer: 'Shella',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  // 9 Des
  {
    tanggal: '2025-12-09',
    customer: 'Adinda',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 55000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 25000, jenis: 'JASA' }
    ]
  },
  // 10 Des
  {
    tanggal: '2025-12-10',
    customer: 'Mb Naning',
    items: [
      { nama: 'Coloring (Basic) / Toning', qty: 1, harga: 150000, jenis: 'JASA' }
    ]
  },
  // 11 Des
  {
    tanggal: '2025-12-11',
    customer: 'Dinda',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-11',
    customer: 'Indah',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  // 12 Des
  {
    tanggal: '2025-12-12',
    customer: 'Diah',
    items: [
      { nama: 'Treatment Magia', qty: 1, harga: 120000, jenis: 'JASA' },
      { nama: 'Potong Rambut Anak', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-12',
    customer: 'Dinda Wirun',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // 13 Des
  {
    tanggal: '2025-12-13',
    customer: 'Winda',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-13',
    customer: 'Lilis',
    items: [
      { nama: 'Magia Scalp', qty: 1, harga: 130000, jenis: 'JASA' },
      { nama: 'Nail Art Polos', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  // 14 Des
  {
    tanggal: '2025-12-14',
    customer: 'Ira',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 260000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-14',
    customer: 'Yuliana',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Treatment Kutu', qty: 1, harga: 60000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-14',
    customer: 'Yuni',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Nail Art', qty: 1, harga: 55000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-14',
    customer: 'Faiz',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 5000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-14',
    customer: 'Risa',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // 15 Des
  {
    tanggal: '2025-12-15',
    customer: 'Wawa',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' }
    ]
  },
  // 18 Des
  {
    tanggal: '2025-12-18',
    customer: 'Yusna',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' }
    ]
  },
  // 20 Des
  {
    tanggal: '2025-12-20',
    customer: 'Nita',
    items: [
      { nama: 'Potong + Catok', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-20',
    customer: 'Mei',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 80000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-20',
    customer: 'Andin',
    items: [
      { nama: 'Press On Nail', qty: 1, harga: 70000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-20',
    customer: 'Mb Sum',
    items: [
      { nama: 'Nail Art', qty: 1, harga: 65000, jenis: 'JASA' }
    ]
  },
  // 21 Des
  {
    tanggal: '2025-12-21',
    customer: 'Nila',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-21',
    customer: '-',
    items: [
      { nama: 'Potong Rambut', qty: 2, harga: 10000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-21',
    customer: 'Irna',
    items: [
      { nama: 'Smoothing + Coloring', qty: 1, harga: 387500, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2025-12-21',
    customer: 'Ci',
    items: [
      { nama: 'Smoothing + Coloring', qty: 1, harga: 396500, jenis: 'JASA' },
      { nama: 'Shower Cap', qty: 1, harga: 16000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-21',
    customer: 'Lek Nik',
    items: [
      { nama: 'Vitamin Inaura', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-21',
    customer: 'Ci+Irna',
    items: [
      { nama: 'Ikat Rambut / Kuncir', qty: 1, harga: 8000, jenis: 'BARANG' },
      { nama: 'Masker', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  // 23 Des
  {
    tanggal: '2025-12-23',
    customer: 'Melati',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  // 25 Des
  {
    tanggal: '2025-12-25',
    customer: 'Meylani',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 200000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 15000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-25',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // 27 Des
  {
    tanggal: '2025-12-27',
    customer: 'Tialaila',
    items: [
      { nama: 'Hair Spa Loreal', qty: 1, harga: 75000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Serum Rambut', qty: 1, harga: 50000, jenis: 'BARANG' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 20000, jenis: 'BARANG' }
    ]
  },
  // 29 Des
  {
    tanggal: '2025-12-29',
    customer: 'Shelly',
    items: [
      { nama: 'Smoothing', qty: 1, harga: 280000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura', qty: 1, harga: 15000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-29',
    customer: 'Karla',
    items: [
      { nama: 'Potong Variasi', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  // 31 Des
  {
    tanggal: '2025-12-31',
    customer: 'Yusna',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 40000, jenis: 'JASA' },
      { nama: 'Serum Rambut', qty: 1, harga: 20000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2025-12-31',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Catok Poni', qty: 1, harga: 5000, jenis: 'JASA' }
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

    console.log('Memulai injeksi data transaksi bulan Desember 2025...');

    let totalDesember = 0;

    for (const trx of dataDesember) {
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
      totalDesember += grandTotal;
    }

    console.log('Injeksi data selesai!');
    console.log(`========================================`);
    console.log(`TOTAL PENDAPATAN BULAN DESEMBER: Rp ${totalDesember.toLocaleString('id-ID')}`);
    console.log(`========================================`);
  } catch (error) {
    console.error('Error saat injeksi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
