# 💅 Buku Kas Sederhana untuk Salon

Aplikasi manajemen keuangan salon yang modern, mudah digunakan, dan powerful. Dibangun dengan SvelteKit, Bun, dan SQLite.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![SvelteKit](https://img.shields.io/badge/SvelteKit-5.x-orange)
![Bun](https://img.shields.io/badge/Bun-1.x-black)

## ✨ Fitur Utama

### 📊 Dashboard

- Ringkasan keuangan real-time
- Statistik pendapatan, pengeluaran, dan laba/rugi
- Transaksi terbaru
- Visualisasi yang menarik

### 💰 Manajemen Pendapatan

- Catat semua pemasukan salon
- Kategorisasi otomatis
- Filter per bulan
- Track layanan paling menguntungkan

### 💸 Manajemen Pengeluaran

- Pencatatan pengeluaran langsung
- Monitoring biaya produksi
- Kontrol budget
- Analisis efisiensi

### 🏢 Beban Operasional

- Pisahkan biaya tidak langsung
- Kategori lengkap (listrik, internet, dll)
- Perhitungan otomatis
- Laporan terstruktur

### 📉 Beban Penyusutan

- Metode garis lurus (straight-line)
- Perhitungan otomatis per bulan
- Track aset jangka panjang
- Umur ekonomis flexible

### 📈 Laporan Laba & Rugi

- Laporan keuangan profesional
- Ready to print
- Export to PDF
- Analisis komprehensif

### 🔐 Sistem Login

- Autentikasi aman dengan bcrypt
- Session management
- User-friendly interface

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd buku-kas-svelte

# Install dependencies
bun install

# Initialize database & run development server
bun run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Login Credentials (Default)

```
Username: admin
Password: admin123
```

⚠️ **Penting**: Segera ganti password default setelah instalasi!

## 📁 Struktur Proyek

```
buku-kas-svelte/
├── docs/                          # Dokumentasi lengkap per menu
│   ├── 00-instalasi.md
│   ├── 01-dashboard.md
│   ├── 02-pendapatan.md
│   ├── 03-pengeluaran.md
│   ├── 04-beban-operasional.md
│   ├── 05-beban-penyusutan.md
│   ├── 06-laporan-laba-rugi.md
│   ├── 07-login.md
│   └── 08-deployment-turso.md
├── prisma/
│   └── schema.prisma            # Prisma schema definition
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── database.ts        # Database initialization
│   │   │   └── prisma.ts          # Prisma client singleton
│   │   └── stores/
│   │       └── auth.ts            # Store autentikasi
│   ├── routes/
│   │   ├── (app)/                 # Route dengan layout app
│   │   │   ├── dashboard/
│   │   │   ├── pendapatan/
│   │   │   ├── pengeluaran/
│   │   │   ├── beban-operasional/
│   │   │   ├── beban-penyusutan/
│   │   │   ├── laporan/
│   │   │   └── +layout.svelte
│   │   ├── login/
│   │   └── api/
│   │       └── auth/
│   ├── app.css                    # Global styles & design system
│   └── app.html
├── dev.db                         # SQLite database (local dev)
├── .env                           # Environment variables
├── package.json
├── svelte.config.js
└── README.md
```

## 🗄️ Database Schema

### Table: users

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: pendapatan

```sql
CREATE TABLE pendapatan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal DATE NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT,
  jumlah REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: pengeluaran

```sql
CREATE TABLE pengeluaran (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal DATE NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT,
  jumlah REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: beban_operasional

```sql
CREATE TABLE beban_operasional (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal DATE NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT,
  jumlah REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Table: beban_penyusutan

```sql
CREATE TABLE beban_penyusutan (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tanggal DATE NOT NULL,
  nama_aset TEXT NOT NULL,
  nilai_aset REAL NOT NULL,
  umur_ekonomis INTEGER NOT NULL,
  nilai_penyusutan REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Design System

Aplikasi menggunakan custom design system dengan:

- **Color Palette**: Salon-themed dengan pink gradient sebagai primary color
- **Typography**: Inter font family
- **Components**: Card, Button, Form, Table, Modal, Badge, Alert
- **Responsive**: Mobile-first approach
- **Animations**: Smooth transitions dan hover effects

### CSS Variables

```css
--primary-500: #ee4884;
--primary-600: #dd2161;
--neutral-800: #262626;
--success: #10b981;
--error: #ef4444;
```

## 📖 Dokumentasi Lengkap

Setiap menu memiliki dokumentasi detail di folder `docs/`:

0. [Instalasi](docs/00-instalasi.md) - Panduan instalasi step-by-step
1. [Dashboard](docs/01-dashboard.md) - Ringkasan & navigasi
2. [Pendapatan](docs/02-pendapatan.md) - Cara mencatat pemasukan
3. [Pengeluaran](docs/03-pengeluaran.md) - Cara mencatat pengeluaran
4. [Beban Operasional](docs/04-beban-operasional.md) - Manajemen biaya operasional
5. [Beban Penyusutan](docs/05-beban-penyusutan.md) - Perhitungan penyusutan aset
6. [Laporan Laba & Rugi](docs/06-laporan-laba-rugi.md) - Analisis keuangan
7. [Login](docs/07-login.md) - Keamanan & autentikasi
8. [Deployment dengan Turso](docs/08-deployment-turso.md) - Deploy ke production

## 🔧 Development

### Available Scripts

```bash
# Development server dengan hot reload
bun run dev

# Build untuk production
bun run build

# Preview production build
bun run preview

# Type checking
bun run check

# Linting
bun run lint
```

### Tech Stack

- **Framework**: [SvelteKit 2.x](https://kit.svelte.dev/)
- **Runtime**: [Bun 1.x](https://bun.sh/)
- **ORM**: [Prisma 5.x](https://www.prisma.io/)
- **Database**:
  - Development: [SQLite](https://www.sqlite.org/)
  - Production: [Turso](https://turso.tech/) (SQLite-compatible edge database)
- **Authentication**: bcryptjs
- **Styling**: Custom CSS (no framework)
- **Type Safety**: TypeScript

## 🚢 Deployment

### Build untuk Production

```bash
# Build aplikasi
bun run build

# File hasil build ada di folder 'build/'
```

### Deploy Options

#### 1. Node.js Server

```bash
# Install adapter
bun add -D @sveltejs/adapter-node

# Update svelte.config.js
# Build & deploy ke server Node.js
```

#### 2. Netlify dengan Turso (Recommended)

**Lihat panduan lengkap**: [docs/08-deployment-turso.md](docs/08-deployment-turso.md)

- Setup Turso database
- Push ke GitHub
- Connect repository di Netlify
- Set environment variables
- Auto-deploy on push

#### 3. Static Hosting

```bash
# Install static adapter
bun add -D @sveltejs/adapter-static

# Build static files
# Deploy ke hosting apapun (Netlify, GitHub Pages, dll)
```

⚠️ **Note**: Untuk production, pastikan:

- Ganti password default
- Setup HTTPS
- Backup database secara rutin
- Monitor disk space untuk `salon.db`

## 🔒 Security

- Password di-hash dengan bcrypt (10 rounds)
- SQL injection protected (prepared statements)
- XSS protection (Svelte auto-escape)
- CSRF protection via SvelteKit
- Session management via localStorage

### Recommendations

- Deploy dengan HTTPS
- Regular database backups
- Strong password policy
- Regular security updates

## 📊 Rumus Perhitungan

```
Total Pendapatan = Σ Semua Pendapatan

Total Pengeluaran = Σ Semua Pengeluaran

Laba Kotor = Total Pendapatan - Total Pengeluaran

Total Beban Operasional = Σ Semua Beban Operasional

Total Beban Penyusutan = Σ Semua Penyusutan

Total Biaya = Pengeluaran + Beban Operasional + Beban Penyusutan

Laba Bersih = Total Pendapatan - Total Biaya
```

## 🤝 Contributing

Contributions are welcome! Beberapa ide untuk improvement:

- [ ] Multi-user dengan role management
- [ ] Export data ke Excel
- [ ] Grafik & visualisasi data
- [ ] Reminder tagihan/pembayaran rutin
- [ ] Integrasi WhatsApp untuk laporan otomatis
- [ ] Mobile app (React Native / Flutter)
- [ ] Cloud backup otomatis
- [ ] Multi-currency support

## 📝 License

MIT License - feel free to use for your salon business!

## 🆘 Support

Jika menemukan bug atau butuh bantuan:

1. Baca dokumentasi di folder `docs/`
2. Check Troubleshooting section di setiap docs
3. Create an issue di GitHub repository

## 👨‍💻 Author

Dibuat dengan ❤️ untuk kemudahan manajemen keuangan salon

---

**Happy Managing Your Salon Finance! 💅✨**
