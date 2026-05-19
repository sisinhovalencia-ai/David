/* ============================================================
   JAVASCRIPT — Tarjeta Cumpleaños · FC Barcelona
   ============================================================ */

/* ── Partículas con colores del Barça ── */
function createParticles() {
  const colors = [
    '#004D98',
    '#A50044',
    '#EDBB00',
    'rgba(0,77,152,0.55)',
    'rgba(165,0,68,0.55)',
    'rgba(237,187,0,0.45)',
  ];
  const container = document.getElementById('particles');
  for (let i = 0; i < 55; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size   = 3 + Math.random() * 5;
    const round  = Math.random() > 0.4;
    el.style.cssText = `
      left:               ${Math.random() * 100}%;
      width:              ${size}px;
      height:             ${round ? size : size * 0.4}px;
      background:         ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${5 + Math.random() * 8}s;
      animation-delay:    ${Math.random() * 7}s;
      border-radius:      ${round ? '50%' : '1px'};
    `;
    container.appendChild(el);
  }
}

/* ── Música ── */
const audio  = document.getElementById('bgMusic');
const label  = document.getElementById('musicLabel');
const bars   = document.querySelectorAll('.bar');
let   playing = false;

function startMusic() {
  audio.play().then(() => {
    playing = true;
    label.textContent = 'Pause';
    bars.forEach(b => b.classList.add('active'));
  }).catch(() => {});
}

function toggleMusic() {
  if (playing) {
    audio.pause();
    label.textContent = 'Play';
    bars.forEach(b => b.classList.remove('active'));
    playing = false;
  } else {
    startMusic();
  }
}

/* Autoplay: arranca sola; si el navegador lo bloquea,
   se activa en el primer gesto del usuario.          */
function autoPlay() {
  startMusic();
  if (!playing) {
    const events = ['click', 'touchstart', 'keydown'];
    const tryPlay = () => {
      startMusic();
      events.forEach(e => document.removeEventListener(e, tryPlay));
    };
    events.forEach(e => document.addEventListener(e, tryPlay, { once: true }));
  }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  autoPlay();
});
