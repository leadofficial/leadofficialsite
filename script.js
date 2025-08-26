// ========= Reveal + footer year =========
(() => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ========= Mobile menu toggle =========
(() => {
  const btn   = document.getElementById('mobile-menu-btn');
  const panel = document.getElementById('mobile-menu');
  const openI = document.getElementById('icon-open');
  const closeI= document.getElementById('icon-close');
  if (!btn || !panel) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('hidden', !open);
    if (openI)  openI.classList.toggle('hidden', open);
    if (closeI) closeI.classList.toggle('hidden', !open);
  };

  btn.addEventListener('click', () => setOpen(panel.classList.contains('hidden')));
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
})();

// ========= EPK Modal + Formspree (AJAX, no redirect) =========
(() => {
  const openBtn  = document.getElementById('open-epk-modal');
  const modal    = document.getElementById('epk-modal');
  const backdrop = document.getElementById('epk-backdrop');
  const closeBtn = document.getElementById('close-epk-modal');
  const form     = document.getElementById('epk-form');

  if (!openBtn || !modal || !form) return;

  // UI
  const openModal  = () => { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { modal.classList.add('hidden');    document.body.style.overflow = ''; };

  openBtn.addEventListener('click', openModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });

  // Status + submit
  const msg = document.getElementById('epk-msg');                       // <p id="epk-msg">
  const submitBtn = form.querySelector('button[type="submit"]');        // przycisk w formularzu

  // Safety catch
  form.removeAttribute('target');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    if (msg) {
      msg.classList.remove('hidden', 'text-red-400', 'text-green-400');
      msg.textContent = 'Sending…';
    }

    try {
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }, // Formspree no redirect
        redirect: 'manual'
      });

      if (res.ok) {
        form.reset();
        if (msg) {
          msg.textContent = 'Thanks for reaching out. The EPK will be sent to your email address shortly.';
          msg.classList.add('text-green-400');
        }
        if (submitBtn) submitBtn.textContent = 'Sent ✓';
        setTimeout(closeModal, 10000);
      } else {
        if (msg) {
          msg.textContent = 'Oops — something went wrong. Try again or email: contact@leadofficial.com';
          msg.classList.add('text-red-400');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send request';
        }
      }
    } catch (err) {
      if (msg) {
        msg.textContent = 'Network error. Please try again.';
        msg.classList.add('text-red-400');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send request';
      }
    }
  });
})();