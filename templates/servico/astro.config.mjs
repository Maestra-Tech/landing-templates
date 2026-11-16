// Configuração do Astro. Normalmente você não precisa mexer aqui:
// o endereço do site vem de src/site.config.ts (campo "url").
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/site.config.ts';

export default defineConfig({
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
