import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import db from '$lib/server/database';
import { compareSync } from 'bcryptjs';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return json({ error: 'Username dan password harus diisi' }, { status: 400 });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;

    if (!user || !compareSync(password, user.password)) {
      return json({ error: 'Username atau password salah' }, { status: 401 });
    }

    return json({
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
};
