# Feli — Pink Barongsai

Redesign dari **Portofolio-Feli-main**, tetap menggunakan HTML, CSS, dan JavaScript murni. Identitas, cerita, pendidikan, keterampilan, kontak, dan halaman prestasi dipertahankan. Tiga demo sebelumnya diganti sesuai permintaan dengan Sakura Focus, Angpao Goal, dan Festival Memory.

## 1. Cara menjalankan

Extract ZIP, lalu buka `index.html` dengan Chrome, Edge, Firefox, atau Safari versi modern. Tidak perlu npm install, node_modules, API key, atau koneksi internet untuk aset bawaan.

Untuk server lokal, jalankan dari folder project:

```sh
python -m http.server 8000
```

Buka `http://localhost:8000`. Bisa juga menggunakan VS Code Live Server. Penyimpanan Angpao Goal, tema, dan preferensi animasi mengikuti browser serta alamat tempat situs dibuka.

## 2. Ganti seluruh foto melalui config.js

Cari komentar **GANTI URL FOTO DI BAGIAN INI**. Ganti nilai di dalam tanda kutip:

```js
photos: {
  profile: "assets/IMG_20260922_170446_140.jpg",
  portfolio1: "assets/barongsai-1.jpg",
  portfolio2: "assets/barongsai-2.jpg",
  portfolio3: "assets/barongsai-3.jpg",
  closing: "assets/IMG_20260922_170446_140.jpg"
}
```

- `profile`: foto utama pada kartu identitas.
- `portfolio1`–`portfolio3`: thumbnail tiga demo.
- `closing`: foto penutup.
- Ganti dengan URL gambar publik langsung, misalnya `https://example.com/foto.jpg`, atau path lokal seperti `assets/foto-baru.jpg`.
- Jangan menempel tautan album/login atau format Markdown `[teks](url)`.
- Penulisan huruf besar/kecil nama file harus sama persis.
- Untuk mengganti maskot utama, edit `artwork.mascot`. Tiga teman Barongsai memakai `artwork.friends`, berupa atlas transparan tiga kolom (pink berpita, putih berhias jade, dan bayi Barongsai berjalan).
- URL foto tidak ditulis di HTML. `experience.js` menghubungkan atribut `data-photo`/`data-art` ke config.
- Foto Feli memakai file asli yang sudah ada dalam ZIP, tanpa edit wajah, pakaian, pose, atau isi. Foto penutup menggunakan foto asli yang sama karena hanya satu foto pribadi lokal tersedia.
- Thumbnail menggunakan tiga referensi Barongsai yang diberikan. Foto pribadi memakai `object-fit: contain`/tinggi otomatis sehingga tetap utuh.

### Galeri prestasi

ZIP awal belum berisi foto sertifikat/prestasi. Halaman menampilkan ruang kosong yang rapi, bukan prestasi rekaan. Taruh foto di folder `asset/`, lalu tambah ke `achievements` di `config.js`:

```js
achievements: [
  { title: "Sertifikat pertamaku", url: "asset/prestasi1.jpg", alt: "Sertifikat Feli" },
  { title: "Kegiatan sekolah", url: "https://example.com/kegiatan.jpg", alt: "Dokumentasi kegiatan sekolah" }
]
```

Semua URL galeri juga diatur di config. Tidak perlu mengedit HTML. Mekanisme tebakan nama file lama diganti daftar eksplisit agar tidak meminta file yang tidak ada. Klik foto untuk memperbesar; Escape menutup pratinjau.

## 3. Bagian yang bisa diedit

| File | Fungsi |
| --- | --- |
| `config.js` | Semua URL foto, maskot, daftar prestasi, dan kontak |
| `index.html` | Teks identitas, cerita, sekolah, persentase kemampuan, deskripsi proyek, penutup |
| `prestasi.html` | Teks judul dan pengantar galeri |
| `style.css` | Warna pada `:root`, layout, frame, responsive, animasi |
| `script.js` | Logika ketiga demo |
| `experience.js` | Penghubung foto, animasi, scroll reveal dan parallax |
| `common.js` | Menu hamburger, tema pagi/malam, kontak dan tahun footer |
| `prestasi.js` | Kartu galeri dan pratinjau |

## 4. Struktur folder

```text
portfolio-barongsai-pink/
├── index.html
├── prestasi.html
├── config.js
├── common.js
├── experience.js
├── script.js
├── prestasi.js
├── style.css
├── vercel.json
├── README.md
├── .gitignore
├── assets/
│   ├── IMG_20260922_170446_140.jpg
│   ├── barongsai-1.jpg
│   ├── barongsai-2.jpg
│   ├── barongsai-3.jpg
│   ├── barongsai-mascot.png
│   ├── barongsai-friends.png
│   ├── favicon.svg
│   └── fonts/   (font lokal dan lisensinya)
├── asset/
│   └── PANDUAN.txt
└── scripts/
    └── build-prestasi.mjs
```

Folder `asset` untuk dokumentasi dan `assets` untuk aset desain sengaja dipertahankan dari struktur awal. Tidak ada `.git`, node_modules, rahasia, atau hasil build sementara dalam ZIP.

## 5. Update GitHub dan deploy

**Update repository:** extract ZIP, masuk ke folder `portfolio-barongsai-pink`, lalu unggah **isinya** ke root repository yang lama. Pastikan `index.html` berada di root, bukan di folder bertingkat. Hapus file tema gunung lama dan `prestasi-data.js` jika masih tersisa di repository; tidak digunakan lagi.

**GitHub Pages:** pilih branch repository dan folder root pada pengaturan Pages. Semua path relatif sehingga bisa dipakai pada alamat repository bersubfolder. Website langsung berjalan tanpa build.

**Vercel:** import repository dan gunakan framework **Other**. `vercel.json` sudah mempertahankan alur build project asli:

- Build: `node scripts/build-prestasi.mjs`
- Output: `dist`
- Install command: kosong; tanpa dependensi npm.

Untuk mengecek build lokal, jalankan perintah build tersebut. Folder `dist` akan dibuat otomatis; jangan masukkan ke ZIP atau commit. Isi `dist` juga bisa dipasang di static hosting lain.

## Interaksi dan animasi

- **Sakura Focus:** sesi 25 menit, jeda 5 menit, dan mode coba 1 menit. Mulai, jeda, lanjutkan, reset. Timer memakai waktu nyata dan dihentikan ketika dialog ditutup.
- **Angpao Goal:** nama impian, target rupiah, saldo, progres otomatis, hapus catatan. Data tersimpan hanya di browser pengguna. Tidak mengirim data ke server.
- **Festival Memory:** enam pasangan simbol, kartu diacak, penghitung langkah, tombol mulai ulang.
- Barongsai menari lembut, lampion bergoyang, awan bergerak, sakura melayang, sparkle, hover, scroll reveal, parallax ringan pada desktop.
- Tombol **Jeda animasi** menghentikan gerak dekoratif; preferensi disimpan. Pengaturan sistem `prefers-reduced-motion` otomatis dihormati.
- Jumlah kelopak dibatasi menjadi lima di HP. Animasi memakai transform/opacity; scroll menggunakan satu requestAnimationFrame per pembaruan. Tidak ada library animasi eksternal.

### Aset maskot

`assets/barongsai-mascot.png` dibuat melalui imagegen bawaan untuk dekorasi website. Ringkasan prompt: satu Barongsai China 3D fluffy pink–white, detail emas, mata besar ramah, seluruh tubuh terlihat, latar transparan, tanpa teks dan tanpa orang. Gambar ini hanya dekorasi; foto pribadi tidak diproses dengan AI.

## Pemeriksaan versi ini

Diuji dengan Chromium headless pada lebar 320, 390, 768, 1024, dan 1440 px untuk kedua halaman: tidak ditemukan overflow horizontal, gambar bawaan gagal dimuat, atau error console. Menu mobile, tema tersimpan, jeda animasi, preferensi reduced motion, seluruh demo, penggantian lima foto melalui config, penambahan galeri dan lightbox, serta pembukaan `file://` telah diperiksa. Build Node berhasil. File foto pribadi diverifikasi identik dengan file dari ZIP asli.

URL eksternal yang kamu masukkan kemudian tetap bergantung pada ketersediaan server gambar tersebut. Gunakan aset lokal untuk pemakaian offline.


## Revisi: foto diusung Barongsai & bingkai otomatis

- Teks penutup mengikuti kiriman terbaru pengguna, termasuk tiga kalimat penutup.
- Empat desain karakter berbeda: maskot hero, Barongsai pink berpita, Barongsai putih dengan hiasan jade, dan bayi Barongsai dengan lonceng.
- Foto penutup dibawa dua karakter berbeda di atas penyangga emas. Gerakan foto dan pengusung dibuat lembut; foto asli tidak diubah.
- Bayi Barongsai berjalan bolak-balik di jalur khusus pada tepi bawah layar. Jalur tidak menerima klik, menghilang saat dialog dibuka, dan otomatis disembunyikan pada preferensi reduced motion.
- Bingkai menyesuaikan proporsi asli foto portrait, landscape, atau persegi. Tidak ada ukuran rasio foto yang dipaksa. JavaScript membaca `naturalWidth` dan `naturalHeight` setelah foto berhasil dimuat, lalu memperbarui ukuran bingkai. Foto tinggi dibatasi lebar tampilannya agar tetap nyaman dibaca, tanpa crop.
- Thumbnail dan galeri memakai tinggi alami, sehingga tinggi kartu dapat berbeda sesuai foto yang dipasang. Tidak ada letterbox atau pemotongan foto untuk memaksakan kartu sama tinggi.
- Tombol Jeda animasi juga menjeda pengusung foto dan Barongsai di tepi layar.

Aset tambahan `assets/barongsai-friends.png` dibuat dengan imagegen bawaan. Ringkasan prompt: atlas transparan 3 kolom berisi tiga karakter Barongsai 3D fluffy yang berbeda, dua karakter mengangkat tangan sebagai pengusung, dan satu bayi Barongsai berjalan. Atlas ditampilkan per karakter menggunakan CSS; foto Feli tidak pernah digabung atau diedit ke gambar AI.

Pemeriksaan revisi: kedua halaman lolos pada lebar 320, 390, 768, dan 1440 px. Penggantian lima foto diuji dengan tiga rasio asli (portrait, persegi, landscape); seluruh bingkai mengikuti ukuran dan tidak memotong foto. Jalur Barongsai tetap berada dalam layar. Jeda/resume, dialog, dan reduced motion lolos tanpa error console.


## Foto halaman utama

Hero sekarang memakai foto asli `assets/gunung-pink.png` sebagai pengganti maskot besar. `assets/gunung-pink.jpg` tampil sebagai background tipis, dengan lapisan warna lembut untuk menjaga keterbacaan. Ubah `photos.hero` dan `photos.heroBackground` di `config.js` untuk menggantinya. PNG ditampilkan utuh tanpa crop; JPG background memakai cover. Foto penutup dan semua pengaturan pengguna lainnya dipertahankan dari ZIP terbaru.
