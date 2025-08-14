// Reveal + rok w stopce
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

<script>
  (function () {
    const btn = document.getElementById('menu-toggle');
    const panel = document.getElementById('mobile-menu');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('hidden') === false; // po toggle hidden zwraca bool
      btn.setAttribute('aria-expanded', String(open));
    });

    // schowaj panel po kliknięciu w link (i zrób płynny scroll jeśli masz nasz skrypt)
    panel.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  })();
</script>