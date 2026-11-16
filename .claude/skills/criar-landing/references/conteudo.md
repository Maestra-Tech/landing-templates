# Fase 4 - Conteúdo

Todo o texto da página mora em `src/site.config.ts`. Esta fase troca o conteúdo de exemplo pelo
conteúdo do aluno.

## Índice

1. [Antes de editar](#antes-de-editar)
2. [Passo a passo](#passo-a-passo)
3. [Regra dura: nada inventado](#regra-dura-nada-inventado)
4. [Regras de copy](#regras-de-copy)
5. [Título e destaque](#título-e-destaque)
6. [Botões e links](#botões-e-links)
7. [Seções: ligar e desligar](#seções-ligar-e-desligar)
8. [Componentes ilustrativos](#componentes-ilustrativos)
9. [O bloco effects](#o-bloco-effects)
10. [Dados de busca e compartilhamento](#dados-de-busca-e-compartilhamento)
11. [O campo exemplo](#o-campo-exemplo)
12. [Antes de mostrar ao aluno](#antes-de-mostrar-ao-aluno)

## Antes de editar

Leia, nesta ordem:

1. `BRIEFING.md` (o que dizer);
2. `src/site.config.ts` inteiro (onde dizer);
3. `TEMPLATE.md` e `package.json` (o que cada seção faz, quais campos são obrigatórios e o que
   o template usa: Astro + Tailwind v4 + TypeScript, com os efeitos em CSS e scripts pequenos em `src/scripts/`).

Os campos variam entre os templates. Use os nomes que estão no arquivo; não crie campo novo sem
conferir se algum componente em `src/components/` o lê.

O objetivo desta fase é trocar o conteúdo, não enxugar a página. Os templates têm acabamento
alto (efeitos, animações, cards, componentes ilustrativos) e isso deve chegar inteiro à página
do aluno. Reescreva o que cada componente diz; não o simplifique nem o remova para ganhar
tempo. Se o tipo do objeto `site`
exigir um campo, mantenha o campo.

## Passo a passo

1. Liste as seções existentes no config e decida, para cada uma, se há conteúdo real no
   briefing. Monte essa lista antes de escrever.
2. Reescreva o arquivo de cima para baixo, uma seção por vez, mantendo a estrutura e os tipos.
3. Seção sem conteúdo real: `enabled: false`, itens de exemplo removidos (listas vazias,
   textos vazios se o tipo exigir o campo) e uma linha em "Pendências" do briefing.
4. Confira os links (veja [Botões e links](#botões-e-links)).
5. Procure sobras: nomes de exemplo, "lorem ipsum", `exemplo.com`, textos entre colchetes,
   "SEU ...", "TODO". O `scripts/check.mjs` reprova a página se achar qualquer um deles em
   `src/`, mesmo dentro de seção desligada.
6. Troque `exemplo: true` por `exemplo: false`.
7. Rode `npm run build` para garantir que o arquivo continua válido.

Se uma informação necessária não está no briefing, pergunte ao aluno (uma pergunta por vez) em
vez de preencher com um palpite.

## Regra dura: nada inventado

Nunca invente:

- depoimento, avaliação, nota ou comentário de cliente;
- número (clientes atendidos, alunos, faturamento, porcentagem de resultado, anos de mercado);
- logo ou nome de cliente, parceiro ou veículo de imprensa;
- selo, certificação, prêmio;
- preço, desconto, parcelamento, bônus;
- garantia, prazo de entrega, política de devolução;
- escassez ou urgência ("últimas vagas", contagem regressiva) que não seja real.

Vale também para versões "ilustrativas", "de exemplo para trocar depois" e nomes genéricos
como "Maria S.". Se o aluno não forneceu e não confirmou, não existe.

O que fazer no lugar: desligar a seção, tirar os dados de exemplo dela e escrever a pendência
no briefing, por exemplo: "Depoimentos: seção desligada. Falta: 3 depoimentos reais com
autorização de uso do nome."

Depoimentos reais entram com o texto fiel ao original. Pode-se cortar para encurtar; não se
pode reescrever para soar melhor. Nome e foto só com autorização.

Se o aluno pedir para inventar ("coloca uns depoimentos aí"), explique em uma frase por que não
(engana o cliente dele e pode dar problema com a lei de defesa do consumidor) e ofereça o que
funciona: pedir depoimento a dois clientes hoje, ou usar outra forma de confiança que seja
verdadeira (como ele trabalha, quem ele é, garantia real).

## Regras de copy

1. **Clareza antes de criatividade.** Quem chega precisa entender em cinco segundos o que é,
   para quem é e o que fazer. Se o título só faz sentido depois de ler o resto, reescreva.
2. **Benefício antes de recurso.** Primeiro o que muda na vida do cliente, depois o que o
   produto tem. "Venda seus doces com lucro desde o primeiro mês" vem antes de "12 aulas
   gravadas".
3. **Um objetivo, um botão principal.** O mesmo botão, com o mesmo texto e o mesmo destino,
   repetido ao longo da página. Links secundários não podem competir com ele.
4. **Palavras do cliente.** Use os termos que o aluno usou para descrever o problema e o
   público. Evite jargão do ramo que o cliente final não usa.
5. **Concreto em vez de vago.** "Resposta em até 2 horas no horário comercial" (se for
   verdade) vale mais que "atendimento ágil". Sem um fato concreto, corte o adjetivo.
6. **Frases curtas.** Uma ideia por frase. Parágrafos de duas ou três linhas.
7. **Tom do briefing.** Siga o tom escolhido na entrevista do começo ao fim.
8. **Sem promessa que o aluno não fez.** Nada de "garantido", "o melhor", "número 1",
   "resultado em 7 dias" por conta própria.
9. **Perguntas frequentes reais.** Use as objeções que o aluno ouve de clientes. Se ele não
   citou nenhuma, pergunte quais dúvidas mais aparecem antes de fechar.
10. **Português correto**, com acentuação, e o mesmo tratamento ("você") em toda a página.

## Título e destaque

Os templates separam o título em `title` e `titleAccent` (o trecho que recebe destaque visual).
Confira no config e no `TEMPLATE.md` como os dois se combinam (ordem, quebra de linha).

- O destaque deve cair na parte mais importante da promessa, não em palavra de ligação.
- Lidos em sequência, `title` + `titleAccent` precisam formar uma frase natural.
- Mantenha o título em até duas linhas no celular; teste em 360 px.

## Botões e links

| Destino | Como preencher |
| --- | --- |
| Checkout | O link exato que o aluno forneceu. Não monte nem adivinhe link de pagamento. |
| WhatsApp | `https://wa.me/55DDDNUMERO?text=MENSAGEM`, só dígitos no número e mensagem codificada para URL. Confira o número com o aluno, dígito por dígito. |
| Formulário | Confira no `TEMPLATE.md` como o template trata formulário e para onde vão as respostas. Se depender de serviço externo, explique ao aluno e prefira opção gratuita. |
| Âncora na página | `#nome-da-secao`, usando um id que exista de verdade. |

O número de WhatsApp do exemplo no template é fictício. Nenhum botão principal pode ficar com
`#` ou vazio: o `check.mjs` reprova. Redes sociais e outros links que o aluno não tem devem ser
removidos, não deixados em branco.

## Seções: ligar e desligar

- Cada seção opcional tem `enabled: boolean`. Desligar é sempre melhor que preencher com
  enchimento.
- Menos seções com conteúdo forte valem mais que a página completa com texto genérico.
- Desligar é exceção com motivo: o aluno pediu, ou não há conteúdo real para a seção. Avise o
  aluno de cada seção desligada e do que falta para religar. Não desligue seção só porque dá
  trabalho adaptar.
- Ao desligar, confira se o menu ou algum botão apontava para a seção e ajuste.
- Se o aluno precisa de uma seção que o template não tem, veja primeiro se outra seção
  existente resolve com texto diferente. Criar componente novo é último recurso; critérios em
  `references/identidade-visual.md`.
- Nunca apague o arquivo de uma seção ou de um componente: desligado no config, ele continua
  disponível para quando o conteúdo chegar.

## Componentes ilustrativos

Algumas seções trazem componentes que encenam o produto ou o serviço: uma conversa de
WhatsApp, uma tela de aplicativo, um painel com números, um diagrama de etapas. Eles fazem
parte do acabamento e devem continuar na página, mas com o conteúdo do aluno.

- **Adapte ao negócio do aluno.** A conversa mostra uma dúvida real do cliente dele; a tela
  mostra o produto dele; o diagrama mostra as etapas do processo dele. Use o briefing.
- **Ou troque por imagem real.** Se o aluno tem print do produto, foto do trabalho ou vídeo,
  veja no `TEMPLATE.md` como o componente aceita imagem e use o material dele.
- **Nunca deixe o conteúdo de demonstração.** Uma tela de exemplo com o nome e os dados do
  negócio fictício é texto de exemplo esquecido, mesmo que pareça decoração.
- **A regra de não inventar vale aqui também.** Conversa ilustrativa não pode se passar por
  depoimento; painel ilustrativo não pode exibir número de resultado que o aluno não tem. Use
  conteúdo claramente demonstrativo do funcionamento (uma pergunta e uma resposta típicas, um
  pedido de exemplo), sem nome de cliente real nem promessa de resultado.
- O conteúdo desses componentes pode estar no config ou, em alguns casos, dentro do próprio
  componente (em `src/components/`). Procure pelos textos do
  exemplo em todo o `src/` para não deixar nada para trás.

Se não houver como adaptar com verdade (o aluno ainda não tem o produto pronto para mostrar,
por exemplo), converse com ele: desligar a seção é a saída, com a pendência anotada.

## O bloco effects

O `src/site.config.ts` tem um bloco `effects` em que cada efeito visual do template pode ser
ligado ou desligado. Todos vêm ligados. Confira no arquivo e no `TEMPLATE.md` quais existem.

- Ao reescrever o config, mantenha o bloco `effects` como está.
- Não desligue efeito nesta fase para "limpar" a página. Os critérios para desligar estão em
  `references/identidade-visual.md`.

## Dados de busca e compartilhamento

Preencha os campos de título da aba, descrição e endereço do site, se existirem no config:

- título da aba: nome do negócio + o que faz (até cerca de 60 caracteres);
- descrição: uma ou duas frases com a promessa principal (até cerca de 155 caracteres);
- endereço do site: o domínio do aluno, ou o endereço da Vercel enquanto não houver domínio
  (anote em Pendências que precisa ser atualizado depois).

## O campo exemplo

`exemplo: true` indica que o site ainda mostra o conteúdo de demonstração. Só troque para
`false` quando todo o conteúdo visível for do aluno. É o último passo da fase, porque serve de
trava: enquanto estiver `true`, o `check.mjs` reprova a publicação.

## Antes de mostrar ao aluno

- [ ] Nenhum texto de exemplo sobrou (busque pelos nomes do exemplo original em `src/`).
- [ ] Todo fato da página está no briefing.
- [ ] Um único botão principal, com destino testado.
- [ ] Seções sem conteúdo real desligadas e anotadas em Pendências.
- [ ] Componentes ilustrativos adaptados ao negócio do aluno ou trocados por imagem real.
- [ ] Bloco `effects` intacto (todos os efeitos ligados, salvo pedido do aluno).
- [ ] `npm run build` termina sem erro.

Depois, abra a prévia, peça para o aluno ler em voz alta o primeiro bloco e pergunte: "É assim
que você explicaria para um cliente?". Ajuste antes de ir para o visual.
