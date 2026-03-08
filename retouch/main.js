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
// Add your retouch images here. Each entry needs:
//   src:      path to the image file
//   title:    project/photo name

const photos = [
  { src: 'assets/1.png', title: 'Retouch 1' },
  { src: 'assets/2.png', title: 'Retouch 2' },
  { src: 'assets/3.png', title: 'Retouch 3' },
  { src: 'assets/4.png', title: 'Retouch 4' },
  { src: 'assets/5.png', title: 'Retouch 5' },
  { src: 'assets/6.png', title: 'Retouch 6' },
  { src: 'assets/7.png', title: 'Retouch 7' },
  { src: 'assets/8.png', title: 'Retouch 8' },
  { src: 'assets/9.png', title: 'Retouch 9' },
  { src: 'assets/10.png', title: 'Retouch 10' },
  { src: 'assets/11.png', title: 'Retouch 11' },
  { src: 'assets/12.png', title: 'Retouch 12' },
  { src: 'assets/13.png', title: 'Retouch 13' },
  { src: 'assets/14.png', title: 'Retouch 14' },
  { src: 'assets/15.png', title: 'Retouch 15' },
  { src: 'assets/16.png', title: 'Retouch 16' },
];

// ───── Render full-screen vertical gallery ─────

function renderPhotoGrid() {
  const grid = document.getElementById('photo-grid');
  if (!grid || !photos.length) return;

  photos.forEach((p, idx) => {
    const item = document.createElement('div');
    item.className = 'retouch-item';

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.title;
    img.addEventListener('click', () => openLightbox(idx));

    item.appendChild(img);
    grid.appendChild(item);
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
