import { fxOn } from './fx'

/**
 * Estado da barra do topo: depois de rolar alguns pixels, a barra ganha o atributo
 * `data-scrolled`, e o CSS acrescenta a sombra e reforça a borda.
 */
export function mountHeader(): void {
  if (!fxOn('headerScroll')) return
  const header = document.querySelector<HTMLElement>('[data-site-header]')
  if (!header) return

  const read = () => header.toggleAttribute('data-scrolled', window.scrollY > 8)
  read()
  window.addEventListener('scroll', read, { passive: true })
}
