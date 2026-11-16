# Fases 6 e 7 - Conferir e publicar

## Índice

1. [Fase 6 - Conferir](#fase-6---conferir)
   - [Comandos](#comandos)
   - [Mostrar a prévia](#mostrar-a-prévia)
   - [O que o check.mjs verifica](#o-que-o-checkmjs-verifica)
   - [Revisão no celular](#revisão-no-celular)
   - [Links e botão principal](#links-e-botão-principal)
   - [Leitura final](#leitura-final)
2. [Fase 7 - Publicar](#fase-7---publicar)
   - [Antes de subir](#antes-de-subir)
   - [Commit e push](#commit-e-push)
   - [Importar na Vercel](#importar-na-vercel)
   - [Domínio próprio](#domínio-próprio)
   - [Depois de publicar](#depois-de-publicar)
3. [Problemas comuns](#problemas-comuns)

## Fase 6 - Conferir

### Comandos

Sempre na raiz do repositório, nesta ordem:

```bash
npm install
npm run dev
npm run build
node scripts/check.mjs
```

- `npm install`: baixa as dependências. Precisa de Node 22 ou mais novo (`node -v`).
- `npm run dev`: abre a prévia local (por padrão em `http://localhost:4321`).
- `npm run build`: monta a versão final em `dist/`. Tem de terminar sem erro. Leia os avisos.
- `node scripts/check.mjs`: conferência automática. Só publique com "APROVADO".

Se o build falhar, leia a mensagem, corrija a causa e rode de novo. Não contorne erro apagando
verificação de tipo nem desligando seção só para o build passar sem entender o motivo.

### Mostrar a prévia

Mostre a página funcionando, em vez de descrever o que mudou.

- No Claude Desktop (aba Code), use o painel de prévia com a configuração `astro-dev` de
  `.claude/launch.json`, que roda `npx astro dev --port 4321`.
- No Codex ou em outro ambiente, rode `npm run dev` e passe o endereço local para o aluno abrir
  no navegador.
- Se a porta 4321 estiver ocupada, o Astro escolhe outra e mostra o endereço no terminal.

### O que o check.mjs verifica

Reprova (precisa corrigir):

| Problema | Como resolver |
| --- | --- |
| `exemplo: true` no config | Terminar o conteúdo e trocar para `exemplo: false` |
| Texto de demonstração em `src/` | Trocar pelo conteúdo do aluno ou remover. A lista de termos fica no topo do script |
| Botão principal com `#` ou vazio | Colocar o link real (checkout, WhatsApp, formulário) |
| Sem favicon em `public/` | Adicionar `favicon.svg`, `.ico` ou `.png` |
| Sem imagem de compartilhamento em `public/` | Adicionar a imagem 1200 x 630 px no caminho indicado no config |

Avisa (não reprova, mas leia para o aluno):

- seções desligadas no config e efeitos desligados no bloco `effects`;
- links secundários vazios ou com cara de exemplo;
- itens em aberto na seção "Pendências" do `BRIEFING.md`.

Limites do script, que pedem o seu olho:

- ele confere se o favicon e a imagem de compartilhamento existem, não se foram trocados pelos
  do aluno;
- ele procura termos de uma lista; texto de exemplo com outras palavras passa despercebido;
- se um termo da lista fizer parte legítima do conteúdo do aluno (um negócio chamado "Aurora",
  por exemplo), tire o termo da lista `TERMOS_DE_EXEMPLO` no topo do script, ou ponha o
  comentário `check-ignore` na linha, e explique ao aluno o que fez.

### Revisão no celular

A maior parte dos visitantes chega pelo celular. Confira em largura de 360 px:

- [ ] nada estoura a tela nem cria rolagem para o lado;
- [ ] o título principal cabe em poucas linhas e dá para ler;
- [ ] o botão principal aparece sem rolar muito e é fácil de tocar;
- [ ] o menu abre e fecha;
- [ ] cards e tabelas de preço empilham sem cortar texto;
- [ ] imagens não ficam distorcidas nem pesadas.

Confira também em tela larga (1440 px) e, se o template tiver, nos modos claro e escuro.

### Links e botão principal

- Clique em todos os links e botões da página, um por um.
- Botão principal: confirme que abre o destino certo. No WhatsApp, confira o número e a
  mensagem pronta; no checkout, que é o produto e o preço certos.
- Âncoras do menu levam à seção certa, e nenhuma aponta para seção desligada.
- Links externos abrem o endereço correto (redes sociais, políticas).

### Leitura final

Leia a página de cima a baixo como se fosse um cliente:

- sobrou algum nome, número ou texto do exemplo original, inclusive dentro de componentes
  ilustrativos (conversas, telas de exemplo, diagramas)?
- os efeitos e as animações continuam funcionando como no template original?
- todo fato (preço, prazo, número, depoimento) bate com o `BRIEFING.md`?
- o rodapé tem o nome do negócio certo e o ano certo?
- título da aba e descrição estão preenchidos?

Depois, peça a leitura do aluno e pergunte se algo ali não é verdade ou não soa como ele.
Marque a Fase 6 no briefing.

## Fase 7 - Publicar

Só comece quando o aluno pedir para publicar. "Ficou bom" não é pedido de publicação; pergunte.

### Antes de subir

- `npm run build` sem erro e `node scripts/check.mjs` aprovado.
- Pendências lidas para o aluno, com a decisão dele de publicar mesmo assim ou esperar.
- Nenhuma senha, token ou chave em arquivo do projeto. Arquivos `.env` não sobem (estão no
  `.gitignore`).

### Commit e push

1. Mostre o que mudou: `git status` e um resumo em linguagem simples.
2. Proponha a mensagem do commit, por exemplo: "Primeira versão da landing da Doce Ofício".
3. Espere o OK e faça o commit.
4. Pergunte de novo antes do `git push`: é o push que envia para o GitHub.
5. Se o Git pedir login, o aluno faz na tela dele. Não peça senha nem token na conversa.

Confira com `git remote -v` se o repositório remoto é o do aluno (criado com "Use this
template"), e não o repositório original do curso. Se o repositório do aluno for público, avise
que o conteúdo do projeto fica visível para qualquer pessoa.

### Importar na Vercel

O aluno faz, com você orientando passo a passo:

1. Entrar em vercel.com com a conta dele e escolher "Add New..." > "Project".
2. Importar o repositório do GitHub (se não aparecer, ajustar a permissão do aplicativo da
   Vercel no GitHub para enxergar esse repositório).
3. A Vercel reconhece o Astro sozinha. **Não preencha "Root Directory"**: o site está na raiz
   do repositório, porque o template foi promovido na Fase 3.
4. Não é preciso criar variável de ambiente, a não ser que o `TEMPLATE.md` peça.
5. Clicar em "Deploy" e esperar o endereço `.vercel.app`.

A partir daí, cada push no ramo principal publica uma nova versão automaticamente. Deixe isso
claro para o aluno, porque muda o peso de cada push.

O plano gratuito da Vercel tem regras próprias de uso. Se o site for comercial, oriente o aluno
a ler os termos atuais no site da Vercel; não afirme o que o plano permite ou não.

### Domínio próprio

1. No projeto da Vercel: Settings > Domains > adicionar o domínio.
2. A Vercel mostra os registros de DNS a criar. Os valores exatos aparecem na tela dela; use
   esses, não valores de memória.
3. O aluno abre o painel onde comprou o domínio (Registro.br ou outro) e cria os registros
   indicados.
4. A propagação pode levar de minutos a algumas horas. O certificado de segurança (o cadeado)
   é emitido pela Vercel sem custo.
5. Com o domínio no ar, atualize o endereço do site no `src/site.config.ts`, se houver esse
   campo, e publique de novo com o OK do aluno.

### Depois de publicar

- Abrir o endereço no celular e testar o botão principal de verdade.
- Enviar o link para si mesmo no WhatsApp e conferir a imagem e o texto de compartilhamento.
- Registrar no `BRIEFING.md` o endereço final, a data e as pendências que continuam abertas.
- Combinar com o aluno como pedir mudanças: basta abrir a pasta de novo e dizer o que quer
  mudar.

## Problemas comuns

| Sintoma | Causa provável | O que fazer |
| --- | --- | --- |
| `npm install` falha com erro de versão | Node antigo | Instalar Node 22 ou mais novo pelo site oficial e abrir o terminal de novo |
| `npm run dev` não abre | Porta ocupada ou dependências não instaladas | Ver o endereço mostrado no terminal; rodar `npm install` |
| `Não encontrei src/site.config.ts` | Template ainda não escolhido ou comando fora da raiz | Rodar `node scripts/escolher-template.mjs <produto|servico>` na raiz |
| Build falha com erro de tipo no config | Campo obrigatório removido ou com tipo errado | Comparar com o tipo declarado no próprio arquivo e corrigir |
| Fonte não muda | Import do pacote Fontsource antigo ainda ativo, ou nome da família diferente | Conferir import e token de família |
| Vercel publica página em branco ou erro 404 | "Root Directory" preenchido, ou template não promovido | Deixar "Root Directory" vazio; conferir se `package.json` está na raiz do repositório |
| Vercel falha no build mas funciona no computador | Versão do Node diferente na Vercel, ou arquivo não enviado | Conferir a versão do Node nas configurações do projeto na Vercel; conferir `git status` |
| Imagem de compartilhamento antiga no WhatsApp | O WhatsApp guarda a imagem por um tempo | Conferir se o arquivo foi trocado e o endereço do site está certo no config; testar com outro contato ou mais tarde |
| Domínio não abre | DNS ainda propagando ou registro digitado errado | Comparar os registros com os que a Vercel mostra; esperar e testar de novo |
