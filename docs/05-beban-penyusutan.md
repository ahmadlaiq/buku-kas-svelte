# 📉 Beban Penyusutan - Dokumentasi

## Deskripsi

Menu Beban Penyusutan digunakan untuk mencatat penyusutan nilai aset salon dari waktu ke waktu. Penyusutan adalah konsep akuntansi yang mengakui bahwa aset seperti peralatan, furniture, dan kendaraan akan mengalami penurunan nilai seiring penggunaan. Aplikasi ini menggunakan **metode garis lurus** untuk perhitungan otomatis.

## Apa itu Penyusutan?

**Penyusutan** adalah alokasi biaya pembelian aset jangka panjang selama masa manfaatnya.

**Contoh:**

- Kursi salon dibeli Rp 10.000.000
- Estimasi bisa dipakai 5 tahun
- Penyusutan per bulan = Rp 10.000.000 ÷ (5 tahun × 12 bulan) = **Rp 166.667/bulan**

## Fitur Utama

### 1. Filter Berdasarkan Bulan

- Pilih bulan tertentu untuk melihat beban penyusutan periode tersebut
- Default: bulan berjalan
- Total beban penyusutan otomatis dihitung per bulan

### 2. Tambah Beban Penyusutan

Klik tombol **"➕ Tambah Beban Penyusutan"** untuk membuka form input dengan field:

- **Tanggal**: Tanggal mulai mencatat penyusutan
- **Nama Aset**: Nama/jenis aset yang disusutkan
- **Nilai Aset (Rp)**: Harga pembelian aset
- **Umur Ekonomis (Tahun)**: Estimasi masa pakai dalam tahun
- **Nilai Penyusutan/Bulan**: **Dihitung otomatis** oleh sistem

### 3. Perhitungan Otomatis

Sistem akan **otomatis menghitung** nilai penyusutan per bulan menggunakan rumus:

```
Penyusutan/Bulan = Nilai Aset ÷ (Umur Ekonomis × 12)
```

**Preview** nilai penyusutan muncul di form sebelum disimpan.

### 4. Tabel Data

- Menampilkan semua aset yang disusutkan
- Kolom: No, Tanggal, Nama Aset, Nilai Aset, Umur (Tahun), Penyusutan/Bulan, Aksi
- Data diurutkan dari tanggal terbaru

### 5. Hapus Data

- Setiap baris memiliki tombol **"🗑️ Hapus"**
- Konfirmasi diperlukan sebelum menghapus
- Data yang dihapus tidak bisa dikembalikan

## Cara Menggunakan

### Menambah Beban Penyusutan Baru

1. Klik tombol **"➕ Tambah Beban Penyusutan"**
2. **Pilih Tanggal** (biasanya tanggal pembelian atau tanggal mulai pakai)
3. Isi **Nama Aset**
   - Contoh: "Kursi Salon Set 10 unit", "Hair Dryer Professional"
4. Masukkan **Nilai Aset** (harga pembelian)
   - Contoh: 10000000 (untuk Rp 10 juta)
5. Tentukan **Umur Ekonomis** dalam tahun
   - Lihat tabel panduan di bawah untuk estimasi
6. **Perhatikan preview** nilai penyusutan yang muncul otomatis
7. Klik **"💾 Simpan"**
8. Data akan langsung muncul di tabel

### Melihat Data Bulan Tertentu

1. Gunakan input **"Filter Bulan"**
2. Pilih bulan dan tahun
3. Total penyusutan bulan tersebut otomatis dihitung

### Menghapus Data

1. Klik tombol **"🗑️ Hapus"** pada data yang ingin dihapus
2. Konfirmasi dengan klik **"OK"**
3. Data akan terhapus

## Panduan Umur Ekonomis Aset

| Jenis Aset             | Estimasi Umur Ekonomis |
| ---------------------- | ---------------------- |
| Kursi Salon            | 5-8 tahun              |
| Hair Dryer             | 3-5 tahun              |
| Alat Cukur Profesional | 3-5 tahun              |
| AC                     | 5-10 tahun             |
| Meja & Lemari          | 5-10 tahun             |
| Etalase Kaca           | 8-10 tahun             |
| Kendaraan Operasional  | 5-8 tahun              |
| Komputer/Kasir         | 3-5 tahun              |
| CCTV                   | 5 tahun                |
| Sound System           | 5 tahun                |

**Note**: Umur ekonomis adalah estimasi, sesuaikan dengan kualitas dan intensitas penggunaan.

## Contoh Penggunaan

### Contoh 1: Kursi Salon Baru

```
Tanggal: 2025-12-01
Nama Aset: Set Kursi Salon Complete (10 unit)
Nilai Aset: 25000000
Umur Ekonomis: 8 tahun

→ Penyusutan/Bulan = 25.000.000 ÷ (8 × 12) = Rp 260.417/bulan
```

### Contoh 2: Alat Cukur Profesional

```
Tanggal: 2025-12-05
Nama Aset: Clipper Wahl Professional (5 unit)
Nilai Aset: 5000000
Umur Ekonomis: 5 tahun

→ Penyusutan/Bulan = 5.000.000 ÷ (5 × 12) = Rp 83.333/bulan
```

### Contoh 3: AC Untuk Salon

```
Tanggal: 2025-11-20
Nama Aset: AC 2 PK (3 unit)
Nilai Aset: 18000000
Umur Ekonomis: 10 tahun

→ Penyusutan/Bulan = 18.000.000 ÷ (10 × 12) = Rp 150.000/bulan
```

## Best Practices

### ✅ DO (Lakukan)

- Catat **semua aset bernilai signifikan** (>Rp 1 juta)
- Gunakan **nama aset yang jelas** dan spesifik
- Estimasi umur ekonomis **realistis**, jangan terlalu optimis atau pesimis
- **Review tahunan** apakah estimasi umur masih sesuai
- Input penyusutan **di bulan pembelian** aset

### ❌ DON'T (Hindari)

- Jangan input barang habis pakai (shampoo, cat rambut) → itu masuk **Pengeluaran**
- Jangan input aset dengan nilai kecil (<Rp 500rb) → langsung bebankan saat beli
- Hindari nilai aset atau umur ekonomis = 0

## Metode Penyusutan: Garis Lurus

### Definisi

Metode yang **paling sederhana** dan **paling umum** digunakan, di mana nilai aset disusutkan dengan **jumlah yang sama** setiap periode.

### Karakteristik

- ✅ **Simple**: Mudah dihitung dan dipahami
- ✅ **Konsisten**: Beban penyusutan sama setiap bulan
- ✅ **Sesuai untuk**: Aset yang tingkat keausan relatif stabil

### Rumus

```
Penyusutan per Bulan = Nilai Aset ÷ (Umur Ekonomis dalam Tahun × 12 Bulan)
```

### Contoh Perhitungan Manual

**Aset**: Hair Dryer seharga Rp 3.000.000  
**Umur Ekonomis**: 3 tahun = 36 bulan

```
Penyusutan per Bulan = 3.000.000 ÷ 36 = Rp 83.333
```

**Tabel Penyusutan 3 Tahun:**
| Bulan | Nilai Buku Awal | Penyusutan | Nilai Buku Akhir |
|-------|----------------|------------|------------------|
| 1 | 3.000.000 | 83.333 | 2.916.667 |
| 2 | 2.916.667 | 83.333 | 2.833.334 |
| ... | ... | ... | ... |
| 36 | 83.333 | 83.333 | 0 |

## Kapan Mulai Mencatat Penyusutan?

### Opsi 1: Bulan Pembelian (Recommended)

- Lebih akurat
- Mencerminkan biaya dari awal
- **Contoh**: Beli kursi tanggal 15 Desember → Input penyusutan di Desember

### Opsi 2: Bulan Berikutnya

- Jika beli di akhir bulan (tanggal 25-31)
- **Contoh**: Beli tanggal 30 Desember → Input penyusutan mulai Januari

## Perbedaan dengan Menu Lain

| Aspek          | Pengeluaran           | Beban Penyusutan                         |
| -------------- | --------------------- | ---------------------------------------- |
| **Pembayaran** | Sekali bayar lunas    | Dialokasikan bertahap                    |
| **Periode**    | 1 kali input          | Input tiap bulan (otomatis via data ini) |
| **Contoh**     | Beli shampoo Rp 500rb | Beli kursi Rp 10jt (disusutkan 5 tahun)  |

## Peringatan

⚠️ **PENTING**:

- Penyusutan adalah **biaya non-kas** (uang tidak keluar setiap bulan, tapi biaya tetap dicatat)
- **Jangan duplikat**: Jika sudah input penyusutan untuk aset tertentu, tidak perlu input lagi di bulan berikutnya untuk aset yang sama (kecuali beli aset baru)
- Data yang dihapus **TIDAK BISA** dikembalikan

## FAQ

**Q: Apakah harus input penyusutan setiap bulan?**
A: **Tidak**. Anda cukup input **sekali saat membeli aset**. Sistem akan menghitung penyusutannya. Untuk bulan berikutnya, datatersebut masih tercatat jika Anda filter bulan yang sama.

**Q: Aset sudah ≥ umur ekonomis, harus dihapus?**
A: Ya, jika aset sudah habis umur ekonomisnya (nilai buku = 0), Anda bisa hapus atau biarkan untuk historical record.

**Q: Aset dijual sebelum habis umur ekonomis?**
A: Hapus data penyusutan aset tersebut. Jika ada untung/rugi dari penjualan, catat di Pendapatan (untung) atau Pengeluaran (rugi).

**Q: Apakah penyusutan mempengaruhi kas?**
A: **Tidak**. Penyusutan adalah **biaya non-kas**. Kas keluar saat **beli aset**, bukan saat penyusutan.

## Integrasi dengan Menu Lain

- Data beban penyusutan otomatis masuk ke **Dashboard**
- Muncul di **Laporan Laba & Rugi**
- Mempengaruhi perhitungan **Laba Bersih**

## Rumus Laporan Keuangan

```
Laba Operasional = Laba Kotor - Beban Operasional

Laba Bersih = Laba Operasional - Beban Penyusutan
```
