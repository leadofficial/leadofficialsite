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
    function qs(id) { return document.getElementById(id); }
    const btn = qs('menu-toggle');
    const panel = qs('mobile-menu');

    if (!btn || !panel) return;

    // helpery
    const openMenu = () => {
      panel.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('overflow-hidden'); // blokuje scroll w tle (iOS)
    };
    const closeMenu = () => {
      panel.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('overflow-hidden');
    };
    const toggleMenu = () => {
      panel.classList.contains('hidden') ? openMenu() : closeMenu();
    };

    // klik w hamburgera
    btn.addEventListener('click', toggleMenu, { passive: true });

    // klik w link w panelu — zamknij
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu, { passive: true });
    });

    // klik poza panelem — zamknij
    document.addEventListener('click', (e) => {
      if (panel.classList.contains('hidden')) return;
      const insidePanel = e.target.closest('#mobile-menu');
      const isButton    = e.target.closest('#menu-toggle');
      if (!insidePanel && !isButton) closeMenu();
    }, { passive: true });

    // zabezpieczenie: jeśli układ zmieni się na desktop, schowaj panel
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener ? mq.addEventListener('change', () => mq.matches && closeMenu())
                        : mq.addListener(() => mq.matches && closeMenu());
  })();
</script>