import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ids = [
    231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
    241, 242, 243, 244, 245, 246, 247, 248, 249, 250,
    251, 252, 253, 254, 255, 256, 257, 258, 259, 260,
    261, 262, 263, 264, 265, 266, 267, 268, 269, 270,
    272, 274, 275, 277, 282, 283, 284, 285, 289, 290,
    292, 293, 299, 300, 302, 304, 309, 310, 311, 314,
    318, 319, 322, 324, 329, 331
];

const newNames = [
    "inaura creambth rontok (1000g)",
    "Inaura creambth berketoombe (1000g)",
    "Hairmask souvens cokelat(1L)",
    "Inaura no frizz shield smoothing (250ml)",
    "Inaura hair &scalp tonic anti dandruff(250ml)",
    "Taakara ultimate series, step 1 smoothing cream, resistant hair(500ml)",
    "Sinko styling (450ml)",
    "Inaura Magic scalp(500gr)",
    "Inaura hair &scalp tonic anti hair fall(250ml)",
    "Takara ultimate series step 1,sensitive hair (500ml)",
    "Takara ultimate series, step 2",
    "Terra diverde blue spa mask(1000g)",
    "Terra diverde, olio no olio spray(200ml)",
    "Dancoly, Argan repail oil(60ml)",
    "Terra diverde serum blue(10ml)",
    "Inaura suave guarda shield smoothing (100ml)",
    "Gocolor my hair color kode F8 electric blue(100ml)",
    "Gocolor my hair color kode C clear(100ml)",
    "Gocolor my hair color kode 7.22 ungu(100ml)",
    "NM organic double care formula soft(100ml)",
    "Face mask Viva kulit normal/kering (30g)",
    "Syb naturgo, gold pell of mask(10gr)",
    "Love by nature spa delight aroma booster cozy cake delight (500g)",
    "Love by nature spa delight aroma booster comforting chocolate (500g)",
    "Inaura hair nutrient drop, hair sun protection (100ml)",
    "Inaura hair nutrient drop, colored hair (100ml)",
    "Inaura hair nutrient drop,dry&damaged hair (100ml)",
    "Nauraa kutek muslimah, maroon(5ml)",
    "Alnece pel off,kode S06(8ml)",
    "Alnece pel off, kode 026(8ml)",
    "Inaura oxidising 30vol(1000ml)",
    "Magic fresh (8ml)",
    "Inaura step 2 1000ml",
    "Inaura Sooth Straightening For sensitive Hair Step 1 1000 ml",
    "Inaura Smooth Straigtening For Normal Hair Step 1  1000ml",
    "Inaura Smart Straightening For Resistant Hair Step 1 1000ml",
    "Inaura Premium Smart Straightening For exstra Resistant and Frizzy Hair Step 11000ml",
    "Blesing Bonding Spa Step 1 1000 gram",
    "Lolane Natura Hair Vitamin Booster for Dry and Damaged Hair 250ml",
    "Premium Silky Hair (pink) Keratin Botox  500ml",
    "Premium Silky Hair(kuning) Keratin Botox 500ml",
    "Ilvasto step 1 filler drop 250ml",
    "Ilvasto step 2 keratin Infusion 250ml",
    "Cbd Cica+Vit shampo 50ml",
    "magia scalp serum anti dandruff 50ml",
    "Cbd Hair Mask Color Ekstra isi 30g+5g",
    "Hanasui Naturgo  10g",
    "Inaura Hair Nutrien Drop (biru) 8ml",
    "Inaura Hair Nutrien Drop (pink) 8ml",
    "Yafeila Keratin Mask 20ml",
    "Cbd Keratin Pro Hair Mask ekstra isi 30g+5g",
    "OMG Glassy Lip Tint ( 04 ) 2g",
    "OMG Glassy Lip Tint (05) 2g",
    "Glad2Glow Moisturizer 30g",
    "Elips Hair Vit 1ml",
    "Color lite Kode 2.0 500ml",
    "Color lite Kode 12.BP 500ml",
    "Color lite kode 7.0 500ml",
    "Inaura Oxidising 20Vol 6% 1000ml",
    "Cultusia Shampoo Gray 180Ml"
];

function getCategory(name) {
    const lower = name.toLowerCase();
    if (lower.includes('face mask') || lower.includes('lip tint') || lower.includes('moisturizer') || lower.includes('naturgo') || lower.includes('kutek') || lower.includes('pel off')) {
        return 'Kosmetik';
    }
    if (lower.includes('spa') && !lower.includes('bonding spa')) {
        return 'Body Care';
    }
    return 'Hair Care';
}

async function main() {
    // 1. Delete mistaken injected items (id 1 to 60)
    await prisma.masterMaterial.deleteMany({
        where: { id: { lte: 60 } }
    });
    console.log("Deleted mistakenly injected items.");

    // 2. Update existing items
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        
        let updateData = {
            stock: 10,
            harga: 0,
            barcode: "0",
        };
        
        if (i < newNames.length) {
            updateData.nama = newNames[i];
            updateData.kategori = getCategory(newNames[i]);
            updateData.jenis = "BARANG";
        }

        try {
            await prisma.masterMaterial.update({
                where: { id: id },
                data: updateData
            });
            console.log(`Updated ID ${id} with ${updateData.nama || 'only stock/harga/barcode'}`);
        } catch(e) {
            console.error(`Failed to update ID ${id}: ${e.message}`);
        }
    }
}
main().finally(() => prisma.$disconnect());
