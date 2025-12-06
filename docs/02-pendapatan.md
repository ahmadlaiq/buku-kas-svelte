# 💰 Pendapatan - Dokumentasi

## Deskripsi

Menu Pendapatan digunakan untuk mencatat semua pemasukan atau pendapatan yang diterima salon. Data ini penting untuk menghitung laba dan memantau performa bisnis.

## Fitur Utama

### 1. Filter Berdasarkan Bulan

- Pilih bulan tertentu untuk melihat pendapatan periode tersebut
- Default: bulan berjalan
- Total pendapatan otomatis dihitung per bulan

### 2. Tambah Pendapatan

Klik tombol **"➕ Tambah Pendapatan"** untuk membuka form input dengan field:

- **Tanggal**: Tanggal transaksi pendapatan
- **Kategori**: Jenis layanan/produk (dropdown)
- **Deskripsi**: Detail tambahan (opsional)
- **Jumlah**: Nominal dalam Rupiah

### 3. Kategori Pendapatan

Aplikasi menyediakan kategori siap pakai:

- Perawatan Rambut
- Perawatan Wajah
- Perawatan Kuku
- Spa & Massage
- Make Up
- Penjualan Produk
- Lainnya

### 4. Tabel Data

- Menampilkan semua pendapatan dalam bulan yang dipilih
- Kolom: No, Tanggal, Kategori, Deskripsi, Jumlah, Aksi
- Data diurutkan dari tanggal terbaru

### 5. Hapus Data

- Setiap baris memiliki tombol **"🗑️ Hapus"**
- Konfirmasi diperlukan sebelum menghapus
- Data yang dihapus tidak bisa dikembalikan

## Cara Menggunakan

### Menambah Pendapatan Baru

1. Klik tombol **"➕ Tambah Pendapatan"**
2. **Pilih Tanggal** transaksi (default: hari ini)
3. **Pilih Kategori** dari dropdown
4. (Opsional) Isi **Deskripsi** untuk detail tambahan
   - Contoh: "Potong rambut + creambath - Bu Siti"
5. Masukkan **Jumlah** dalam Rupiah
   - Gunakan angka tanpa titik/koma (contoh: 150000)
6. Klik **"💾 Simpan"**
7. Modal akan tertutup dan data langsung muncul di tabel

### Melihat Data Bulan Tertentu

1. Gunakan input **"Filter Bulan"** di atas tabel
2. Pilih bulan dan tahun yang diinginkan
3. Halaman akan refresh dan menampilkan data bulan tersebut
4. Total pendapatan akan otomatis dihitung

### Menghapus Data

1. Pada tabel, cari data yang ingin dihapus
2. Klik tombol **"🗑️ Hapus"** di kolom Aksi
3. Konfirmasi dengan klik **"OK"** pada popup
4. Data akan terhapus dan total otomatis diperbarui

## Best Practices

### ✅ DO (Lakukan)

- Catat pendapatan **segera setelah transaksi** terjadi
- Gunakan **kategori yang tepat** agar laporan akurat
- Isi **deskripsi** untuk transaksi yang perlu detail (nama pelanggan, jenis service spesifik)
- **Review bulanan** untuk memastikan tidak ada transaksi yang terlewat

### ❌ DON'T (Hindari)

- Jangan input pendapatan di bulan yang salah
- Jangan menghapus data tanpa konfirmasi terlebih dahulu
- Hindari kategori "Lainnya" jika ada kategori yang lebih spesifik

## Contoh Penggunaan

### Contoh 1: Catat Layanan Potong Rambut

```
Tanggal: 2025-12-06
Kategori: Perawatan Rambut
Deskripsi: Potong rambut pria - Pak Budi
Jumlah: 50000
```

### Contoh 2: Catat Paket Lengkap

```
Tanggal: 2025-12-06
Kategori: Spa & Massage
Deskripsi: Paket spa lengkap 2 jam - Bu Ani
Jumlah: 350000
```

### Contoh 3: Penjualan Produk

```
Tanggal: 2025-12-06
Kategori: Penjualan Produk
Deskripsi: 2 botol shampoo premium
Jumlah: 180000
```

## Tips & Trik

### Meningkatkan Akurasi Data

1. **Catat Detail di Deskripsi**: Masukkan nama pelanggan atau detail layanan untuk tracking yang lebih baik
2. **Gunakan Tanggal yang Tepat**: Jangan semua transaksi diisi tanggal hari ini jika transaksi terjadi di hari berbeda
3. **Kategorisasi Konsisten**: Selalu gunakan kategori yang sama untuk layanan yang sama

### Analisis Pendapatan

- Filter per bulan untuk membandingkan performa bulanan
- Perhatikan kategori mana yang paling menguntungkan
- Gunakan data ini untuk strategi marketing dan promosi

## Peringatan

⚠️ **PENTING**:

- Data yang sudah dihapus **TIDAK BISA** dikembalikan
- Pastikan data yang diinput **SUDAH BENAR** sebelum menyimpan
- Total pendapatan akan mempengaruhi **Laporan Laba Rugi**

## Troubleshooting

**Q: Tombol "Simpan" tidak berfungsi?**
A: Pastikan semua field wajib (Tanggal, Kategori, Jumlah) sudah diisi. Jumlah harus lebih dari 0.

**Q: Data tidak muncul setelah disimpan?**
A: Periksa filter bulan, pastikan sesuai dengan tanggal transaksi yang diinput.

**Q: Total pendapatan salah?**
A: Refresh halaman (F5) atau periksa kembali semua data yang tercatat.

**Q: Bagaimana cara edit data?**
A: Saat ini tidak ada fitur edit. Hapus data lama dan input ulang dengan data yang benar.

## Integrasi dengan Menu Lain

- Data pendapatan otomatis masuk ke **Dashboard**
- Muncul di **Laporan Laba & Rugi** per periode
- Mempengaruhi perhitungan **Laba Bersih**
