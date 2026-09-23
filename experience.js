"use strict";
(() => {
  const config = window.portfolioConfig || {};
  // URL hanya berasal dari config.js, termasuk gambar dekorasi.
  function safeImageURL(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value.trim(), document.baseURI);
      if (['http:', 'https:'].includes(url.protocol) || (url.protocol === 'file:' && !/^[a-z]+:/i.test(value))) return url.href;
    } catch {}
    return '';
  }
  window.portfolioImageURL = safeImageURL;
  document.querySelectorAll('[data-photo], [data-art]').forEach(img => {
    const key = img.dataset.photo || img.dataset.art;
    const src = safeImageURL(img.hasAttribute('data-photo') ? config.photos?.[key] : config.artwork?.[key]);
    const initials = img.id === 'profile-photo' ? document.querySelector('#profile-initials') : null;
    if (config.photoAlt?.[key]) img.alt = config.photoAlt[key];
    img.decoding = 'async';
    const fail = () => {
      img.hidden = true;
      if (initials) initials.hidden = false;
      if (img.hasAttribute('data-photo') && !initials) {
        const fallback = document.createElement('span');
        fallback.className = 'photo-unavailable';
        fallback.textContent = '✿ Foto belum tersedia';
        img.parentElement.append(fallback);
      }
    };
    img.onload = () => {
      img.hidden = false;
      if (initials) initials.hidden = true;
      if (img.hasAttribute('data-photo') && img.naturalWidth && img.naturalHeight) {
        const ratio = img.naturalWidth / img.naturalHeight;
        const frame = img.closest('.photo-frame');
        if (frame) frame.style.setProperty('--image-ratio', ratio);
        const procession = img.closest('.photo-procession');
        if (procession) procession.style.setProperty('--image-ratio', ratio);
        // Dimensi HTML ikut foto baru; CSS tidak memaksa rasio foto lama.
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    };
    img.onerror = fail;
    if (src) img.src = src; else fail();
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let manualPause = false;
  try { manualPause = localStorage.getItem('feli-motion') === 'paused'; } catch {}
  const buttons = document.querySelectorAll('.motion-toggle');
  const syncMotion = () => {
    const paused = manualPause || reduced.matches;
    document.body.classList.toggle('is-paused', paused);
    buttons.forEach(button => {
      button.hidden = false;
      button.disabled = reduced.matches;
      button.setAttribute('aria-pressed', String(paused));
      button.textContent = reduced.matches ? 'Animasi minimal ✓' : paused ? 'Putar animasi ▷' : 'Jeda animasi Ⅱ';
    });
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    manualPause = !manualPause;
    try { localStorage.setItem('feli-motion', manualPause ? 'paused' : 'playing'); } catch {}
    syncMotion(); updateScroll();
  }));
  reduced.addEventListener('change', () => { syncMotion(); updateScroll(); });
  syncMotion();
  const petals = document.querySelector('.petals');
  for (let i = 0; i < 9; i++) {
    const petal = document.createElement('i');
    petal.style.cssText = `--x:${(i * 13 + 3) % 100}%;--delay:${-i * 3.1}s;--duration:${18 + i % 4 * 3}s;--drift:${i % 2 ? -55 : 55}px`;
    petals.append(petal);
  }
  const targets = document.querySelectorAll('.identity-story, .about, .skill-layout, .project, .achievement-cta, .closing-layout, .school-list li');
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    targets.forEach((target, i) => { target.classList.add('reveal'); target.style.setProperty('--reveal-delay', `${i % 3 * 65}ms`); observer.observe(target); });
  }
  // Satu requestAnimationFrame per scroll, tanpa loop animasi JavaScript permanen.
  let scheduled = false;
  const hero = document.querySelector('.hero-art');
  const progress = document.querySelector('.scroll-progress');
  function updateScroll() {
    scheduled = false;
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? Math.min(1, scrollY / height) : 0})`;
    if (hero) hero.style.setProperty('--parallax', !manualPause && !reduced.matches && innerWidth > 760 ? `${Math.min(scrollY, 750) * .035}px` : '0px');
  }
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
  addEventListener('resize', updateScroll, { passive: true });
  addEventListener('load', updateScroll);
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
  updateScroll();
})();
