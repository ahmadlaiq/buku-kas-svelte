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
      nama: 'Salon Irna',
      alamat: 'Jl. Merdeka No. 1, Jakarta Pusat',
      no_hp: '021-12345678',
      email: 'pusat@salon-irna.com',
      medsos: '@salon.irna',
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

  // Seed Users
  const superAdminRole = await prisma.role.findUnique({ where: { nama: 'Super Admin' } });
  const adminRole = await prisma.role.findUnique({ where: { nama: 'Admin' } });
  const tenantSalonIrna = await prisma.tenant.findUnique({ where: { nama: 'Salon Irna' } });

  const defaultPassword = await bcrypt.hash('admin123', 10);

  const users = [
    {
      username: 'superadmin',
      password: defaultPassword,
      full_name: 'Super Admin',
      role_id: superAdminRole?.id,
      tenant_id: null,
      is_aktif: true,
    },
    {
      username: 'salon.irna',
      password: defaultPassword,
      full_name: 'Admin Salon Irna',
      role_id: adminRole?.id,
      tenant_id: tenantSalonIrna?.id,
      is_aktif: true,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        role_id: user.role_id,
        tenant_id: user.tenant_id,
        full_name: user.full_name,
        password: user.password,
      },
      create: user,
    });
  }
  console.log(`✅ ${users.length} User (Super Admin & Admin Tenant "salon.irna") berhasil dibuat`);

  // Seed Menus
  const menuDefs = [
    { nama: 'Dashboard', path: '/dashboard', icon: '📊', urutan: 1 },
    { nama: 'POS Kasir', path: '/pos-kasir', icon: '🛒', urutan: 2 },
    { nama: 'Pendapatan', path: '/pendapatan', icon: '💵', urutan: 3 },
    { nama: 'Pengeluaran', path: '/pengeluaran', icon: '💸', urutan: 4 },
    { nama: 'Beban Operasional', path: '/beban-operasional', icon: '📉', urutan: 5 },
    { nama: 'Beban Penyusutan', path: '/beban-penyusutan', icon: '📦', urutan: 6 },
    { nama: 'Stok Barang', path: '/stock', icon: '🏭', urutan: 7 },
    { nama: 'Laporan', path: '/laporan', icon: '📑', urutan: 8 },
    { nama: 'Master Jasa', path: '/master/jasa', icon: '✂️', urutan: 10 },
    { nama: 'Master Barang', path: '/master/barang', icon: '📦', urutan: 11 },
    { nama: 'Master Karyawan', path: '/master/karyawan', icon: '👥', urutan: 12 },
    { nama: 'Master Customer', path: '/master/customer', icon: '👤', urutan: 13 },
    { nama: 'Master User', path: '/master/user', icon: '🔑', urutan: 14 },
    { nama: 'Master Role', path: '/master/role', icon: '🛡️', urutan: 15 },
    { nama: 'Master Menu', path: '/master/menu', icon: '📜', urutan: 16 },
    { nama: 'Master Tenant', path: '/master/tenant', icon: '🏢', urutan: 17 },
  ];

  const menuMap: Record<string, number> = {};

  for (const m of menuDefs) {
    let existing = await prisma.menu.findFirst({ where: { path: m.path } });
    if (!existing) {
      existing = await prisma.menu.create({ data: m });
    } else {
      existing = await prisma.menu.update({ where: { id: existing.id }, data: m });
    }
    menuMap[m.path] = existing.id;
  }
  console.log(`✅ ${menuDefs.length} Menu berhasil dibuat`);

  // Assign Role Menu Access
  const kasirRole = await prisma.role.findUnique({ where: { nama: 'Kasir' } });
  const terapisRole = await prisma.role.findUnique({ where: { nama: 'Terapis' } });
  const ownerRole = await prisma.role.findUnique({ where: { nama: 'Owner' } });

  // Paths mapping per role
  const adminPaths = [
    '/dashboard',
    '/pos-kasir',
    '/pendapatan',
    '/pengeluaran',
    '/beban-operasional',
    '/beban-penyusutan',
    '/stock',
    '/laporan',
    '/master/jasa',
    '/master/barang',
    '/master/karyawan',
    '/master/customer',
  ];

  const superAdminPaths = menuDefs.map(m => m.path);

  const kasirPaths = [
    '/dashboard',
    '/pos-kasir',
    '/pendapatan',
    '/pengeluaran',
    '/stock',
    '/master/customer',
  ];

  const ownerPaths = [
    '/dashboard',
    '/pos-kasir',
    '/pendapatan',
    '/pengeluaran',
    '/beban-operasional',
    '/beban-penyusutan',
    '/stock',
    '/laporan',
  ];

  const terapisPaths = [
    '/dashboard',
    '/stock',
  ];

  const roleAssignments = [
    { role: superAdminRole, paths: superAdminPaths },
    { role: adminRole, paths: adminPaths },
    { role: kasirRole, paths: kasirPaths },
    { role: ownerRole, paths: ownerPaths },
    { role: terapisRole, paths: terapisPaths },
  ];

  for (const assignment of roleAssignments) {
    if (!assignment.role) continue;
    const allowedMenuIds = assignment.paths.map(p => menuMap[p]).filter(Boolean);

    // Delete any RoleMenu entries no longer assigned to this role
    await prisma.roleMenu.deleteMany({
      where: {
        role_id: assignment.role.id,
        menu_id: { notIn: allowedMenuIds },
      },
    });

    for (const menuId of allowedMenuIds) {
      await prisma.roleMenu.upsert({
        where: {
          role_id_menu_id: {
            role_id: assignment.role.id,
            menu_id: menuId,
          },
        },
        update: {},
        create: {
          role_id: assignment.role.id,
          menu_id: menuId,
        },
      });
    }
  }
  console.log(`✅ Hak Akses RoleMenu berhasil dialokasikan untuk semua Role`);

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
