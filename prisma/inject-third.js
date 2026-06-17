import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = [
    { date: "02/01/2026", desc: "SCRUNCHIE CEPOL IKAT RAMBUT", qty: 2, total: 10278, type: "" },
    { date: "02/01/2026", desc: "KERIPIK KACA KARAKTER ISI 50", qty: 1, total: 31427, type: "" },
    { date: "02/01/2026", desc: "MAKARONI USUS M&O ECERAN 1000", qty: 1, total: 7497, type: "" },
    { date: "02/01/2026", desc: "Keranjang Serbaguna Stock Basket 261 M", qty: 1, total: 8108, type: "" },
    { date: "02/01/2026", desc: "Nampan Raya S & M Monochrome Murah", qty: 1, total: 6052, type: "" },
    { date: "02/01/2026", desc: "Mie Lidi OmPik Isi 50PCS KEMASAN KAR...", qty: 1, total: 29347, type: "" },
    { date: "02/01/2026", desc: "16 pcs KUE NAGASAKI Ice Skin Cake Moo...", qty: 1, total: 31817, type: "" },
    { date: "02/01/2026", desc: "Isi 20 Kotak Peniti Besar Jarum Pentul Wa...", qty: 1, total: 41827, type: "" },
    { date: "02/01/2026", desc: "FY Jepitan Mini Wanita #8LOVE2", qty: 1, total: 9323, type: "" },
    { date: "02/01/2026", desc: "FY Set Ikat Rambut Spiral #3UNGU", qty: 1, total: 8065, type: "" },
    { date: "02/01/2026", desc: "FY Set Ikat Rambut Spiral #1COKLAT", qty: 1, total: 8065, type: "" },
    { date: "02/01/2026", desc: "Meteran Mini Gulung HIJAU", qty: 2, total: 4866, type: "" },
    { date: "02/01/2026", desc: "FY Jepit Rambut Wanita Klip #4COKLAT", qty: 1, total: 3699, type: "" },
    { date: "02/01/2026", desc: "FY Jepit Rambut Wanita Klip #3HITAM", qty: 1, total: 3699, type: "" },
    { date: "02/01/2026", desc: "FY Jepit Rambut Wanita Klip #1CREAM", qty: 1, total: 3699, type: "" },
    { date: "02/01/2026", desc: "Meteran Mini Gulung BIRU", qty: 1, total: 2433, type: "" },
    { date: "02/01/2026", desc: "JEDAI DE CLIP PER 3 PCS BANGKOK 5 C...", qty: 1, total: 16756, type: "" },
    { date: "02/01/2026", desc: "CEPOL MINI SCRUNCHEI Khaki", qty: 1, total: 5022, type: "" },
    { date: "02/01/2026", desc: "CEPOL MINI SCRUNCHEI Hitam", qty: 1, total: 5022, type: "" },
    { date: "02/01/2026", desc: "CEPOL MINI SCRUNCHEI Cokelat Tua", qty: 1, total: 4967, type: "" },
    { date: "02/01/2026", desc: "6pcs jedai bangkok / jepit rambut", qty: 1, total: 9734, type: "" },
    { date: "02/01/2026", desc: "IKAT RAMBUT CEPOL HIJAB UBUR-UBUR", qty: 2, total: 7832, type: "" },
    { date: "31/12/2025", desc: "Kipas Dinding Cosmos 16WFGR Remote", qty: 1, total: 320800, type: "A" },
    { date: "31/12/2025", desc: "Akrilik Tent Card Tempat Brosur Qris Men", qty: 1, total: 13000, type: "A" },
    { date: "29/12/2025", desc: "Catok codos", qty: 1, total: 375250, type: "A" },
    { date: "06/11/2025", desc: "Kaca Cermin Lampu LED (120x50)", qty: 1, total: 377500, type: "A" },
    { date: "13/11/2025", desc: "AMARA AM 9950 Professional Hair Dryer", qty: 1, total: 251730, type: "A" },
    { date: "15/11/2025", desc: "Mangkok Batok Kelapa Jumbo 13-14 CM", qty: 1, total: 14053, type: "A" },
    { date: "15/11/2025", desc: "Meja Sudut Standing Marmer Putih", qty: 1, total: 265362, type: "A" },
    { date: "16/11/2025", desc: "Rak salon facial rak troli barbershop troley", qty: 1, total: 345474, type: "A" },
    { date: "18/11/2025", desc: "Jutastore Kursi Barbershop Kursi Salon K...", qty: 1, total: 773725, type: "A" },
    { date: "18/11/2025", desc: "LEM KUKU PALSU MINI CAIR NAIL GLUE", qty: 10, total: 8744, type: "" },
    { date: "19/11/2025", desc: "[1000ml] bleaching badan naturale /natur", qty: 1, total: 37667, type: "" },
    { date: "-", desc: "HABITI - Set Mangkok Masker Wajah", qty: 1, total: 15945, type: "A" },
    { date: "-", desc: "Kaca Cermin Lampu Led (160x50)", qty: 1, total: 376500, type: "A" },
    { date: "-", desc: "MIXIO A180 Quadpod Macaron 180CM", qty: 1, total: 233120, type: "A" },
    { date: "-", desc: "CUSTOM UKURAN HURUF MIRROR SPONS", qty: 1, total: 319300, type: "A" },
    { date: "-", desc: "Kaca Cermin Lampu Led (120x50)", qty: 1, total: 427500, type: "A" },
    { date: "-", desc: "Acrylic plat sign label tarik, dorong, geser", qty: 1, total: 6470, type: "A" },
    { date: "-", desc: "Isi 100Pcs/Plastik Pelindung Makanan", qty: 1, total: 9260, type: "" },
    { date: "-", desc: "CETAK STIKER AREA KHUSUS PEREMPUAN", qty: 1, total: 10453, type: "A" },
    { date: "06/12/2025", desc: "Inaura Vitamin Biru 100ml", qty: 4, total: 151574, type: "" },
    { date: "06/12/2025", desc: "Inaura Vitamin Pink 100ml", qty: 2, total: 75788, type: "" },
    { date: "06/12/2025", desc: "Inaura Vitamin Orange 100ml", qty: 1, total: 37894, type: "" },
    { date: "06/12/2025", desc: "Inaura Vitamin Biru 8ml", qty: 2, total: 14382, type: "" },
    { date: "06/12/2025", desc: "Inaura Vitamin Pink 8ml", qty: 2, total: 14382, type: "" },
    { date: "-", desc: "Masker Duckbill Isi 50pcs", qty: 1, total: 9388, type: "" },
    { date: "-", desc: "Sticker alas kaki harap dilepas", qty: 1, total: 4221, type: "A" },
    { date: "-", desc: "DecorArt 20 Cm - Papan Gantung Buka Tutup", qty: 1, total: 27924, type: "A" },
    { date: "-", desc: "Inaura magia blue serum rambut", qty: 1, total: 65624, type: "" },
    { date: "-", desc: "HUGO Rak Sepatu Stainless Steel", qty: 1, total: 25775, type: "A" },
    { date: "-", desc: "PISAU CUKUR ALIS LIPAT MINI SET", qty: 1, total: 10889, type: "" },
    { date: "-", desc: "FY Set Ikat Rambut Spiral #1COKLAT", qty: 1, total: 7043, type: "" },
    { date: "-", desc: "FY Ikat Rambut Donat Set Isi 6 Pcs #4HITAM", qty: 1, total: 4446, type: "" },
    { date: "-", desc: "FY Ikat Rambut Donat Set Isi 6 Pcs #1COKLAT", qty: 1, total: 4447, type: "" },
    { date: "-", desc: "[AGUNGSMG] - 12pcs Shower Cap Bella", qty: 3, total: 167681, type: "" },
    { date: "-", desc: "CBD Keratin Pro Hair Treatment Mask Color Shield 35gr", qty: 10, total: 77884, type: "" },
    { date: "-", desc: "CBD Keratin Pro Hair Treatment Mask Keratin 35gr", qty: 10, total: 75202, type: "" },
    { date: "-", desc: "Masker Keratin Treatment Yafeila", qty: 10, total: 55074, type: "" },
    { date: "09/12/2025", desc: "Makarizo Advisor Anti Frizz & Detangling 240ml", qty: 1, total: 60793, type: "" },
    { date: "-", desc: "lem kuku gel 24 pcs", qty: 20, total: 10219, type: "" },
    { date: "-", desc: "COLORLITE BEAUVRYS 500ML", qty: 3, total: 324146, type: "" },
    { date: "-", desc: "Followers IG Indonesia Insta Permanen", qty: 1, total: 28900, type: "" },
    { date: "-", desc: "Sisir Kutu Electric Penghilang Kutu", qty: 1, total: 69772, type: "A" },
    { date: "-", desc: "Cella Catokan Mini 2 in 1 20W 180C", qty: 1, total: 15774, type: "A" },
    { date: "-", desc: "5 PCS Stand Kuku Palsu Magnetik", qty: 1, total: 10247, type: "" },
    { date: "-", desc: "4 in 1 Paket Stiker Lem Kuku Palsu", qty: 1, total: 1348, type: "" },
    { date: "-", desc: "Kapas Pembersih Kuku Nail Art", qty: 1, total: 169, type: "" },
    { date: "-", desc: "POMPIA Conditioner 5 liter (floral)", qty: 2, total: 175902, type: "" },
    { date: "-", desc: "POMPIA Conditioner 5 liter (rose)", qty: 1, total: 88395, type: "" },
    { date: "-", desc: "POMPIA Shampoo 5 Liter (apple)", qty: 1, total: 79511, type: "" },
    { date: "-", desc: "POMPIA Shampoo 5 Liter (strawberry)", qty: 1, total: 79512, type: "" },
  ];

  let pengeluaranCount = 0;
  let bebanPenyusutanCount = 0;

  for (const item of data) {
    // Parse date
    let dateStr = "2025-12-31"; // Default for "-"
    if (item.date !== "-") {
      const parts = item.date.split("/"); // DD/MM/YYYY
      if (parts.length === 3) {
        dateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    
    const itemDate = new Date(dateStr + "T00:00:00Z");

    if (item.type === "A") {
      // Beban Penyusutan
      await prisma.bebanPenyusutan.create({
        data: {
          tanggal: itemDate,
          nama_aset: item.desc,
          nilai_aset: item.total,
          umur_ekonomis: 12, // default 12 bulan
          nilai_penyusutan: Math.round(item.total / 12)
        }
      });
      bebanPenyusutanCount++;
    } else {
      // Pengeluaran
      await prisma.pengeluaran.create({
        data: {
          tanggal: itemDate,
          kategori: "Peralatan & Perlengkapan",
          deskripsi: item.desc + (item.qty > 1 ? ` (${item.qty} pcs)` : ""),
          jumlah: item.total
        }
      });
      pengeluaranCount++;
    }
  }

  console.log(`✅ Berhasil menginjeksi ${pengeluaranCount} data ke Pengeluaran`);
  console.log(`✅ Berhasil menginjeksi ${bebanPenyusutanCount} data ke Beban Penyusutan (Inventaris)`);
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
