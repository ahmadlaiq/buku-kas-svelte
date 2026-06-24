import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching pendapatan data...');
  const pendapatan = await prisma.pendapatan.findMany();

  const jasaSet = new Set<{ nama: string; kategori: string }>();
  const barangSet = new Set<{ nama: string; kategori: string }>();

  for (const p of pendapatan) {
    if (!p.deskripsi) continue;
    
    let isProduct = p.kategori?.toLowerCase().includes('product') || p.kategori?.toLowerCase().includes('produk');
    let targetSet = isProduct ? barangSet : jasaSet;
    let kategori = p.kategori || 'Lainnya';

    // Parse description
    // Example: "Dinda - Paket potong" or "Ika: potong variasi"
    const parts = p.deskripsi.split(/[-:]/);
    const serviceStr = parts.length > 1 ? parts.slice(1).join('-') : parts[0];
    
    // Split by comma in case of multiple services like "Creambath, potong, catok"
    const items = serviceStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

    for (let item of items) {
      // Clean up string
      item = item.replace(/\(.*\)/g, '').trim(); // Remove things like (2 orang)
      // Capitalize first letter of each word
      item = item.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      
      if (item.length > 2) {
        // Prevent duplicates based on name
        let exists = false;
        for (const existing of targetSet) {
          if (existing.nama.toLowerCase() === item.toLowerCase()) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          targetSet.add({ nama: item, kategori });
        }
      }
    }
  }

  console.log(`Found ${jasaSet.size} unique Jasa and ${barangSet.size} unique Barang to insert.`);

  let insertedJasa = 0;
  for (const j of jasaSet) {
    try {
      await prisma.masterMaterial.upsert({
        where: { nama: j.nama },
        update: {},
        create: {
          nama: j.nama,
          jenis: 'JASA',
          kategori: j.kategori,
          harga: 0
        }
      });
      insertedJasa++;
    } catch (e) {
      // Ignore duplicates
    }
  }

  let insertedBarang = 0;
  for (const b of barangSet) {
    try {
      await prisma.masterMaterial.upsert({
        where: { nama: b.nama },
        update: {},
        create: {
          nama: b.nama,
          jenis: 'BARANG',
          kategori: b.kategori,
          harga: 0
        }
      });
      insertedBarang++;
    } catch (e) {
      // Ignore duplicates
    }
  }

  console.log(`Successfully injected ${insertedJasa} Jasa and ${insertedBarang} Barang.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
