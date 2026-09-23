"use strict";
(() => {
  const grid = document.querySelector('#achievement-grid'), status = document.querySelector('#gallery-status'), empty = document.querySelector('#achievement-empty');
  const viewer = document.querySelector('#achievement-viewer'), viewerImage = document.querySelector('#viewer-image');
  let opener;
  document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => opener?.focus());
  viewer.addEventListener('click', event => {
    const box = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) viewer.close();
  });
  const entries = Array.isArray(window.portfolioConfig?.achievements) ? window.portfolioConfig.achievements : [];
  let shown = 0;
  entries.forEach((entry, index) => {
    const url = window.portfolioImageURL(entry?.url);
    if (!url) return;
    const title = typeof entry.title === 'string' && entry.title.trim() ? entry.title : `Pencapaian ${index + 1}`;
    const article = document.createElement('article'); article.className = 'achievement-card';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'achievement-open'; button.setAttribute('aria-label', `Pratinjau ${title}`);
    const frame = document.createElement('div'); frame.className = 'achievement-image';
    const img = new Image(); img.loading = 'lazy'; img.decoding = 'async'; img.alt = typeof entry.alt === 'string' ? entry.alt : `Dokumentasi ${title} — Feli`;
    img.onerror = () => { img.hidden = true; const text = document.createElement('span'); text.className = 'photo-unavailable'; text.textContent = 'Foto tidak dapat dimuat'; frame.append(text); button.disabled = true; };
    img.onload = () => { frame.style.setProperty('--image-ratio', img.naturalWidth / img.naturalHeight); };
    img.src = url; frame.append(img);
    const caption = document.createElement('div'); caption.className = 'achievement-caption';
    const heading = document.createElement('h2'); heading.textContent = title;
    const hint = document.createElement('span'); hint.textContent = 'Perbesar ↗'; caption.append(heading, hint); button.append(frame, caption);
    button.addEventListener('click', () => { opener = button; document.querySelector('#viewer-title').textContent = title; viewerImage.src = url; viewerImage.alt = img.alt; document.querySelector('#original-image').href = url; viewer.showModal(); });
    article.append(button); grid.append(article); shown++;
  });
  grid.setAttribute('aria-busy', 'false'); empty.hidden = shown > 0;
  status.textContent = shown ? `${shown} dokumentasi` : 'Ruang untuk pencapaian berikutnya.';
})();
