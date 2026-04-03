/* ============================================================
   JAVASCRIPT — Tarjeta Cumpleaños · FC Barcelona
   ============================================================ */

/* ── Partículas con colores del Barça ── */
function createParticles() {
  const shapes = [
    '#004D98', /* azul */
    '#A50044', /* rojo */
    '#EDBB00', /* oro  */
    'rgba(0,77,152,0.6)',
    'rgba(165,0,68,0.6)',
    'rgba(237,187,0,0.5)',
  ];

  const container = document.getElementById('particles');

  for (let i = 0; i < 55; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const size = 3 + Math.random() * 6;
    const isRound = Math.random() > 0.45;

    el.style.cssText = `
      left:              ${Math.random() * 100}%;
      width:             ${size}px;
      height:            ${isRound ? size : size * 0.4}px;
      background:        ${shapes[Math.floor(Math.random() * shapes.length)]};
      animation-duration:  ${5 + Math.random() * 8}s;
      animation-delay:     ${Math.random() * 7}s;
      border-radius:     ${isRound ? '50%' : '1px'};
    `;
    container.appendChild(el);
  }
}

/* ── Música y Control ── */
const audio = document.getElementById('bgMusic');
const label = document.getElementById('musicLabel');
const bars  = document.querySelectorAll('.bar');
let playing = false;

function startMusic() {
  audio.play().then(() => {
    playing = true;
    label.textContent = 'Pause';
    bars.forEach(b => b.classList.add('active'));
  }).catch((err) => {
    console.log("No se pudo iniciar el audio", err);
  });
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

/* ── Inicialización ── */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();

  const overlay = document.getElementById('startOverlay');
  const card = document.querySelector('.card');

  // El clic en el overlay desbloquea el audio y muestra la tarjeta
  if(overlay) {
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden'); // Oculta la pantalla de inicio
      card.classList.add('is-visible'); // Dispara la animación de entrada
      startMusic(); // Inicia la música automáticamente al hacer clic
    });
  }
});