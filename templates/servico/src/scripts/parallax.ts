// PARALLAX: elementos com data-plx se deslocam um pouco conforme a posição
// na tela. O valor é a intensidade (ex.: data-plx="0.03" = 3% da distância
// até o centro da tela).
import { fx, onScrollFrame, reducedMotion } from './env';

export function initParallax() {
  if (!fx('parallax') || reducedMotion) return;
  const items = [...document.querySelectorAll<HTMLElement>('[data-plx]')];
  if (items.length === 0) return;
  for (const el of items) el.style.willChange = 'transform';

  onScrollFrame(() => {
    const vh = window.innerHeight;
    for (const el of items) {
      el.style.transform = '';
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.plx || '0.04');
      el.style.transform = `translateY(${offset.toFixed(1)}px)`;
    }
  });
}
