import { fxOn, reducedMotion } from './fx'

/**
 * Linha do tempo do passo a passo.
 *
 * Cada passo ganha `data-timeline-reached` quando a leitura chega nele (o CSS acende o número),
 * e o título do passo recebe o brilho. A linha ACUMULA: o que foi lido continua aceso, e alcançar
 * o passo 3 acende também o 1 e o 2, mesmo numa rolagem rápida.
 */
export function mountTimeline(): void {
  const steps = [...document.querySelectorAll<HTMLElement>('[data-timeline-step]')]
  if (steps.length === 0) return

  let reached = -1
  const reach = (index: number): void => {
    for (let i = reached + 1; i <= index; i += 1) {
      const step = steps[i]
      if (!step) continue
      step.dataset.timelineReached = 'true'
      step.querySelector<HTMLElement>('[data-timeline-title]')?.classList.add('shimmer')
    }
    reached = Math.max(reached, index)
  }

  // Efeito desligado ou movimento reduzido: a trilha inteira já nasce acesa.
  if (!fxOn('timeline') || reducedMotion()) {
    reach(steps.length - 1)
    return
  }

  // A faixa de detecção é uma tira no meio da tela: o passo acende quando passa por ela.
  const observer = new IntersectionObserver(
    (entries) => {
      let deepest = -1
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        deepest = Math.max(deepest, steps.indexOf(entry.target as HTMLElement))
      }
      if (deepest >= 0) reach(deepest)
    },
    { rootMargin: '-35% 0px -45% 0px', threshold: 0 },
  )
  for (const step of steps) observer.observe(step)
}
