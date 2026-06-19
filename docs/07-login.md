# 🔐 Login - Dokumentasi

## Deskripsi

Halaman Login adalah pintu masuk ke aplikasi Buku Kas Salon. Sistem autentikasi memastikan hanya pengguna yang berwenang yang dapat mengakses dan mengelola data keuangan salon.

## Fitur Keamanan

### 1. Password Encryption

- Password disimpan dalam bentuk **hash** (terenkripsi)
- Menggunakan **bcrypt** dengan salt rounds = 10
- Tidak ada yang bisa melihat password asli, termasuk admin

### 2. Session Management

- Setelah login berhasil, data user disimpan di localStorage browser
- Session tetap aktif sampai user logout
- Auto-redirect jika belum login dan mencoba akses halaman lain

### 3. Form Validation

- Username dan password wajib diisi
- Validasi di client-side dan server-side

## Cara Menggunakan

### Login Pertama Kali

1. Buka aplikasi di browser
2. Anda akan otomatis diarahkan ke halaman Login
3. Masukkan kredensial default:
   - **Username**: `admin`
   - **Password**: `admin123`
4. Klik tombol **"Masuk"**
5. Jika berhasil, Anda akan diarahkan ke **Dashboard**

### Login Setelah Logout

1. Klik menu **"🚪 Keluar"** di sidebar (di bagian bawah)
2. Anda akan diarahkan kembali ke halaman Login
3. Masukkan username dan password
4. Klik **"Masuk"**

## User Default

Aplikasi sudah menyediakan 1 user default:

| Field            | Value         |
| ---------------- | ------------- |
| **Nama Lengkap** | Administrator |
| **Username**     | admin         |
| **Password**     | admin123      |

⚠️ **PENTING**: Segera ganti password default setelah setup awal!

## Troubleshooting

### Masalah 1: "Username atau password salah"

**Penyebab:**

- Password salah ketik
- Username salah ketik
- Caps Lock aktif (password case-sensitive)

**Solusi:**

- Periksa ejaan username: `admin` (huruf kecil semua)
- Periksa password: `admin123`
- Pastikan Caps Lock tidak aktif
- Copy-paste kredensial dari dokumentasi ini jika perlu

### Masalah 2: Tombol "Masuk" tidak berfungsi

**Solusi:**

- Pastikan kedua field (username & password) sudah diisi
- Refresh halaman (F5)
- Clear cache browser
- Coba browser lain

### Masalah 3: Sudah login tapi redirect ke login lagi

**Penyebab:**

- Browser tidak menyimpan localStorage
- Mode Private/Incognito browsing

**Solusi:**

- Gunakan mode normal browser (bukan Private/Incognito)
- Enable cookies dan local storage di browser settings
- Gunakan browser modern (Chrome, Firefox, Edge versi terbaru)

### Masalah 4: Lupa Password

**Solusi Saat Ini:**
Karena aplikasi ini menggunakan SQLite lokal dan belum ada fitur reset password via email, ada 2 cara:

#### Cara 1: Reset Manual via Database

1. Buka file `salon.db` menggunakan SQLite browser/editor
2. Jalankan query:

```sql
UPDATE users
SET password = '$2a$10$YourNewHashedPassword'
WHERE username = 'admin';
```

3. Hash baru password `admin123`:

```
$2a$10$N9qo8uLOickgx2ZzsA0sL.sK9lN0g6NpLkqKpqCj1x.QZHK3BK8Fy
```

#### Cara 2: Hubungi Developer (Recommended)

Jika tidak familiar dengan database, hubungi developer untuk reset password.

## Fitur Tambahan (Future Development)

### Fitur yang Bisa Ditambahkan:

1. ✅ Multi-user dengan role berbeda (Admin, Kasir, Manager)
2. ✅ Forgot Password via Email
3. ✅ Change Password dari dalam aplikasi
4. ✅ Login History/Activity Log
5. ✅ Two-Factor Authentication (2FA)
6. ✅ Session Timeout otomatis setelah waktu tertentu

## Keamanan Best Practices

### ✅ DO (Lakukan)

1. **Ganti Password Default**

   - Segera ganti `admin123` ke password yang kuat
   - Password minimal 8 karakter
   - Kombinasi huruf besar, kecil, angka, dan simbol
   - Contoh: `S4l0n$ecur3!`

2. **Jangan Share Kredensial**

   - Password bersifat pribadi
   - Jika butuh user baru, buat akun terpisah (fitur nanti)
   - Jangan tulis password di tempat yang terlihat orang

3. **Logout Setelah Selesai**

   - Selalu logout jika meninggalkan komputer
   - Terutama di komputer bersama/publik

4. **Gunakan Komputer Aman**
   - Pastikan komputer bebas virus/malware
   - Update antivirus secara rutin
   - Jangan login dari komputer umum (warnet, dll)

### ❌ DON'T (Hindari)

1. Jangan gunakan password yang mudah ditebak
2. Jangan save password di browser publik
3. Jangan biarkan session tetap login di komputer publik
4. Jangan share screenshot yang menampilkan kredensial

## Cara Mengganti Password (Manual)

Saat ini belum ada menu "Change Password" di aplikasi. Untuk mengganti password:

### Opsi 1: Via Developer

Minta developer untuk:

1. Generate hash password baru
2. Update di database

### Opsi 2: Manual (Advanced User)

1. Generate password hash menggunakan tool online atau script:

```javascript
// Script Node.js
const bcrypt = require("bcryptjs");
const newPassword = "PasswordBaru123!";
const hash = bcrypt.hashSync(newPassword, 10);
console.log(hash);
```

2. Update database:

```sql
UPDATE users
SET password = '<hash_dari_step_1>'
WHERE username = 'admin';
```

## Format Aplikasi yang Aman

### Browser yang Didukung

- ✅ Google Chrome (versi terbaru)
- ✅ Mozilla Firefox (versi terbaru)
- ✅ Microsoft Edge (versi terbaru)
- ❌ Internet Explorer (tidak disarankan)

### Koneksi

- Untuk produksi, gunakan **HTTPS** (bukan HTTP)
- Jika deploy ke server, pastikan SSL certificate aktif

## Alur Login

```
1. User buka aplikasi
   ↓
2. Cek localStorage: ada user tersimpan?
   ├─ Ya → Redirect ke Dashboard
   └─ Tidak → Tampilkan halaman Login
   ↓
3. User input username & password
   ↓
4. Klik tombol "Masuk"
   ↓
5. Request ke API /api/auth/login
   ↓
6. Server cek database:
   ├─ Username tidak ada → Error "Username atau password salah"
   ├─ Password tidak cocok → Error "Username atau password salah"
   └─ Valid → Return user data
   ↓
7. Client simpan user ke localStorage
   ↓
8. Redirect ke Dashboard
```

## Struktur User Data

Data yang disimpan di localStorage:

```json
{
  "id": 1,
  "username": "admin",
  "full_name": "Administrator"
}
```

⚠️ **Note**: Password **TIDAK** disimpan di localStorage (demi keamanan)

## Testing Login

### Test Case 1: Login Berhasil

- Input: `admin` / `admin123`
- Expected: Redirect ke Dashboard
- Actual: ✅

### Test Case 2: Username Salah

- Input: `administrator` / `admin123`
- Expected: Error "Username atau password salah"
- Actual: ✅

### Test Case 3: Password Salah

- Input: `admin` / `wrongpassword`
- Expected: Error "Username atau password salah"
- Actual: ✅

### Test Case 4: Field Kosong

- Input: `/`
- Expected: Form validation error
- Actual: ✅

## Pertanyaan Umum (FAQ)

**Q: Apakah bisa login dari 2 device bersamaan dengan akun yang sama?**
A: Ya, bisa. Tidak ada pembatasan device. Namun untuk keamanan, sebaiknya logout dari device yang tidak digunakan.

**Q: Apakah password case-sensitive?**
A: Ya. `Admin123` berbeda dengan `admin123`.

**Q: Berapa lama session berlaku?**
A: Session tidak memiliki expiry otomatis. Selama tidak logout atau clear localStorage, session tetap aktif. Untuk keamanan, logout manual setelah selesai.

**Q: Apakah bisa membuat user baru?**
A: Saat ini belum ada UI untuk menambah user. Perlu dilakukan manual via database atau minta developer. Fitur ini bisa dikembangkan nanti.

**Q: Bagaimana jika lupa username?**
A: Cek database `users` table atau hubungi developer. Default username: `admin`.

## Rekomendasi Keamanan Tambahan

Jika aplikasi digunakan di lingkungan multi-user:

1. Implementasikan **role-based access control** (Admin, Kasir, Viewer)
2. Tambahkan **audit log** untuk track siapa login kapan
3. Enable **session timeout** otomatis (contoh: 30 menit tidak aktif = auto logout)
4. Implementasikan **password policy** (harus ganti password setiap 3 bulan)
5. Tambahkan **CAPTCHA** untuk prevent brute force attack
