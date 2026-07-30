import { prisma } from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) return { barangs: [], stockLogs: [] };
  
  const search = url.searchParams.get('search') || '';
  const where: any = {
    jenis: "BARANG",
    ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {})
  };

  if (search) {
    where.OR = [
      { nama: { contains: search, mode: 'insensitive' } },
      { kategori: { contains: search, mode: 'insensitive' } },
      { barcode: { contains: search, mode: 'insensitive' } },
    ];
  }

  const barangs = await prisma.masterMaterial.findMany({
    where,
    orderBy: {
      nama: "asc",
    },
  });

  const stockLogs = await prisma.stockLog.findMany({
    where: { ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
    orderBy: {
      created_at: "desc",
    },
    take: 100,
    include: {
      material: true,
    },
  });

  return {
    barangs,
    stockLogs,
    search,
  };
};

export const actions: Actions = {
  updateBarcode: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });
    const data = await request.formData();
    const id = Number(data.get("id"));
    const barcode = data.get("barcode")?.toString() || null;

    if (!id) {
      return fail(400, { message: "ID Barang tidak ditemukan" });
    }

    try {
      await prisma.masterMaterial.update({
        where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
        data: { barcode },
      });
      return { success: true, message: "Barcode berhasil diupdate" };
    } catch (error) {
      return fail(500, { message: "Gagal mengupdate barcode" });
    }
  },
  updateStock: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });
    const data = await request.formData();
    const id = Number(data.get("id"));
    const stock = Number(data.get("stock"));

    if (!id || isNaN(stock)) {
      return fail(400, { message: "Data tidak valid" });
    }

    try {
      const existing = await prisma.masterMaterial.findUnique({ where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) } });
      if (!existing) return fail(404, { message: "Barang tidak ditemukan" });

      const stockDiff = stock - existing.stock;
      if (stockDiff === 0) {
        return { success: true, message: "Stok tidak ada perubahan" };
      }

      await prisma.$transaction([
        prisma.masterMaterial.update({
          where: { id },
          data: { stock },
        }),
        prisma.stockLog.create({
          data: {
            material_id: id,
            jenis: "ADJUST",
            jumlah: stockDiff,
            stok_sebelum: existing.stock,
            stok_sesudah: stock,
            keterangan: "Penyesuaian stok manual",
            ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
            user_id: locals.user.id
          }
        })
      ]);
      return { success: true, message: "Stok berhasil diupdate" };
    } catch (error) {
      return fail(500, { message: "Gagal mengupdate stok" });
    }
  },
  useMaterial: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });
    const data = await request.formData();
    const itemsStr = data.get("items")?.toString();
    const keterangan = data.get("keterangan")?.toString() || "Pemakaian bahan operasional";

    if (!itemsStr) {
      return fail(400, { message: "Data barang tidak ditemukan" });
    }

    try {
      const items = JSON.parse(itemsStr);
      if (!Array.isArray(items) || items.length === 0) {
        return fail(400, { message: "Data barang tidak valid" });
      }

      const txOps = [];

      for (const item of items) {
        const id = Number(item.id);
        const jumlah = Number(item.jumlah);

        if (!id || isNaN(jumlah) || jumlah <= 0) continue;

        const existing = await prisma.masterMaterial.findUnique({ 
          where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) } 
        });

        if (!existing) {
          return fail(404, { message: `Barang dengan ID ${id} tidak ditemukan` });
        }

        if (existing.stock < jumlah) {
          return fail(400, { message: `Stok ${existing.nama} tidak mencukupi. Sisa stok: ${existing.stock}` });
        }

        const newStock = existing.stock - jumlah;

        txOps.push(
          prisma.masterMaterial.update({
            where: { id },
            data: { stock: newStock },
          })
        );
        txOps.push(
          prisma.stockLog.create({
            data: {
              material_id: id,
              jenis: "OUT",
              jumlah: -jumlah,
              stok_sebelum: existing.stock,
              stok_sesudah: newStock,
              keterangan: keterangan,
              ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
              user_id: locals.user.id
            }
          })
        );
      }

      if (txOps.length === 0) {
        return fail(400, { message: "Tidak ada data barang yang valid untuk diproses" });
      }

      await prisma.$transaction(txOps);
      return { success: true, message: "Pemakaian bahan berhasil dicatat" };
    } catch (error) {
      console.error(error);
      return fail(500, { message: "Gagal mencatat pemakaian bahan" });
    }
  },
};
