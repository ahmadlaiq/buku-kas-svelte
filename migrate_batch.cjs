const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS material_batch (
        id SERIAL PRIMARY KEY,
        material_id INTEGER NOT NULL REFERENCES master_material(id) ON DELETE CASCADE,
        stock INTEGER NOT NULL DEFAULT 0,
        expired_at TIMESTAMP(3),
        created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created material_batch table');
    
    await prisma.$executeRawUnsafe(`ALTER TABLE master_material DROP COLUMN IF EXISTS expired_at;`);
    console.log('Dropped expired_at from master_material');
  } catch (e) {
    console.error('Error in DB migration:', e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
