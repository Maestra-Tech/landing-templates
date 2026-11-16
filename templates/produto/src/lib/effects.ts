import { site } from '@/site.config'

/**
 * A lista dos efeitos DESLIGADOS no config, pronta para virar o atributo `data-fx-off` da página.
 *
 * O CSS (`styles/effects.css`) e os scripts (`scripts/fx.ts`) leem esse atributo para saber o que
 * não devem animar. Com tudo ligado, a lista fica vazia e o atributo nem é escrito.
 */
export const effectsOff: string = Object.entries(site.effects)
  .filter(([, on]) => !on)
  .map(([name]) => name)
  .join(' ')
