(function () {
  const enterBtn = document.querySelector('.cta');
  const doors = document.querySelector('.doors');

  const COVER_HTML = `
  <div class="cover-root" id="coverRoot" style="opacity:0">
    <header class="topbar">
      <div class="container-fluid">
        <div class="row gx-0 align-items-center">
          <!-- LEFT: hamburger + search -->
          <div class="col-4 d-flex align-items-center gap-2 gap-md-3 ps-2 ps-md-3">
            <!-- Hamburger -->
            <button class="icon-btn js-menu-open icon-menu-thin" aria-label="Open menu" title="Menu">
              <svg viewBox="0 0 24 24" class="icon-svg">
                <path d="M3 6h18M3 12h18M3 18h18"></path>
              </svg>
            </button>

            <!-- Search (hidden on the very smallest screens) -->
            <a class="icon-btn icon-search-thin d-none d-sm-inline-flex"
               href="https://treviark.storera.ge/search" aria-label="Search" title="Search">
              <svg viewBox="0 0 24 24" class="icon-svg">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M16.5 16.5L21 21"></path>
              </svg>
            </a>
          </div>

          <!-- CENTER: brand -->
          <div class="col-4 text-center">
            <a class="d-inline-flex justify-content-center brand" href="https://treviark.storera.ge/">
              <img class="img-fluid brand-img" width="781" height="352" src="logo (1).png" alt="Treviark" />
            </a>
          </div>

          <!-- RIGHT: profile + wishlist + cart(0) -->
          <div class="col-4 d-flex justify-content-end align-items-center gap-2 gap-md-3 pe-2 pe-md-3">
            <!-- User (md+) -->
            <a class="icon-btn icon-user-sharp-thin d-none d-md-inline-flex"
               href="https://treviark.storera.ge/" aria-label="Profile" title="Profile">
              <svg viewBox="0 0 24 24" class="icon-svg">
                <circle cx="12" cy="8" r="3"></circle>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6"></path>
              </svg>
            </a>

            <!-- Wishlist (sm+) -->
            <a class="icon-btn icon-heart-thin d-none d-sm-inline-flex"
               href="https://treviark.storera.ge/cp/wishlist" aria-label="Wishlist" title="Wishlist">
              <svg viewBox="0 0 24 24" class="icon-svg">
                <path d="M12 21s-7-4.5-9-8.5A5.5 5.5 0 0 1 12 7a5.5 5.5 0 0 1 9 5.5C19 16.5 12 21 12 21z"></path>
              </svg>
            </a>

            <!-- Cart (always shown; count hidden on xs) -->
            <a class="icon-btn icon-bag-thin d-inline-flex align-items-center gap-1"
               href="https://treviark.storera.ge/cart" aria-label="Cart" title="Cart">
              <svg viewBox="0 0 24 24" class="icon-svg">
                <path d="M6 7h12l-1 12H7L6 7z"></path>
                <path d="M9 7a3 3 0 0 1 6 0"></path>
              </svg>
              <span class="cart-count d-none d-md-inline">(0)</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Slide-in side menu -->
    <aside class="side-menu" id="sideMenu" aria-hidden="true">
      <div class="side-menu__inner">
        <div class="d-flex justify-content-end">
          <button class="side-menu__close js-menu-close" aria-label="Close menu">CLOSE</button>
        </div>
        <hr class="side-menu__rule"/>
        <nav class="side-menu__nav">
          <a href="https://treviark.storera.ge/">Home</a>
          <a href="https://treviark.storera.ge/house">House</a>
          <a href="https://treviark.storera.ge/">Shop</a>
          <a href="https://treviark.storera.ge/society">Society</a>
          <a href="https://treviark.storera.ge/contact">Contact</a>
        </nav>
      </div>
    </aside>
    <div class="side-scrim" id="sideScrim" hidden></div>

    <section class="cover">
  <video class="cover-video"
         src="cover-mobile.mp4"
         muted autoplay loop playsinline webkit-playsinline preload="auto"
         poster="heroCover.jpg"></video>

  <img class="cover-img" src="heroCover.jpg" alt="Cover" />

  <!-- TEXT: desktop uses absolute; mobile will override to flow -->
  <div class="cover-copy"
       style="position:absolute; left:50%; top:25%; transform:translate(-50%,0);
              text-align:center; color:#fff; z-index:3;">
    <h2 class="section-title" style="margin:0; font-weight:600;">House of rarity</h2>

    <h3 class="lead fw-semibold" style="margin:10px 0 0;">
      Treviark is a house where living unfolds as a respectful ritual, rooted deeply in a culture of manifold landscapes. It is a practice of care — from empirical observation to natural integrity, from creation to serving — celebrating the quiet grace of tradition and deliberation.
    </h3>

    <h3 class="lead fw-semibold" style="margin:10px 0 0;">
      Our first releases are “Georgian Breakfast” (Tea Black) and “Velvet Infusion” (Tea Green). Both originate from Georgian plantations left untouched for nearly a century, where the cold winters naturally protect the bushes and allow them to thrive without artificial influence. Nothing is added, only revealed.
    </h3>

    <h3 class="lead fw-semibold" style="margin:10px 0 0;">
      More announcements will follow.
    </h3>
  </div>

  <!-- SHOP link -->
  <div class="cover-title"
       style="position:absolute; left:50%; top:75%; transform:translate(-50%,0);
              color:#fff; font-weight:700; letter-spacing:.08em;
              text-shadow:0 2px 12px rgba(0,0,0,.35); text-align:center; margin-top:20px; z-index:3;">
    <a href="https://treviark.storera.ge/" style="color:inherit; text-decoration:none;">Shop</a>
  </div>
</section>

  </div>
`;

  function initCoverMenu() {
    const menu = document.getElementById('sideMenu');
    const scrim = document.getElementById('sideScrim');
    const openBtn = document.querySelector('.js-menu-open');
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

  function preload(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  }

  async function openDoorsThenReveal() {
    if (!enterBtn || !doors) return;
    if (document.getElementById('coverRoot')) return; // prevent duplicates

    document.body.classList.add('animating');
    document.body.insertAdjacentHTML('beforeend', COVER_HTML);
    initCoverMenu();

    const coverImg = document.querySelector('#coverRoot .cover-img');
    if (coverImg && coverImg.getAttribute('src')) {
      await preload(coverImg.getAttribute('src'));
    }

    doors.classList.add('active');

    requestAnimationFrame(() => {
      document.getElementById('coverRoot').style.opacity = '1';
      const hero = document.querySelector('.hero');
      if (hero) hero.style.display = 'none';

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

  enterBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    enterBtn.blur();
    openDoorsThenReveal();
  });
})();
