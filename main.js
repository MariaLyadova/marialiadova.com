// ───── Home hero ML → Maria Liadova animation ─────

function initHeroAnimation() {
  const nameEl = document.querySelector('.home-hero__name');
  const letterL = document.querySelector('.home-hero__letter--l');
  const typedFirst = document.querySelector('.home-hero__typed--first');
  const typedLast = document.querySelector('.home-hero__typed--last');
  const roleEl = document.querySelector('.home-hero__role');

  if (!nameEl || !letterL) return;

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

// ───── Projects: YouTube video list ─────

// Add your YouTube Shorts embed URLs here.
const videos = [
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
  'https://www.youtube.com/embed/v44KNKzGUsk?si=eFBQsmPiv-6hxJFS',
  'https://www.youtube.com/embed/DoADSrGTUik?si=y00pFXo21gNpBhze',

  
];

// Render videos into the #projects-grid container
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  videos.forEach((url) => {
    const card = document.createElement('article');
    card.className = 'project-card';

    card.innerHTML = `
      <div class="project-card__video">
        <iframe
          width="315"
          height="560"
          src="${url}"
          title="YouTube video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    `;

    grid.appendChild(card);
  });
}

renderProjects();
