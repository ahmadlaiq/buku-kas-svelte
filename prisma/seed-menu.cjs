const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const menus = [
    { nama: 'Dashboard', path: '/dashboard', icon: '📊', urutan: 1 },
    { nama: 'Scan Barang', path: '/scan-barang', icon: '📸', urutan: 2 },
    { nama: 'Pendapatan', path: '/pendapatan', icon: '💰', urutan: 3 },
    { nama: 'Pengeluaran', path: '/pengeluaran', icon: '💸', urutan: 4 },
    { nama: 'Beban Operasional', path: '/beban-operasional', icon: '🧾', urutan: 5 },
    { nama: 'Beban Penyusutan', path: '/beban-penyusutan', icon: '📉', urutan: 6 },
    { nama: 'Manajemen Stok', path: '/stock', icon: '📦', urutan: 7 },
    { nama: 'Laporan Keuangan', path: '/laporan', icon: '📑', urutan: 8 },
    { nama: 'Master Customer', path: '/master/customer', icon: '👥', urutan: 9 },
    { nama: 'Master Karyawan', path: '/master/karyawan', icon: '👨‍💼', urutan: 10 },
    { nama: 'Master Barang', path: '/master/barang', icon: '🏷️', urutan: 11 },
    { nama: 'Master Jasa', path: '/master/jasa', icon: '✂️', urutan: 12 },
    { nama: 'Master Tenant', path: '/master/tenant', icon: '🏢', urutan: 13 },
    { nama: 'Master User', path: '/master/user', icon: '👤', urutan: 14 },
    { nama: 'Master Role', path: '/master/role', icon: '🔑', urutan: 15 },
    { nama: 'Master Menu', path: '/master/menu', icon: '⚙️', urutan: 16 }
  ];

  for (const m of menus) {
    const exists = await prisma.menu.findFirst({ where: { path: m.path } });
    if (!exists) {
      await prisma.menu.create({ data: m });
    }
  }
  
  const allMenus = await prisma.menu.findMany();
  const roles = await prisma.role.findMany();
  
  for (const role of roles) {
    const roleName = role.nama.toUpperCase();
    for (const menu of allMenus) {
      let allow = false;
      
      if (roleName === 'SUPER ADMIN') {
        allow = true; // all
      } else if (roleName === 'ADMIN') {
        allow = !['/master/tenant', '/master/role', '/master/menu'].includes(menu.path);
      } else if (roleName === 'OWNER') {
        allow = !['/master/tenant', '/master/role', '/master/menu', '/master/user'].includes(menu.path);
      } else if (roleName === 'KASIR') {
        allow = ['/scan-barang', '/pendapatan', '/pengeluaran', '/stock', '/master/customer', '/master/barang', '/master/jasa'].includes(menu.path);
      } else if (roleName === 'TERAPIS') {
        allow = ['/scan-barang'].includes(menu.path);
      }

      if (allow) {
        await prisma.roleMenu.upsert({
          where: { role_id_menu_id: { role_id: role.id, menu_id: menu.id } },
          update: {},
          create: { role_id: role.id, menu_id: menu.id }
        });
      }
    }
  }

  console.log('Seed completed.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
