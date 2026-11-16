// Utilidades compartilhadas pelos scripts de efeito.

/** true quando a pessoa pediu "reduzir movimento" no sistema. */
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** O efeito está ligado no site.config.ts? (vira uma classe "fx-..." no <html>) */
export function fx(name: string): boolean {
  return document.documentElement.classList.contains(`fx-${name}`);
}

// Um único "ouvinte" de rolagem para todos os efeitos: junta as chamadas e
// roda no máximo uma vez por quadro de tela (requestAnimationFrame).
const scrollTasks: Array<() => void> = [];
let scheduled = false;

function runScrollTasks() {
  scheduled = false;
  for (const task of scrollTasks) task();
}

function requestRun() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(runScrollTasks);
}

/** Registra uma função para rodar a cada rolagem/redimensionamento (e já roda uma vez). */
export function onScrollFrame(task: () => void) {
  if (scrollTasks.length === 0) {
    window.addEventListener('scroll', requestRun, { passive: true });
    window.addEventListener('resize', requestRun);
  }
  scrollTasks.push(task);
  task();
}
