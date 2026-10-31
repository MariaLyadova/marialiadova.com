const videos = [
  { yt: "XeDyXuUMLI0", src: "assets/videos/XeDyXuUMLI0.png", title: "Carolina Herrera" },
  { yt: "BwBYoTrc7sU", src: "assets/BwBYoTrc7sU_preview.png", title: "Guess" },
  { yt: "MrK0Rz0e95A", src: "assets/MrK0Rz0e95A_preview.jpg", title: "Urban Jürgensen" },
  { yt: "NpclKtJgn7w", src: "assets/NpclKtJgn7w_preview.png", title: "Marie Claire × AP" },
  { yt: "v44KNKzGUsk", src: "assets/v44KNKzGUsk_preview.jpg", title: "Dyson" },
  { yt: "bqplGd-ep3o", src: "assets/bqplGd-ep3o_preview.jpeg", title: "Dior × Deva Cassel" },
  { yt: "S7nfjcQHv1c", src: "assets/S7nfjcQHv1c_preview.jpg", title: "Zadig & Voltaire" },
  { yt: "zzM6pR8PGZs", src: "assets/zzM6pR8PGZs_preview.png", title: "Social series" },
  { yt: "DoADSrGTUik", src: "assets/videos/DoADSrGTUik.png", title: "Dior beauty" },
];

const photos = [
  { src: "photo/assets/MariaLiadovaweb3_P.jpeg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb8_P.jpeg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb9_P.jpeg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb11_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb12_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb13_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb15_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb18_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb19_P.jpeg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb25_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb34_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb35_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb37_P.jpg", title: "Portrait" },
  { src: "photo/assets/MariaLiadovaweb1_L.jpeg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb4_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb5_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb6_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb7_L.png", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb17_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb18_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb19_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb20_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb21_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb22_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb23_L.jpg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb24_L.jpeg", title: "Landscape" },
  { src: "photo/assets/MariaLiadovaweb1_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb2_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb10_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb26_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb27_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb28_A.jpg", title: "Architecture" },
  { src: "photo/assets/MariaLiadovaweb17_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb20_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb21_R.jpeg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb21_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb22_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb29_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb30_R.jpeg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb31_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb32_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb36_R.jpeg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb14_R.jpg", title: "Reportage" },
  { src: "photo/assets/MariaLiadovaweb15_R.jpg", title: "Reportage" },
];

function mix(a, b) {
  const out = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i]) out.push({ ...a[i], kind: "video" });
    if (b[i]) out.push({ ...b[i], kind: "photo" });
  }
  return out;
}

function renderWork() {
  const root = document.getElementById("land-work");
  if (!root) return;

  mix(videos, photos).forEach((item) => {
    const article = document.createElement("article");
    article.className = item.kind === "video" ? "piece piece--wide" : "piece";
    if (item.yt) article.dataset.yt = item.yt;

    const media = document.createElement("div");
    media.className = "piece__media";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title;
    media.appendChild(img);

    const cap = document.createElement("p");
    cap.className = "piece__cap";
    cap.textContent = item.kind === "video" ? `${item.title} · Editing` : item.title;

    article.appendChild(media);
    article.appendChild(cap);
    root.appendChild(article);
  });
}

renderWork();

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

document.querySelectorAll(".piece[data-yt]").forEach((piece) => {
  const id = piece.dataset.yt;
  const media = piece.querySelector(".piece__media");
  let frame = null;

  function play() {
    if (frame) return;
    frame = document.createElement("iframe");
    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0`;
    frame.allow = "autoplay; encrypted-media";
    frame.setAttribute("aria-hidden", "true");
    media.appendChild(frame);
  }

  function stop() {
    if (!frame) return;
    frame.remove();
    frame = null;
  }

  if (canHover) {
    piece.addEventListener("mouseenter", play);
    piece.addEventListener("mouseleave", stop);
  }
});
