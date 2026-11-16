// FAQ: animação de abrir/fechar. As perguntas são <details> (abrem mesmo
// sem JavaScript). Com o efeito ligado, a resposta desliza (altura animada
// em 350 ms), o "+" gira 45° e abrir uma pergunta fecha as outras.
import { fx, reducedMotion } from './env';

export function initFaq() {
  const list = document.querySelector<HTMLElement>('[data-faq]');
  if (!list || !fx('faq') || reducedMotion) return;

  const items = [...list.querySelectorAll<HTMLDetailsElement>('details')];
  document.documentElement.classList.add('js-faq'); // liga o CSS da animação

  const close = (item: HTMLDetailsElement) => {
    const answer = item.querySelector<HTMLElement>('[data-ans]');
    if (!answer || !item.open) return;
    item.classList.remove('is-open');
    answer.style.maxHeight = '0px';
    // Só tira o atributo "open" quando a animação termina.
    window.setTimeout(() => {
      if (!item.classList.contains('is-open')) item.open = false;
    }, 360);
  };

  const open = (item: HTMLDetailsElement) => {
    const answer = item.querySelector<HTMLElement>('[data-ans]');
    if (!answer) return;
    item.open = true;
    item.classList.add('is-open');
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  };

  for (const item of items) {
    item.querySelector('summary')?.addEventListener('click', (event) => {
      event.preventDefault();
      const wasOpen = item.classList.contains('is-open');
      items.forEach(close);
      if (!wasOpen) open(item);
    });
  }

  // Se a largura mudar, a altura da resposta aberta precisa ser recalculada.
  window.addEventListener('resize', () => {
    for (const item of items) {
      const answer = item.querySelector<HTMLElement>('[data-ans]');
      if (answer && item.classList.contains('is-open')) answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
}
