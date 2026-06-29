import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { compareSync } from 'bcryptjs';
import { signToken } from '$lib/server/jwt';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ error: 'Username dan password harus diisi' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true }
    });

    if (!user || !compareSync(password, user.password) || !user.is_aktif) {
      return json({ error: 'Username atau password salah, atau akun nonaktif' }, { status: 401 });
    }

    const userData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role_id: user.role_id,
      role_name: user.role?.nama || null,
      tenant_id: user.tenant_id
    };

    const token = signToken(userData);

    // Set cookie
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return json({ user: userData });
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
};
