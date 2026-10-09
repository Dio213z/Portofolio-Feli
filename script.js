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
    content.innerHTML = '<p>A small session for one big step. Choose duration, take a breath, and start learning.</p><div class="focus-options" aria-label="Session duration"><button data-minutes="25" aria-pressed="true">Focus 25 m</button><button data-minutes="5" aria-pressed="false">Break 5 m</button><button data-minutes="1" aria-pressed="false">Try 1 m</button></div><div class="timer-display"><span class="timer-flower" aria-hidden="true">✿</span><span id="timer-clock" role="timer" aria-label="Remaining time">25:00</span></div><div class="demo-actions"><button id="timer-toggle" class="button">Start session ▷</button><button id="timer-reset" class="button secondary">Reset</button></div><output id="timer-status" class="result" aria-live="polite">Ready to accompany your learning time. Session stops when this window is closed.</output>';
    let total = 25 * 60, remaining = total, deadline = 0, running = false, interval;
    const clock = content.querySelector('#timer-clock'), toggle = content.querySelector('#timer-toggle'), status = content.querySelector('#timer-status');
    function paint() { clock.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`; }
    function stop() { clearInterval(interval); running = false; toggle.textContent = 'Resume ▷'; }
    function tick() {
      remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000)); paint();
      if (!remaining) { stop(); toggle.textContent = 'Start again ▷'; status.textContent = 'Session complete! Great job, you have taken one small step. ✿'; }
    }
    toggle.addEventListener('click', () => {
      if (running) { tick(); stop(); status.textContent = 'Session paused. Resume whenever you are ready.'; }
      else { if (!remaining) remaining = total; deadline = Date.now() + remaining * 1000; running = true; toggle.textContent = 'Pause Ⅱ'; status.textContent = 'Session in progress. Take it slow, you can do this.'; interval = setInterval(tick, 250); tick(); }
    });
    function reset() { stop(); remaining = total; paint(); toggle.textContent = 'Start session ▷'; status.textContent = 'Session ready to start.'; }
    content.querySelector('#timer-reset').addEventListener('click', reset);
    content.querySelectorAll('[data-minutes]').forEach(button => button.addEventListener('click', () => {
      total = Number(button.dataset.minutes) * 60; reset();
      content.querySelectorAll('[data-minutes]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    return () => clearInterval(interval);
  }
  function goal() {
    content.innerHTML = '<p>Enter your dream goal, then record small steps toward your objective. Data is saved in this browser if storage is available.</p><form id="goal-form"><label for="goal-name">Dream name</label><input id="goal-name" maxlength="60" placeholder="e.g. New Keyboard" required><div class="goal-fields"><div><label for="goal-target">Target (Rp)</label><input id="goal-target" type="number" min="1" max="1000000000000" step="1" inputmode="numeric" required></div><div><label for="goal-saved">Already saved (Rp)</label><input id="goal-saved" type="number" min="0" max="1000000000000" step="1" inputmode="numeric" required></div></div><div class="demo-actions"><button class="button" type="submit">Save goal ✧</button><button class="button secondary" id="goal-clear" type="button">Clear record</button></div></form><div class="goal-summary"><strong id="goal-percent">0%</strong><small id="goal-caption">Start from one small step.</small></div><progress id="goal-progress" value="0" max="100" aria-label="Savings percentage">0%</progress><output class="result" id="goal-result" aria-live="polite">No saved goals yet.</output>';
    const name = content.querySelector('#goal-name'), target = content.querySelector('#goal-target'), saved = content.querySelector('#goal-saved'), result = content.querySelector('#goal-result');
    const currency = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
    function valid(data) { return data && typeof data.name === 'string' && data.name.trim() && data.name.length <= 60 && Number.isSafeInteger(data.target) && data.target > 0 && data.target <= 1e12 && Number.isSafeInteger(data.saved) && data.saved >= 0 && data.saved <= 1e12; }
    function paint(data) {
      const percent = Math.min(100, data.saved / data.target * 100);
      content.querySelector('#goal-percent').textContent = `${Math.floor(percent)}%`;
      content.querySelector('#goal-progress').value = percent;
      content.querySelector('#goal-caption').textContent = `${currency.format(data.saved)} of ${currency.format(data.target)}`;
      result.textContent = percent >= 100 ? `Goal “${data.name}” achieved! Time to celebrate your efforts. ✨` : `Toward “${data.name}”: ${currency.format(data.target - data.saved)} remaining. Every bit counts!`;
    }
    try { const data = JSON.parse(localStorage.getItem('feli-angpao')); if (valid(data)) { name.value = data.name; target.value = data.target; saved.value = data.saved; paint(data); } } catch {}
    if (!saved.value) saved.value = 0;
    content.querySelector('#goal-form').addEventListener('submit', event => {
      event.preventDefault(); const data = { name: name.value.trim(), target: Number(target.value), saved: Number(saved.value) };
      if (!valid(data)) { result.textContent = 'Please enter a valid dream name and round number. Target must be greater than zero.'; return; }
      paint(data);
      try { localStorage.setItem('feli-angpao', JSON.stringify(data)); } catch { result.textContent += ' Browser storage unavailable; this record will only remain while the window is open.'; }
    });
    content.querySelector('#goal-clear').addEventListener('click', () => {
      try { localStorage.removeItem('feli-angpao'); } catch {}
      name.value = ''; target.value = ''; saved.value = 0;
      content.querySelector('#goal-progress').value = 0; content.querySelector('#goal-percent').textContent = '0%';
      content.querySelector('#goal-caption').textContent = 'Start from one small step.'; result.textContent = 'Record deleted. Ready to write a new dream?'; name.focus();
    });
  }
  function memory() {
    content.innerHTML = '<p>Flip two cards and match identical symbols. Six small pairs are waiting to be found!</p><div class="memory-status"><span id="memory-moves">Moves: 0</span><span id="memory-pairs">Pairs: 0/6</span></div><div class="memory-grid" aria-label="Festival Memory board"></div><button id="memory-reset" class="button secondary">Shuffle &amp; play again ↻</button><output class="result" id="memory-result" aria-live="polite">Pick your first card.</output>';
    const symbols = ['🌸', '🏮', '🧧', '☁️', '🎀', '🐉'];
    const labels = ['cherry blossom', 'lantern', 'red envelope', 'cloud', 'ribbon', 'dragon'];
    const board = content.querySelector('.memory-grid'), result = content.querySelector('#memory-result');
    let first = null, locked = false, moves = 0, pairs = 0, timeout;
    function start() {
      clearTimeout(timeout); first = null; locked = false; moves = 0; pairs = 0; board.replaceChildren();
      const cards = [...symbols.keys(), ...symbols.keys()];
      for (let i = cards.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }
      cards.forEach((symbol, i) => {
        const card = document.createElement('button'); card.type = 'button'; card.className = 'memory-card'; card.textContent = '✿'; card.dataset.symbol = symbol;
        const hide = () => { card.textContent = '✿'; card.classList.remove('is-open'); card.setAttribute('aria-label', `Card ${i + 1}, closed`); card.setAttribute('aria-pressed', 'false'); };
        hide(); card.hide = hide;
        card.addEventListener('click', () => {
          if (locked || card === first || card.disabled) return;
          card.textContent = symbols[symbol]; card.classList.add('is-open'); card.setAttribute('aria-label', `Card ${i + 1}, ${labels[symbol]}`); card.setAttribute('aria-pressed', 'true');
          if (!first) { first = card; result.textContent = `You opened ${labels[symbol]}. Find its pair.`; return; }
          moves++; content.querySelector('#memory-moves').textContent = `Moves: ${moves}`;
          if (first.dataset.symbol === card.dataset.symbol) {
            [first, card].forEach(item => { item.disabled = true; item.classList.add('is-matched'); }); first = null; pairs++;
            content.querySelector('#memory-pairs').textContent = `Pairs: ${pairs}/6`;
            result.textContent = pairs === 6 ? `Completed! All pairs found in ${moves} moves. You are amazing! ✨` : 'Pair matched! Keep going. ✧';
          } else {
            locked = true; result.textContent = 'Not a match yet. Remember their positions, then try again.';
            timeout = setTimeout(() => { first.hide(); card.hide(); first = null; locked = false; }, 850);
          }
        }); board.append(card);
      });
      content.querySelector('#memory-moves').textContent = 'Moves: 0'; content.querySelector('#memory-pairs').textContent = 'Pairs: 0/6'; result.textContent = 'Pick your first card.';
    }
    content.querySelector('#memory-reset').addEventListener('click', start); start();
    return () => clearTimeout(timeout);
  }
})();
