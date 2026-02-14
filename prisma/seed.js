import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = hashSync("admin123", 10);

  const user = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: password,
      full_name: "Administrator",
    },
  });

  console.log({ user });

  // Seed data pendapatan DESEMBER 2025
  const pendapatanData = [
    // === Periode 1-9 Desember ===
    // Hair Treatment
    {
      tanggal: "2025-12-01",
      kategori: "Hair Treatment",
      deskripsi: "Yumna - Catok",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-01",
      kategori: "Hair Treatment",
      deskripsi: "Syafira - Coloring",
      jumlah: 150000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Hair Treatment",
      deskripsi: "Sri Lestari - Creambath, potong, catok",
      jumlah: 75000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Hair Treatment",
      deskripsi: "Bu ... - Smoothing",
      jumlah: 300000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Hair Treatment",
      deskripsi: "Anisah - Coloring",
      jumlah: 150000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Hair Treatment",
      deskripsi: "Eni - Hair mask keratin",
      jumlah: 50000,
    },
    {
      tanggal: "2025-12-04",
      kategori: "Hair Treatment",
      deskripsi: "Adinda - Coloring",
      jumlah: 235000,
    },
    {
      tanggal: "2025-12-05",
      kategori: "Hair Treatment",
      deskripsi: "Eni - Cuci rambut 2x",
      jumlah: 40000,
    },
    {
      tanggal: "2025-12-07",
      kategori: "Hair Treatment",
      deskripsi: "Reni - Keratin",
      jumlah: 300000,
    },
    {
      tanggal: "2025-12-08",
      kategori: "Hair Treatment",
      deskripsi: "Sinta - Creambath",
      jumlah: 55000,
    },
    {
      tanggal: "2025-12-08",
      kategori: "Hair Treatment",
      deskripsi: "Nita - Coloring",
      jumlah: 130000,
    },
    {
      tanggal: "2025-12-08",
      kategori: "Hair Treatment",
      deskripsi: "Shella - Smoothing",
      jumlah: 280000,
    },
    {
      tanggal: "2025-12-09",
      kategori: "Hair Treatment",
      deskripsi: "Adinda - Catok",
      jumlah: 25000,
    },

    // Nail Art
    {
      tanggal: "2025-12-01",
      kategori: "Nail Art",
      deskripsi: "Reni - Nail art kaki + top coat glossy",
      jumlah: 50000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Nail Art",
      deskripsi: "Eni - Nail art kaki",
      jumlah: 45000,
    },
    {
      tanggal: "2025-12-09",
      kategori: "Nail Art",
      deskripsi: "Adinda - Nail art",
      jumlah: 55000,
    },

    // Product (Barang Dagangan)
    {
      tanggal: "2025-12-01",
      kategori: "Product",
      deskripsi: "Syafira - Vitamin (Vit)",
      jumlah: 50000,
    },
    {
      tanggal: "2025-12-02",
      kategori: "Product",
      deskripsi: "Anisah - Vitamin (Vit)",
      jumlah: 50000,
    },
    {
      tanggal: "2025-12-08",
      kategori: "Product",
      deskripsi: "Shella - Shower cap",
      jumlah: 5000,
    },

    // === Periode 10-31 Desember ===
    // Hair Treatment
    {
      tanggal: "2025-12-10",
      kategori: "Hair Treatment",
      deskripsi: "Mb Naning - Coloring",
      jumlah: 150000,
    },
    {
      tanggal: "2025-12-11",
      kategori: "Hair Treatment",
      deskripsi: "Dinda - Paket potong",
      jumlah: 45000,
    },
    {
      tanggal: "2025-12-12",
      kategori: "Hair Treatment",
      deskripsi: "Diah - Magia & Potong anak",
      jumlah: 130000,
    },
    {
      tanggal: "2025-12-12",
      kategori: "Hair Treatment",
      deskripsi: "Dinda Wirun - Paket potong",
      jumlah: 45000,
    },
    {
      tanggal: "2025-12-13",
      kategori: "Hair Treatment",
      deskripsi: "Winda - Paket potong",
      jumlah: 45000,
    },
    {
      tanggal: "2025-12-13",
      kategori: "Hair Treatment",
      deskripsi: "Lilis - Magia scalp",
      jumlah: 130000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Hair Treatment",
      deskripsi: "Ira - Smoothing",
      jumlah: 260000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Hair Treatment",
      deskripsi: "Yuliana - Potong + Treat. Kutu",
      jumlah: 75000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Hair Treatment",
      deskripsi: "Yuni - Potong (paket dengan nail art)",
      jumlah: 15000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Hair Treatment",
      deskripsi: "Faiz - Potong",
      jumlah: 5000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Hair Treatment",
      deskripsi: "Risa - Potong",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-15",
      kategori: "Hair Treatment",
      deskripsi: "Wawa - Potong",
      jumlah: 10000,
    },
    {
      tanggal: "2025-12-18",
      kategori: "Hair Treatment",
      deskripsi: "Yusna - Cuci + Catok",
      jumlah: 40000,
    },
    {
      tanggal: "2025-12-20",
      kategori: "Hair Treatment",
      deskripsi: "Nita - Potong + Catok",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Hair Treatment",
      deskripsi: "Nila - Catok",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Hair Treatment",
      deskripsi: "Tak Tau - Potong (2 orang)",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Hair Treatment",
      deskripsi: "Irna - Smoothing + Coloring",
      jumlah: 387500,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Hair Treatment",
      deskripsi: "Ci - Smoothing + Coloring",
      jumlah: 396500,
    },
    {
      tanggal: "2025-12-23",
      kategori: "Hair Treatment",
      deskripsi: "Melati - Paket potong",
      jumlah: 45000,
    },
    {
      tanggal: "2025-12-25",
      kategori: "Hair Treatment",
      deskripsi: "Meylani - Smoothing",
      jumlah: 200000,
    },
    {
      tanggal: "2025-12-25",
      kategori: "Hair Treatment",
      deskripsi: "Eni - Cuci rambut",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-27",
      kategori: "Hair Treatment",
      deskripsi: "Tialaila - Hairspa Loreal + Catok",
      jumlah: 95000,
    },
    {
      tanggal: "2025-12-29",
      kategori: "Hair Treatment",
      deskripsi: "Shelly - Smoothing",
      jumlah: 280000,
    },
    {
      tanggal: "2025-12-29",
      kategori: "Hair Treatment",
      deskripsi: "Karla - Potong variasi",
      jumlah: 15000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Hair Treatment",
      deskripsi: "Yusna - Cuci + Catok",
      jumlah: 40000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Hair Treatment",
      deskripsi: "Eni - Cuci rambut + tatok poni",
      jumlah: 25000,
    },

    // Nail Art
    {
      tanggal: "2025-12-11",
      kategori: "Nail Art",
      deskripsi: "Indah - Nail art",
      jumlah: 65000,
    },
    {
      tanggal: "2025-12-13",
      kategori: "Nail Art",
      deskripsi: "Lilis - Nail art polos",
      jumlah: 55000,
    },
    {
      tanggal: "2025-12-14",
      kategori: "Nail Art",
      deskripsi: "Yuni - Nail art",
      jumlah: 55000,
    },
    {
      tanggal: "2025-12-20",
      kategori: "Nail Art",
      deskripsi: "Mei - Press on",
      jumlah: 80000,
    },
    {
      tanggal: "2025-12-20",
      kategori: "Nail Art",
      deskripsi: "Andin - Press on",
      jumlah: 70000,
    },
    {
      tanggal: "2025-12-20",
      kategori: "Nail Art",
      deskripsi: "Mb Sum - Nail art",
      jumlah: 65000,
    },

    // Product (Barang Dagangan)
    {
      tanggal: "2025-12-21",
      kategori: "Product",
      deskripsi: "Ci - Shower cap",
      jumlah: 16000,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Product",
      deskripsi: "Lek Nik - Vit Inaura",
      jumlah: 15000,
    },
    {
      tanggal: "2025-12-21",
      kategori: "Product",
      deskripsi: "Ci+Irna - Ikat rambut + Mask",
      jumlah: 16000,
    },
    {
      tanggal: "2025-12-25",
      kategori: "Product",
      deskripsi: "Meylani - Vit Inaura + Shower cap",
      jumlah: 23000,
    },
    {
      tanggal: "2025-12-27",
      kategori: "Product",
      deskripsi: "Tialaila - Serum + Vit Inaura",
      jumlah: 70000,
    },
    {
      tanggal: "2025-12-29",
      kategori: "Product",
      deskripsi: "Shelly - Vit Inaura",
      jumlah: 15000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Product",
      deskripsi: "Yusna - Serum",
      jumlah: 20000,
    },
    {
      tanggal: "2025-12-31",
      kategori: "Product",
      deskripsi: "vitamin rambut",
      jumlah: 50000,
    },
  ];

  console.log("Seeding pendapatan data...");

  for (const data of pendapatanData) {
    await prisma.pendapatan.create({
      data: {
        tanggal: new Date(data.tanggal),
        kategori: data.kategori,
        deskripsi: data.deskripsi,
        jumlah: data.jumlah,
      },
    });
  }

  console.log(
    `✅ Successfully seeded ${pendapatanData.length} pendapatan records`,
  );
  console.log("=".repeat(50));
  console.log("PERIODE 1-9 DESEMBER:");
  console.log("  Hair Treatment: Rp 1.810.000");
  console.log("  Nail Art: Rp 150.000");
  console.log("  Product: Rp 105.000");
  console.log("  Subtotal: Rp 2.065.000");
  console.log("");
  console.log("PERIODE 10-31 DESEMBER:");
  console.log("  Hair Treatment: Rp 2.534.000");
  console.log("  Nail Art: Rp 390.000");
  console.log("  Product: Rp 225.000");
  console.log("  Subtotal: Rp 3.149.000");
  console.log("");
  console.log("=".repeat(50));
  console.log("TOTAL DESEMBER 2025 (1-31):");
  console.log("  Hair Treatment: Rp 4.344.000 (39 transaksi)");
  console.log("  Nail Art: Rp 540.000 (9 transaksi)");
  console.log("  Product: Rp 330.000 (11 transaksi)");
  console.log("  TOTAL KESELURUHAN: Rp 5.214.000 (59 transaksi)");
  console.log("=".repeat(50));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
