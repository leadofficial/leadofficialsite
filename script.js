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
    const btn   = document.getElementById('mobile-menu-btn');
    const panel = document.getElementById('mobile-menu');
    const openI = document.getElementById('icon-open');
    const closeI= document.getElementById('icon-close');

    if (!btn || !panel) return;

    function setState(open) {
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('hidden', !open);
      openI.classList.toggle('hidden', open);
      closeI.classList.toggle('hidden', !open);
    }

    btn.addEventListener('click', () => {
      const isOpen = panel.classList.contains('hidden') === false;
      setState(!isOpen);
    });

    // zamknij po kliknięciu w link w panelu
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setState(false));
    });
  })();
</script>