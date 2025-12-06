# 🚀 Deployment ke Production dengan Turso

Panduan lengkap untuk deploy aplikasi Buku Kas Salon ke production menggunakan **SQLite lokal** untuk development dan **Turso** untuk production database.

## 📋 Apa itu Turso?

**Turso** adalah edge database yang kompatibel dengan SQLite, dirancang untuk aplikasi modern dengan fitur:

- ✅ **SQLite-compatible**: Syntax dan behavior sama dengan SQLite
- ✅ **Edge deployment**: Database tersebar di berbagai region untuk latency rendah
- ✅ **Serverless**: Tidak perlu manage server database
- ✅ **Free tier**: Generous free tier untuk small projects
- ✅ **Prisma support**: Full support dengan Prisma ORM

## 🔧 Setup Turso

### Step 1: Install Turso CLI

#### Windows (PowerShell)

```powershell
powershell -c "irm get.tur.so/install.ps1 | iex"
```

#### macOS/Linux

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

Verifikasi instalasi:

```bash
turso --version
```

### Step 2: Login ke Turso

```bash
turso auth login
```

Browser akan terbuka untuk authentication. Login dengan GitHub account Anda.

### Step 3: Create Database

```bash
# Create database baru
turso db create salon-db

# Lihat list databases
turso db list
```

**Output:**

```
Name      URL
salon-db  libsql://salon-db-[username].turso.io
```

### Step 4: Generate Auth Token

```bash
turso db tokens create salon-db
```

**Output:**

```
eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

⚠️ **PENTING**: Simpan token ini dengan aman! Token hanya ditampilkan sekali.

### Step 5: Get Connection URL

```bash
turso db show salon-db --url
```

**Output:**

```
libsql://salon-db-[username].turso.io
```

## 🔄 Migrasi Database ke Turso

### Opsi 1: Push Schema dengan Prisma

```bash
# Set environment variable untuk Turso
$env:DATABASE_URL="libsql://salon-db-[username].turso.io?authToken=YOUR_AUTH_TOKEN"

# Push schema ke Turso
bunx prisma db push
```

### Opsi 2: Migrate dari SQLite Lokal

Jika Anda sudah punya data di SQLite lokal dan ingin migrate ke Turso:

```bash
# Dump data dari SQLite lokal
sqlite3 salon.db .dump > salon_dump.sql

# Import ke Turso
turso db shell salon-db < salon_dump.sql
```

## 📦 Deploy ke Netlify

### Step 1: Prepare Repository

Pastikan code sudah di-push ke GitHub:

```bash
git add .
git commit -m "Add Prisma ORM with Turso support"
git push origin main
```

### Step 2: Connect ke Netlify

1. Login ke [Netlify](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Pilih **GitHub** dan authorize
4. Pilih repository **buku-kas-svelte**

### Step 3: Configure Build Settings

**Build settings:**

- **Base directory**: (leave empty)
- **Build command**: `bun run build`
- **Publish directory**: `build`

### Step 4: Set Environment Variables

Di Netlify dashboard, go to:
**Site settings** → **Environment variables** → **Add a variable**

Tambahkan variable berikut:

| Key            | Value                                                             |
| -------------- | ----------------------------------------------------------------- |
| `DATABASE_URL` | `libsql://salon-db-[username].turso.io?authToken=YOUR_AUTH_TOKEN` |
| `NODE_ENV`     | `production`                                                      |

⚠️ **PENTING**:

- Replace `[username]` dengan username Turso Anda
- Replace `YOUR_AUTH_TOKEN` dengan token yang di-generate di Step 4

### Step 5: Deploy

Click **"Deploy site"**

Netlify akan:

1. Clone repository
2. Install dependencies dengan Bun
3. Run `bun run build`
4. Deploy ke CDN

**Deploy time**: ~2-3 menit

## ✅ Verifikasi Deployment

### 1. Check Build Logs

Di Netlify dashboard, check **Deploy log** untuk memastikan tidak ada error.

### 2. Test Login

1. Buka URL yang diberikan Netlify (contoh: `https://your-app.netlify.app`)
2. Login dengan credentials default:
   - Username: `admin`
   - Password: `admin123`

### 3. Test CRUD Operations

- Tambah pendapatan baru
- Tambah pengeluaran
- Check dashboard
- Generate laporan

### 4. Check Database

```bash
# Connect ke Turso shell
turso db shell salon-db

# Check tables
.tables

# Check data
SELECT * FROM users;
SELECT * FROM pendapatan;
```

## 🔐 Keamanan Production

### 1. Ganti Password Default

**SEGERA** ganti password default setelah deployment:

```bash
# Connect ke Turso
turso db shell salon-db

# Update password (hash untuk password baru)
UPDATE users
SET password = '$2a$10$NewHashedPasswordHere'
WHERE username = 'admin';
```

Untuk generate hash password baru:

```javascript
// Run di Node.js atau Bun
const bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync("YourNewPassword123!", 10));
```

### 2. Rotate Auth Token

Secara berkala (setiap 3-6 bulan), rotate auth token:

```bash
# Revoke old token
turso db tokens revoke salon-db <old-token-id>

# Create new token
turso db tokens create salon-db
```

Update `DATABASE_URL` di Netlify environment variables.

### 3. Enable HTTPS

Netlify otomatis provide HTTPS. Pastikan:

- ✅ Force HTTPS enabled
- ✅ SSL certificate valid

## 📊 Monitoring & Maintenance

### Check Database Usage

```bash
# Check database stats
turso db show salon-db
```

Output menampilkan:

- Database size
- Number of rows
- Number of queries
- Storage used

### Backup Database

```bash
# Backup Turso database
turso db shell salon-db .dump > backup_$(date +%Y%m%d).sql
```

**Automated backup** (cron job):

```bash
# Add to crontab (daily at 2 AM)
0 2 * * * turso db shell salon-db .dump > /path/to/backup/salon_$(date +%Y%m%d).sql
```

### View Logs

Di Netlify:
**Site overview** → **Functions** → **View logs**

## 🐛 Troubleshooting

### Error: "Database connection failed"

**Penyebab**: Auth token salah atau expired

**Solusi**:

1. Generate token baru: `turso db tokens create salon-db`
2. Update `DATABASE_URL` di Netlify environment variables
3. Redeploy site

### Error: "Table not found"

**Penyebab**: Schema belum di-push ke Turso

**Solusi**:

```bash
$env:DATABASE_URL="libsql://salon-db-[username].turso.io?authToken=YOUR_TOKEN"
bunx prisma db push
```

### Error: "Build failed"

**Penyebab**: Missing environment variables atau build error

**Solusi**:

1. Check build logs di Netlify
2. Pastikan `DATABASE_URL` sudah di-set
3. Test build lokal: `bun run build`

### Slow Performance

**Penyebab**: Database region jauh dari users

**Solusi**:

```bash
# Create database di region terdekat
turso db create salon-db --location sin  # Singapore
# atau
turso db create salon-db --location fra  # Frankfurt
```

Available locations: `sin`, `fra`, `iad`, `syd`, `lhr`, dll.

## 💰 Pricing & Limits

### Turso Free Tier

- ✅ 9 GB storage
- ✅ 1 billion row reads/month
- ✅ 25 million row writes/month
- ✅ 3 databases
- ✅ 3 locations per database

Untuk salon kecil-menengah, **free tier sudah lebih dari cukup**!

### Netlify Free Tier

- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included

## 🔄 Update Aplikasi

Ketika ada update code:

```bash
# Pull latest changes
git pull origin main

# Test lokal
bun install
bun run dev

# Push ke GitHub
git add .
git commit -m "Update feature X"
git push origin main
```

Netlify akan **auto-deploy** setiap kali ada push ke `main` branch.

## 📝 Checklist Deployment

Sebelum deploy ke production:

- [ ] Test semua fitur di lokal
- [ ] Ganti password default
- [ ] Setup Turso database
- [ ] Generate auth token
- [ ] Push schema ke Turso
- [ ] Set environment variables di Netlify
- [ ] Deploy ke Netlify
- [ ] Test login di production
- [ ] Test CRUD operations
- [ ] Setup backup routine
- [ ] Document credentials (simpan di password manager)

## 🎯 Next Steps

Setelah deployment berhasil:

1. ✅ Monitor usage di Turso dashboard
2. ✅ Setup automated backups
3. ✅ Configure custom domain (opsional)
4. ✅ Enable analytics (Netlify Analytics atau Google Analytics)
5. ✅ Setup error monitoring (Sentry, LogRocket, dll)

---

**Selamat! Aplikasi Buku Kas Salon Anda sudah live di production! 🎉**

## 📞 Support

Jika ada masalah:

- Turso Docs: https://docs.turso.tech
- Netlify Docs: https://docs.netlify.com
- Prisma Docs: https://www.prisma.io/docs

## 🔗 Useful Links

- [Turso Dashboard](https://turso.tech/app)
- [Netlify Dashboard](https://app.netlify.com)
- [Prisma with Turso Guide](https://www.prisma.io/docs/orm/overview/databases/turso)
