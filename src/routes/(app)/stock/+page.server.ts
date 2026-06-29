import { prisma } from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const barangs = await prisma.masterMaterial.findMany({
    where: {
      jenis: "BARANG",
    },
    orderBy: {
      nama: "asc",
    },
  });

  const stockLogs = await prisma.stockLog.findMany({
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
  };
};

export const actions: Actions = {
  updateBarcode: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const barcode = data.get("barcode")?.toString() || null;

    if (!id) {
      return fail(400, { message: "ID Barang tidak ditemukan" });
    }

    try {
      await prisma.masterMaterial.update({
        where: { id },
        data: { barcode },
      });
      return { success: true, message: "Barcode berhasil diupdate" };
    } catch (error) {
      return fail(500, { message: "Gagal mengupdate barcode" });
    }
  },
  updateStock: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get("id"));
    const stock = Number(data.get("stock"));

    if (!id || isNaN(stock)) {
      return fail(400, { message: "Data tidak valid" });
    }

    try {
      const existing = await prisma.masterMaterial.findUnique({ where: { id } });
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
          }
        })
      ]);
      return { success: true, message: "Stok berhasil diupdate" };
    } catch (error) {
      return fail(500, { message: "Gagal mengupdate stok" });
    }
  },
};
