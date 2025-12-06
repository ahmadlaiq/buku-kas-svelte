# 📈 Laporan Laba & Rugi - Dokumentasi

## Deskripsi

Menu Laporan Laba & Rugi menyajikan ringkasan lengkap kinerja keuangan salon dalam periode tertentu. Laporan ini menunjukkan berapa pendapatan, biaya-biaya yang dikeluarkan, dan hasil akhir (laba atau rugi) secara terstruktur dan profesional. Laporan ini adalah **output utama** dari semua data yang Anda input di menu lain.

## Manfaat Laporan Laba & Rugi

### 1. Evaluasi Kinerja

- Apakah salon untung atau rugi?
- Berapa besar keuntungan/kerugian?
- Tren performa dari bulan ke bulan

### 2. Pengambilan Keputusan

- Perlu menaikkan harga layanan?
- Biaya mana yang perlu dikurangi?
- Layanan mana yang paling menguntungkan?

### 3. Perencanaan Keuangan

- Proyeksi pendapatan bulan depan
- Budget pengeluaran yang realistis
- Target laba yang ingin dicapai

### 4. Dokumentasi & Compliance

- Arsip keuangan untuk pajak
- Bukti untuk investor/mitra
- Laporan untuk pemilik/stakeholder

## Fitur Utama

### 1. Filter Periode

- Pilih bulan dan tahun yang ingin dilihat
- Default: bulan berjalan
- Bisa lihat historical data bulan sebelumnya

### 2. Struktur Laporan Lengkap

Laporan dibagi menjadi beberapa bagian:

#### A. **PENDAPATAN**

- Detail per kategori pendapatan
- Total pendapatan periode

#### B. **PENGELUARAN LANGSUNG**

- Detail per kategori pengeluaran
- Total pengeluaran periode

#### C. **LABA KOTOR**

```
Laba Kotor = Total Pendapatan - Total Pengeluaran
```

Menunjukkan profit sebelum beban operasional dan penyusutan

#### D. **BEBAN OPERASIONAL**

- Detail per kategori beban operasional
- Total beban operasional periode

#### E. **BEBAN PENYUSUTAN**

- Detail per aset
- Total penyusutan periode

#### F. **TOTAL BIAYA**

```
Total Biaya = Pengeluaran + Beban Operasional + Beban Penyusutan
```

#### G. **LABA (RUGI) BERSIH** ⭐

```
Laba Bersih = Total Pendapatan - Total Biaya
```

**Ini adalah angka paling penting** yang menunjukkan hasil akhir bisnis Anda!

### 3. Tombol Cetak Laporan

- Klik **"🖨️ Cetak Laporan"** untuk print atau save as PDF
- Layout otomatis disesuaikan untuk cetak
- Header salon otomatis muncul

### 4. Kartu Ringkasan (Summary Cards)

Di bawah laporan, ada 4 kartu ringkasan:

- 💰 Total Pendapatan
- 💸 Total Biaya
- 📊 Laba Kotor
- 📈 Laba Bersih (dengan indikator untung/rugi)

## Cara Menggunakan

### Melihat Laporan Bulan Berjalan

1. Buka menu **"📈 Laporan Laba & Rugi"**
2. Laporan bulan berjalan otomatis ditampilkan
3. Scroll untuk melihat semua section
4. Perhatikan **Laba (Rugi) Bersih** di bagian paling bawah

### Melihat Laporan Bulan Lain

1. Gunakan **"Filter Bulan"** di bagian atas
2. Pilih bulan dan tahun yang diinginkan
3. Klik atau tekan Enter
4. Halaman akan reload dengan data bulan tersebut

### Mencetak Laporan

1. Klik tombol **"🖨️ Cetak Laporan"**
2. Dialog print browser akan muncul
3. Pilih:
   - **Print**: Untuk langsung cetak ke printer
   - **Save as PDF**: Untuk simpan sebagai file PDF
4. Klik **"Print"** atau **"Save"**

### Membaca Laporan

#### Interpretasi Warna

- **Hijau**: Pendapatan atau laba (positif)
- **Merah**: Pengeluaran, biaya, atau rugi (negatif)

#### Interpretasi Angka

- **Laba Bersih > 0**: Salon Anda **UNTUNG** ✅
- **Laba Bersih < 0**: Salon Anda **RUGI** ⚠️
- **Laba Bersih = 0**: **Break Even** (tidak untung tidak rugi)

## Struktur Detail Laporan

### Format Laporan Standar

```
💅 BUKU KAS SALON
LAPORAN LABA RUGI
Periode: [Nama Bulan Tahun]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PENDAPATAN
  Perawatan Rambut          Rp  5.000.000
  Perawatan Wajah           Rp  3.500.000
  Spa & Massage             Rp  4.000.000
  ---------------------------------------
  Total Pendapatan          Rp 12.500.000

PENGELUARAN LANGSUNG
  Pembelian Produk          Rp  2.000.000
  Gaji Karyawan             Rp  4.000.000
  ---------------------------------------
  Total Pengeluaran         Rp  6.000.000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LABA KOTOR                  Rp  6.500.000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEBAN OPERASIONAL
  Utilitas (Listrik, Air)   Rp    800.000
  Komunikasi                Rp    500.000
  Kebersihan                Rp    400.000
  ---------------------------------------
  Total Beban Operasional   Rp  1.700.000

BEBAN PENYUSUTAN
  Kursi Salon Set           Rp    250.000
  Hair Dryer Professional   Rp     83.333
  ---------------------------------------
  Total Beban Penyusutan    Rp    333.333

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL BIAYA                 Rp  8.033.333
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LABA (RUGI) BERSIH         Rp  4.466.667
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dicetak pada: [Tanggal & Waktu]
```

## Analisis Laporan

### 1. Analisis Profitabilitas

#### Margin Laba Kotor

```
Margin Laba Kotor = (Laba Kotor ÷ Total Pendapatan) × 100%
```

**Benchmark Salon:**

- **Excellent**: > 60%
- **Good**: 50-60%
- **Average**: 40-50%
- **Poor**: < 40%

**Contoh:**

- Pendapatan: Rp 12.500.000
- Laba Kotor: Rp 6.500.000
- Margin = (6.500.000 ÷ 12.500.000) × 100% = **52%** ✅ Good!

#### Margin Laba Bersih

```
Margin Laba Bersih = (Laba Bersih ÷ Total Pendapatan) × 100%
```

**Benchmark Salon:**

- **Excellent**: > 30%
- **Good**: 20-30%
- **Average**: 10-20%
- **Poor**: < 10%

**Contoh:**

- Pendapatan: Rp 12.500.000
- Laba Bersih: Rp 4.466.667
- Margin = (4.466.667 ÷ 12.500.000) × 100% = **35.7%** ✅ Excellent!

### 2. Analisis Struktur Biaya

Persentase ideal dari pendapatan:
| Komponen | Persentase Ideal |
|----------|------------------|
| **Pengeluaran Langsung** | 40-50% |
| **Beban Operasional** | 15-25% |
| **Beban Penyusutan** | 2-5% |
| **Laba Bersih (Target)** | 20-35% |
| **Total** | 100% |

**Contoh Perhitungan:**
Pendapatan Rp 12.500.000

- Pengeluaran: Rp 6.000.000 (48%) ✅
- Beban Operasional: Rp 1.700.000 (13.6%) ✅
- Beban Penyusutan: Rp 333.333 (2.7%) ✅
- Laba Bersih: Rp 4.466.667 (35.7%) ✅

Semua dalam range ideal!

### 3. Identifikasi Masalah

#### Skenario 1: Laba Bersih Negatif (Rugi)

**Langkah Diagnosis:**

1. Cek Margin Laba Kotor
   - Jika < 40% → **Masalah di pendapatan atau pengeluaran langsung**
   - Solusi: Naikkan harga atau kurangi pengeluaran langsung
2. Cek Beban Operasional

   - Jika > 25% → **Beban operasional terlalu tinggi**
   - Solusi: Identifikasi beban yang bisa dikurangi

3. Cek Volume Pendapatan
   - Jika terlalu rendah → **Masalah marketing/penjualan**
   - Solusi: Tingkatkan promosi, tambah jam operasional

#### Skenario 2: Laba Menurun dari Bulan Lalu

**Langkah Diagnosis:**

1. Bandingkan pendapatan bulan ini vs bulan lalu
   - Turun? → Analisis kenapa customer berkurang
2. Bandingkan setiap kategori biaya
   - Mana yang naik signifikan? → Investigasi penyebabnya
3. Lihat rasio biaya terhadap pendapatan
   - Apakah efisiensi menurun?

## Best Practices

### ✅ DO (Lakukan)

1. **Review Rutin**

   - Review laporan **setiap akhir bulan**
   - Bandingkan dengan bulan sebelumnya
   - Identifikasi tren dan pola

2. **Catat Insight**

   - Buat catatan tentang kejadian spesial di bulan tersebut
   - Contoh: "Desember: Pendapatan naik 30% karena event Natal"

3. **Set Target**

   - Tentukan target laba bersih bulanan
   - Monitor progres mencapai target

4. **Arsip Laporan**

   - Cetak/save PDF laporan setiap bulan
   - Simpan untuk keperluan pajak atau audit

5. **Share dengan Stakeholder**
   - Bagikan ke pemilik/investor
   - Diskusikan strategi berdasarkan laporan

### ❌ DON'T (Hindari)

1. Jangan abaikan angka rugi
2. Jangan bandingkan salon Anda dengan salon lain tanpa konteks
3. Jangan fokus hanya di pendapatan, perhatikan juga efisiensi biaya
4. Jangan buat keputusan besar tanpa melihat laporan minimal 3 bulan

## Tips Presentasi Laporan

### Untuk Pemilik/Investor

```
Ringkasan Eksekutif Bulan Desember 2025:

✅ Pendapatan: Rp 12.500.000 (↑ 15% vs Nov)
✅ Laba Bersih: Rp 4.466.667 (Margin: 35.7%)
⚠️ Beban Operasional: Naik 10% (perlu evaluasi)

Rekomendasi:
1. Pertahankan strategi marketing yang meningkatkan pendapatan
2. Review kontrak listrik untuk efisiensi biaya
3. Target Januari: Rp 13jt pendapatan, 36% margin
```

## Troubleshooting

**Q: Angka tidak sesuai yang saya harapkan?**
A: Double check semua input di menu Pendapatan, Pengeluaran, Beban Operasional, dan Beban Penyusutan. Pastikan tidak ada yang terlewat atau salah kategori.

**Q: Laporan tidak bisa dicetak?**
A: Pastikan browser Anda mengizinkan popup untuk print dialog. Cek juga driver printer sudah terinstall.

**Q: Ingin export ke Excel?**
A: Saat ini belum tersedia. Rekomendasi: Print to PDF, lalu manual input key numbers ke Excel jika diperlukan.

**Q: Bagaimana membandingkan 2 bulan sekaligus?**
A: Cetak laporan masing-masing bulan, lalu bandingkan secara manual. Atau catat key metrics di Excel pribadi.

## Rumus Lengkap

```
Total Pendapatan = Σ Semua Pendapatan

Total Pengeluaran = Σ Semua Pengeluaran

Laba Kotor = Total Pendapatan - Total Pengeluaran

Total Beban Operasional = Σ Semua Beban Operasional

Total Beban Penyusutan = Σ Semua Beban Penyusutan

Total Biaya = Total Pengeluaran + Total Beban Operasional + Total Beban Penyusutan

Laba Bersih = Total Pendapatan - Total Biaya
```

## Checklist Akhir Bulan

Sebelum review laporan akhir bulan, pastikan:

- [ ] Semua transaksi pendapatan sudah dicatat
- [ ] Semua pengeluaran sudah dicatat (termasuk yang tunai)
- [ ] Tagihan bulanan (listrik, internet, dll) sudah diinput di Beban Operasional
- [ ] Gaji karyawan bulan ini sudah dicatat
- [ ] Penyusutan aset baru (jika ada) sudah diinput
- [ ] Data di setiap menu sudah di-cross-check

Setelah semua checklist ✅, baru review Laporan Laba & Rugi untuk hasil yang akurat!
