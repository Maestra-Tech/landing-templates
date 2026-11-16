// SPOTLIGHT: luz suave que segue o mouse. O script só atualiza as variáveis
// --mx/--my; o desenho da luz está em global.css (.spotlight).
import { fx } from './env';

export function initSpotlight() {
  if (!fx('spotlight')) return;
  const root = document.documentElement;
  root.style.setProperty('--mx', '50vw');
  root.style.setProperty('--my', '35vh');
  window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--mx', `${event.clientX}px`);
    root.style.setProperty('--my', `${event.clientY}px`);
  });
}
