// CTA MAGNÉTICO: quando o mouse chega a menos de 100px do botão principal,
// o botão é "puxado" na direção dele (até 8px) com um movimento de mola.
// Vale para todo elemento com data-magnetic.
import { fx, reducedMotion } from './env';

interface Spring {
  el: HTMLElement;
  x: number; // posição atual
  y: number;
  vx: number; // velocidade
  vy: number;
  tx: number; // posição desejada
  ty: number;
}

export function initMagnetic() {
  const coarse = window.matchMedia('(hover: none)').matches; // telas de toque
  if (!fx('magnetic') || reducedMotion || coarse) return;

  const springs: Spring[] = [...document.querySelectorAll<HTMLElement>('[data-magnetic]')].map((el) => ({
    el, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
  }));
  if (springs.length === 0) return;

  let running = false;

  const tick = () => {
    let moving = false;
    for (const s of springs) {
      // Mola: acelera em direção ao alvo (0.12) e perde velocidade (0.8).
      s.vx = (s.vx + (s.tx - s.x) * 0.12) * 0.8;
      s.vy = (s.vy + (s.ty - s.y) * 0.12) * 0.8;
      s.x += s.vx;
      s.y += s.vy;
      const resting = Math.abs(s.vx) + Math.abs(s.vy) + Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) < 0.02;
      if (resting && s.tx === 0 && s.ty === 0) {
        s.x = s.y = s.vx = s.vy = 0;
        s.el.style.transform = '';
      } else {
        s.el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
        moving = true;
      }
    }
    // O laço para sozinho quando todos os botões voltam ao lugar.
    if (moving) requestAnimationFrame(tick);
    else running = false;
  };

  window.addEventListener('pointermove', (event) => {
    for (const s of springs) {
      const r = s.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) {
        s.tx = 0;
        s.ty = 0;
        continue;
      }
      const dx = event.clientX - (r.left + r.width / 2);
      const dy = event.clientY - (r.top + r.height / 2);
      const near = Math.abs(dx) < r.width / 2 + 100 && Math.abs(dy) < r.height / 2 + 100;
      s.tx = near ? Math.max(-8, Math.min(8, dx * 0.08)) : 0;
      s.ty = near ? Math.max(-8, Math.min(8, dy * 0.15)) : 0;
    }
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  });
}
