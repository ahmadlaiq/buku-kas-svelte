import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }

  const tenantId = locals.user.tenant_id;
  if (!tenantId) {
    return { services: [], products: [], customers: [], employees: [] };
  }

  const [materials, customers, employees] = await Promise.all([
    prisma.masterMaterial.findMany({
      where: { tenant_id: tenantId, is_aktif: true },
      orderBy: { nama: 'asc' }
    }),
    prisma.customer.findMany({
      where: { tenant_id: tenantId, is_aktif: true },
      orderBy: { nama: 'asc' }
    }),
    prisma.karyawan.findMany({
      where: { tenant_id: tenantId, is_aktif: true },
      orderBy: { nama: 'asc' }
    })
  ]);

  const services = materials
    .filter(m => m.jenis === 'JASA')
    .map(m => ({ id: m.id, nama: m.nama, price: m.harga || 0, type: 'JASA' }));

  const products = materials
    .filter(m => m.jenis === 'BARANG')
    .map(m => ({ id: m.id, nama: m.nama, price: m.harga || 0, stock: m.stock, type: 'PRODUCT' }));

  return {
    services,
    products,
    customers: customers.map(c => ({ id: c.id, nama: c.nama, no_hp: c.no_hp })),
    employees: employees.map(e => ({ id: e.id, nama: e.nama }))
  };
};
