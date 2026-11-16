// STICKY STACK: nos grupos com data-stack-group, cada card (data-stack)
// encolhe um pouco e escurece enquanto o próximo desliza por cima dele.
// O "grudar no topo" em si é CSS (position: sticky em global.css).
import { fx, onScrollFrame, reducedMotion } from './env';

const SCALE = 0.055; // quanto encolhe (5,5%)
const DIM = 0.4; // quanto escurece (40%)

export function initStack() {
  if (!fx('stack') || reducedMotion) return;

  const groups = [...document.querySelectorAll<HTMLElement>('[data-stack-group]')]
    .map((group) => [...group.querySelectorAll<HTMLElement>('[data-stack]')])
    .filter((cards) => cards.length > 1);
  if (groups.length === 0) return;

  for (const cards of groups) {
    for (const card of cards) {
      card.style.transformOrigin = '50% 0';
      card.style.willChange = 'transform';
    }
  }

  onScrollFrame(() => {
    const vh = window.innerHeight;
    for (const cards of groups) {
      // No celular os cards não grudam (ver media query), então sem efeito.
      const sticky = getComputedStyle(cards[0]).position === 'sticky';
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!sticky || !next) {
          card.style.transform = '';
          card.style.filter = '';
          continue;
        }
        const selfTop = card.getBoundingClientRect().top;
        const nextTop = next.getBoundingClientRect().top;
        // 0 = próximo card ainda fora da tela; 1 = encostou neste.
        const p = Math.max(0, Math.min(1, (vh - nextTop) / (vh - (selfTop + 20))));
        card.style.transform = `scale(${(1 - SCALE * p).toFixed(4)})`;
        card.style.filter = `brightness(${(1 - DIM * p).toFixed(3)})`;
      }
    }
  });
}
