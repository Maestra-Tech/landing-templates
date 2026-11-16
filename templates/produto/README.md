# Modelo: página de produto

Página única para apresentar e vender um **produto digital ou SaaS** (aplicativo, plataforma, ferramenta online). Fundo escuro "cinema" alternado com faixas claras, títulos com brilho, cards com borda em degradê, celular de demonstração, linha do tempo e planos de preço.

O conteúdo que vem no modelo é de mentira: "Aurora" é um produto fictício, e os números, preços e marcas são só para preencher a página.

## Como rodar

Precisa do Node 22 ou mais novo.

```bash
npm install
npm run dev      # abre a página em http://localhost:4321
npm run build    # gera o site final na pasta dist/
npm run preview  # mostra o site final gerado
```

## Onde editar

| O que você quer mudar | Arquivo |
| --- | --- |
| Textos, links, preços, seções ligadas e desligadas, efeitos | `src/site.config.ts` |
| Cores, fontes e cantos arredondados | `src/styles/tokens.css` |
| Imagens, logo e ícone da aba | pasta `public/` |
| A ordem das seções | `src/pages/index.astro` |

Em geral, só os dois primeiros. Os dois arquivos têm comentários explicando cada bloco.

### Conteúdo: `src/site.config.ts`

- Cada seção opcional tem `enabled: true` ou `false`. Desligada, ou com a lista vazia, ela some sem deixar buraco, e o atalho dela na barra do topo some junto.
- Nos títulos, `title` é o texto normal, `titleAccent` é o trecho com brilho e `titleEnd` é o que vem depois dele.
- O bloco `effects` liga e desliga cada efeito visual.
- Quando terminar de trocar o conteúdo de exemplo, mude `exemplo: true` para `false`.

### Identidade: `src/styles/tokens.css`

O topo do arquivo tem o bloco **"O QUE TROCAR PARA MUDAR A IDENTIDADE"**. Para mudar as cores, basta trocar os números de matiz (`--primary-h`, `--accent-h`, `--secondary-h`, `--signal-h`, `--neutral-h`). Fontes ficam em `--font-display` e `--font-body`; cantos, em `--radius-*`.

Depois de mudar as cores, copie o valor de `--neutral-950` para `brand.themeColor` no config.

## Seções

Na ordem em que aparecem:

1. **Barra do topo** (`Nav`): marca, atalhos, botão de entrada, botão principal e faixa de aviso opcional.
2. **Começo** (`Hero`): título com destaque, texto de apoio, botão e três provas. Fundo animado por código, ou imagem e vídeo, se você preencher `hero.media`.
3. **Faixa de logos** (`Logos`): esteira que anda sozinha.
4. **Problema** (`Problem`): título que acende palavra por palavra.
5. **Comparativo** (`Compare`): dois cards e uma faixa escura com botão.
6. **Demonstração** (`Demo`): celular que troca de tela, pílulas e capítulos.
7. **Funcionalidades** (`Features`): grade de cards, cada um com uma prova opcional.
8. **Passo a passo** (`Steps`): linha do tempo.
9. **Por dentro** (`Inside`): leitura longa, com índice lateral.
10. **Antes e depois** (`BeforeAfter`).
11. **Vitrine** (`Showcase`): imagens grandes com moldura, com versão própria para celular.
12. **Depoimentos** (`Testimonials`): vem desligada e vazia. Só ligue com depoimentos reais e autorizados.
13. **Preços** (`Pricing`): cards de plano e, opcionalmente, opções de pagamento.
14. **Dúvidas** (`Faq`).
15. **Convite final** (`FinalCta`).
16. **Rodapé** (`Footer`): links, redes, dados da empresa opcionais.

Cada seção é um arquivo em `src/components/sections/`.

## Imagens de exemplo

Tudo em `public/` é ilustração de enfeite, feita para o modelo: as telas do celular (`public/demo/`), as folhas da vitrine (`public/vitrine/`), o ícone da aba (`favicon.svg`) e a imagem de compartilhamento (`og-placeholder.png`). Troque pelos seus arquivos e atualize os caminhos no config.

As cores dessas ilustrações estão dentro dos próprios arquivos: elas não mudam quando você altera `tokens.css`.

## Efeitos e acessibilidade

- A página funciona sem JavaScript: o conteúdo aparece inteiro, as dúvidas abrem e as pílulas da demonstração trocam a tela.
- Quem ativou "reduzir movimento" no aparelho recebe a página sem animação.
- Os scripts dos efeitos ficam em `src/scripts/`, um arquivo pequeno e comentado por efeito.

## Tecnologia

Astro 7, Tailwind CSS 4 e TypeScript. Sem React e sem ferramentas de medição de visitas. As fontes (Schibsted Grotesk e Source Sans 3) têm licença livre e são instaladas pelo `npm install`.
