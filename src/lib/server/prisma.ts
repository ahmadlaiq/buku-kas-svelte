import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { DATABASE_URL } from '$env/static/private';

// Ensure Pool is correctly imported
const Pool = pg.Pool || (pg as any).default?.Pool || (pg as any).Pool;

if (!Pool) {
    throw new Error('Failed to import pg.Pool');
}

const connectionString = `${DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}
