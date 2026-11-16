// WORD REVEAL: parágrafos com data-wordreveal começam apagados e acendem
// palavra por palavra conforme atravessam a tela. Trechos marcados com
// data-k (negrito/itálico do config) acendem inteiros e ficam mais fortes.
import { fx, onScrollFrame, reducedMotion } from './env';

interface Unit {
  el: HTMLElement;
  key: boolean;
}

export function initWordReveal() {
  if (!fx('words') || reducedMotion) return;

  const entries: { p: HTMLElement; units: Unit[] }[] = [];

  document.querySelectorAll<HTMLElement>('[data-wordreveal]').forEach((p) => {
    const units: Unit[] = [];
    for (const node of [...p.childNodes]) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Texto solto: cada palavra vira um <span> próprio.
        const fragment = document.createDocumentFragment();
        for (const word of (node.textContent ?? '').split(/(\s+)/)) {
          if (/^\s*$/.test(word)) {
            fragment.appendChild(document.createTextNode(word));
            continue;
          }
          const span = document.createElement('span');
          span.textContent = word;
          fragment.appendChild(span);
          units.push({ el: span, key: false });
        }
        p.replaceChild(fragment, node);
      } else if (node instanceof HTMLElement && node.tagName !== 'BR') {
        units.push({ el: node, key: node.hasAttribute('data-k') });
      }
    }
    entries.push({ p, units });
  });
  if (entries.length === 0) return;

  onScrollFrame(() => {
    const vh = window.innerHeight;
    for (const { p, units } of entries) {
      const top = p.getBoundingClientRect().top;
      // 0 = parágrafo ainda embaixo da tela; 1 = já subiu o bastante.
      const progress = Math.max(0, Math.min(1, (vh * 0.9 - top) / (vh * 0.42)));
      units.forEach((unit, index) => {
        const revealed = Math.max(0, Math.min(1, progress * units.length - index));
        unit.el.style.opacity = (0.15 + (unit.key ? 0.85 : 0.65) * revealed).toFixed(3);
      });
    }
  });
}
