import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/server/jwt';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get('session');

  if (sessionCookie) {
    const user = verifyToken(sessionCookie);
    if (user) {
      event.locals.user = user as any;
    }
  }

  // Redirect to login if accessing protected routes without session
  const protectedRoutes = ['/dashboard', '/pendapatan', '/pengeluaran', '/master', '/stock', '/beban', '/laporan'];
  const isProtectedRoute = protectedRoutes.some(route => event.url.pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!event.locals.user) {
      return new Response(null, {
        status: 303,
        headers: { location: '/login' }
      });
    }

    // Role-Based Access Control (RBAC) Check
    const { prisma } = await import('$lib/server/prisma');
    const { pathname } = event.url;
    
    if (event.locals.user.role_name === 'Super Admin') {
      // Full access for Super Admin, no need to check roleMenu
    } else if (event.locals.user.role_id) {
      const allowedMenus = await prisma.roleMenu.findMany({
        where: { role_id: event.locals.user.role_id },
        include: { menu: true }
      });

      // Cari apakah ada menu yang me-match pathname ini
      // Misalnya pathname `/master/karyawan` akan match dengan menu.path `/master/karyawan`
      const isAllowed = allowedMenus.some((rm: any) => pathname === rm.menu.path || pathname.startsWith(rm.menu.path + '/'));

      if (!isAllowed) {
        // Redirect to a safe page or show forbidden
        return new Response('Akses Ditolak', { status: 403 });
      }
    } else {
      // User has no role assigned
      return new Response('Akses Ditolak: Anda belum memiliki Role', { status: 403 });
    }
  }

  // Redirect to dashboard if logged in and accessing login page
  if (event.url.pathname === '/login' && event.locals.user) {
    return new Response(null, {
      status: 303,
      headers: { location: '/dashboard' }
    });
  }

  return resolve(event);
};
