(function () {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy') || '';
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = 'Copiado ✓';
      } catch {
        btn.textContent = 'Não foi possível copiar';
      }
      setTimeout(() => (btn.textContent = original), 1800);
    });
  });
})();
