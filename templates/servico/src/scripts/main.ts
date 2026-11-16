// Ponto de entrada dos efeitos. Cada arquivo cuida de UM efeito e confere
// sozinho se está ligado no site.config.ts (bloco "effects") e se a pessoa
// pediu "reduzir movimento". Para remover um efeito de vez, apague a linha
// dele aqui.
import { initHeader } from './header';
import { initSpotlight } from './spotlight';
import { initMagnetic } from './magnetic';
import { initRail } from './rail';
import { initReveal } from './reveal';
import { initWordReveal } from './word-reveal';
import { initStack } from './stack';
import { initParallax } from './parallax';
import { initFaq } from './faq';
import { initPhone } from './phone';

initHeader();
initSpotlight();
initMagnetic();
initRail();
initWordReveal();
initReveal();
initStack();
initParallax();
initFaq();
initPhone();
