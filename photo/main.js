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
  { src: 'assets/MariaLiadovaweb8_P.png', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb11_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb12_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb13_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb18_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb19_P.jpeg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb25_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb34_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb35_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb37_P.jpg', title: 'Portrait', cat: 'P' },
  { src: 'assets/MariaLiadovaweb4_L.jpg', title: 'Landscape', cat: 'L' },
  { src: 'assets/MariaLiadovaweb5_L.jpg', title: 'Landscape', cat: 'L' },
  { src: 'assets/MariaLiadovaweb20_L.jpg', title: 'Landscape', cat: 'L' },
  { src: 'assets/MariaLiadovaweb1_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb2_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb10_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb26_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb27_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb28_A.jpg', title: 'Architecture', cat: 'L' },
  { src: 'assets/MariaLiadovaweb14_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb15_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb17_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb21_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb22_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb23_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb29_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb30_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb31_R.jpg', title: 'Reportage', cat: 'R' },
  { src: 'assets/MariaLiadovaweb32_R.jpg', title: 'Reportage', cat: 'R' },
];

const rowOrder = ['P', 'L', 'R'];

// ───── Render auto-scrolling rows ─────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;

  rowOrder.forEach((cat, r) => {
    const catPhotos = shuffle(photos.filter((p) => p.cat === cat));
    if (!catPhotos.length) return;

    const row = document.createElement('div');
    row.className = 'photo-row';

    const track = document.createElement('div');
    const dir = r % 2 === 0 ? 'left' : 'right';
    track.className = `photo-row__track photo-row__track--${dir}`;

    [...catPhotos, ...catPhotos].forEach((p) => {
      const idx = photos.indexOf(p);
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.title;
      img.addEventListener('click', () => openLightbox(idx));
      track.appendChild(img);
    });

    row.appendChild(track);
    grid.appendChild(row);
  });
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

// ───── Drag-to-scroll on photo rows ─────

const ANIM_DURATION = 90;

document.querySelectorAll('.photo-row').forEach((row) => {
  const track = row.querySelector('.photo-row__track');
  if (!track) return;

  const isLeft = track.classList.contains('photo-row__track--left');
  const animName = isLeft ? 'scroll-left' : 'scroll-right';

  let isDragging = false;
  let isHovering = false;
  let hasDragged = false;
  let startX = 0;
  let baseX = 0;

  track.querySelectorAll('img').forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  function getTranslateX() {
    const style = getComputedStyle(track);
    if (!style.transform || style.transform === 'none') return 0;
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }

  function px(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  function resumeAnimation(fromX) {
    const halfWidth = track.scrollWidth / 2;

    let norm = fromX % halfWidth;
    if (norm > 0) norm -= halfWidth;
    if (norm < -halfWidth) norm += halfWidth;

    const progress = isLeft
      ? -norm / halfWidth
      : 1 + norm / halfWidth;

    const delay = -(progress * ANIM_DURATION);
    track.style.transform = '';
    track.style.animation = `${animName} ${ANIM_DURATION}s linear infinite`;
    track.style.animationDelay = `${delay}s`;
  }

  function onStart(e) {
    isDragging = true;
    hasDragged = false;
    startX = px(e);
    baseX = getTranslateX();
    track.style.animation = 'none';
    track.style.transform = `translateX(${baseX}px)`;
  }

  function onMove(e) {
    if (!isDragging) return;
    const delta = px(e) - startX;
    if (Math.abs(delta) > 3) hasDragged = true;
    if (hasDragged && e.cancelable) e.preventDefault();
    track.style.transform = `translateX(${baseX + delta}px)`;
  }

  function pauseTrack() {
    const x = getTranslateX();
    track.style.animation = 'none';
    track.style.transform = `translateX(${x}px)`;
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (isHovering) {
      pauseTrack();
    } else {
      resumeAnimation(getTranslateX());
    }
  }

  row.addEventListener('mouseenter', () => {
    isHovering = true;
    if (!isDragging) pauseTrack();
  });

  row.addEventListener('mouseleave', () => {
    isHovering = false;
    if (!isDragging) resumeAnimation(getTranslateX());
  });

  row.addEventListener('mousedown', onStart);
  row.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  track.addEventListener('click', (e) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged = false;
    }
  }, true);
});
