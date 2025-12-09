# Setup SQLite untuk Local Development

Dokumentasi ini menjelaskan langkah-langkah untuk mengatur database SQLite untuk pengembangan lokal.

## Langkah-langkah

### 1. Konfigurasi Environment Variable

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Buka file `.env` dan pastikan konfigurasi `DATABASE_URL` mengarah ke file SQLite lokal:

```env
DATABASE_URL="file:./dev.db"
```

### 2. Generate Prisma Client

Pastikan dependensi sudah terinstal, lalu generate Prisma Client:

```bash
bun install
bun x prisma generate
```

### 3. Migrasi Database

Jalankan perintah berikut untuk membuat file database SQLite (`dev.db`) dan menerapkan skema:

```bash
bun x prisma migrate dev --name init
```

Perintah ini akan:

1. Membuat file `dev.db` di folder `prisma/` (jika belum ada).
2. Membuat tabel-tabel sesuai definisi di `prisma/schema.prisma`.
3. Menjalankan perintah seed (jika dikonfigurasi di `package.json`).

Alternatif jika hanya ingin push schema tanpa membuat file migrasi history:

```bash
bun x prisma db push
```

### 4. Seeding Data (Opsional)

Jika database masih kosong dan Anda ingin mengisinya dengan data awal (seed), jalankan:

```bash
bun x prisma db seed
```

Pastikan file `prisma/seed.ts` sudah ada dan dikonfigurasi dengan benar.

### 5. Verifikasi Data

Anda dapat menggunakan Prisma Studio untuk melihat dan mengelola data di database SQLite secara visual:

```bash
bun x prisma studio
```

Akses Prisma Studio di browser melalui URL yang muncul di terminal (biasanya `http://localhost:5555`).

### 6. Menjalankan Aplikasi

Setelah database siap, Anda dapat menjalankan aplikasi:

```bash
bun dev
```

Akses aplikasi di `http://localhost:3000`.

## Masalah Umum

### File Database Terkunci

Jika Anda menemui error "database is locked", pastikan tidak ada proses lain (seperti Prisma Studio atau koneksi database lain) yang sedang menahan lock pada file `dev.db` saat Anda mencoba menjalankan migrasi.

### Reset Database

Jika Anda ingin menghapus semua data dan memulai dari awal:

```bash
bun x prisma migrate reset
```

Perintah ini akan menghapus database, membuat ulang, dan menjalankan seeding.
