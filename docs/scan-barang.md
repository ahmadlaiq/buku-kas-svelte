# Dokumentasi: Fitur PWA Scan Barang (Mobile)

## Ringkasan Perubahan
Aplikasi salon Anda kini memiliki halaman khusus untuk melakukan pemindaian (scan) barcode yang dioptimalkan untuk perangkat *mobile* (PWA) di route `/scan-barang`. Fitur ini difokuskan pada perlindungan fraud dengan validasi GPS dan pengalaman pengguna (UX) yang *clean* & *seamless* layaknya aplikasi *mobile native*.

## Fitur & Implementasi Utama

### 1. PWA Standalone & Mobile-First UI
- Halaman dibuat di `src/routes/scan-barang/+page.svelte`.
- Layout halaman tidak terikat pada kerangka utama `(app)`, sehingga bersih dari *sidebar/navbar desktop*, memberikan layar penuh yang lega saat dibuka di ponsel (terutama untuk mengakomodasi `safe-area-inset` pada iPhone).

### 2. Geolocation (Proteksi Fraud)
- Saat halaman `/scan-barang` pertama kali dimuat, sistem akan memanggil API GPS perangkat (`navigator.geolocation`).
- Jika karyawan **menolak** izin lokasi atau GPS mati, layar akan terkunci dengan menampilkan layar *Error/Locked* (gembok merah).
- Koordinat `latitude` dan `longitude` yang didapatkan akan dikirim ke server backend saat barcode berhasil dipindai.

### 3. Database Log yang Diperbarui
- Tabel `StockLog` pada Prisma schema telah kami tambahkan 2 field opsional: `latitude` dan `longitude`.
- Sekarang, setiap karyawan memindai barang, koordinat GPS saat transaksi dilakukan akan terekam ke dalam tabel histori, membantu mencegah manipulasi lokasi kerja.

### 4. Scanner Kamera Asli (html5-qrcode)
- Kamera perangkat langsung difungsikan lewat *library* modern (`html5-qrcode`). Kotak pemindai yang responsif ditempatkan proporsional di layar perangkat.
- Setelah berhasil membaca barcode, sistem akan men- *disable* sementara pemindaian selama **3 detik (delay)** untuk mencegah *double hit* / pembacaan beruntun pada satu produk yang sama.

### 5. Kontrol (Action Toggle & Quantity)
- Di atas panel kamera, disediakan kontrol `Tambah (+)` berwarna hijau dan `Kurang (-)` berwarna merah.
- Dilengkapi dengan *input* jumlah (Qty) yang akan digunakan saat memotong atau menambah stok dari barang yang di-scan.

### 6. Indikator Status Waktu Nyata
- Terdapat logger di bagian paling bawah layar. 
- Jika sukses, layar logger berubah hijau dan langsung memunculkan nama produk beserta pembaruan sisa stok yang ada.
- Jika ada *error* (seperti stok kurang), status akan berwarna merah lengkap dengan pesannya.

## Cara Menggunakan / Mengetes
Buka `http://localhost:5173/scan-barang` melalui *smartphone* atau menggunakan *Mobile View* di fitur Inspect browser Anda untuk merasakan pengalaman penuh *app* ini. Pastikan untuk "Allow/Izinkan" saat browser meminta izin akses Kamera dan Lokasi.
