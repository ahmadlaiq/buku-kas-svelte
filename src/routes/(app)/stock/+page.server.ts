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
  editStock: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: "Unauthorized" });
    const data = await request.formData();
    const id = Number(data.get("id"));
    const new_stock = Number(data.get("new_stock"));
    const keterangan = data.get("keterangan")?.toString() || "Penyesuaian stok";

    if (!id || isNaN(new_stock) || new_stock < 0) {
      return fail(400, { message: "Jumlah stok tidak valid (minimal 0)" });
    }

    try {
      const existing = await prisma.masterMaterial.findUnique({ where: { id, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) } });
      if (!existing) return fail(404, { message: "Barang tidak ditemukan" });

      const diff = new_stock - existing.stock;
      if (diff === 0) {
        return { success: true, message: "Tidak ada perubahan pada stok" };
      }

      const txOps: any[] = [];

      if (diff > 0) {
        // Penambahan stok: buat batch baru
        txOps.push(
          prisma.materialBatch.create({
            data: {
              material_id: id,
              stock: diff,
              // expired_at dibiarkan kosong karena ini penyesuaian umum
            }
          })
        );
      } else {
        // Pengurangan stok: potong dari batch yang ada (FEFO)
        const jumlahDeduct = Math.abs(diff);
        const batches = await prisma.materialBatch.findMany({
          where: { material_id: id, stock: { gt: 0 } },
        });

        batches.sort((a, b) => {
          if (a.expired_at && b.expired_at) return a.expired_at.getTime() - b.expired_at.getTime();
          if (a.expired_at && !b.expired_at) return -1;
          if (!a.expired_at && b.expired_at) return 1;
          return a.created_at.getTime() - b.created_at.getTime();
        });

        let remainingToDeduct = jumlahDeduct;
        for (const batch of batches) {
          if (remainingToDeduct <= 0) break;
          const deductAmount = Math.min(batch.stock, remainingToDeduct);
          txOps.push(
            prisma.materialBatch.update({
              where: { id: batch.id },
              data: { stock: batch.stock - deductAmount }
            })
          );
          remainingToDeduct -= deductAmount;
        }
      }

      // Update total stok di material master
      txOps.push(
        prisma.masterMaterial.update({
          where: { id },
          data: { stock: new_stock },
        })
      );

      // Catat log
      txOps.push(
        prisma.stockLog.create({
          data: {
            material_id: id,
            jenis: diff > 0 ? "ADJUST_IN" : "ADJUST_OUT",
            jumlah: diff,
            stok_sebelum: existing.stock,
            stok_sesudah: new_stock,
            keterangan: keterangan,
            ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
            user_id: locals.user.id
          }
        })
      );

      await prisma.$transaction(txOps);
      return { success: true, message: "Penyesuaian stok berhasil disimpan" };
    } catch (error) {
      console.error("Error adjusting stock:", error);
      return fail(500, { message: "Gagal menyesuaikan stok" });
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

        // FEFO Logic (First Expire First Out)
        const batches = await prisma.materialBatch.findMany({
          where: { material_id: id, stock: { gt: 0 } },
        });

        // Sort in memory: non-null expired_at first (ascending), then nulls, then created_at (FIFO)
        batches.sort((a, b) => {
          if (a.expired_at && b.expired_at) return a.expired_at.getTime() - b.expired_at.getTime();
          if (a.expired_at && !b.expired_at) return -1;
          if (!a.expired_at && b.expired_at) return 1;
          return a.created_at.getTime() - b.created_at.getTime();
        });

        let remainingToDeduct = jumlah;
        for (const batch of batches) {
          if (remainingToDeduct <= 0) break;
          const deductAmount = Math.min(batch.stock, remainingToDeduct);
          
          txOps.push(
            prisma.materialBatch.update({
              where: { id: batch.id },
              data: { stock: batch.stock - deductAmount }
            })
          );
          remainingToDeduct -= deductAmount;
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
