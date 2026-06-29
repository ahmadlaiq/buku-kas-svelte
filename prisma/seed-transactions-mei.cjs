const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dataMei = [
  // TANGGAL 1
  {
    tanggal: '2026-05-01',
    customer: 'Jojo',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' } // Using standard name
    ]
  },
  {
    tanggal: '2026-05-01',
    customer: 'Jeni',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Creambath', qty: 1, harga: 75000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-01',
    customer: 'Jeni',
    items: [
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 2
  {
    tanggal: '2026-05-02',
    customer: 'Maya',
    items: [
      { nama: 'Creambath', qty: 1, harga: 60000, jenis: 'JASA' },
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Risma',
    items: [
      { nama: 'Paket potong', qty: 1, harga: 50000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' } // 5000 is for single use maybe
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Sasa',
    items: [
      { nama: 'Cuci + Catok', qty: 2, harga: 45000, jenis: 'JASA' },
      { nama: 'Hair Spray (Eceran)', qty: 1, harga: 5000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Ayu',
    items: [
      { nama: 'Cuci + Catok', qty: 1, harga: 45000, jenis: 'JASA' },
      { nama: 'Press On Nail', qty: 1, harga: 45000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Anna',
    items: [
      { nama: 'Keratin Treatment / Filler Keratin', qty: 1, harga: 320000, jenis: 'JASA' },
      { nama: 'Vitamin Inaura (Besar)', qty: 1, harga: 55000, jenis: 'BARANG' },
      { nama: 'Shower Cap', qty: 1, harga: 8000, jenis: 'BARANG' }
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Diah',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-02',
    customer: 'Indah',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  // TANGGAL 3
  {
    tanggal: '2026-05-03',
    customer: 'Evi',
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 10000, jenis: 'JASA' },
      { nama: 'Creambath', qty: 2, harga: 65000, jenis: 'JASA' },
      { nama: 'Catok (Regular / Curly)', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-03',
    customer: 'Eni',
    items: [
      { nama: 'Cuci Rambut', qty: 1, harga: 20000, jenis: 'JASA' }
    ]
  },
  {
    tanggal: '2026-05-03',
    customer: '-', // Guest
    items: [
      { nama: 'Potong Rambut', qty: 1, harga: 15000, jenis: 'JASA' }
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

    console.log('Memulai injeksi data transaksi bulan Mei...');

    for (const trx of dataMei) {
      // 1. Tangani Customer
      let cust = null;
      if (trx.customer && trx.customer !== '-') {
        // Cek apakah customer sudah ada
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
        // Cek Master Material
        let material = await prisma.masterMaterial.findFirst({
          where: { nama: item.nama, tenant_id: tenant.id }
        });

        // Jika tidak ada di master, buat baru
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

      // 3. Masukkan ke tabel Pendapatan & PendapatanDetail
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
