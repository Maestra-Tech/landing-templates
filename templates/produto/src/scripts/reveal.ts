import { fxOn, reducedMotion } from './fx'

/**
 * Entrada das seções ao rolar a página.
 *
 * Todo bloco marcado com `data-reveal` no HTML entra com um leve desvanecer e subir. Há dois
 * caminhos para o mesmo resultado:
 *  - "native": o navegador anima sozinho pela rolagem (CSS `animation-timeline: view()`);
 *  - "observer": onde isso não existe, este script observa cada bloco e marca `data-revealed`
 *    quando ele entra na tela; o CSS faz a transição.
 *
 * Nada é escondido antes de este script rodar. Se ele falhar, a página fica toda visível.
 */
export function mountReveal(): void {
  if (!fxOn('reveal')) return

  const nodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
  const root = document.documentElement

  // Movimento reduzido: tudo já nasce no estado final.
  if (reducedMotion()) {
    for (const node of nodes) node.dataset.revealed = 'true'
    return
  }

  const native = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')
  root.dataset.revealPath = native ? 'native' : 'observer'
  if (native) return

  // Só a partir desta linha o CSS esconde o estado inicial dos blocos.
  root.setAttribute('data-reveal-armed', 'true')

  // A margem enorme para cima garante que um bloco "pulado" por uma rolagem rápida (ou por um
  // link interno) também seja revelado, em vez de ficar apagado para sempre.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const node = entry.target as HTMLElement
        node.dataset.revealed = 'true'
        observer.unobserve(node)
      }
    },
    { rootMargin: '100000px 0px -100px 0px', threshold: 0 },
  )

  for (const node of nodes) {
    // Já visível na chegada: revela na hora.
    if (node.getBoundingClientRect().top < window.innerHeight) node.dataset.revealed = 'true'
    else observer.observe(node)
  }
}
