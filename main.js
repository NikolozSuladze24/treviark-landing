(function() {
  const enterBtn = document.querySelector('.cta');
  const doors = document.querySelector('.doors');

  const COVER_HTML = `
    <div class="cover-root" id="coverRoot" style="opacity:0">
      <header class="topbar">
        <div class="container-fluid">
          <div class="row gx-0 text-center">
            <div class="col-4"><div class="d-flex align-items-center gap-3 left-icons" style="margin-top:12px;"></div></div>
            <div class="col-4">
              <a class="d-flex justify-content-center brand" href="#">
                <img class="img-fluid brand-img" width="781" height="352" src="logo (1).png" style="margin-top:0" />
              </a>
            </div>
            <div class="col-4" style="margin-top:14px;">
              <ul class="nav nav-tabs d-none d-md-flex gap-4 toplinks"
                  style="padding-top:0;padding-left:141px;padding-bottom:0;margin-top:-5px;">
                <li class="nav-item"><a class="nav-link active" href="https://treviark.storera.ge/">PROFILE</a></li>
                <li class="nav-item"><a class="nav-link" href="https://treviark.storera.ge/cp/wishlist">FAVOURITE</a></li>
                <li class="nav-item"><a class="nav-link" href="https://treviark.storera.ge/cart">CART</a></li>
              </ul>
              <div class="d-flex d-md-none align-items-center gap-3 topicons" style="margin-left:85px;">
                <a class="icon-btn" href="favourite.html">Fav</a><a class="icon-btn" href="cart.html">Cart</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section class="cover">
        <video class="cover-video"
               src="cover-mobile.mp4"
               muted autoplay loop playsinline webkit-playsinline preload="auto"
               poster="heroCover.jpg"></video>

        <img class="cover-img"
             src="heroCover.jpg"
             alt="Cover" />

        <div class="cover-title"
             style="position:absolute; left:50%; top:45%; transform:translate(-50%,-50%);
                    color:#fff; font-weight:700; letter-spacing:.08em;
                    text-shadow:0 2px 12px rgba(0,0,0,.35); text-align:center;">
          <a href="https://treviark.storera.ge/" style="color:inherit; text-decoration:none;">Shop</a>
        </div>

        <div style="position:absolute; left:50%; bottom:15%; transform:translateX(-50%);
                    text-align:center; color:#fff;">
          <h2 class="section-title" style="margin:0; font-weight:600;">House of Rarity</h2>
          <p class="lead fw-semibold" style="margin:10px 0 0;">TEXT – about us</p>
        </div>
      </section>
    </div>
  `;

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