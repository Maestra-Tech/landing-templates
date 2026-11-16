import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import { site } from './src/site.config'

// O endereço do site vem de `src/site.config.ts` (campo `url`). Não é preciso mexer aqui.
export default defineConfig({
  site: site.url,
  vite: {
    plugins: [tailwindcss()],
  },
})
