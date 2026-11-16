// CELULAR DO CASE: troca a tela ao clicar numa pílula e, com o efeito
// "phoneAutoplay" ligado, troca sozinho enquanto o aparelho está visível.
// - Tela com vídeo: avança quando o vídeo termina. Os vídeos só são baixados
//   quando a seção se aproxima da tela (nada pesa no carregamento inicial).
// - Tela sem vídeo: avança depois de "autoplaySeconds" (site.config.ts).
// - Clicou numa pílula? A troca automática pausa por 15 segundos.
import { fx, reducedMotion } from './env';

interface LazyVideo extends HTMLVideoElement {
  _src?: string;
  _loaded?: boolean;
}

export function initPhone() {
  const screen = document.querySelector<HTMLElement>('[data-phone-screen]');
  if (!screen) return;

  const layers = [...screen.querySelectorAll<HTMLElement>('[data-fn-layer]')];
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('button[data-fn]')];
  if (layers.length === 0) return;

  const autoplay = fx('autoplay') && !reducedMotion && layers.length > 1;
  const seconds = Math.max(2, parseFloat(screen.dataset.autoplaySeconds || '6'));
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const videos = new Map<number, LazyVideo>();

  let active = 0;
  let visible = false;
  let pauseUntil = 0;
  let timer = 0;

  const load = (video?: LazyVideo) => {
    if (!video || video._loaded || !video._src) return;
    video._loaded = true;
    video.preload = 'auto';
    video.src = video._src;
    video.load();
  };

  const play = (video?: LazyVideo) => {
    if (!video || reducedMotion) return;
    video.play().catch(() => {}); // o navegador pode recusar; tudo bem
  };

  // Mostra a camada e marca a pílula correspondente.
  const show = (index: number) => {
    active = index;
    layers.forEach((layer, i) => {
      layer.classList.toggle('is-active', i === index);
      if (i === index) layer.removeAttribute('aria-hidden');
      else layer.setAttribute('aria-hidden', 'true');
    });
    buttons.forEach((button) => {
      const on = Number(button.dataset.fn) === index;
      button.setAttribute('aria-pressed', String(on));
      button.parentElement?.classList.toggle('is-active', on);
    });
  };

  // Agenda a próxima troca (só para telas sem vídeo).
  const schedule = () => {
    window.clearTimeout(timer);
    if (!autoplay || !visible || videos.has(active)) return;
    timer = window.setTimeout(advance, seconds * 1000);
  };

  const run = (index: number) => {
    videos.forEach((video, i) => {
      if (i !== index && !video.paused) video.pause();
    });
    show(index);
    const video = videos.get(index);
    if (video) {
      load(video);
      try {
        video.currentTime = 0;
      } catch {
        // antes de o vídeo carregar, voltar ao início pode falhar; sem problema
      }
      if (visible) play(video);
    }
    schedule();
  };

  // Durante a pausa (depois de um clique) repete a mesma tela; senão, avança.
  function advance() {
    if (!autoplay) return;
    run(Date.now() < pauseUntil ? active : (active + 1) % layers.length);
  }

  screen.querySelectorAll<LazyVideo>('video[data-vid]').forEach((video) => {
    const index = Number(video.dataset.vid);
    video.muted = true;
    video.playsInline = true;
    video._src = mobile ? video.dataset.srcMobile : video.dataset.srcFull;
    video.addEventListener('ended', () => {
      if (index === active) advance();
    });
    video.addEventListener('canplay', () => {
      if (index === active && visible && video.paused) play(video);
    });
    videos.set(index, video);
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      pauseUntil = Date.now() + 15000;
      visible = true;
      run(Number(button.dataset.fn));
    });
  });

  show(0);

  if (reducedMotion || !('IntersectionObserver' in window)) return;

  // Começa a baixar o vídeo da tela ativa um pouco antes de a seção aparecer.
  if (videos.size > 0) {
    const preload = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        preload.disconnect();
        load(videos.get(active));
      },
      { rootMargin: '150% 0px' },
    );
    preload.observe(screen);
  }

  // Só roda (vídeo e troca automática) enquanto o aparelho está na tela.
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible = entry.isIntersecting;
        const video = videos.get(active);
        if (visible) {
          load(video);
          play(video);
          schedule();
        } else {
          window.clearTimeout(timer);
          if (video && !video.paused) video.pause();
        }
      }
    },
    { threshold: 0.25 },
  ).observe(screen);
}
