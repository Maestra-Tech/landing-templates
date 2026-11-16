# Instruções para o Claude Code

Este é um repositório de templates de landing page (Astro + Tailwind v4 + TypeScript, com ilhas
React/Motion onde há interação). Quem usa é um aluno que não programa: fale em português
simples, uma decisão por vez, e mostre a prévia em vez de descrever.

## Use a skill `criar-landing`

Para criar, adaptar, ajustar ou publicar a página, siga a skill `criar-landing`:

- Claude Code: `.claude/skills/criar-landing/SKILL.md`
- Codex e outros agentes: `.agents/skills/criar-landing/SKILL.md`

As duas pastas são cópias idênticas. Se existir `BRIEFING.md` na raiz, leia antes de tudo.

## Estrutura

- `templates/produto/` e `templates/servico/`: dois sites independentes. O script de escolha
  promove um deles para a raiz e apaga `templates/`.
- `src/site.config.ts`: todo o conteúdo e o bloco `effects` (liga e desliga efeitos).
- `src/styles/tokens.css`: toda a identidade visual (cores, fontes, raios).
- `TEMPLATE.md` e `package.json`: o que o template escolhido tem e usa. Leia antes de editar.

## Regras duras

1. Não inventar prova social nem fatos: depoimento, número, logo de cliente, selo, prêmio,
   preço ou garantia só com material real fornecido pelo aluno. Sem material, a seção fica
   desligada (`enabled: false`) e vai para "Pendências" no `BRIEFING.md`.
2. Não fazer commit, push nem publicar sem o aluno pedir.
3. Conteúdo só em `src/site.config.ts`; visual só em `src/styles/tokens.css`.
4. Preservar efeitos, animações e componentes do template. Desligar só pelo bloco `effects` ou
   por `enabled: false`, com motivo e aviso ao aluno. Não apagar componentes.
5. Não pedir senha, token ou chave. Não instalar nada pago. Não presumir nomes de campo.

## Comandos

```bash
node scripts/escolher-template.mjs <produto|servico> [--dry-run]
npm install
npm run dev        # prévia em http://localhost:4321
npm run build && npm run preview
node scripts/check.mjs   # precisa aprovar antes de publicar
```

Requer Node 22 ou mais novo. Na Vercel, não preencher "Root Directory".
