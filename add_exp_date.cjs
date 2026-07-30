const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$executeRawUnsafe('ALTER TABLE master_material ADD COLUMN expired_at TIMESTAMP(3);');
    console.log('Column added successfully');
  } catch (e) {
    if (e.message.includes('already exists')) {
      console.log('Column already exists');
    } else {
      console.error('Error adding column:', e);
    }
  } finally {
    await prisma.$disconnect();
  }
}

run();
