// RÉGUA DO TOPO: ao passar o mouse num termo, ele brilha com um gradiente
// que corre uma vez (1,2 s), o fio de baixo acende e a descrição engrossa.
// O visual está em Hero.astro (classe .is-active); aqui só ligamos e
// desligamos a classe, que sai sozinha depois de 1,25 s.
import { fx, reducedMotion } from './env';

export function initRail() {
  if (!fx('rail')) return;
  document.querySelectorAll<HTMLElement>('[data-rail] > *').forEach((item) => {
    let timer = 0;
    const off = () => {
      window.clearTimeout(timer);
      item.classList.remove('is-active');
    };
    const on = () => {
      off();
      void item.offsetWidth; // força o navegador a reiniciar a animação
      item.classList.add('is-active');
      if (!reducedMotion) timer = window.setTimeout(off, 1250);
    };
    item.addEventListener('mouseenter', on);
    item.addEventListener('mouseleave', off);
  });
}
