# Nothing Happens Here

Repo ini adalah project Nuxt 4 + Tailwind yang jadi basis website "Nothing Happens Here".

Singkatnya
- Stack: Nuxt 4 (Vue 3), Tailwind CSS
- Tujuan: situs portfolio / project showcase (isi konten di folder `content/` dan `app/`).

Quick start (lokal)
1. Install dependencies
   - npm ci
2. Run development server
   - npm run dev
3. Build untuk production
   - npm run build
4. Preview hasil build
   - npm run preview

Environment
- Contoh file env: `.env.example` (jangan commit `.env` yang berisi secret)
- Pastikan variabel sensitif tidak ikut ke repo. Kalau ketemu API key/token di repo, hapus dan rotasi.

Deploy
- Siap dideploy ke Vercel/Netlify. File `.vercel` ada untuk konfigurasi Vercel.
- Untuk Vercel: set build command `npm run build` dan output directory sesuai `.vercel`/Nuxt config.

Kode & struktur
- `app/` - halaman utama (Nuxt app dir)
- `server/` - server endpoints & server logic
- `content/` - konten statis / markdown
- `public/` - aset publik (gambar, PDF, dll)
- `.nuxt/`, `.output/`, `node_modules/` - jangan commit (gunakan .gitignore)

Checklist rekomendasi (prioritas)
1. Hapus artifacts & node_modules dari repo; tambahkan ke `.gitignore` (`node_modules`, `.nuxt`, `.output`, `.env`, `.env.local`).
2. Buat `.env.example` dan pindahkan secrets ke env lokal.
3. Tambah README yang jelas (ini) dan tulis cara run + dependency list.
4. Tambah GitHub Actions minimal: install, build, lint.
5. Tambah meta & OG image untuk SEO di `nuxt.config.ts`.
6. Tambah 1-2 case study di `content/` lengkap dengan screenshot/materi.
7. Jalankan Lighthouse & optimasi gambar/font.

Contributing
- Kalau mau kontribusi: fork → branch baru → PR. Sertakan testing steps di PR.

Contact
- Pemilik repo: Rayyan (Nte). Kalau mau, gue bisa bantu: edit hero copy, bikin .env.example, atau setup CI.

---
README dibuat otomatis via assistant. Kalau mau versi yang lebih formal atau versi Bahasa Inggris, bilang aja.