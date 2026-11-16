# Fase 5 - Identidade visual

A identidade visual inteira sai de `src/styles/tokens.css`. Trocar os valores ali muda o site
todo de forma coerente; mexer em cor dentro de cada seção cria um site remendado.

## Índice

1. [Antes de editar](#antes-de-editar)
2. [Ordem de trabalho](#ordem-de-trabalho)
3. [Cores por papel](#cores-por-papel)
4. [Contraste](#contraste)
5. [Fontes](#fontes)
6. [Raios e formas](#raios-e-formas)
7. [Logo, favicon e imagem de compartilhamento](#logo-favicon-e-imagem-de-compartilhamento)
8. [Fotos e vídeos do aluno](#fotos-e-vídeos-do-aluno)
9. [Preservar efeitos e componentes](#preservar-efeitos-e-componentes)
10. [Revisão com a skill Impeccable](#revisão-com-a-skill-impeccable)
11. [Conferência da fase](#conferência-da-fase)

## Antes de editar

1. Leia `src/styles/tokens.css` inteiro. O bloco "O QUE TROCAR PARA MUDAR A IDENTIDADE", no
   topo, diz o que mexer e em que ordem. Ele vale mais que este guia quando houver diferença.
2. Leia a parte de identidade do `BRIEFING.md` (logo, cores, fontes, referências, direção
   escolhida).
3. Leia a seção sobre visual no `TEMPLATE.md` e o `package.json`, para saber o que o template
   usa (Astro + Tailwind v4 + TypeScript, com ilhas React/Motion onde há interação) e quais
   efeitos existem no bloco `effects` do `src/site.config.ts`.

Use os nomes de variáveis que existem no arquivo. Não renomeie tokens nem apague um token sem
conferir que nenhum componente o usa.

## Ordem de trabalho

1. Cores.
2. Fontes.
3. Raios.
4. Logo, favicon, imagem de compartilhamento.
5. Fotos e vídeos.
6. Efeitos e componentes: conferir que continuam todos funcionando com a nova identidade.

Mostre a prévia depois de cada etapa. Uma mudança por vez deixa claro para o aluno o que mudou
e facilita voltar atrás.

## Cores por papel

Os tokens são organizados por função, não por nome de cor. Os papéis típicos (confira os nomes
reais no arquivo):

- fundo da página e fundo de superfícies (cards, faixas);
- texto principal e texto secundário;
- cor de destaque (botão principal, links, o trecho `titleAccent`);
- texto sobre a cor de destaque;
- bordas e divisórias;
- cores do gradiente, se o template usar.

Como partir da marca do aluno:

- **Tem cores definidas:** use a cor principal da marca como destaque. Derive fundos e textos
  a partir de neutros levemente puxados para o tom da marca; preto e branco puros costumam
  deixar o resultado duro.
- **Tem só o logo:** extraia do logo a cor principal e, no máximo, uma de apoio.
- **Não tem nada:** use a direção escolhida na entrevista.

Regras práticas:

- Uma cor de destaque só. Duas cores fortes disputando atenção enfraquecem o botão principal.
- A cor de destaque aparece pouco: botão, links e um ou dois detalhes.
- Se o template tem modo claro e escuro, ajuste os dois e confira os dois na prévia.
- Gradientes e brilhos: troque as cores pelos tons da marca, mantendo tons vizinhos. Para uma
  marca sóbria, use tons mais próximos entre si e menos saturados; o efeito continua, só fica
  mais contido.

## Contraste

Texto difícil de ler derruba a página, principalmente no celular e no sol. Confira:

- texto normal sobre o fundo: contraste de pelo menos 4,5 para 1;
- títulos grandes e ícones: pelo menos 3 para 1;
- texto do botão sobre a cor de destaque: pelo menos 4,5 para 1;
- texto sobre gradiente ou imagem: teste no ponto mais claro e no mais escuro do fundo.

Calcule a razão de contraste (fórmula de luminância relativa das diretrizes WCAG 2.x) em vez de
confiar no olho. Se a cor da marca não dá contraste como fundo de botão com texto branco, teste
texto escuro no botão, ou escureça levemente a cor só para esse uso e avise o aluno do motivo.

## Fontes

- Os templates carregam fontes por pacotes `@fontsource` (as fontes ficam dentro do projeto,
  sem depender de serviço externo). Veja em `tokens.css` e no `TEMPLATE.md` onde as fontes são
  importadas e quais pesos são usados.
- Use somente fontes disponíveis no Fontsource com licença livre (por exemplo, SIL Open Font
  License). Confira o nome exato do pacote e a licença em fontsource.org antes de instalar;
  não presuma que um pacote existe.
- Para trocar: instale o pacote novo com `npm install`, troque os imports e os tokens de
  família, e remova o pacote antigo com `npm uninstall` para não deixar peso morto.
- No máximo duas famílias: uma para títulos, uma para texto. Poucos pesos (em geral, dois ou
  três).
- A fonte da marca é paga ou não está no Fontsource? Não use arquivo de fonte sem licença.
  Proponha a alternativa livre mais próxima e mostre as duas lado a lado. Se o aluno tiver a
  licença para uso na web e enviar os arquivos, pode usar; registre no briefing.
- Confira acentos (ã, ç, é, õ) na fonte escolhida e o tamanho do título no celular (360 px).

## Raios e formas

Os tokens de raio controlam o arredondamento de botões, cards e imagens.

- Cantos mais retos passam precisão e seriedade; mais redondos passam proximidade e leveza.
- Mude a escala inteira de forma proporcional; evite misturar botão muito redondo com card
  reto.
- Se o logo tem formas marcantes (muito geométrico ou muito orgânico), acompanhe.

## Logo, favicon e imagem de compartilhamento

`public/` vem só com arquivos provisórios. Confira no `TEMPLATE.md` e no config os nomes de
arquivo esperados e substitua mantendo os mesmos nomes, ou atualize o caminho no config.

- **Logo:** de preferência em SVG; se for PNG, com fundo transparente e pelo menos o dobro do
  tamanho em que aparece. Se o site tem fundo escuro, é preciso uma versão do logo que
  funcione sobre escuro. Sem logo, use o nome do negócio escrito com a fonte de títulos; não
  desenhe um logo por conta própria sem o aluno pedir.
- **Favicon:** o ícone da aba. Use o símbolo do logo ou a inicial do negócio na cor da marca,
  legível em 16 px. O `check.mjs` exige um `favicon.svg`, `favicon.ico` ou `favicon.png` em
  `public/`.
- **Imagem de compartilhamento:** aparece quando o link é enviado no WhatsApp e nas redes.
  1200 x 630 px, em PNG ou JPG, com o nome do negócio e a promessa principal em letras
  grandes. O `check.mjs` exige que ela exista em `public/`. Ele verifica só a presença do
  arquivo: confirme você mesmo que a imagem provisória do template foi trocada.

## Fotos e vídeos do aluno

- Use apenas material do aluno ou com licença que permita o uso. Não baixe imagem da internet
  nem use foto de terceiros sem licença.
- Reduza o peso antes de colocar em `public/` (largura máxima em torno de 1600 px para fotos
  de destaque; formato WebP ou JPG). Página pesada demora no celular.
- Todo `alt` de imagem descreve o que aparece, em português.
- Vídeo: prefira o player incorporado de onde o vídeo já está hospedado; arquivo de vídeo
  grande dentro do projeto deixa a página lenta.
- Sem foto para uma seção que depende de foto: use a variação sem imagem, se o template tiver,
  ou desligue a seção avisando o aluno. Não use foto genérica só para preencher.

## Preservar efeitos e componentes

Os templates são de acabamento alto: mantêm todos os efeitos, animações, cards e componentes
das páginas originais. Esse acabamento é o que o aluno recebeu no curso e deve chegar inteiro à
página dele. Adaptar a marca significa **trocar conteúdo e tokens**, não simplificar.

Regra geral: tokens primeiro, config depois, componente por último.

### O que fazer por padrão

- Mantenha todos os efeitos ligados e todos os componentes no lugar.
- Leve a marca até os efeitos pelos tokens: as cores do gradiente, do brilho e dos destaques
  vêm de `tokens.css`. Um efeito que "não combina" quase sempre só está com as cores do
  exemplo.
- Não reescreva um componente animado como versão estática, não troque uma ilha React por HTML
  simples e não remova biblioteca (React, Motion) para "deixar mais leve". Confira no
  `package.json` e no `TEMPLATE.md` o que o template usa e mantenha.
- Componentes ilustrativos (conversas, telas de exemplo, diagramas) são adaptados ao negócio do
  aluno ou trocados por imagem real dele, como descrito em `references/conteudo.md`. Nunca
  ficam com o conteúdo de demonstração.

### Quando desligar um efeito ou uma seção

Cada efeito pode ser desligado no bloco `effects` do `src/site.config.ts` (todos vêm ligados);
cada seção opcional, com `enabled: false`. Só desligue em um destes três casos:

1. **O aluno pediu.** A página é dele.
2. **Não há conteúdo real** para a seção ou para o componente (regra de não inventar).
3. **O efeito prejudica a leitura ou o desempenho.** Por exemplo: texto sem contraste sobre o
   gradiente mesmo depois de ajustar os tokens, animação que trava em celular simples,
   movimento que distrai do botão principal. Tente antes ajustar pelos tokens.

Em qualquer dos casos:

- desligue pelo bloco `effects` ou por `enabled: false`, nunca apagando código ou arquivo;
- avise o aluno antes, dizendo o que vai desligar, por quê, e como religar;
- mostre a prévia com e sem o efeito, para ele decidir vendo;
- registre a decisão no `BRIEFING.md` (em "Decisões do projeto").

O `scripts/check.mjs` lista os efeitos e as seções desligados como aviso, justamente para essa
conferência com o aluno.

Marca sóbria (advocacia, saúde, contabilidade) não é, sozinha, motivo para desligar efeitos.
Proponha primeiro uma paleta contida aplicada aos efeitos existentes e mostre. Se o aluno, ao
ver, preferir sem, vale o caso 1.

### Quando editar um componente

Em `src/components/sections/`, `src/components/react/` ou `src/scripts/`, só nestes casos:

- **Conteúdo de demonstração preso no componente** (texto de uma tela de exemplo, de uma
  conversa ilustrativa) que não vem do config: troque pelo conteúdo do aluno, mantendo a
  estrutura e a animação.
- **Seção que falta.** Antes de criar, veja se uma seção existente resolve com outro texto. Se
  for mesmo necessário, crie o componente seguindo o padrão dos vizinhos (mesmos tokens, mesma
  forma de ler o config, mesmo nível de acabamento), adicione o conteúdo ao `site.config.ts`
  com `enabled` e avise o aluno de que isso é uma mudança de estrutura.
- **Correção de problema real** de leitura ou de layout que os tokens não resolvem.

Mantenha o respeito à preferência de movimento reduzido do sistema, se o template já tiver, e
não adicione biblioteca nova sem necessidade clara.

Quando não editar:

- para trocar uma cor em um lugar só (isso é sinal de token faltando; crie o token);
- para mudar texto que já vem do config;
- para remover ou simplificar acabamento sem um dos três motivos acima.

Toda mudança em componente pede `npm run build` em seguida e uma olhada na prévia em 360 px.

## Revisão com a skill Impeccable

Se a skill Impeccable estiver instalada nesta sessão, sugira ao aluno: "Quer que eu faça uma
revisão de acabamento com a Impeccable, a mesma do curso?". Com o sim, use-a para revisar a
página pronta e aplique os ajustes pelos tokens sempre que possível. Se não estiver instalada,
não peça para instalar e siga com a conferência abaixo. Esta skill funciona sem ela.

## Conferência da fase

- [ ] Só `src/styles/tokens.css` concentra cores, fontes e raios.
- [ ] Contraste conferido (texto, botão, texto sobre gradiente), nos modos claro e escuro se
      existirem.
- [ ] No máximo duas famílias de fonte, com licença livre, acentos corretos.
- [ ] Logo, favicon e imagem de compartilhamento trocados pelos do aluno.
- [ ] Nenhuma imagem provisória ou de terceiros sem licença.
- [ ] Prévia conferida em 360 px e em tela grande.
- [ ] `npm run build` sem erro.
- [ ] Efeitos, animações e componentes preservados; o que foi desligado tem motivo, aviso ao
      aluno e registro no briefing.
- [ ] Componentes ilustrativos sem conteúdo de demonstração.
- [ ] Decisões de visual registradas no `BRIEFING.md`.
