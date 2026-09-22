# Catatan Feli — Feli Maulidina Azzahira

Paket lengkap portofolio HTML, CSS, JavaScript dengan tema gunung sederhana dan soft pink. Termasuk font lokal, foto profil melalui config.js, halaman prestasi, tiga demo berbeda, dan konfigurasi Vercel. Tidak membutuhkan paket pembaruan, npm install, atau CDN.

## Data pemilik
- Nama: Feli Maulidina Azzahira
- Kelas: X RPL 3 · Absen: 19
- SD: SDN Kraton
- SMP: SMP 2 Krian
- SMK: SMK Krian 1
- HTML & CSS 75%, JavaScript 70%, Python 70%, Java 70%.

Persentase kemampuan berdasarkan penilaian diri sesuai formulir. Referensi yang diberikan, https://portofolio-nadyafirly2.netlify.app/, tidak dapat diakses saat pembuatan. Desain ini mengikuti arahan soft pink dan gunung sederhana, bukan salinan terverifikasi dari referensi.

## Menjalankan
Ekstrak ZIP ke folder baru lalu buka index.html pada browser modern. Alternatif: jalankan `python3 -m http.server 8000` dari folder ini, lalu buka http://localhost:8000.

## Foto profil di config.js
Isi bagian berikut yang sudah tersedia:

```js
window.PORTFOLIO_PROFILE = {
  imageUrl: "https://domain-kamu.com/foto-feli.jpg",
  imageAlt: "Foto Feli Maulidina Azzahira",
  objectPosition: "center"
};
```

Ganti contoh dengan link gambar asli yang dapat dibuka publik. Pakai URL gambar langsung (disarankan HTTPS), bukan halaman album, pratinjau, atau login. Foto eksternal memerlukan internet dan izin penyedia gambar untuk ditampilkan. `objectPosition: "center top"` dapat dipakai jika wajah berada lebih atas.

Boleh memakai path lokal, misalnya `assets/foto-feli.jpg`. Jika imageUrl kosong/gagal, situs mencoba assets/fotoprofil.png, .jpg, lalu .jpeg. Jika tidak ada, inisial FA tetap tampil. Jangan mengubah nama ekstensi berkas yang sebenarnya bukan gambar.

## Kontak
Isi email dan username Instagram tanpa @ pada PORTFOLIO_CONTACT di config.js. Saat kosong ditampilkan “Belum tersedia”. Kontak tidak dibuat-buat. Tidak ada form yang berpura-pura mengirim pesan.

## Halaman prestasi
Tombol Lihat prestasi Feli ada setelah daftar proyek. Masukkan gambar ke folder **asset** (tanpa s) dengan nama:
- prestasi1.png
- prestasi2.jpg
- prestasi3.jpeg
- dan seterusnya, satu gambar per nomor.

Saat build Vercel, daftar gambar dibuat otomatis dan diurutkan numerik. Nomor boleh melompat; tidak ada batas nomor tetap. Upload gambar ke GitHub dan tunggu deployment selesai.

Saat membuka HTML langsung atau hosting tanpa build, nomor harus berurutan mulai 1. Pencarian berhenti di nomor pertama yang kosong. Untuk nomor yang melompat, jalankan `node scripts/build-prestasi.mjs` lalu buka dist/prestasi.html.

Folder **assets** untuk font/latar/profil/favicon. Folder **asset** untuk gambar prestasi. Klik gambar untuk memperbesar; tutup menggunakan tombol × atau Escape.

## Proyek yang dapat dicoba
1. Kartu Pintar: lima flashcard dasar pemrograman dengan penjelasan, tombol balik, dan navigasi.
2. Cermin Kata: pemeriksa palindrom yang mengabaikan huruf besar, spasi, dan tanda baca.
3. Pilih Dulu: memilih acak dari 2–20 kegiatan berbeda; duplikat dan baris kosong diabaikan.

Semua merupakan contoh demo bawaan, bukan klaim karya terdahulu atau prestasi Feli. Data demo direset saat dibuka ulang dan tidak dikirim ke server.

## Upload GitHub & deploy Vercel
1. Upload seluruh isi hasil ekstrak ke akar repository GitHub. Pastikan index.html berada di akar repo, bukan masih dalam ZIP.
2. Import repository ke Vercel.
3. Framework Preset: Other. Root Directory: akar repository.
4. Build Command: `node scripts/build-prestasi.mjs`.
5. Output Directory: `dist`.
6. Deploy. Pengaturan sudah dicantumkan di vercel.json. Tidak membutuhkan environment variables atau npm install; build memerlukan Node.js 18+.

Jika memakai project Vercel lama, pastikan override build/output sesuai. Paket belum dipublikasikan ke akun pengguna. Vercel memberikan alamat setelah deploy berhasil.

## Tampilan
Mode Pink pagi / Pink malam tersimpan di browser. Navigasi horizontal di desktop, menu toggle di mobile. Judul memakai DejaVu Serif dan isi memakai DejaVu Sans; keduanya disertakan bersama lisensi di assets/fonts. Transisi ringan menghormati pengaturan reduced motion.

Latar assets/gunung-pink.png dibuat dengan alat ImageGen bawaan. Brief: lanskap gunung berlapis dengan langit blush pink, siluet mauve, kabut lembut dan cahaya pagi, tanpa tulisan/manusia/bangunan. Gambar bersifat ilustratif, bukan dokumentasi gunung tertentu.

## Struktur file
index.html, prestasi.html, style.css, config.js, common.js, experience.js, script.js, prestasi.js, prestasi-data.js, vercel.json, scripts/build-prestasi.mjs, assets/, asset/.

Folder dist dihasilkan otomatis saat build dan tidak disertakan sebagai duplikasi sumber.

## Pemeriksaan
Build dan sintaks JavaScript berhasil. Data identitas, persentase, tautan, aset, dan font lokal diperiksa. Flashcard, pemeriksa palindrom, pilihan acak, dan fokus dialog lolos simulasi DOM. Tampilan browser langsung serta deployment Vercel belum diuji.


## Revisi tampilan Feli
Identitas tersusun vertikal seperti referensi: foto, nama, kelas, absen, sekolah, jurusan. Teks dan judul menggunakan font tebal lokal. Tema catatan perjalanan gunung pink dilengkapi awan, burung, bunga bergerak dan tombol jeda animasi. Preferensi reduced motion perangkat dihormati.
Kontak sudah diisi: felimaulidina02@gmail.com dan Instagram @fell.and.fly_. Ubah di config.js. Pengaturan foto tetap PORTFOLIO_PROFILE.imageUrl. Foto pada contoh tata letak tidak dipakai sebagai foto Feli.
