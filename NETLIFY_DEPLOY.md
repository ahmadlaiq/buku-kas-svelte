# Deploy ke Netlify

1. **Commit & Push** perubahan ini ke GitHub:

   ```bash
   git add .
   git commit -m "chore: switch to Netlify adapter"
   git push origin main
   ```

2. **Buka Netlify Dashboard**: https://app.netlify.com/

3. **Add New Site** -> **Import from Git** -> Pilih repo `buku-kas-svelte` Anda.

4. **Configure Build**:
   - **Build command**: `npm run build`
   - **Publish directory**: `build` (atau biarkan default)

5. **Environment Variables**:
   Klik "Advanced" atau masuk ke Site Settings -> Environment variables setelah site dibuat.
   Tambahkan:
   - `DATABASE_URL`: `postgresql://ahmad:ahmad@194.195.90.101:5432/sass_salon`
     (Langsung koneksi database asli Anda, tidak perlu proxy/prisma accelerate).

6. **Deploy**!
