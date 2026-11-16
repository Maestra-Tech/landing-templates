import { mountDemo } from './demo'
import { whenIdle } from './fx'
import { mountGlow } from './glow'
import { mountHeader } from './header'
import { mountHeroMedia } from './hero-media'
import { mountInsideRail } from './inside-rail'
import { mountReveal } from './reveal'
import { mountTimeline } from './timeline'

/**
 * A entrada única dos scripts da página.
 *
 * Cada efeito mora no próprio arquivo e é ligado aqui. Um efeito que falhar não derruba os
 * outros: a página estática (HTML + CSS) é o piso, e ela é completa sem nenhum destes scripts.
 */
function safely(mount: () => void): void {
  try {
    mount()
  } catch (error) {
    console.warn('[efeito] não pôde ser iniciado:', error)
  }
}

// Já: o que afeta a primeira tela.
safely(mountReveal)
safely(mountHeroMedia)
safely(mountTimeline)
safely(mountDemo)

// Quando houver folga: o que é acabamento.
whenIdle(() => {
  safely(mountHeader)
  safely(mountInsideRail)
  safely(mountGlow)
})
