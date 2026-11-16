import { asBackgroundVideo, fxOn, onReducedMotionChange, videoAllowed, whenIdle } from './fx'

/**
 * Vídeo de fundo do começo da página.
 *
 * A imagem (pôster) já está no HTML e é o estado válido da seção: o vídeo é um bônus. Ele só é
 * criado depois que a página terminou de carregar e o navegador está ocioso, só toca enquanto o
 * começo da página está na tela, e só aparece (opacidade) depois de pintar o primeiro quadro.
 * Assim nunca existe tela preta, e a página não fica mais lenta por causa dele.
 *
 * Os caminhos dos arquivos vêm do config (`hero.media.video`) e chegam aqui pelos atributos
 * `data-hero-*` da imagem. Sem vídeo no config, este script não faz nada.
 */
export function mountHeroMedia(): void {
  if (!fxOn('heroVideo')) return
  const poster = document.querySelector<HTMLImageElement>('[data-hero-poster]')
  if (!poster) return

  const { heroWebm, heroMp4, heroMobile } = poster.dataset
  if (!heroWebm && !heroMp4 && !heroMobile) return

  const stage = poster.closest<HTMLElement>('[data-section="hero"]') ?? poster
  let video: HTMLVideoElement | null = null
  let gaveUp = false
  let watching = false

  /** Se o navegador transformar o fundo em "player" (tela cheia, controles), o vídeo sai de cena. */
  const giveUp = () => {
    gaveUp = true
    video?.remove()
    video = null
  }

  const build = (): HTMLVideoElement | null => {
    if (gaveUp) return null
    if (video) return video

    const node = document.createElement('video')
    node.dataset.heroVideo = ''
    asBackgroundVideo(node)
    node.loop = true

    // O celular recebe o arquivo menor, quando ele existe. A escolha é feita uma vez só.
    const sources: [string, string][] =
      window.innerWidth <= 768 && heroMobile
        ? [[heroMobile, 'video/mp4']]
        : [
            ...(heroWebm ? [[heroWebm, 'video/webm'] as [string, string]] : []),
            ...(heroMp4 ? [[heroMp4, 'video/mp4'] as [string, string]] : []),
          ]
    if (sources.length === 0 && heroMobile) sources.push([heroMobile, 'video/mp4'])
    for (const [src, type] of sources) {
      const source = document.createElement('source')
      source.src = src
      source.type = type
      node.append(source)
    }

    for (const name of ['webkitbeginfullscreen', 'enterpictureinpicture', 'fullscreenchange']) {
      node.addEventListener(name, giveUp)
    }
    node.addEventListener('playing', () => node.setAttribute('data-playing', ''))

    poster.after(node)
    video = node
    return node
  }

  const play = () => {
    if (!videoAllowed()) return
    const node = build()
    if (!node) return
    if (node.preload !== 'auto') {
      node.preload = 'auto'
      node.load()
    }
    // Reprodução recusada pelo navegador: o pôster fica, e isso é um estado válido.
    void node.play().catch(() => node.removeAttribute('data-playing'))
  }

  const pause = () => {
    if (!video) return
    video.removeAttribute('data-playing')
    if (!video.paused) video.pause()
  }

  const start = () => {
    if (watching || gaveUp || !videoAllowed()) return
    watching = true
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.intersectionRatio >= 0.25) play()
        else pause()
      },
      { threshold: [0, 0.25, 0.5] },
    )
    observer.observe(stage)
  }

  const schedule = () => whenIdle(start)
  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })

  // A preferência de movimento pode mudar com a página aberta.
  onReducedMotionChange((reduced) => {
    if (reduced) pause()
    else if (watching) play()
    else start()
  })
}
