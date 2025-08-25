// Reveal + rok w stopce
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Mobile menu toggle
(function () {
  const btn   = document.getElementById('mobile-menu-btn');
  const panel = document.getElementById('mobile-menu');
  const openI = document.getElementById('icon-open');
  const closeI= document.getElementById('icon-close');

  if (!btn || !panel) return;

  function setOpen(open){
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('hidden', !open);
    openI.classList.toggle('hidden', open);
    closeI.classList.toggle('hidden', !open);
  }

  btn.addEventListener('click', () => {
    const open = panel.classList.contains('hidden'); // jeśli ukryty -> otwórz
    setOpen(open);
  });

  // zamknij po kliknięciu w link w panelu
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });
})();

// ------- EPK Modal + Formspree --------
(function () {
  const openBtn  = document.getElementById('open-epk-modal');
  const modal    = document.getElementById('epk-modal');
  const backdrop = document.getElementById('epk-backdrop');
  const closeBtn = document.getElementById('close-epk-modal');
  const cancelBtn= document.getElementById('cancel-epk');
  const form     = document.getElementById('epk-form');
  const statusEl = document.getElementById('epk-status');
  const submitEl = document.getElementById('submit-epk');

  if (!openBtn || !modal) return;

  function openModal()  { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function closeModal() { modal.classList.add('hidden');    document.body.style.overflow = ''; }

  openBtn.addEventListener('click', openModal);
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 🔁 ZMIEŃ NA SWÓJ ENDPOINT FORMSPREE
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    const fd = new FormData(form);
    submitEl.disabled = true;
    submitEl.textContent = 'Sending…';
    statusEl.classList.add('hidden');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thanks! I’ll email you the EPK shortly.';
        statusEl.classList.remove('hidden');
        submitEl.textContent = 'Sent ✓';
        setTimeout(closeModal, 1200);
      } else {
        submitEl.disabled = false;
        submitEl.textContent = 'Send request';
        statusEl.textContent = 'Oops — something went wrong. Try again or email me: contact@leadofficial.com';
        statusEl.classList.remove('hidden');
      }
    } catch (err) {
      submitEl.disabled = false;
      submitEl.textContent = 'Send request';
      statusEl.textContent = 'Network error. Please try again.';
      statusEl.classList.remove('hidden');
    }
  });
})();

// Formspree: wysyłka EPK bez przeładowania + status
(function () {
  const form   = document.getElementById('epk-form');
  if (!form) return;
  const status = document.getElementById('epk-status');

  form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      status.textContent = 'Sending...';

      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        status.textContent = 'Thanks! I’ll email you shortly.';
        // (opcjonalnie) zamknij modal po 1.5s
        setTimeout(() => {
          status.textContent = '';
          const closeBtn = document.getElementById('epk-modal-close');
          if (closeBtn) closeBtn.click();
        }, 1500);
      } else {
        status.textContent = 'Oops, something went wrong. Try again.';
      }
    } catch (err) {
      status.textContent = 'Network error. Please try again.';
    }
  });
})();