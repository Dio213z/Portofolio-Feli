/* PINK BARONGSAI — satu tempat untuk mengatur semua foto.
   Gunakan URL gambar langsung https://... atau path lokal assets/nama.jpg.
   Jangan pakai link halaman album, link login, atau tanda [ ] ( ). */
const portfolioConfig = {
  // GANTI URL FOTO DI BAGIAN INI
  photos: {
    profile: "assets/IMG_20260922_170446_140.jpg",
    portfolio1: "assets/barongsai-1.jpg",
    portfolio2: "assets/barongsai-2.jpg",
    portfolio3: "assets/barongsai-3.jpg",
    closing: "https://files.catbox.moe/0anopu.jpg"
  },
  // Foto asli dari ZIP dipakai utuh; tidak mengubah wajah, pakaian, atau pose.
  photoAlt: {
    profile: "Foto asli Feli Maulidina Azzahira",
    closing: "Feli Maulidina Azzahira — catatan awal perjalananku di RPL"
  },
  // Dekorasi juga dapat diganti di sini.
  artwork: {
    mascot: "assets/barongsai-mascot.png", // maskot utama hero
    friends: "assets/barongsai-friends.png" // tiga karakter berbeda, atlas 3 kolom
  },
  contact: {
    email: "felimaulidina02@gmail.com",
    instagram: "fell.and.fly_"
  },
  // Semua foto galeri/prestasi juga diatur melalui config.js.
  // ZIP awal belum berisi sertifikat; jangan menganggap thumbnail sebagai prestasi.
  // Contoh setelah menaruh gambar di folder asset:
  // { title: "Sertifikat pertamaku", url: "asset/prestasi1.jpg", alt: "Sertifikat Feli" }
  achievements: []
};
window.portfolioConfig = portfolioConfig;
// Kompatibilitas dengan pengaturan kontak project sebelumnya.
window.PORTFOLIO_CONTACT = portfolioConfig.contact;
window.PORTFOLIO_PROFILE = { imageUrl: portfolioConfig.photos.profile, imageAlt: portfolioConfig.photoAlt.profile };
