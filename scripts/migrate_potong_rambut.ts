import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching data...');
  
  // Find all Pendapatan
  const pendapatan = await prisma.pendapatan.findMany({
    where: {
      deskripsi: {
        contains: 'potong',
        mode: 'insensitive' // Postgres supports insensitive search
      }
    }
  });

  console.log(`Found ${pendapatan.length} records containing 'potong' in deskripsi.`);

  let updatedCount = 0;

  for (const item of pendapatan) {
    const desc = item.deskripsi?.toLowerCase() || '';
    
    // Check if date is from Feb 1st, 2026 onwards, and description is relevant
    // Also check if the category is not already 'Potong Rambut'
    if (
      item.kategori !== 'Potong Rambut' && 
      item.tanggal.getTime() >= new Date('2026-02-01T00:00:00Z').getTime() && 
      (desc.includes('potong') || desc.includes('rambut') || desc.includes('paket potong rambut'))
    ) {
      
      // Update kategori
      await prisma.pendapatan.update({
        where: { id: item.id },
        data: { kategori: 'Potong Rambut' }
      });
      console.log(`Updated ID: ${item.id}, Tanggal: ${item.tanggal.toISOString()}, Desc: ${item.deskripsi}, Old Kategori: ${item.kategori}`);
      updatedCount++;
    }
  }

  console.log(`Successfully updated ${updatedCount} records to kategori 'Potong Rambut'.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
