import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenant_id = locals.user.tenant_id;
  const user_id = locals.user.id;
  
  if (!tenant_id) {
    return json({ error: 'User tidak memiliki akses ke tenant' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { customer_id, payment_method, total_bayar, uang_diterima, kembalian, items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return json({ error: 'Keranjang belanja kosong' }, { status: 400 });
    }

    // Gunakan database transaction agar data konsisten (semua sukses atau gagal semua)
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ambil nama customer (jika ada)
      let customerName = 'Guest/Walk-in';
      if (customer_id) {
        const cust = await tx.customer.findUnique({ where: { id: parseInt(customer_id) } });
        if (cust) customerName = cust.nama;
      }

      // 2. Kumpulkan detail item untuk ditaruh di deskripsi
      const deskripsiItems: string[] = [];
      
      for (const item of items) {
        let namaItem = '';
        const materialId = parseInt(item.item_id);
        
        // Cek data material di database
        const material = await tx.masterMaterial.findUnique({
          where: { id: materialId }
        });

        if (!material) throw new Error(`Material ID ${item.item_id} tidak ditemukan`);
        namaItem = material.nama;

        let detailStr = `${item.qty}x ${namaItem}`;
        
        if (item.type === 'JASA' && item.karyawan_id) {
          const karyawan = await tx.karyawan.findUnique({ where: { id: parseInt(item.karyawan_id) } });
          if (karyawan) {
            detailStr += ` (Stylist: ${karyawan.nama})`;
          }
        }
        
        deskripsiItems.push(detailStr);

        // 3. Jika PRODUK, potong stok dan catat log
        if (item.type === 'PRODUCT') {
          if (material.stock < item.qty) {
            throw new Error(`Stok ${namaItem} tidak mencukupi (Sisa: ${material.stock})`);
          }

          await tx.masterMaterial.update({
            where: { id: materialId },
            data: { stock: { decrement: item.qty } }
          });

          await tx.stockLog.create({
            data: {
              material_id: materialId,
              jenis: 'OUT',
              jumlah: -item.qty,
              stok_sebelum: material.stock,
              stok_sesudah: material.stock - item.qty,
              keterangan: 'Penjualan via POS Kasir',
              tenant_id,
              user_id
            }
          });
        }
      }

      // 4. Masukkan ke Pendapatan
      const deskripsiLengkap = `Transaksi ${payment_method} - Pelanggan: ${customerName}. Item: ${deskripsiItems.join(', ')}. Uang Diterima: ${uang_diterima}, Kembalian: ${kembalian}`;
      
      const pendapatan = await tx.pendapatan.create({
        data: {
          tanggal: new Date(),
          deskripsi: deskripsiLengkap,
          jumlah: parseFloat(total_bayar),
          tenant_id,
          user_id,
          details: {
            create: items.map((item: any) => ({
              material_id: parseInt(item.item_id),
              karyawan_id: item.karyawan_id ? parseInt(item.karyawan_id) : null,
              qty: parseInt(item.qty),
              harga_satuan: parseFloat(item.price),
              subtotal: parseFloat(item.price) * parseInt(item.qty)
            }))
          }
        }
      });

      return {
        id: pendapatan.id,
        total_bayar,
        payment_method,
        uang_diterima,
        kembalian
      };
    });

    return json({ success: true, data: result });
  } catch (error: any) {
    console.error('POS Checkout Error:', error);
    return json({ error: error.message || 'Terjadi kesalahan internal server' }, { status: 500 });
  }
};
