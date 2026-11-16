import { fxOn } from './fx'

/**
 * Índice lateral da seção "Por dentro".
 *
 * Marca com `aria-current="location"` o link do ponto que está cruzando o meio da tela (o CSS
 * destaca esse link). Fora da seção, nenhum link fica marcado. Sem este script, o índice continua
 * sendo uma lista de links que funciona.
 */
export function mountInsideRail(): void {
  if (!fxOn('railTracking')) return
  const rail = document.querySelector('[data-rail]')
  if (!rail) return

  const byTarget = new Map<Element, HTMLAnchorElement>()
  for (const link of rail.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    const target = document.getElementById(link.getAttribute('href')!.slice(1))
    if (target) byTarget.set(target, link)
  }
  if (byTarget.size === 0) return

  const targets = [...byTarget.keys()]
  const crossing = new Set<Element>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) crossing.add(entry.target)
        else crossing.delete(entry.target)
      }
      // Em caso de empate, vale o de cima: é o que a leitura acabou de alcançar.
      const current = targets.find((target) => crossing.has(target))
      for (const [target, link] of byTarget) {
        if (target === current) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      }
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  for (const target of targets) observer.observe(target)
}
