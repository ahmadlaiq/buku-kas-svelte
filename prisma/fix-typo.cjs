const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const lutfi = await prisma.pendapatan.findFirst({
    where: { 
      tanggal: new Date('2026-03-29T12:00:00Z'),
      deskripsi: { contains: 'Lutfi' }
    }
  });

  if (lutfi) {
    await prisma.pendapatan.update({
      where: { id: lutfi.id },
      data: { jumlah: 45000 }
    });
    const lutfiDetail = await prisma.pendapatanDetail.findFirst({
      where: { pendapatan_id: lutfi.id }
    });
    if (lutfiDetail) {
      await prisma.pendapatanDetail.update({
        where: { id: lutfiDetail.id },
        data: { harga_satuan: 45000, subtotal: 45000 }
      });
    }
  }

  const nurul = await prisma.pendapatan.findFirst({
    where: { 
      tanggal: new Date('2026-03-29T12:00:00Z'),
      deskripsi: { contains: 'Nurul' },
      jumlah: 320000
    }
  });

  if (nurul) {
    await prisma.pendapatan.update({
      where: { id: nurul.id },
      data: { jumlah: 32000 }
    });
    const nurulDetail = await prisma.pendapatanDetail.findFirst({
      where: { pendapatan_id: nurul.id }
    });
    if (nurulDetail) {
      await prisma.pendapatanDetail.update({
        where: { id: nurulDetail.id },
        data: { harga_satuan: 32000, subtotal: 32000 }
      });
    }
  }

  console.log("Fix applied!");
}

fix().then(() => prisma.$disconnect());
