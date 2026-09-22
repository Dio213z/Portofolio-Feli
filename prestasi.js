"use strict";
(() => {
  const grid = document.querySelector("#achievement-grid");
  const status = document.querySelector("#gallery-status");
  const empty = document.querySelector("#achievement-empty");
  const viewer = document.querySelector("#achievement-viewer");
  const viewerImage = document.querySelector("#viewer-image");
  let opener;
  let shown = 0;
  document.querySelector("#close-viewer").addEventListener("click", () => viewer.close());
  viewer.addEventListener("close", () => opener?.focus());
  viewer.addEventListener("click", event => {
    const box = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) viewer.close();
  });
  function loadImage(path) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = path;
    });
  }
  function addCard(image, file) {
    const number = file.match(/^prestasi([1-9]\d*)\./i)[1];
    const title = "Pencapaian " + number;
    const article = document.createElement("article");
    article.className = "achievement-card";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "achievement-open";
    button.setAttribute("aria-label", "Pratinjau " + title);
    image.alt = "Dokumentasi " + title + " — Feli Maulidina Azzahira";
    image.decoding = "async";
    const frame = document.createElement("div");
    frame.className = "achievement-image";
    frame.append(image);
    const caption = document.createElement("div");
    caption.className = "achievement-caption";
    const heading = document.createElement("h2");
    heading.textContent = title;
    const hint = document.createElement("span");
    hint.textContent = "Perbesar ↗";
    caption.append(heading, hint);
    button.append(frame, caption);
    button.addEventListener("click", () => {
      opener = button;
      document.querySelector("#viewer-title").textContent = title;
      viewerImage.src = image.src;
      viewerImage.alt = image.alt;
      document.querySelector("#original-image").href = image.src;
      viewer.showModal();
    });
    article.append(button);
    grid.append(article);
    shown++;
    status.textContent = shown + " dokumentasi";
  }
  async function populate() {
    const data = window.PRESTASI_DATA;
    if (data?.generated && Array.isArray(data.files)) {
      // Vercel: daftar semua file di folder, tanpa batas nomor dan boleh ada celah.
      const files = data.files.filter(file => /^prestasi[1-9]\d*\.(png|jpe?g)$/i.test(file));
      // Batches menjaga jumlah unduhan bersamaan; urutan tetap berdasarkan nomor.
      for (let offset = 0; offset < files.length; offset += 6) {
        const batch = files.slice(offset, offset + 6);
        const images = await Promise.all(batch.map(file => loadImage("asset/" + file)));
        images.forEach((image, index) => { if (image) addCard(image, batch[index]); });
      }
      if (shown < files.length) status.textContent = shown + " dokumentasi · Beberapa gambar tidak dapat dimuat. Coba muat ulang halaman.";
    } else {
      // File HTML langsung / hosting tanpa build: nomor harus mulai 1 dan berurutan.
      // Tidak memakai fetch agar juga bekerja dengan file://.
      for (let number = 1; ; number++) {
        let found = false;
        for (const extension of ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"]) {
          const file = "prestasi" + number + "." + extension;
          const image = await loadImage("asset/" + file);
          if (image) { addCard(image, file); found = true; break; }
        }
        if (!found) break;
      }
    }
    grid.setAttribute("aria-busy", "false");
    empty.hidden = shown > 0;
    if (!shown) status.textContent = "Belum ada dokumentasi yang dapat ditampilkan.";
  }
  populate().catch(() => {
    grid.setAttribute("aria-busy", "false");
    empty.hidden = shown > 0;
    status.textContent = "Arsip belum selesai dimuat. Coba segarkan halaman.";
  });
})();
