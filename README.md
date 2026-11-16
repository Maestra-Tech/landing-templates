# Templates de landing page com IA

Dois modelos prontos de landing page e um roteiro que faz a IA entrevistar você, montar a
página com o conteúdo do seu negócio e ajudar a colocar no ar, sem você precisar programar.

Bônus do curso "Landing Pages e Sites com IA", da Maestra.

## O que você precisa ter

- **Git** instalado (git-scm.com).
- **Node.js 22 ou mais novo** (nodejs.org). Para conferir, rode `node -v` no terminal.
- **Claude Desktop** (aba Code) ou **Codex**, da OpenAI. Um dos dois basta.
- Uma conta no **GitHub** e uma na **Vercel**, as mesmas que você usou no curso.

## Os 5 passos

### 1. Crie o seu repositório a partir deste

No GitHub, na página deste repositório, clique em **Use this template** e depois em
**Create a new repository**. Dê um nome (por exemplo, `minha-landing`) e crie. Em seguida,
baixe o seu repositório novo para o computador, do jeito que você aprendeu no curso.

Use "Use this template", e não "Fork": assim o repositório é só seu.

### 2. Abra a pasta no Claude Desktop ou no Codex

- **Claude Desktop:** aba Code, escolha a pasta do repositório que você baixou.
- **Codex:** abra a mesma pasta como projeto.

### 3. Diga a frase

Cole exatamente isto na conversa:

```
quero criar minha landing page
```

A IA vai fazer algumas perguntas, uma de cada vez, sobre o seu negócio, o seu cliente, o seu
preço e a sua identidade visual. Você pode responder curto, mandar arquivos, prints e links.
Quando não souber, responda "não sei, sugira".

No fim das perguntas, ela mostra um resumo (o arquivo `BRIEFING.md`) e só monta a página
depois que você aprovar.

### 4. Revise a prévia e peça ajustes

A IA abre a página no seu computador para você ver. Leia tudo, olhe também no tamanho de
celular e peça o que quiser mudar, com as suas palavras. Exemplos:

- "o título está comprido, encurta"
- "troca a cor do botão para o verde do meu logo"
- "tira a seção de perguntas frequentes"
- "adiciona este depoimento" (colando o texto real)

### 5. Publique na Vercel

Quando estiver satisfeito, diga:

```
quero publicar minha página
```

A IA envia o projeto para o seu GitHub (pedindo a sua confirmação antes) e guia você na Vercel:
importar o repositório, clicar em Deploy e, se quiser, ligar o seu domínio. Na Vercel, não
preencha o campo "Root Directory".

## Como pedir mudanças depois

Abra a mesma pasta no Claude Desktop ou no Codex e diga o que quer mudar, por exemplo:
"quero trocar o preço da minha página" ou "quero adicionar dois depoimentos". A IA lê o
`BRIEFING.md`, lembra do que foi combinado, faz a mudança e mostra a prévia. Para a mudança ir
ao ar, peça para publicar.

Se parar no meio, é só voltar e dizer "quero continuar minha landing page". O trabalho segue
de onde parou.

## Os dois templates

Você não precisa escolher sozinho: a IA indica o melhor para o seu caso e explica o motivo.

| Template | Para quem serve | Como é |
| --- | --- | --- |
| **Produto** (`templates/produto`) | Produto, SaaS, aplicativo, curso, infoproduto ou assinatura com preço na página, comprado por um link | Visual claro e escuro com gradiente, grade de destaques, linha do tempo e cards de plano |
| **Serviço** (`templates/servico`) | Agência, consultoria, estúdio ou profissional liberal que vende conversando | Visual escuro com gradiente holográfico e botão de WhatsApp |

Os dois são feitos em Astro, Tailwind v4 e TypeScript, com ilhas React/Motion onde há
interação, e vêm com todos os efeitos e animações ligados. As cores, as fontes e os textos são
trocados pelos seus; o acabamento é mantido.

Depois da escolha, o template escolhido passa para a pasta principal do projeto e o outro é
removido da sua cópia. Ele continua disponível neste repositório original.

## O que a IA não faz

- Não inventa depoimentos, números, clientes, selos, preços ou garantias. Se você ainda não tem
  esse material, a seção fica fora da página e entra numa lista de pendências.
- Não publica nem envia nada para o GitHub sem você pedir.
- Não pede a sua senha nem códigos de acesso. O login no GitHub e na Vercel é sempre você quem
  faz.

## Problemas comuns

**A IA não começou a entrevista.**
Confira se você abriu a pasta do repositório (a que contém este README) e não uma pasta acima
ou abaixo. Depois diga: "use a skill criar-landing para criar minha landing page".

**Apareceu um erro falando de versão do Node.**
Instale o Node.js 22 ou mais novo em nodejs.org, feche e abra o programa de novo.

**A prévia não abre.**
Peça à IA: "rode npm install e abra a prévia de novo". Se a mensagem citar uma porta ocupada,
ela mesma indica o novo endereço.

**A conferência reprovou a página.**
Antes de publicar, a IA roda `node scripts/check.mjs`. Se ele apontar texto de exemplo
esquecido, botão sem link ou imagem faltando, peça: "corrija o que a conferência apontou".

**Na Vercel a página deu erro ou ficou em branco.**
Veja nas configurações do projeto se o campo "Root Directory" está vazio. Confira também se a
escolha do template já foi feita e enviada para o GitHub.

**Escolhi o template errado.**
Diga isso à IA antes de publicar. O jeito mais simples é criar um repositório novo a partir
deste e reaproveitar o seu `BRIEFING.md`.

**Meu domínio não abre.**
Depois de configurar o domínio, pode levar algumas horas para ele funcionar. Se passar disso,
compare os dados que você digitou no painel do domínio com os que a Vercel mostra.

## Para quem quer rodar na mão

```bash
node scripts/escolher-template.mjs produto   # ou servico; use --dry-run para só simular
npm install
npm run dev        # prévia em http://localhost:4321
npm run build      # monta a versão final
node scripts/check.mjs   # conferência antes de publicar
```

O conteúdo fica em `src/site.config.ts` e a identidade visual em `src/styles/tokens.css`.

## Licença

Uso permitido para alunos, em projetos próprios e de clientes. Não é permitido redistribuir nem
revender os templates ou a skill. Os termos estão em [LICENSE.md](LICENSE.md).
