// ───── Home hero ML → Maria Liadova animation ─────

function initHeroAnimation() {
  const nameEl = document.querySelector('.home-hero__name');
  const letterL = document.querySelector('.home-hero__letter--l');
  const typedFirst = document.querySelector('.home-hero__typed--first');
  const typedLast = document.querySelector('.home-hero__typed--last');
  const roleEl = document.querySelector('.home-hero__role');
  const heroEl = document.querySelector('.home-hero');

  if (!nameEl || !letterL) return;

  if (heroEl && window.innerWidth < 768) {
    const headerHeight = heroEl.offsetTop;
    heroEl.style.minHeight = `calc(100svh - ${headerHeight}px)`;
    heroEl.style.display = 'flex';
    heroEl.style.flexDirection = 'column';
    heroEl.style.justifyContent = 'center';
    heroEl.style.transition = 'min-height 0.8s ease';
  }

  const restFirst = 'aria ';
  const restLast = 'iadova';

  setTimeout(() => {
    letterL.classList.add('is-turned');
  }, 800);

  setTimeout(() => {
    nameEl.classList.remove('is-logo');
  }, 1800);

  setTimeout(() => {
    let i = 0;
    const total = restFirst.length + restLast.length;

    const typeInterval = setInterval(() => {
      if (i < restFirst.length) {
        typedFirst.textContent = restFirst.slice(0, i + 1);
      } else {
        typedLast.textContent = restLast.slice(0, i - restFirst.length + 1);
      }
      i++;
      if (i >= total) {
        clearInterval(typeInterval);
        setTimeout(() => {
          roleEl.classList.add('is-visible');
          if (heroEl && window.innerWidth < 768) {
            heroEl.style.minHeight = '0px';
            setTimeout(() => {
              heroEl.style.display = '';
              heroEl.style.flexDirection = '';
              heroEl.style.justifyContent = '';
            }, 800);
          }
        }, 400);
      }
    }, 80);
  }, 2600);
}

initHeroAnimation();

// ───── Mobile menu toggle ─────

const menuBtn = document.querySelector('.header__menu');
const navOverlay = document.querySelector('.nav-overlay');

menuBtn.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  navOverlay.classList.toggle('is-active', isOpen);
  navOverlay.setAttribute('aria-hidden', !isOpen);
  menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navOverlay.querySelectorAll('.nav-overlay__links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    navOverlay.classList.remove('is-active');
    navOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-label', 'Open menu');
  });
});

// ───── Photos data (single source of truth) ─────
// Add your photos here. Each entry needs:
//   src:      path to the image file
//   title:    project/photo name (shown on hover)
//   subtitle: description (shown on hover, bottom-right)

const photos = [
  { src: 'assets/MariaLiadovaweb_1.png', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_2.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_3.JPG', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_4.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_5.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_6.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_7.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_8.JPG', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_9.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_10.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_11.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_12.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_13.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_14.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_15.jpeg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_16.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_17.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_18.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_19.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_20.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_21.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_22.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_23.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_24.JPG', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_25.JPG', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_26.JPG', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_27.jpg', title: 'Project Title', subtitle: 'Photography' },
  { src: 'assets/MariaLiadovaweb_28.jpg', title: 'Project Title', subtitle: 'Photography' },
];

// ───── Render auto-scrolling rows ─────

function renderPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;

  const rowCount = 4;
  const perRow = Math.ceil(photos.length / rowCount);

  for (let r = 0; r < rowCount; r++) {
    const slice = photos.slice(r * perRow, (r + 1) * perRow);
    if (!slice.length) break;

    const row = document.createElement('div');
    row.className = 'photo-row';

    const track = document.createElement('div');
    const dir = r % 2 === 0 ? 'left' : 'right';
    track.className = `photo-row__track photo-row__track--${dir}`;

    [...slice, ...slice].forEach((p) => {
      const idx = photos.indexOf(p);
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.title;
      img.addEventListener('click', () => openLightbox(idx));
      track.appendChild(img);
    });

    row.appendChild(track);
    grid.appendChild(row);
  }
}

renderPhotoGrid();

// ───── Lightbox ─────

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');

let currentPhotoIndex = -1;

function openLightbox(index) {
  currentPhotoIndex = index;
  lightboxImg.src = photos[index].src;
  lightboxImg.alt = photos[index].title;
  lightbox.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function showPhoto(index) {
  currentPhotoIndex = ((index % photos.length) + photos.length) % photos.length;
  lightboxImg.src = photos[currentPhotoIndex].src;
  lightboxImg.alt = photos[currentPhotoIndex].title;
}

function closeLightbox() {
  lightbox.classList.remove('is-active');
  document.body.style.overflow = '';
  currentPhotoIndex = -1;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showPhoto(currentPhotoIndex - 1));
lightboxNext.addEventListener('click', () => showPhoto(currentPhotoIndex + 1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (currentPhotoIndex < 0) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPhoto(currentPhotoIndex - 1);
  if (e.key === 'ArrowRight') showPhoto(currentPhotoIndex + 1);
});
