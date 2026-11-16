// Converte o bloco "effects" do site.config.ts em classes no <html>
// (ex.: "fx-beam fx-reveal"). O CSS e os scripts só ligam um efeito quando
// a classe correspondente existe.
import { site } from '../site.config';

const CLASS_BY_EFFECT: Record<keyof typeof site.effects, string> = {
  spotlight: 'fx-spotlight',
  magneticCta: 'fx-magnetic',
  ctaBeam: 'fx-beam',
  ctaSheen: 'fx-sheen',
  holoFlow: 'fx-holo',
  heroIntro: 'fx-intro',
  railShimmer: 'fx-rail',
  navGlass: 'fx-nav',
  reveal: 'fx-reveal',
  wordReveal: 'fx-words',
  stickyStack: 'fx-stack',
  parallax: 'fx-parallax',
  cardGlow: 'fx-glow',
  phoneFloat: 'fx-float',
  phoneAutoplay: 'fx-autoplay',
  faqAccordion: 'fx-faq',
};

export function effectClasses(): string {
  return (Object.keys(CLASS_BY_EFFECT) as (keyof typeof site.effects)[])
    .filter((key) => site.effects[key])
    .map((key) => CLASS_BY_EFFECT[key])
    .join(' ');
}
