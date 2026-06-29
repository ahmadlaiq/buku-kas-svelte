import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data awal...');

  // Seed Roles
  const roles = [
    { nama: 'Super Admin', deskripsi: 'Akses penuh ke seluruh fitur sistem' },
    { nama: 'Admin', deskripsi: 'Akses ke sebagian besar fitur, kecuali pengaturan sistem' },
    { nama: 'Kasir', deskripsi: 'Akses ke transaksi pendapatan dan pengeluaran' },
    { nama: 'Terapis', deskripsi: 'Akses terbatas, hanya untuk scan stok dan melihat jadwal' },
    { nama: 'Owner', deskripsi: 'Akses ke laporan keuangan dan ringkasan bisnis' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { nama: role.nama },
      update: {},
      create: role,
    });
  }
  console.log(`✅ ${roles.length} Role berhasil dibuat`);

  // Seed Tenants
  const tenants = [
    {
      nama: 'Salon Irna - Pusat',
      alamat: 'Jl. Merdeka No. 1, Jakarta Pusat',
      no_hp: '021-12345678',
      email: 'pusat@salon-irna.com',
      medsos: '@salon.irna.pusat',
    },
    {
      nama: 'Salon Irna - Cabang Barat',
      alamat: 'Jl. Kemanggisan No. 5, Jakarta Barat',
      no_hp: '021-87654321',
      email: 'barat@salon-irna.com',
      medsos: '@salon.irna.barat',
    },
    {
      nama: 'Salon Irna - Cabang Selatan',
      alamat: 'Jl. Fatmawati No. 22, Jakarta Selatan',
      no_hp: '021-11223344',
      email: 'selatan@salon-irna.com',
      medsos: '@salon.irna.selatan',
    },
  ];

  for (const tenant of tenants) {
    await prisma.tenant.upsert({
      where: { nama: tenant.nama },
      update: {},
      create: tenant,
    });
  }
  console.log(`✅ ${tenants.length} Tenant berhasil dibuat`);

  console.log('🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
