import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (locals.user?.role_name !== 'Super Admin') {
    throw redirect(302, '/dashboard');
  }

  const tenantId = Number(params.id);
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { nama: true }
  });

  if (!tenant) {
    throw redirect(302, '/master/tenant');
  }

  const logs = await prisma.activityLog.findMany({
    where: { tenant_id: tenantId },
    include: {
      user: { select: { full_name: true, role: { select: { nama: true } } } }
    },
    orderBy: { created_at: 'desc' },
    take: 100 // Tampilkan 100 terakhir
  });

  return {
    tenant,
    logs
  };
};
