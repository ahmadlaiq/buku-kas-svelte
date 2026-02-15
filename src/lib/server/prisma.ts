import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

// Setup standar untuk Netlify (Node.js runtime)
export const prisma = global.prisma || new PrismaClient({
    datasourceUrl: env.DATABASE_URL
});

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}
