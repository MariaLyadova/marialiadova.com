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
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
  'https://www.youtube.com/embed/NpclKtJgn7w?si=SyPVQu2esE2yeIen',
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
