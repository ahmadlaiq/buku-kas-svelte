import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Memulai migrasi data ke SaaS/Multi-Tenant...');

  // 1. Dapatkan role "Owner" (jika tidak ada buat baru)
  let ownerRole = await prisma.role.findFirst({ where: { nama: 'Owner' } });
  if (!ownerRole) {
    ownerRole = await prisma.role.create({
      data: { nama: 'Owner', deskripsi: 'Pemilik salon' }
    });
  }

  // 2. Dapatkan atau buat tenant "Salon Irna"
  let salonIrna = await prisma.tenant.findFirst({ where: { nama: 'Salon Irna' } });
  if (!salonIrna) {
    salonIrna = await prisma.tenant.create({
      data: {
        nama: 'Salon Irna',
        alamat: 'Alamat Salon Irna',
        is_aktif: true
      }
    });
    console.log('✅ Tenant "Salon Irna" dibuat');
  }

  // 3. Dapatkan atau buat user "salon.irna"
  let adminUser = await prisma.user.findFirst({ where: { username: 'salon.irna' } });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    adminUser = await prisma.user.create({
      data: {
        username: 'salon.irna',
        full_name: 'Admin Salon Irna',
        password: hashedPassword,
        role_id: ownerRole.id,
        tenant_id: salonIrna.id,
        is_aktif: true
      }
    });
    console.log('✅ User "salon.irna" dibuat');
  } else {
    // Update role dan tenant-nya agar sesuai kalau-kalau sebelumnya null
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { role_id: ownerRole.id, tenant_id: salonIrna.id }
    });
  }

  const tenantId = salonIrna.id;
  const userId = adminUser.id;

  // 4. Update semua tabel untuk menyuntikkan tenant_id dan user_id
  const updates = [
    prisma.pendapatan.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.pengeluaran.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.bebanOperasional.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.bebanPenyusutan.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.karyawan.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.customer.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.masterMaterial.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
    prisma.stockLog.updateMany({ data: { tenant_id: tenantId, user_id: userId } }),
  ];

  await Promise.all(updates);
  console.log('✅ Semua data yang ada telah di-bind ke Tenant "Salon Irna" dan User "salon.irna"');

  console.log('🎉 Migrasi Selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
