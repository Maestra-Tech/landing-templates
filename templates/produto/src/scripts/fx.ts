/**
 * Utilitários comuns aos scripts de efeito.
 *
 * Três perguntas que todo efeito faz antes de rodar:
 *  1. O efeito está ligado no config?            → `fxOn('nome')`
 *  2. A pessoa pediu menos movimento no aparelho? → `reducedMotion()`
 *  3. Existe mouse de verdade (e não só toque)?   → `finePointer()`
 */

/** Os efeitos desligados no config chegam pelo atributo `data-fx-off` do `<html>`. */
const off = new Set((document.documentElement.dataset.fxOff ?? '').split(/\s+/).filter(Boolean))

export function fxOn(name: string): boolean {
  return !off.has(name)
}

const REDUCED = '(prefers-reduced-motion: reduce)'

export function reducedMotion(): boolean {
  return window.matchMedia(REDUCED).matches
}

/** Avisa quando a preferência de movimento muda com a página aberta. */
export function onReducedMotionChange(listener: (reduced: boolean) => void): void {
  window.matchMedia(REDUCED).addEventListener('change', (event) => listener(event.matches))
}

export function finePointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function isDesktop(): boolean {
  return window.innerWidth >= 1024
}

/**
 * Vídeo é tráfego: quem ligou "economia de dados" ou está numa rede muito lenta fica só com a
 * imagem. E quem pediu menos movimento não recebe reprodução automática.
 */
export function videoAllowed(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection
  const slow = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'
  return !reducedMotion() && connection?.saveData !== true && !slow
}

/** Roda uma tarefa quando o navegador estiver ocioso (ou logo depois, onde isso não existe). */
export function whenIdle(work: () => void): void {
  if ('requestIdleCallback' in window) window.requestIdleCallback(work, { timeout: 2000 })
  else setTimeout(work, 200)
}

/**
 * Prepara um `<video>` para ser fundo, e não "player": mudo, embutido na página, sem controles,
 * sem tela cheia. Alguns navegadores de celular transformam vídeos comuns em player próprio; os
 * atributos `x5-*` e `t7-*` pedem a eles que não façam isso.
 */
export function asBackgroundVideo(video: HTMLVideoElement): void {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.controls = false
  video.preload = 'none'
  video.tabIndex = -1
  for (const [name, value] of [
    ['muted', ''],
    ['playsinline', ''],
    ['webkit-playsinline', ''],
    ['x5-playsinline', ''],
    ['x5-video-player-type', 'h5'],
    ['x5-video-player-fullscreen', 'false'],
    ['t7-video-player-type', 'inline'],
    ['controlslist', 'nodownload nofullscreen noremoteplayback'],
    ['disablepictureinpicture', ''],
    ['disableremoteplayback', ''],
    ['aria-hidden', 'true'],
  ] as const) {
    video.setAttribute(name, value)
  }
}
