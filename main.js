(function () {
  const enterBtn = document.querySelector('.cta');
  const doors = document.querySelector('.doors');
  const coverRoot = document.getElementById('coverRoot');

  // ===== Slide-in side menu =====
  function initCoverMenu() {
    const menu  = document.getElementById('sideMenu');
    const scrim = document.getElementById('sideScrim');
    const openBtn  = document.querySelector('.js-menu-open');
    const closeBtn = menu?.querySelector('.js-menu-close');

    const open = () => {
      if (!menu) return;
      menu.classList.add('open');
      document.body.classList.add('menu-open');
      if (scrim) {
        scrim.hidden = false;
        requestAnimationFrame(() => scrim.classList.add('show'));
      }
    };

    const close = () => {
      if (!menu) return;
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (scrim) {
        scrim.classList.remove('show');
        setTimeout(() => (scrim.hidden = true), 180);
      }
    };

    openBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    scrim?.addEventListener('click', close);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Image preload helper
  function preload(src) {
    return new Promise((resolve) => {
      if (!src) return resolve();
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  }

  // ===== Transition: open doors -> reveal cover =====
  async function openDoorsThenReveal() {
    if (!enterBtn || !doors || !coverRoot) return;

    // Prevent running twice
    if (!coverRoot.hasAttribute('hidden')) return;

    document.body.classList.add('animating');

    // Prepare cover: unhide, bind menu
    coverRoot.hidden = false;
    initCoverMenu();

    // Preload cover image if present
    const coverImg = coverRoot.querySelector('.cover-img');
    await preload(coverImg?.getAttribute('src'));

    // Start door animation
    doors.classList.add('active');

    // Fade in cover root, hide hero
    requestAnimationFrame(() => {
      coverRoot.style.opacity = '1';
      const hero = document.querySelector('.hero');
      if (hero) hero.style.display = 'none';

      // Switch body mode, open doors, then remove them
      requestAnimationFrame(() => {
        document.body.classList.add('cover-mode');
        doors.classList.add('open');

        setTimeout(() => {
          doors.remove();
          document.body.classList.remove('animating');
        }, 950);
      });
    });
  }

  // CTA click
  enterBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    enterBtn.blur();
    openDoorsThenReveal();
  });
})();
