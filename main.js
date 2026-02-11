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

// ───── Projects: YouTube video lists ─────

// Horizontal (landscape) videos — rendered first.
const horizontalVideos = [
  'https://www.youtube.com/embed/BwBYoTrc7sU',
];

// Vertical (Shorts) videos.
const videos = [
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
  'https://www.youtube.com/embed/v44KNKzGUsk?si=eFBQsmPiv-6hxJFS',
  'https://www.youtube.com/embed/DoADSrGTUik?si=y00pFXo21gNpBhze',
  'https://www.youtube.com/embed/bqplGd-ep3o?si=Jzc4ZpkqQrFWxAuP',
  'https://www.youtube.com/embed/S7nfjcQHv1c?si=25fOogVqojs7gH3U',
  'https://www.youtube.com/embed/zzM6pR8PGZs?si=tLR1mzCZFQlBy9Gu',
  ,
];

// Create a video card with a cover overlay that loads the iframe on click.
function createVideoCard(url, horizontal) {
  const videoId = url.split('/embed/')[1].split('?')[0];
  const card = document.createElement('article');
  card.className = horizontal ? 'project-card project-card--horizontal' : 'project-card';

  const videoClass = horizontal ? 'project-card__video project-card__video--horizontal' : 'project-card__video';

  card.innerHTML = `
    <div class="${videoClass}">
      <div class="project-card__overlay" style="background-image: url('assets/videos/${videoId}.png')"></div>
    </div>
  `;

  card.querySelector('.project-card__overlay').addEventListener('click', function () {
    const overlay = this;
    const separator = url.includes('?') ? '&' : '?';
    card.querySelector('.project-card__video').insertAdjacentHTML('beforeend', `
      <iframe
        src="${url}${separator}autoplay=1&mute=1&playsinline=1"
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
  });

  return card;
}

// Render horizontal videos into #horizontal-grid
function renderHorizontalVideos() {
  const grid = document.getElementById('horizontal-grid');
  if (!grid) return;

  horizontalVideos.forEach((url) => {
    grid.appendChild(createVideoCard(url, true));
  });
}

// Render vertical videos into #projects-grid
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  videos.forEach((url) => {
    grid.appendChild(createVideoCard(url, false));
  });
}

renderHorizontalVideos();
renderProjects();
