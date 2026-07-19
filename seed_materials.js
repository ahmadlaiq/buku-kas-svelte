import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const items = [
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "inaura creambth rontok (1000g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura creambth berketoombe (1000g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Hairmask souvens cokelat(1L)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura no frizz shield smoothing (250ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura hair &scalp tonic anti dandruff(250ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Taakara ultimate series, step 1 smoothing cream, resistant hair(500ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Sinko styling (450ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Magic scalp(500gr)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura hair &scalp tonic anti hair fall(250ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Takara ultimate series step 1,sensitive hair (500ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Takara ultimate series, step 2",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Body Care",
        "nama": "Terra diverde blue spa mask(1000g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Terra diverde, olio no olio spray(200ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Dancoly, Argan repail oil(60ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Terra diverde serum blue(10ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura suave guarda shield smoothing (100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Gocolor my hair color kode F8 electric blue(100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Gocolor my hair color kode C clear(100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Gocolor my hair color kode 7.22 ungu(100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "NM organic double care formula soft(100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Face mask Viva kulit normal/kering (30g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Syb naturgo, gold pell of mask(10gr)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Body Care",
        "nama": "Love by nature spa delight aroma booster cozy cake delight (500g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Body Care",
        "nama": "Love by nature spa delight aroma booster comforting chocolate (500g)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura hair nutrient drop, hair sun protection (100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura hair nutrient drop, colored hair (100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura hair nutrient drop,dry&damaged hair (100ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Nauraa kutek muslimah, maroon(5ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Alnece pel off,kode S06(8ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Alnece pel off, kode 026(8ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura oxidising 30vol(1000ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Magic fresh (8ml)",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura step 2 1000ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Sooth Straightening For sensitive Hair Step 1 1000 ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Smooth Straigtening For Normal Hair Step 1  1000ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Smart Straightening For Resistant Hair Step 1 1000ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Premium Smart Straightening For exstra Resistant and Frizzy Hair Step 11000ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Blesing Bonding Spa Step 1 1000 gram",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Lolane Natura Hair Vitamin Booster for Dry and Damaged Hair 250ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Premium Silky Hair (pink) Keratin Botox  500ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Premium Silky Hair(kuning) Keratin Botox 500ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Ilvasto step 1 filler drop 250ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Ilvasto step 2 keratin Infusion 250ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Cbd Cica+Vit shampo 50ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "magia scalp serum anti dandruff 50ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Cbd Hair Mask Color Ekstra isi 30g+5g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Hanasui Naturgo  10g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Hair Nutrien Drop (biru) 8ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Hair Nutrien Drop (pink) 8ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Yafeila Keratin Mask 20ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Cbd Keratin Pro Hair Mask ekstra isi 30g+5g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "OMG Glassy Lip Tint ( 04 ) 2g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "OMG Glassy Lip Tint (05) 2g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Kosmetik",
        "nama": "Glad2Glow Moisturizer 30g",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Elips Hair Vit 1ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Color lite Kode 2.0 500ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Color lite Kode 12.BP 500ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Color lite kode 7.0 500ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Inaura Oxidising 20Vol 6% 1000ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    },
    {
        "jenis": "BARANG",
        "kategori": "Hair Care",
        "nama": "Cultusia Shampoo Gray 180Ml",
        "harga": 0,
        "barcode": "0",
        "stock": 10,
        "is_aktif": true,
        "tenant_id": 4,
        "user_id": 2
    }
];

async function main() {
    console.log(`Starting to inject ${items.length} items...`);
    let inserted = 0;
    
    for (const item of items) {
        try {
            const existing = await prisma.masterMaterial.findFirst({
                where: { nama: item.nama }
            });
            
            if (existing) {
                const result = await prisma.masterMaterial.update({
                    where: { id: existing.id },
                    data: {
                        jenis: item.jenis,
                        kategori: item.kategori,
                        harga: item.harga,
                        stock: item.stock,
                        barcode: item.barcode,
                        is_aktif: item.is_aktif,
                        tenant_id: item.tenant_id,
                        user_id: item.user_id,
                    }
                });
                console.log(`Updated: ${item.nama} (ID: ${result.id})`);
            } else {
                const result = await prisma.masterMaterial.create({
                    data: {
                        jenis: item.jenis,
                        kategori: item.kategori,
                        nama: item.nama,
                        harga: item.harga,
                        stock: item.stock,
                        barcode: item.barcode,
                        is_aktif: item.is_aktif,
                        tenant_id: item.tenant_id,
                        user_id: item.user_id,
                    }
                });
                console.log(`Created: ${item.nama} (ID: ${result.id})`);
            }
            inserted++;
        } catch (e) {
            console.error(`Error on ${item.nama}:`, e.message);
        }
    }
    console.log(`Finished injecting items. Total success: ${inserted}/${items.length}`);
}

main()
    .catch(e => {
        console.error("Critical Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
