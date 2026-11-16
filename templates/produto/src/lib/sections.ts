import { site } from '@/site.config'

/**
 * Quais seções aparecem na página.
 *
 * Uma seção aparece quando está ligada (`enabled: true`) E tem conteúdo. Esta lista é a única
 * régua: a própria seção a consulta para decidir se desenha, e a barra do topo a consulta para
 * não mostrar um atalho que não leva a lugar nenhum.
 *
 * A chave de cada linha é o `id` da seção na página (o que vem depois do `#` nos links).
 */
export const visible = {
  logos: site.logos.enabled && site.logos.items.length > 0,
  problema: site.problem.enabled,
  comparativo:
    site.compare.enabled && site.compare.them.items.length > 0 && site.compare.us.items.length > 0,
  demo: site.demo.enabled && site.demo.items.length > 0,
  funcionalidades: site.features.enabled && site.features.items.length > 0,
  'como-funciona': site.steps.enabled && site.steps.items.length > 0,
  'por-dentro': site.inside.enabled && site.inside.items.length > 0,
  'antes-depois':
    site.beforeAfter.enabled &&
    site.beforeAfter.before.items.length > 0 &&
    site.beforeAfter.after.items.length > 0,
  vitrine: site.showcase.enabled && site.showcase.items.length > 0,
  depoimentos: site.testimonials.enabled && site.testimonials.items.length > 0,
  precos: site.pricing.enabled && site.pricing.plans.length > 0,
  faq: site.faq.enabled && site.faq.items.length > 0,
  comecar: site.finalCta.enabled,
} as const

export type SectionId = keyof typeof visible

/** Um link interno (`#alguma-secao`) só vale se a seção de destino estiver visível. */
export function linkIsAlive(href: string): boolean {
  if (!href.startsWith('#') || href.length === 1) return true
  const id = href.slice(1)
  return id in visible ? visible[id as SectionId] : true
}
