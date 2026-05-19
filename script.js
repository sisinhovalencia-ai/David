/* ============================================================
   JAVASCRIPT — Tarjeta Cumpleaños · FC Barcelona
   ============================================================ */

/* ── Crear pantalla de bienvenida dinámicamente ── */
function createSplash() {
  const splash = document.createElement('div');
  splash.id = 'splash';
  splash.innerHTML = `
    <div class="splash-inner">
      <img src="escudo.png" alt="Escudo FC Barcelona" class="splash-crest" />
      <div class="splash-title">Feliz Cumpleaños</div>
      <div class="splash-sub">Toca para abrir tu tarjeta</div>
      <div class="splash-btn">
        <span>▶</span>
      </div>
      <div class="splash-hint">· Visca el Barça ·</div>
    </div>
  `;

  Object.assign(splash.style, {
    position:        'fixed',
    inset:           '0',
    zIndex:          '9999',
    background:      'linear-gradient(135deg, #003580 0%, #A50044 60%, #EDBB00 100%)',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    flexDirection:   'column',
    cursor:          'pointer',
    transition:      'opacity 0.8s ease, transform 0.8s ease',
  });

  /* Estilos internos via <style> inyectado */
  const style = document.createElement('style');
  style.textContent = `
    #splash { font-family: Georgia, serif; text-align: center; }

    .splash-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      animation: splashIn 0.9s ease both;
    }

    @keyframes splashIn {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    .splash-crest {
      width: 110px;
      filter: drop-shadow(0 6px 18px rgba(0,0,0,0.5));
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1);    }
      50%       { transform: scale(1.07); }
    }

    .splash-title {
      font-size: clamp(2rem, 6vw, 3.2rem);
      font-weight: bold;
      color: #fff;
      text-shadow: 0 3px 12px rgba(0,0,0,0.4);
      letter-spacing: 2px;
    }

    .splash-sub {
      font-size: clamp(0.95rem, 2.5vw, 1.15rem);
      color: rgba(255,255,255,0.85);
      letter-spacing: 1px;
    }

    .splash-btn {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255,255,255,0.18);
      border: 2px solid rgba(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: #fff;
      margin-top: 8px;
      transition: background 0.3s, transform 0.2s;
      box-shadow: 0 0 24px rgba(237,187,0,0.4);
    }

    #splash:hover .splash-btn {
      background: rgba(237,187,0,0.35);
      transform: scale(1.12);
    }

    .splash-hint {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.5);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 4px;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(splash);
  return splash;
}

/* ── Abrir tarjeta al presionar splash ── */
function initSplash() {
  const splash = createSplash();

  splash.addEventListener('click', () => {
    /* Animación de salida */
    splash.style.opacity   = '0';
    splash.style.transform = 'scale(1.06)';

    setTimeout(() => {
      splash.remove();
    }, 800);

    /* Arranca la música */
    startMusic();
  }, { once: true });
}

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
    const size  = 3 + Math.random() * 5;
    const round = Math.random() > 0.4;
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
const audio = document.getElementById('bgMusic');
const label = document.getElementById('musicLabel');
const bars  = document.querySelectorAll('.bar');
let playing = false;

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

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initSplash(); /* ← muestra splash; la música arranca al hacer clic */
});
