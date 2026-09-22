// Client delivery pages. Not listed in the menu.
// Pretty URL: /photo/download/NAME/  e.g. /photo/download/jonak/
// Or: /photo/download.html?id=NAME
// Without ?id, download.html uses `current`.
//
// event: big title — shoot / brand / client name
// date, location: optional lines under the title
// cats: 'P' portraits, 'L' landscapes, 'R' reportage / events.
// Omit cats to show portraits + events.

const current = 'jonak';
const defaultCats = ['P', 'R'];

// Apps Script web app URL from scripts/delivery-visits.gs. Empty = do not log.
const visitLogUrl = '';
const visitLogKey = 'ml-visits';

const deliveries = {
  jonak: {
    event: 'JONAK JAM',
    date: '19 September 2026',
    location: 'Paris, La Samaritaine',
    drive: 'https://drive.google.com/drive/folders/10TzEjxP21P04FPQvopqpV9VmresZLoWf?usp=drive_link',
  },
};

function isDriveUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && (
      parsed.hostname === 'drive.google.com' ||
      parsed.hostname === 'docs.google.com'
    );
  } catch {
    return false;
  }
}

function idFromPath(pathname, queryId) {
  if (queryId) return queryId;
  const parts = pathname.split('/').filter(Boolean);
  let last = parts.pop() || '';
  if (last === 'index.html') last = parts.pop() || '';
  const slug = last.replace(/\.html$/, '');
  if (slug && slug !== 'download') return slug;
  return current;
}

function setLine(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = (value || '').trim();
  el.textContent = text;
  el.hidden = !text;
}

function renderDelivery() {
  const params = new URLSearchParams(window.location.search);
  const id = idFromPath(window.location.pathname, params.get('id'));
  const delivery = deliveries[id];

  const stubEl = document.getElementById('delivery-stub');
  const liveEl = document.getElementById('delivery-live');
  const linkEl = document.getElementById('delivery-link');
  const gridEl = document.getElementById('photo-grid');

  if (!delivery) {
    document.title = 'Maria Liadova';
    document.body.classList.add('is-expired');
    if (stubEl) stubEl.hidden = false;
    if (liveEl) liveEl.remove();
    return;
  }

  const eventName = (delivery.event || '').trim();
  document.title = eventName ? `${eventName} — Maria Liadova` : 'Maria Liadova';
  if (stubEl) stubEl.remove();
  setLine('delivery-title', eventName);
  setLine('delivery-date', delivery.date);
  setLine('delivery-location', delivery.location);

  if (gridEl) {
    const cats = delivery.cats && delivery.cats.length ? delivery.cats : defaultCats;
    gridEl.dataset.categories = cats.join(',');
  }

  if (linkEl && isDriveUrl(delivery.drive)) {
    linkEl.href = delivery.drive;
    linkEl.hidden = false;
  } else if (linkEl) {
    linkEl.hidden = true;
  }

  logDeliveryVisit(id);
}

function logDeliveryVisit(id) {
  if (!visitLogUrl || new URLSearchParams(window.location.search).has('selfcheck')) return;

  const payload = new URLSearchParams({
    k: visitLogKey,
    page: id,
    href: window.location.pathname,
  });

  fetch('https://api.ipify.org?format=json')
    .then((res) => (res.ok ? res.json() : {}))
    .catch(() => ({}))
    .then((data) => {
      if (data.ip) payload.set('ip', data.ip);
      return fetch(`${visitLogUrl}?${payload}`, { mode: 'no-cors', keepalive: true });
    })
    .catch(() => {});
}

renderDelivery();

if (new URLSearchParams(window.location.search).has('selfcheck')) {
  console.assert(isDriveUrl('https://drive.google.com/drive/folders/abc') === true, 'drive folder ok');
  console.assert(isDriveUrl('https://docs.google.com/uc?id=abc') === true, 'docs ok');
  console.assert(isDriveUrl('https://evil.example/drive.google.com') === false, 'reject other hosts');
  console.assert(isDriveUrl('javascript:alert(1)') === false, 'reject javascript');
  console.assert(isDriveUrl('') === false, 'reject empty');
  console.assert(idFromPath('/photo/download/jonak/', null) === 'jonak', 'pretty url');
  console.assert(idFromPath('/photo/download/jonak/index.html', null) === 'jonak', 'index pretty url');
  console.assert(idFromPath('/photo/download.html', null) === current, 'download.html default');
  console.assert(idFromPath('/photo/download.html', 'x') === 'x', 'query wins');
  console.assert(logDeliveryVisit('selfcheck-noop') === undefined, 'log is fire-and-forget');
}
