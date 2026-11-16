// Monta o link usado por TODOS os botões de contato da página.
// Regra: se "ctaHref" estiver preenchido no site.config.ts, usa ele.
// Senão, monta o link do WhatsApp com o número e a mensagem do config.
import { site } from '../site.config';

export function contactHref(): string {
  const custom = site.ctaHref.trim();
  if (custom) return custom;

  const number = site.whatsapp.number.replace(/\D/g, ''); // deixa só os dígitos
  const message = encodeURIComponent(site.whatsapp.message);
  return `https://wa.me/${number}${message ? `?text=${message}` : ''}`;
}

/** Links para outros sites abrem em nova aba; âncoras (#) e mailto não. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
