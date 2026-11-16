import { finePointer, fxOn, reducedMotion } from './fx'

/**
 * Os três efeitos que só existem onde há mouse:
 *
 *  1. Holofote (`spotlight`): uma luz suave segue o cursor pela página.
 *  2. Brilho dos cards (`cardGlow`): a borda (ou o interior) do card acende perto do cursor.
 *  3. Botão magnético (`magneticCta`): o botão principal se desloca até 8px na direção do cursor
 *     quando ele chega perto.
 *
 * O script só escreve variáveis CSS; quem desenha é o CSS. Em telas de toque nada disto é
 * registrado, e os botões não se movem um pixel.
 */
const MAGNET_RADIUS = 120
const MAGNET_MAX = 8

export function mountGlow(): void {
  if (!finePointer() || reducedMotion()) return

  const root = document.documentElement
  const spotlight = fxOn('spotlight')
  const ctas = fxOn('magneticCta') ? [...document.querySelectorAll<HTMLElement>('[data-cta]')] : []

  if (spotlight) root.dataset.pointerDepth = 'on'

  if (spotlight || ctas.length > 0) {
    let x = 0
    let y = 0
    let frame = 0

    const magnetize = (cta: HTMLElement): void => {
      const box = cta.getBoundingClientRect()
      // A distância é medida até a borda mais próxima do botão, não até o centro: um botão largo
      // também reage a quem chega pela lateral.
      const nearestX = Math.min(Math.max(x, box.left), box.right)
      const nearestY = Math.min(Math.max(y, box.top), box.bottom)
      const gap = Math.hypot(x - nearestX, y - nearestY)
      if (box.width === 0 || gap > MAGNET_RADIUS) {
        cta.style.removeProperty('--magnet-x')
        cta.style.removeProperty('--magnet-y')
        return
      }
      const dx = x - (box.left + box.width / 2)
      const dy = y - (box.top + box.height / 2)
      const reach = Math.hypot(dx, dy) || 1
      const pull = (1 - gap / MAGNET_RADIUS) * MAGNET_MAX
      cta.style.setProperty('--magnet-x', `${(dx / reach) * pull}px`)
      cta.style.setProperty('--magnet-y', `${(dy / reach) * pull}px`)
    }

    // A posição é só guardada no evento; a escrita acontece uma vez por quadro, para todos.
    const paint = () => {
      frame = 0
      if (spotlight) {
        root.style.setProperty('--mx', `${x}px`)
        root.style.setProperty('--my', `${y}px`)
      }
      for (const cta of ctas) magnetize(cta)
    }

    window.addEventListener(
      'pointermove',
      (event) => {
        x = event.clientX
        y = event.clientY
        if (!frame) frame = requestAnimationFrame(paint)
      },
      { passive: true },
    )
  }

  if (fxOn('cardGlow')) {
    for (const card of document.querySelectorAll<HTMLElement>('[data-glow-card]')) {
      card.addEventListener(
        'pointermove',
        (event) => {
          const box = card.getBoundingClientRect()
          card.style.setProperty('--glow-x', `${event.clientX - box.left}px`)
          card.style.setProperty('--glow-y', `${event.clientY - box.top}px`)
        },
        { passive: true },
      )
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--glow-x')
        card.style.removeProperty('--glow-y')
      })
    }
  }
}
