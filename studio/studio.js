// Swap these six anytime. href goes to the matching site.
const selected = [
  { src: '../photo/assets/MariaLiadovaweb15_P.jpg', href: '../photo/portraits.html' },
  { src: '../assets/bqplGd-ep3o_preview.jpeg', href: '../projects.html' },
  { src: '../retouch/assets/1_1.png', href: '../retouch/' },
  { src: '../photo/assets/MariaLiadovaweb3_P.jpeg', href: '../photo/portraits.html' },
  { src: '../assets/videos/XeDyXuUMLI0.png', href: '../projects.html' },
  { src: '../retouch/assets/16.png', href: '../retouch/' },
];

function renderSelected() {
  const grid = document.getElementById('studio-selected');
  if (!grid) return;

  selected.forEach((item) => {
    const a = document.createElement('a');
    a.href = item.href;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';

    a.appendChild(img);
    grid.appendChild(a);
  });
}

renderSelected();

const menuBtn = document.querySelector('.header__menu');
const navOverlay = document.querySelector('.nav-overlay');
const closeBtn = document.querySelector('.nav-overlay__close');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  navOverlay.classList.toggle('is-active', open);
  navOverlay.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => {
  setMenu(!document.body.classList.contains('menu-open'));
});

if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));

navOverlay.querySelectorAll('.nav-overlay__links a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});
