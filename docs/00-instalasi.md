# 📋 Panduan Instalasi & Setup

Panduan lengkap untuk menginstall dan menjalankan aplikasi Buku Kas Salon.

## 📋 System Requirements

### Minimum Requirements

- **OS**: Windows 10/11, macOS 10.15+, atau Linux
- **RAM**: 4 GB (8 GB recommended)
- **Storage**: 500 MB free space
- **Browser**: Chrome 90+, Firefox 88+, atau Edge 90+

### Software Prerequisites

- **Bun**: Version 1.0 atau lebih tinggi
  - Download: https://bun.sh/
- **Git**: Untuk clone repository (opsional)
  - Download: https://git-scm.com/

## 🚀 Instalasi Step by Step

### Step 1: Install Bun

#### Windows (PowerShell)

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

#### macOS/Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

Verifikasi instalasi:

```bash
bun --version
```

### Step 2: Download Project

#### Opsi A: Via Git Clone (Recommended)

```bash
git clone <repository-url>
cd buku-kas-svelte
```

#### Opsi B: Download ZIP

1. Download ZIP file dari repository
2. Extract ke folder yang diinginkan
3. Buka terminal/command prompt di folder tersebut

### Step 3: Install Dependencies

```bash
bun install
```

**Output yang diharapkan:**

```
bun install v1.x.x
Resolving dependencies
Resolved, downloaded and extracted [XX]
Packages installed [XXs]
```

### Step 4: Inisialisasi Database

Saat pertama kali menjalankan dev server, database akan otomatis dibuat:

```bash
bun run dev
```

**Output yang diharapkan:**

```
$ vite dev

  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

Default admin user created (username: admin, password: admin123)
```

### Step 5: Akses Aplikasi

1. Buka browser
2. Navigate to: `http://localhost:5173`
3. Anda akan diarahkan ke halaman login
4. Gunakan kredensial default:
   - **Username**: `admin`
   - **Password**: `admin123`

## ✅ Verifikasi Instalasi

Setelah login, pastikan semua menu berfungsi:

- [ ] Dashboard menampilkan statistik (awalnya semua 0)
- [ ] Bisa buka menu Pendapatan
- [ ] Bisa buka menu Pengeluaran
- [ ] Bisa buka menu Beban Operasional
- [ ] Bisa buka menu Beban Penyusutan
- [ ] Bisa buka menu Laporan
- [ ] Tombol Logout berfungsi

## 🔧 Konfigurasi Tambahan

### Mengubah Port Development Server

Edit `package.json`:

```json
{
  "scripts": {
    "dev": "vite dev --port 3000"
  }
}
```

Atau jalankan langsung:

```bash
bun run dev -- --port 3000
```

### Mengganti Password Default

**Cara Sementara** (sampai fitur change password tersedia):

1. Stop development server (Ctrl+C)
2. Buka `src/lib/server/database.ts`
3. Ubah bagian ini:

```typescript
const hashedPassword = hashSync("PASSWORD_BARU_ANDA", 10);
```

4. Hapus file `salon.db`
5. Jalankan ulang `bun run dev`
6. Login dengan password baru

## 🐛 Troubleshooting

### Error: "command not found: bun"

**Solusi:**

1. Pastikan Bun sudah terinstall: `bun --version`
2. Jika belum, install ulang Bun
3. Restart terminal setelah instalasi

### Error: "Cannot find module"

**Solusi:**

```bash
# Hapus node_modules
rm -rf node_modules

# Hapus lockfile
rm bun.lockb

# Install ulang
bun install
```

### Error: "Port 5173 already in use"

**Penyebab:** Port sudah digunakan aplikasi lain

**Solusi Opsi 1** - Gunakan port lain:

```bash
bun run dev -- --port 3000
```

**Solusi Opsi 2** - Kill process yang menggunakan port:

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5173 | xargs kill
```

### Error: "Database is locked"

**Penyebab:** Ada instance lain yang mengakses database

**Solusi:**

1. Stop semua development server yang running
2. Hapus file `salon.db-wal` dan `salon.db-shm` jika ada
3. Jalankan ulang `bun run dev`

### Error: "Failed to load ..."

**Solusi:**

```bash
# Clear cache
bun pm cache rm

# Install ulang
bun install

# Rebuild
bun run dev
```

### Halaman Blank / White Screen

**Solusi:**

1. Buka Developer Tools (F12)
2. Check Console untuk error messages
3. Pastikan JavaScript enabled di browser
4. Try hard refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)

### Login Tidak Berfungsi

**Checklist:**

- [ ] Username: `admin` (lowercase, no spaces)
- [ ] Password: `admin123` (case-sensitive)
- [ ] Database file `salon.db` ada di root folder
- [ ] Check browser console untuk error
- [ ] Coba clear localStorage dan refresh

## 📦 Production Build

### Build Aplikasi

```bash
bun run build
```

**Output:** Folder `build/` berisi file production-ready

### Preview Production Build

```bash
bun run preview
```

Aplikasi akan running di `http://localhost:4173`

## 🔄 Update Aplikasi

Ketika ada update aplikasi:

```bash
# Pull update (jika menggunakan Git)
git pull origin main

# Install dependencies baru (jika ada)
bun install

# Restart dev server
bun run dev
```

## 💾 Backup Database

**Penting!** Selalu backup database secara rutin.

### Manual Backup

```bash
# Copy file database
cp salon.db salon_backup_$(date +%Y%m%d).db
```

### Automated Backup (Cron Job - Linux/Mac)

```bash
# Buat script backup
cat > backup.sh << 'EOF'
#!/bin/bash
cp /path/to/salon.db /path/to/backup/salon_$(date +%Y%m%d).db
EOF

# Chmod
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add line:
0 2 * * * /path/to/backup.sh
```

### Automated Backup (Windows Task Scheduler)

1. Buat file `backup.bat`:

```batch
@echo off
copy C:\path\to\salon.db C:\path\to\backup\salon_%date:~-4,4%%date:~-10,2%%date:~-7,2%.db
```

2. Buka Task Scheduler
3. Create Task untuk run `backup.bat` daily

## 🚀 Deployment ke Production Server

### Opsi 1: VPS dengan Node.js

```bash
# Di server
git clone <repository-url>
cd buku-kas-svelte
bun install
bun run build

# Install PM2 untuk process management
bun add -g pm2

# Run dengan PM2
pm2 start "bun run preview" --name salon-app
pm2 startup
pm2 save
```

### Opsi 2: Vercel

1. Push code ke GitHub
2. Import repository di Vercel
3. Deploy otomatis
4. Set environment variables jika perlu

### Opsi 3: Netlify

1. Push code ke GitHub
2. Connect repository di Netlify
3. Build command: `bun run build`
4. Publish directory: `build`

## 📊 Data Sample (Untuk Testing)

Jika ingin test dengan data sample, bisa manual input via UI atau import SQL:

```sql
-- Contoh data pendapatan
INSERT INTO pendapatan (tanggal, kategori, deskripsi, jumlah) VALUES
('2025-12-01', 'Perawatan Rambut', 'Potong rambut pria', 50000),
('2025-12-01', 'Perawatan Wajah', 'Facial treatment', 150000),
('2025-12-02', 'Spa & Massage', 'Paket spa 2 jam', 350000);

-- Contoh data pengeluaran
INSERT INTO pengeluaran (tanggal, kategori, deskripsi, jumlah) VALUES
('2025-12-01', 'Pembelian Produk', '10 botol shampoo', 850000),
('2025-12-01', 'Gaji Karyawan', 'Gaji 3 stylist', 9000000);
```

## 📞 Support

Jika mengalami masalah:

1. Baca dokumentasi di folder `docs/`
2. Check section Troubleshooting di atas
3. Check GitHub Issues (jika ada repository public)
4. Contact developer

## ✨ Next Steps

Setelah instalasi berhasil:

1. ✅ Ganti password default
2. ✅ Input data transaksi pertama
3. ✅ Explore semua menu
4. ✅ Baca dokumentasi setiap menu di folder `docs/`
5. ✅ Setup backup routine
6. ✅ Deploy ke production (jika ready)

---

**Selamat! Aplikasi Buku Kas Salon Anda sudah siap digunakan! 💅✨**
