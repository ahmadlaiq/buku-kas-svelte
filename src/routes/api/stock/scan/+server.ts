import { json } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    if (!locals.user) {
      return json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { barcode, action, qty = 1, latitude, longitude } = body;

    if (!barcode || !action) {
      return json({ success: false, message: "Barcode dan action wajib diisi" }, { status: 400 });
    }

    if (action !== "add" && action !== "reduce") {
      return json({ success: false, message: "Action harus 'add' atau 'reduce'" }, { status: 400 });
    }

    const quantity = Number(qty);
    if (isNaN(quantity) || quantity <= 0) {
      return json({ success: false, message: "Quantity tidak valid" }, { status: 400 });
    }

    // Cari barang berdasarkan barcode
    const barang = await prisma.masterMaterial.findUnique({
      where: { barcode, ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}) },
    });

    if (!barang) {
      return json({ success: false, message: "Barang dengan barcode tersebut tidak ditemukan" }, { status: 404 });
    }

    // Hitung stok baru
    let newStock = barang.stock;
    if (action === "add") {
      newStock += quantity;
    } else if (action === "reduce") {
      newStock -= quantity;
      if (newStock < 0) {
        return json({ success: false, message: "Stok tidak mencukupi" }, { status: 400 });
      }
    }

    const stockDiff = action === "add" ? quantity : -quantity;

    // Update stok
    const [updatedBarang, log] = await prisma.$transaction([
      prisma.masterMaterial.update({
        where: { id: barang.id },
        data: { stock: newStock },
      }),
      prisma.stockLog.create({
        data: {
          material_id: barang.id,
          jenis: action === "add" ? "IN" : "OUT",
          jumlah: stockDiff,
          stok_sebelum: barang.stock,
          stok_sesudah: newStock,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          keterangan: `Scan barcode via API`,
          ...(locals.user.tenant_id ? { tenant_id: locals.user.tenant_id } : {}),
          user_id: locals.user.id
        }
      })
    ]);

    return json({
      success: true,
      message: `Stok berhasil di${action === "add" ? "tambah" : "kurangi"}`,
      data: {
        id: updatedBarang.id,
        nama: updatedBarang.nama,
        stock: updatedBarang.stock,
      },
    });

  } catch (error) {
    console.error("Scan API Error:", error);
    return json({ success: false, message: "Terjadi kesalahan pada server" }, { status: 500 });
  }
};
