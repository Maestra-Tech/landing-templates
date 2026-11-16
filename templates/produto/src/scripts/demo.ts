import { asBackgroundVideo, fxOn, isDesktop, onReducedMotionChange, reducedMotion, videoAllowed, whenIdle } from './fx'

/**
 * A demonstração: o celular que troca de tela.
 *
 * Tudo passa por UMA função, `activate(key)`: clique na pílula, teclado, rolagem dos capítulos no
 * computador e o avanço automático. É isso que garante que sempre exista exatamente uma tela
 * ativa, venha o pedido de onde vier.
 *
 * O que este script acrescenta ao que o HTML e o CSS já fazem sozinhos:
 *  1. Clique na pílula troca a tela sem mudar o endereço da página.
 *  2. Vídeo opcional por tela: cada tela ganha o próprio `<video>`, criado uma vez, por cima da
 *     imagem. Trocar de tela é só trocar opacidade; nenhuma fonte de vídeo é reatribuída.
 *  3. Sincronia com a rolagem (computador): o capítulo no meio da tela escolhe a tela do celular.
 *  4. Avanço automático: ao fim do vídeo de uma tela, passa para a próxima; em telas sem vídeo,
 *     passa depois de alguns segundos (só no celular, onde não há sincronia por rolagem). Um
 *     clique numa pílula pausa o avanço por 15 segundos.
 */
const FRAGMENT = '#demo-tela-'
const PAUSE_AFTER_CLICK = 15_000

interface Layer {
  key: string
  poster: HTMLImageElement
  video: HTMLVideoElement | null
}

export function mountDemo(): void {
  const stage = document.querySelector<HTMLElement>('[data-demo-stage]')
  if (!stage) return

  const pills = [...document.querySelectorAll<HTMLAnchorElement>('[data-demo-pill]')]
  const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')]
  const layers: Layer[] = [...stage.querySelectorAll<HTMLImageElement>('[data-demo-layer]')].map((poster) => ({
    key: poster.dataset.demoLayer ?? '',
    poster,
    video: null,
  }))
  if (layers.length === 0 || pills.length === 0) return

  const order = layers.map((layer) => layer.key)
  const autoAdvance = fxOn('demoAutoAdvance')
  const scrollSync = fxOn('demoScrollSync')
  const autoSeconds = Number(stage.dataset.autoSeconds) || 6

  let active = order[0]!
  let stageVisible = false
  let pauseUntil = 0
  let lastChange = Date.now()

  const find = (key: string) => layers.find((layer) => layer.key === key)
  const nextKey = (key: string) => order[(order.indexOf(key) + 1) % order.length]!

  /** Cria, uma única vez, o vídeo de uma tela (se o config tiver vídeo para ela). */
  const ensureVideo = (layer: Layer): HTMLVideoElement | null => {
    if (layer.video) return layer.video
    const source = isDesktop() ? layer.poster.dataset.videoDesktop : layer.poster.dataset.videoMobile
    if (!source) return null

    const video = document.createElement('video')
    asBackgroundVideo(video)
    video.className = 'jvideo'
    video.src = source
    video.width = layer.poster.width
    video.height = layer.poster.height
    video.addEventListener('playing', () => video.setAttribute('data-playing', 'true'))
    // Fim do vídeo: avança para a próxima tela (ou repete, se o visitante acabou de escolher).
    video.addEventListener('ended', () => {
      if (layer.key !== active) return
      activate(autoAdvance && Date.now() >= pauseUntil ? nextKey(layer.key) : layer.key)
    })
    layer.poster.after(video)
    layer.video = video
    return video
  }

  const prefetch = (video: HTMLVideoElement | null) => {
    if (!video || video.preload === 'auto' || !videoAllowed()) return
    video.preload = 'auto'
    video.load()
  }

  const playVideo = (video: HTMLVideoElement | null) => {
    if (!video || !videoAllowed()) return
    void video.play().catch(() => {
      // Reprodução recusada: a imagem da tela permanece, e a página continua correta.
    })
  }

  const rest = (video: HTMLVideoElement | null) => {
    if (!video) return
    video.removeAttribute('data-playing')
    if (!video.paused) video.pause()
  }

  /** A única escrita de estado. */
  const activate = (key: string, options: { play?: boolean } = {}): void => {
    const current = find(key)
    if (!current) return
    active = key
    lastChange = Date.now()

    for (const layer of layers) {
      layer.poster.dataset.active = String(layer.key === key)
      if (layer.key !== key) rest(layer.video)
    }
    for (const pill of pills) pill.setAttribute('aria-current', String(pill.dataset.demoPill === key))
    for (const chapter of chapters) chapter.dataset.current = String(chapter.dataset.chapter === key)

    const video = ensureVideo(current)
    prefetch(video)
    if (options.play !== false && stageVisible && video) {
      try {
        video.currentTime = 0
      } catch {
        // `currentTime` pode falhar antes de o vídeo carregar; sem problema.
      }
      playVideo(video)
    } else {
      rest(video)
    }
  }

  // Chegou com uma tela no endereço (#demo-tela-...)? Adota essa tela e limpa o endereço, para o
  // CSS de `:target` não competir com este script.
  if (window.location.hash.startsWith(FRAGMENT)) {
    const wanted = window.location.hash.slice(FRAGMENT.length)
    if (find(wanted)) active = wanted
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }

  for (const pill of pills) {
    pill.addEventListener('click', (event) => {
      const key = pill.dataset.demoPill
      // Com Ctrl/Cmd/Shift, o clique continua sendo do navegador (abrir em nova aba etc.).
      if (!key || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      pauseUntil = Date.now() + PAUSE_AFTER_CLICK
      activate(key)
    })
  }

  // Sincronia com a rolagem: só no computador, onde o celular fica fixo ao lado dos capítulos.
  if (scrollSync && chapters.length > 0) {
    const desktop = window.matchMedia('(min-width: 1024px)')
    let synced = false
    const sync = () => {
      if (synced || !desktop.matches) return
      synced = true
      document.documentElement.setAttribute('data-demo-sync', '')
      // Uma tira fina no meio da tela: vale o capítulo que cruza o meio, não o que só aparece.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const key = (entry.target as HTMLElement).dataset.chapter
            if (entry.isIntersecting && key && key !== active) activate(key)
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
      )
      for (const chapter of chapters) observer.observe(chapter)
    }
    sync()
    desktop.addEventListener('change', sync)
  }

  // A tela ativa é preparada pouco antes de a seção aparecer; as outras, quando houver folga.
  const preload = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      preload.disconnect()
      activate(active, { play: false })
      whenIdle(() => {
        for (const layer of layers) if (layer.key !== active) prefetch(ensureVideo(layer))
      })
    },
    { rootMargin: '150% 0px' },
  )
  preload.observe(stage)

  // Vídeo só toca com o celular na tela.
  const visibility = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        stageVisible = entry.isIntersecting
        const current = find(active)
        if (!current) continue
        if (stageVisible) {
          lastChange = Date.now()
          playVideo(ensureVideo(current))
        } else {
          rest(current.video)
        }
      }
    },
    { threshold: 0.25 },
  )
  visibility.observe(stage)

  // Avanço automático das telas SEM vídeo. No computador com sincronia, quem manda é a rolagem.
  if (autoAdvance) {
    window.setInterval(() => {
      if (!stageVisible || reducedMotion() || document.hidden) return
      if (scrollSync && isDesktop()) return
      if (Date.now() < pauseUntil) return
      if (find(active)?.video) return
      if (Date.now() - lastChange >= autoSeconds * 1000) activate(nextKey(active))
    }, 1000)
  }

  activate(active, { play: false })

  onReducedMotionChange(() => {
    const current = find(active)
    if (!current) return
    if (videoAllowed() && stageVisible) playVideo(current.video)
    else rest(current.video)
  })

  // Voltar pela seta do navegador restaura a página com o vídeo parado: retoma.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && stageVisible) playVideo(find(active)?.video ?? null)
  })
}
