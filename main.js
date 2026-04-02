// ───── Home hero ML → Maria Liadova animation ─────

function initHeroAnimation() {
  const nameEl = document.querySelector('.home-hero__name');
  const letterL = document.querySelector('.home-hero__letter--l');
  const typedFirst = document.querySelector('.home-hero__typed--first');
  const typedLast = document.querySelector('.home-hero__typed--last');
  const roleEl = document.querySelector('.home-hero__role');
  const heroEl = document.querySelector('.home-hero');

  if (!nameEl || !letterL) return;

  // On mobile, center hero on screen during animation, then slide up
  if (heroEl && window.innerWidth < 768) {
    const headerHeight = heroEl.offsetTop;
    heroEl.style.minHeight = `calc(100svh - ${headerHeight}px)`;
    heroEl.style.display = 'flex';
    heroEl.style.flexDirection = 'column';
    heroEl.style.justifyContent = 'center';
    heroEl.style.transition = 'min-height 0.8s ease';
  }

  const restFirst = 'aria ';   // M + aria  + space → "MARIA "
  const restLast = 'iadova';   // L + iadova        → "LIADOVA"

  // Step 1: After 0.8s, rotate L to normal and bring it down to baseline
  setTimeout(() => {
    letterL.classList.add('is-turned');
  }, 800);

  // Step 2: After L rotation, shrink from logo size to title size
  setTimeout(() => {
    nameEl.classList.remove('is-logo');
  }, 1800);

  // Step 3: After shrink finishes, type the remaining letters
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
        // Step 4: Fade in the role subtitle
        setTimeout(() => {
          roleEl.classList.add('is-visible');
          // Release centered layout on mobile after animation
          if (heroEl && window.innerWidth < 768) {
            heroEl.style.minHeight = '0px';
            // Clean up flex properties after min-height transition ends
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

// Close overlay when a nav link is clicked
navOverlay.querySelectorAll('.nav-overlay__links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    navOverlay.classList.remove('is-active');
    navOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-label', 'Open menu');
  });
});

// ───── Projects data (single source of truth) ─────

const projects = [
  {
    url: 'https://www.youtube.com/embed/XeDyXuUMLI0',
    title: 'Carolina Herrera Parfume Campaign',
    subtitle: 'Video Editing & Sound Design',
    horizontal: true,
    preview: 'assets/videos/XeDyXuUMLI0.png',
  },
  {
    url: 'https://www.youtube.com/embed/BwBYoTrc7sU',
    title: 'Guess summer campaign',
    subtitle: 'Video Editing & Sound Design',
    horizontal: true,
    preview: 'assets/BwBYoTrc7sU_preview.png',
  },
  {
    url: 'https://www.youtube.com/embed/MrK0Rz0e95A',
    title: 'Urban Jürgensen Brand Film',
    subtitle: 'Video Editing & Sound Design',
    horizontal: true,
    preview: 'assets/MrK0Rz0e95A_preview.jpg',
    coverExt: 'jpg',
  },
  {
    url: 'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
    title: 'Branded Content Film for Marie Claire Arabia x Audemars Piguet',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/NpclKtJgn7w_preview.png',
  },
  {
    url: 'https://www.youtube.com/embed/v44KNKzGUsk?si=eFBQsmPiv-6hxJFS',
    title: 'Branded Content Video | Dyson',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/v44KNKzGUsk_preview.jpg',
  },
  {
    url: 'https://www.youtube.com/embed/bqplGd-ep3o?si=Jzc4ZpkqQrFWxAuP',
    title: 'Dior backstage video with Deva Cassel',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/bqplGd-ep3o_preview.jpeg',
  },
  {
    url: 'https://www.youtube.com/embed/S7nfjcQHv1c?si=25fOogVqojs7gH3U',
    title: 'Zadig & Voltaire new year campaign',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/S7nfjcQHv1c_preview.jpg',
  },
  {
    url: 'https://www.youtube.com/embed/zzM6pR8PGZs?si=tLR1mzCZFQlBy9Gu',
    title: 'Сharacter-Led Social Video Series',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/zzM6pR8PGZs_preview.png',
  },
  {
    url: 'https://www.youtube.com/embed/DoADSrGTUik?si=y00pFXo21gNpBhze',
    title: 'Dior beauty backstage video',
    subtitle: 'Video Editing & Sound Design',
    preview: 'assets/videos/DoADSrGTUik.png',
  },
];

// ───── Creator projects data ─────

const creatorProjects = [
  { url: 'https://www.youtube.com/embed/D_0fOuZ-ZFU', title: '', subtitle: '', preview: 'assets/videos/D_0fOuZ-ZFU.png' },
  { url: 'https://www.youtube.com/embed/ZYOnbqwiWZA', title: '', subtitle: '', preview: 'assets/videos/ZYOnbqwiWZA.png' },
  { url: 'https://www.youtube.com/embed/oIPAioB5eFQ', title: '', subtitle: '', preview: 'assets/videos/oIPAioB5eFQ.png' },
  { url: 'https://www.youtube.com/embed/0ScdhAqw6D4', title: '', subtitle: '', preview: 'assets/videos/0ScdhAqw6D4.png' },
  { url: 'https://www.youtube.com/embed/w6hkEzmqCEc', title: '', subtitle: '', preview: 'assets/videos/w6hkEzmqCEc.png' },
  { url: 'https://www.youtube.com/embed/T-r-EGP0Yx4', title: '', subtitle: '', preview: 'assets/videos/T-r-EGP0Yx4.png' },
];

// ───── Helper: extract YouTube video ID from embed URL ─────

function getVideoId(url) {
  return url.split('/embed/')[1].split('?')[0];
}

// ───── Backdrop for dimming the page while a video plays ─────

const backdrop = document.createElement('div');
backdrop.className = 'video-backdrop';
document.body.appendChild(backdrop);

function dismissActiveVideo() {
  const playing = document.querySelector('.project-card--playing');
  if (!playing) return;
  const iframe = playing.querySelector('iframe');
  if (iframe) iframe.remove();
  playing.classList.remove('project-card--playing');
  backdrop.classList.remove('is-active');
}

backdrop.addEventListener('click', dismissActiveVideo);

// ───── Projects page: video cards ─────

function createVideoCard(project) {
  const videoId = getVideoId(project.url);
  const card = document.createElement('article');
  card.className = project.horizontal ? 'project-card project-card--horizontal' : 'project-card';
  card.id = videoId;

  const videoClass = project.horizontal ? 'project-card__video project-card__video--horizontal' : 'project-card__video';
  const overlayStyle = project.preview ? `background-image: url('${project.preview}')` : '';

  card.innerHTML = `
    <div class="${videoClass}">
      <div class="project-card__overlay" style="${overlayStyle}"></div>
    </div>
  `;

  card.querySelector('.project-card__overlay').addEventListener('click', function () {
    dismissActiveVideo();

    const overlay = this;
    const separator = project.url.includes('?') ? '&' : '?';
    card.querySelector('.project-card__video').insertAdjacentHTML('beforeend', `
      <iframe
        src="${project.url}${separator}autoplay=1&mute=1&playsinline=1"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `);
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => overlay.remove());

    card.classList.add('project-card--playing');
    backdrop.classList.add('is-active');
  });

  return card;
}

function renderProjectsPage() {
  const hGrid = document.getElementById('horizontal-grid');
  const vGrid = document.getElementById('projects-grid');
  if (!hGrid && !vGrid) return;

  const isCreatorsPage = window.location.pathname.includes('creators');
  const list = isCreatorsPage ? creatorProjects.filter((p) => p.preview) : projects;

  list.forEach((p) => {
    if (p.horizontal && hGrid) hGrid.appendChild(createVideoCard(p));
    if (!p.horizontal && vGrid) vGrid.appendChild(createVideoCard(p));
  });
}

renderProjectsPage();

// ───── Match heading text width to title width ─────

function syncHeadingTextWidth() {
  const title = document.querySelector('.creators-heading__title');
  const text = document.querySelector('.creators-heading__text');
  if (!title || !text) return;
  text.style.maxWidth = title.offsetWidth + 'px';
}

syncHeadingTextWidth();
window.addEventListener('resize', syncHeadingTextWidth);

// ───── Home page: preview grid ─────

function renderHomeGrid() {
  const grid = document.getElementById('home-grid');
  if (!grid) return;

  projects.forEach((p) => {
    const videoId = getVideoId(p.url);
    const card = document.createElement('a');
    card.href = `projects.html#${videoId}`;
    card.className = 'home-grid__card';

    card.innerHTML = `
      <img src="${p.preview}" alt="${p.title}">
      <span class="home-grid__info"><strong>${p.title}</strong><span>${p.subtitle}</span></span>
    `;

    grid.appendChild(card);
  });
}

renderHomeGrid();

// ───── Scroll to hash & auto-play on projects page ─────

if (window.location.hash) {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target) {
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const overlay = target.querySelector('.project-card__overlay');
      if (overlay) overlay.click();
    });
  }
}
