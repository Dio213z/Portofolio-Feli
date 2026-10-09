/* PINK BARONGSAI — single place to manage all photos.
   Use direct image URLs https://... or local paths assets/name.jpg.
   Do not use album page links, login links, or markdown syntax. */
const portfolioConfig = {
  // CHANGE PHOTO URLS IN THIS SECTION
  photos: {
    hero: "assets/gunung-pink.png", // main photo replacing hero mascot
    heroBackground: "assets/gunung-pink.jpg", // subtle background photo on main page
    profile: "https://files.catbox.moe/ozoqvf.jpg",
    portfolio1: "assets/barongsai-1.jpg",
    portfolio2: "assets/barongsai-2.jpg",
    portfolio3: "assets/barongsai-3.jpg",
    closing: "https://files.catbox.moe/0anopu.jpg"
  },
  // Original photo from ZIP used as is; without altering face, clothing, or pose.
  photoAlt: {
    profile: "Original photo of Feli Maulidina Azzahira",
    closing: "Feli Maulidina Azzahira — opening notes of my journey in Software Engineering"
  },
  // Decorations can also be replaced here.
  artwork: {
    mascot: "assets/barongsai-mascot.png", // main hero mascot
    friends: "assets/barongsai-friends.png" // three different characters, 3-column atlas
  },
  contact: {
    email: "felimaulidina02@gmail.com",
    instagram: "fell.and.fly_"
  },
  // All gallery/achievement photos are also managed via config.js.
  achievements: []
};
window.portfolioConfig = portfolioConfig;
// Compatibility with previous contact settings.
window.PORTFOLIO_CONTACT = portfolioConfig.contact;
window.PORTFOLIO_PROFILE = { imageUrl: portfolioConfig.photos.profile, imageAlt: portfolioConfig.photoAlt.profile };
