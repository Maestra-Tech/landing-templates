# Template: página de serviço

Landing page de uma página só para quem **vende por conversa**: agência, consultoria, estúdio, profissional liberal. O visitante lê, entende o que você faz e chama no WhatsApp (ou no link que você escolher).

Visual: fundo escuro com grão, gradiente holográfico, títulos com um trecho em serifa itálica, cards de vidro, cards empilhados que grudam ao rolar e um celular que troca de tela.

> O conteúdo que vem no template é de um negócio **fictício** ("Estúdio Norte"). Números, case e conversas são inventados: troque tudo antes de publicar.

## Como rodar

Precisa do Node 22 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321 e atualiza sozinho
npm run build    # gera o site final na pasta dist/
npm run preview  # mostra o site final gerado
```

## Onde editar

| Quero mudar... | Arquivo |
| --- | --- |
| Textos, links, imagens, WhatsApp, ligar/desligar seções e efeitos | `src/site.config.ts` |
| Cores, fontes, cantos, grão | `src/styles/tokens.css` |
| Ordem das seções | `src/pages/index.astro` |
| Desenho de uma seção | `src/components/sections/NomeDaSecao.astro` |
| Ilustrações em código (conversa, linha do tempo, diagrama) | `src/components/mocks/` |
| Botões, títulos, cards (peças repetidas) | `src/styles/global.css` |
| Como um efeito funciona | `src/scripts/` (um arquivo por efeito) |
| Ícone da aba e imagem de compartilhamento | `public/favicon.svg` e `public/og.png` |

Regra de ouro: **conteúdo só no `site.config.ts`, identidade visual só no `tokens.css`.**

## Seções

Na ordem em que aparecem. Cada uma some sozinha com `enabled: false` ou sem itens.

| Seção | Chave no config | Vem ligada? |
| --- | --- | --- |
| Menu do topo com botão | `nav` | sempre |
| Topo (título, apoio, botão, régua de termos) | `hero` (`hero.rail.enabled`) | sempre (régua: sim) |
| Números com fonte | `stats` | sim, com números **ilustrativos** |
| Comparativo "nós x alternativas" | `compare` | sim |
| Serviços em degraus | `offers` | sim |
| Como funciona / bastidores | `process` | sim |
| Case em destaque com celular | `caseStudy` | sim, com case **fictício** |
| Depoimentos | `testimonials` | não (lista vazia) |
| Perguntas frequentes | `faq` | sim |
| Chamada final | `finalCta` | sempre |
| Rodapé | `footer` | sempre |

Só publique números, case e depoimentos **reais**. Se não tiver, desligue a seção.

## Contato

Todos os botões usam `whatsapp.number` e `whatsapp.message` para montar o link `https://wa.me/...`. Não usa WhatsApp? Preencha `ctaHref` com outro link e ele passa a valer em todos os botões.

## Efeitos

O bloco `effects` do `site.config.ts` liga e desliga cada animação (todas vêm ligadas): luz do cursor, botão magnético, feixe e reflexo do botão, gradientes animados, entrada do topo, brilho da régua, menu de vidro, reveal, palavras que acendem, cards empilhados, parallax, brilho dos cards, celular flutuando, troca automática de telas e animação das perguntas. Quem configurou o aparelho para "reduzir movimento" não vê animações. Sem JavaScript a página continua legível.

## Antes de publicar

1. Troque os textos e mude `exemplo` para `false` (enquanto for `true`, o site pede para não ser indexado e mostra um aviso no rodapé).
2. Coloque seu número em `whatsapp.number` (o do template é falso) e o endereço em `url`.
3. Troque `public/og.png` (1200 x 630) e `public/favicon.svg`.
