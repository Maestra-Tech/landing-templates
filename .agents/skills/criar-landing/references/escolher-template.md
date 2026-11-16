# Fase 3 - Escolher o template

## Índice

1. [Os dois templates](#os-dois-templates)
2. [A pergunta que decide](#a-pergunta-que-decide)
3. [Casos de dúvida](#casos-de-dúvida)
4. [Como explicar ao aluno](#como-explicar-ao-aluno)
5. [Rodar o script](#rodar-o-script)
6. [Depois da promoção](#depois-da-promoção)
7. [Se algo der errado](#se-algo-der-errado)

## Os dois templates

| | `produto` | `servico` |
| --- | --- | --- |
| Para quem | Produto, SaaS, aplicativo, infoproduto, curso, assinatura | Agência, consultoria, estúdio, profissional liberal |
| Como vende | A pessoa decide na página e compra | A pessoa se interessa e chama para conversar |
| Preço | Aparece na página, em cards de plano | Normalmente não aparece, ou aparece como "a partir de" |
| Botão principal | Comprar, assinar, começar (link de checkout) | Chamar no WhatsApp ou pedir orçamento |
| Visual de partida | Claro e escuro com gradiente, grade tipo "bento", linha do tempo, cards de plano | Escuro com gradiente holográfico |

O visual de partida muda bastante na Fase 5 (cores, fontes, raios). A estrutura das seções, os
efeitos e as animações são preservados. Por isso, escolha pela **forma de vender**, não pela aparência.

## A pergunta que decide

**O visitante consegue comprar sozinho, sem falar com ninguém?**

- Sim, há preço definido e link de pagamento: `produto`.
- Não, antes é preciso conversar, entender o caso ou montar um orçamento: `servico`.

## Casos de dúvida

- **Serviço com pacote fechado e preço fixo, comprado por link** (ex.: "consultoria de 1 hora
  por R$ 300, agende e pague"): `produto`. A venda acontece na página.
- **Infoproduto de valor alto vendido por conversa** (ex.: mentoria com aplicação): `servico`.
  A página serve para gerar a conversa.
- **Produto físico sob encomenda, com orçamento pelo WhatsApp** (ex.: móveis planejados):
  `servico`.
- **Aplicativo ou SaaS com teste grátis**: `produto`, com o botão principal levando ao
  cadastro.
- **Vende as duas coisas**: uma landing page tem um objetivo só. Pergunte qual oferta ele quer
  vender primeiro e escolha por ela. A outra pode ganhar uma página própria depois.
- **O aluno prefere o visual do outro template**: explique que as cores e fontes serão
  adaptadas de qualquer forma e que a estrutura certa pesa mais. Se ele insistir, a decisão é
  dele; registre no briefing.

Se o briefing não deixar claro como a venda acontece, volte e pergunte antes de escolher.

## Como explicar ao aluno

Em duas linhas, com o motivo ligado ao que ele contou. Exemplos:

> Vou usar o template de **serviço**: você fecha as vendas conversando pelo WhatsApp, e esse
> modelo é feito para levar o visitante até essa conversa.

> Vou usar o template de **produto**: seu curso tem preço fechado e link de pagamento, e esse
> modelo já vem com a seção de planos e o botão de compra.

Avise também: "O outro modelo será apagado da sua pasta para não atrapalhar. Ele continua
disponível no repositório original do curso, caso você queira usar em outro projeto." Espere o
OK antes de rodar.

## Rodar o script

Sempre a partir da raiz do repositório:

```bash
node scripts/escolher-template.mjs <produto|servico> --dry-run
node scripts/escolher-template.mjs <produto|servico>
```

O primeiro comando só lista o que seria feito. O segundo faz:

- move todo o conteúdo de `templates/<nome>/` para a raiz, inclusive arquivos ocultos;
- renomeia o README do template para `TEMPLATE.md` (o `README.md` da raiz é mantido);
- junta o `.gitignore` do template com o da raiz;
- não sobrescreve `scripts/`, `.claude/`, `.agents/`, `BRIEFING.md`, `AGENTS.md`, `CLAUDE.md`
  nem `LICENSE.md`;
- apaga a pasta `templates/` inteira.

## Depois da promoção

1. Leia `TEMPLATE.md` e `package.json` por inteiro: eles mostram as seções, as particularidades
   e o que o template usa (Astro + Tailwind v4 + TypeScript, com ilhas React/Motion onde há
   interação, em `src/components/react/`).
2. Leia `src/site.config.ts` por inteiro: anote quais seções existem, quais têm `enabled`,
   quais efeitos há no bloco `effects` (todos ligados por padrão) e quais campos são
   obrigatórios segundo o tipo.
3. Leia `src/styles/tokens.css`, começando pelo bloco "O QUE TROCAR PARA MUDAR A IDENTIDADE".
4. Rode `npm install`.
5. Registre no `BRIEFING.md` o template escolhido e o motivo, e marque a Fase 3.

## Se algo der errado

- **"O template já foi escolhido antes"**: está tudo certo; o script não faz nada. Siga para a
  leitura dos arquivos.
- **"Este script precisa ser rodado a partir da raiz"**: entre na pasta do repositório (a que
  contém `scripts/`) e rode de novo.
- **Lista de conflitos e nada alterado**: já existe na raiz um arquivo com o mesmo nome e
  conteúdo diferente. Mostre a lista ao aluno, descubra de onde vieram os arquivos e só apague
  ou renomeie com o OK dele. Depois rode de novo.
- **Escolheu o template errado**: se nada foi publicado ainda, o caminho mais simples é
  desfazer pelo Git (`git status` para ver; restaurar a pasta `templates/` exige o OK do aluno,
  porque descarta mudanças) ou baixar o repositório do curso de novo. O `BRIEFING.md` pode ser
  reaproveitado.
- **Erro de versão do Node**: os templates pedem Node 22 ou mais novo. Confira com `node -v` e
  oriente a atualização pelo site oficial do Node.js.
