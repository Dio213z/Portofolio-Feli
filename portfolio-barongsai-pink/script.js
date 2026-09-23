"use strict";
(() => {
  const dialog = document.querySelector('#demo-dialog');
  const content = document.querySelector('#demo-content');
  let opener, cleanup = () => {};
  const demos = { focus: ['Sakura Focus', focus], goal: ['Angpao Goal', goal], memory: ['Festival Memory', memory] };
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { cleanup(); cleanup = () => {}; opener?.focus(); });
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  document.querySelectorAll('[data-demo]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      opener = button; cleanup();
      const demo = demos[button.dataset.demo];
      document.querySelector('#demo-title').textContent = demo[0];
      content.replaceChildren(); cleanup = demo[1]() || (() => {});
      dialog.showModal();
    });
  });
  function focus() {
    content.innerHTML = '<p>Satu sesi kecil untuk satu langkah besar. Pilih durasi, tarik napas, lalu mulai belajar.</p><div class="focus-options" aria-label="Durasi sesi"><button data-minutes="25" aria-pressed="true">Fokus 25 m</button><button data-minutes="5" aria-pressed="false">Jeda 5 m</button><button data-minutes="1" aria-pressed="false">Coba 1 m</button></div><div class="timer-display"><span class="timer-flower" aria-hidden="true">✿</span><span id="timer-clock" role="timer" aria-label="Sisa waktu">25:00</span></div><div class="demo-actions"><button id="timer-toggle" class="button">Mulai sesi ▷</button><button id="timer-reset" class="button secondary">Ulangi</button></div><output id="timer-status" class="result" aria-live="polite">Siap menemani waktu belajarmu. Sesi berhenti ketika jendela ini ditutup.</output>';
    let total = 25 * 60, remaining = total, deadline = 0, running = false, interval;
    const clock = content.querySelector('#timer-clock'), toggle = content.querySelector('#timer-toggle'), status = content.querySelector('#timer-status');
    function paint() { clock.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`; }
    function stop() { clearInterval(interval); running = false; toggle.textContent = 'Lanjutkan ▷'; }
    function tick() {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); paint();
      if (!remaining) { stop(); toggle.textContent = 'Mulai lagi ▷'; status.textContent = 'Sesi selesai! Hebat, satu langkah kecil sudah kamu lakukan. ✿'; }
    }
    toggle.addEventListener('click', () => {
      if (running) { tick(); stop(); status.textContent = 'Sesi dijeda. Lanjutkan saat kamu siap.'; }
      else { if (!remaining) remaining = total; deadline = Date.now() + remaining * 1000; running = true; toggle.textContent = 'Jeda Ⅱ'; status.textContent = 'Sesi berjalan. Pelan-pelan, kamu pasti bisa.'; interval = setInterval(tick, 250); tick(); }
    });
    function reset() { stop(); remaining = total; paint(); toggle.textContent = 'Mulai sesi ▷'; status.textContent = 'Sesi siap dimulai.'; }
    content.querySelector('#timer-reset').addEventListener('click', reset);
    content.querySelectorAll('[data-minutes]').forEach(button => button.addEventListener('click', () => {
      total = Number(button.dataset.minutes) * 60; reset();
      content.querySelectorAll('[data-minutes]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    return () => clearInterval(interval);
  }
  function goal() {
    content.innerHTML = '<p>Isi target impianmu, lalu catat langkah kecil menuju tujuan. Data tersimpan di browser ini jika penyimpanan tersedia.</p><form id="goal-form"><label for="goal-name">Nama impian</label><input id="goal-name" maxlength="60" placeholder="Contoh: Keyboard baru" required><div class="goal-fields"><div><label for="goal-target">Target (Rp)</label><input id="goal-target" type="number" min="1" max="1000000000000" step="1" inputmode="numeric" required></div><div><label for="goal-saved">Sudah terkumpul (Rp)</label><input id="goal-saved" type="number" min="0" max="1000000000000" step="1" inputmode="numeric" required></div></div><div class="demo-actions"><button class="button" type="submit">Simpan target ✧</button><button class="button secondary" id="goal-clear" type="button">Hapus catatan</button></div></form><div class="goal-summary"><strong id="goal-percent">0%</strong><small id="goal-caption">Mulai dari satu langkah kecil.</small></div><progress id="goal-progress" value="0" max="100" aria-label="Persentase tabungan">0%</progress><output class="result" id="goal-result" aria-live="polite">Belum ada target tersimpan.</output>';
    const name = content.querySelector('#goal-name'), target = content.querySelector('#goal-target'), saved = content.querySelector('#goal-saved'), result = content.querySelector('#goal-result');
    const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
    function valid(data) { return data && typeof data.name === 'string' && data.name.trim() && data.name.length <= 60 && Number.isSafeInteger(data.target) && data.target > 0 && data.target <= 1e12 && Number.isSafeInteger(data.saved) && data.saved >= 0 && data.saved <= 1e12; }
    function paint(data) {
      const percent = Math.min(100, data.saved / data.target * 100);
      content.querySelector('#goal-percent').textContent = `${Math.floor(percent)}%`;
      content.querySelector('#goal-progress').value = percent;
      content.querySelector('#goal-caption').textContent = `${currency.format(data.saved)} dari ${currency.format(data.target)}`;
      result.textContent = percent >= 100 ? `Target “${data.name}” tercapai! Saatnya merayakan usahamu. ✨` : `Menuju “${data.name}”: tinggal ${currency.format(data.target - data.saved)} lagi. Sedikit demi sedikit, jadi bukit!`;
    }
    try { const data = JSON.parse(localStorage.getItem('feli-angpao')); if (valid(data)) { name.value = data.name; target.value = data.target; saved.value = data.saved; paint(data); } } catch {}
    if (!saved.value) saved.value = 0;
    content.querySelector('#goal-form').addEventListener('submit', event => {
      event.preventDefault(); const data = { name: name.value.trim(), target: Number(target.value), saved: Number(saved.value) };
      if (!valid(data)) { result.textContent = 'Isi nama impian dan nominal rupiah bulat yang valid. Target harus lebih dari nol.'; return; }
      paint(data);
      try { localStorage.setItem('feli-angpao', JSON.stringify(data)); } catch { result.textContent += ' Penyimpanan browser tidak tersedia; catatan ini hanya berlaku selama jendela terbuka.'; }
    });
    content.querySelector('#goal-clear').addEventListener('click', () => {
      try { localStorage.removeItem('feli-angpao'); } catch {}
      name.value = ''; target.value = ''; saved.value = 0;
      content.querySelector('#goal-progress').value = 0; content.querySelector('#goal-percent').textContent = '0%';
      content.querySelector('#goal-caption').textContent = 'Mulai dari satu langkah kecil.'; result.textContent = 'Catatan dihapus. Siap menulis impian baru?'; name.focus();
    });
  }
  function memory() {
    content.innerHTML = '<p>Balik dua kartu dan temukan simbol yang sama. Ada enam pasangan kecil yang menunggu ditemukan!</p><div class="memory-status"><span id="memory-moves">Langkah: 0</span><span id="memory-pairs">Pasangan: 0/6</span></div><div class="memory-grid" aria-label="Papan Festival Memory"></div><button id="memory-reset" class="button secondary">Acak & main lagi ↻</button><output class="result" id="memory-result" aria-live="polite">Pilih kartu pertamamu.</output>';
    const symbols = ['🌸', '🏮', '🧧', '☁️', '🎀', '🐉'];
    const labels = ['sakura', 'lampion', 'angpao', 'awan', 'pita', 'naga'];
    const board = content.querySelector('.memory-grid'), result = content.querySelector('#memory-result');
    let first = null, locked = false, moves = 0, pairs = 0, timeout;
    function start() {
      clearTimeout(timeout); first = null; locked = false; moves = 0; pairs = 0; board.replaceChildren();
      const cards = [...symbols.keys(), ...symbols.keys()];
      for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }
      cards.forEach((symbol, i) => {
        const card = document.createElement('button'); card.type = 'button'; card.className = 'memory-card'; card.textContent = '✿'; card.dataset.symbol = symbol;
        const hide = () => { card.textContent = '✿'; card.classList.remove('is-open'); card.setAttribute('aria-label', `Kartu ${i + 1}, tertutup`); card.setAttribute('aria-pressed', 'false'); };
        hide(); card.hide = hide;
        card.addEventListener('click', () => {
          if (locked || card === first || card.disabled) return;
          card.textContent = symbols[symbol]; card.classList.add('is-open'); card.setAttribute('aria-label', `Kartu ${i + 1}, ${labels[symbol]}`); card.setAttribute('aria-pressed', 'true');
          if (!first) { first = card; result.textContent = `Kamu membuka ${labels[symbol]}. Cari pasangannya.`; return; }
          moves++; content.querySelector('#memory-moves').textContent = `Langkah: ${moves}`;
          if (first.dataset.symbol === card.dataset.symbol) {
            [first, card].forEach(item => { item.disabled = true; item.classList.add('is-matched'); }); first = null; pairs++;
            content.querySelector('#memory-pairs').textContent = `Pasangan: ${pairs}/6`;
            result.textContent = pairs === 6 ? `Selesai! Semua pasangan ditemukan dalam ${moves} langkah. Kamu hebat! ✨` : 'Pasangan cocok! Lanjutkan. ✧';
          } else {
            locked = true; result.textContent = 'Belum cocok. Ingat posisinya, lalu coba lagi.';
            timeout = setTimeout(() => { first.hide(); card.hide(); first = null; locked = false; }, 850);
          }
        }); board.append(card);
      });
      content.querySelector('#memory-moves').textContent = 'Langkah: 0'; content.querySelector('#memory-pairs').textContent = 'Pasangan: 0/6'; result.textContent = 'Pilih kartu pertamamu.';
    }
    content.querySelector('#memory-reset').addEventListener('click', start); start();
    return () => clearTimeout(timeout);
  }
})();
