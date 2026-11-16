// MENU: ganha fundo de vidro depois que a página rola 50px (efeito "navGlass").
import { fx, onScrollFrame } from './env';

export function initHeader() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav || !fx('nav')) return;
  onScrollFrame(() => nav.classList.toggle('is-scrolled', window.scrollY > 50));
}
