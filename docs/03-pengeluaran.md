# 💸 Pengeluaran - Dokumentasi

## Deskripsi

Menu Pengeluaran digunakan untuk mencatat semua biaya atau pengeluaran langsung yang terkait dengan operasional salon sehari-hari. Data ini penting untuk menghitung laba bersih dan mengontrol pengeluaran.

## Fitur Utama

### 1. Filter Berdasarkan Bulan

- Pilih bulan tertentu untuk melihat pengeluaran periode tersebut
- Default: bulan berjalan
- Total pengeluaran otomatis dihitung per bulan

### 2. Tambah Pengeluaran

Klik tombol **"➕ Tambah Pengeluaran"** untuk membuka form input dengan field:

- **Tanggal**: Tanggal transaksi pengeluaran
- **Kategori**: Jenis pengeluaran (dropdown)
- **Deskripsi**: Detail tambahan (opsional)
- **Jumlah**: Nominal dalam Rupiah

### 3. Kategori Pengeluaran

Aplikasi menyediakan kategori siap pakai:

- Pembelian Produk (shampoo, cat rambut, dll)
- Gaji Karyawan
- Utilitas (Listrik, Air)
- Sewa Tempat
- Peralatan & Perlengkapan
- Pemasaran & Promosi
- Lainnya

### 4. Tabel Data

- Menampilkan semua pengeluaran dalam bulan yang dipilih
- Kolom: No, Tanggal, Kategori, Deskripsi, Jumlah, Aksi
- Data diurutkan dari tanggal terbaru
- Jumlah ditampilkan dalam warna merah untuk menunjukkan pengeluaran

### 5. Hapus Data

- Setiap baris memiliki tombol **"🗑️ Hapus"**
- Konfirmasi diperlukan sebelum menghapus
- Data yang dihapus tidak bisa dikembalikan

## Cara Menggunakan

### Menambah Pengeluaran Baru

1. Klik tombol **"➕ Tambah Pengeluaran"**
2. **Pilih Tanggal** transaksi (default: hari ini)
3. **Pilih Kategori** dari dropdown
4. (Opsional) Isi **Deskripsi** untuk detail tambahan
   - Contoh: "Gaji karyawan Bulan November 2025"
5. Masukkan **Jumlah** dalam Rupiah
   - Gunakan angka tanpa titik/koma (contoh: 3000000)
6. Klik **"💾 Simpan"**
7. Modal akan tertutup dan data langsung muncul di tabel

### Melihat Data Bulan Tertentu

1. Gunakan input **"Filter Bulan"** di atas tabel
2. Pilih bulan dan tahun yang diinginkan
3. Halaman akan refresh dan menampilkan data bulan tersebut
4. Total pengeluaran akan otomatis dihitung

### Menghapus Data

1. Pada tabel, cari data yang ingin dihapus
2. Klik tombol **"🗑️ Hapus"** di kolom Aksi
3. Konfirmasi dengan klik **"OK"** pada popup
4. Data akan terhapus dan total otomatis diperbarui

## Perbedaan Pengeluaran vs Beban Operasional

### Pengeluaran (Menu Ini)

Biaya **langsung** terkait produksi/layanan:

- Pembelian bahan habis pakai (shampoo, cat, dll)
- Gaji karyawan yang langsung handling customer
- Pembelian peralatan untuk treatment

### Beban Operasional (Menu Terpisah)

Biaya **tidak langsung** untuk menjalankan bisnis:

- Listrik dan air
- Sewa gedung
- Administrasi
- Keamanan

## Best Practices

### ✅ DO (Lakukan)

- Catat pengeluaran **segera** setelah terjadi
- Simpan **bukti pembayaran** (nota/kwitansi) sebagai backup
- Kategorisasi dengan **tepat** untuk analisis yang akurat
- Review pengeluaran **bulanan** untuk kontrol budget

### ❌ DON'T (Hindari)

- Jangan campur antara Pengeluaran dengan Beban Operasional
- Hindari kategori "Lainnya" jika ada kategori lebih spesifik
- Jangan input pengeluaran pribadi yang tidak terkait salon

## Contoh Penggunaan

### Contoh 1: Pembelian Produk

```
Tanggal: 2025-12-06
Kategori: Pembelian Produk
Deskripsi: 10 botol shampoo + 5 botol conditioner
Jumlah: 850000
```

### Contoh 2: Gaji Karyawan

```
Tanggal: 2025-12-01
Kategori: Gaji Karyawan
Deskripsi: Gaji 3 stylist bulan November
Jumlah: 9000000
```

### Contoh 3: Peralatan

```
Tanggal: 2025-12-05
Kategori: Peralatan & Perlengkapan
Deskripsi: 2 hair dryer baru
Jumlah: 1200000
```

### Contoh 4: Promosi

```
Tanggal: 2025-12-03
Kategori: Pemasaran & Promosi
Deskripsi: Iklan Instagram Ads 1 bulan
Jumlah: 500000
```

## Tips Mengontrol Pengeluaran

### 1. Budget Planning

- Tetapkan budget maksimal per kategori setiap bulan
- Monitor apakah pengeluaran sesuai budget
- Contoh: Budget produk Rp 5jt/bulan

### 2. Analisis Tren

- Bandingkan pengeluaran bulan ini vs bulan lalu
- Identifikasi kategori yang membengkak
- Cari cara untuk efisiensi tanpa mengurangi kualitas

### 3. Prioritas Pengeluaran

- **Penting & Mendesak**: Gaji, produk habis
- **Penting Tidak Mendesak**: Peralatan baru
- **Tidak Penting**: Tunda atau batalkan

## Peringatan

⚠️ **PENTING**:

- Data yang sudah dihapus **TIDAK BISA** dikembalikan
- Pengeluaran berlebih akan mengurangi **Laba Bersih**
- Selalu **cek total pengeluaran** sebelum akhir bulan
- Pisahkan pengeluaran pribadi dengan bisnis

## Troubleshooting

**Q: Tombol "Simpan" tidak berfungsi?**
A: Pastikan semua field wajib (Tanggal, Kategori, Jumlah) sudah diisi. Jumlah harus lebih dari 0.

**Q: Kategori yang saya butuhkan tidak ada?**
A: Gunakan kategori "Lainnya" dan jelaskan di deskripsi. Atau hubungi admin untuk menambahkan kategori baru.

**Q: Salah input jumlah, bagaimana?**
A: Hapus data yang salah, kemudian input ulang dengan jumlah yang benar.

**Q: Kapan sebaiknya mencatat gaji karyawan?**
A: Idealnya di tanggal pembayaran gaji (contoh: setiap tanggal 1 atau 25).

**Q: Bagaimana dengan pengeluaran yang dibayar cicilan?**
A: Input setiap kali bayar cicilan, bukan total harga. Contoh: AC Rp 10jt, bayar 5x Rp 2jt → input 5 transaksi @ Rp 2jt.

## Integrasi dengan Menu Lain

- Data pengeluaran otomatis masuk ke **Dashboard**
- Muncul di **Laporan Laba & Rugi** sebagai "Pengeluaran Langsung"
- Mempengaruhi perhitungan **Laba Kotor** dan **Laba Bersih**

## Rumus Perhitungan

```
Laba Kotor = Total Pendapatan - Total Pengeluaran

Laba Bersih = Laba Kotor - Beban Operasional - Beban Penyusutan
```

## Rasio Keuangan yang Sehat

Untuk salon yang sehat:

- Pengeluaran sebaiknya **< 60%** dari pendapatan
- Contoh: Pendapatan Rp 20jt → Pengeluaran max Rp 12jt
- Sisanya untuk beban operasional dan profit
