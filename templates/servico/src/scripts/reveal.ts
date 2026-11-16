// REVEAL: blocos com data-reveal aparecem (sobem e perdem o desfoque) quando
// entram na tela. O valor do atributo é o atraso em segundos (ex.: "0.1").
// Sem JavaScript, ou com "reduzir movimento", tudo já nasce visível.
import { fx, reducedMotion } from './env';

export function initReveal() {
  if (!fx('reveal') || reducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.animationDelay = `${parseFloat(el.dataset.reveal || '0')}s`;
        el.classList.remove('reveal-pending');
        el.classList.add('is-revealed');
        // Ao terminar, limpa tudo para não atrapalhar outros efeitos.
        el.addEventListener(
          'animationend',
          () => {
            el.classList.remove('is-revealed');
            el.style.animationDelay = '';
          },
          { once: true },
        );
        observer.unobserve(el);
      }
    },
    { rootMargin: '-60px 0px' },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    // O que já está na tela ao carregar não é escondido.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('reveal-pending');
    observer.observe(el);
  });
}
