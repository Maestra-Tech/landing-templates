#!/usr/bin/env node
// Conferência final antes de publicar a landing.
//
// Uso (a partir da raiz, depois de escolher o template):
//   node scripts/check.mjs
//
// FALHA (código de saída 1) se:
//   - src/site.config.ts ainda tem `exemplo: true`;
//   - sobrou texto de demonstração em src/ (lista TERMOS_DE_EXEMPLO abaixo);
//   - algum botão principal (CTA) do config aponta para "#" ou está vazio;
//   - falta o favicon ou a imagem de compartilhamento em public/.
// AVISA (sem falhar) sobre:
//   - seções desligadas (`enabled: false`) e efeitos desligados (bloco `effects`);
//   - links secundários vazios;
//   - itens da seção "Pendências" do BRIEFING.md.
//
// Node puro, sem dependências. Este script só lê arquivos; não altera nada.

import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Termos que denunciam texto de demonstração esquecido. Edite à vontade.
//
// Regras de busca:
//   - termo todo em minúsculas: a busca ignora maiúsculas e minúsculas;
//   - termo com alguma maiúscula: a busca é exata ("TODO" não pega "todo");
//   - "[" é especial: procura marcador entre colchetes iniciado por maiúscula,
//     como "[Seu nome]" ou "[LINK]" (colchete de código não conta);
//   - a busca percorre src/ inteiro (seções .astro, ilhas React em
//     src/components/react/*.tsx, scripts, estilos) e olha só para TEXTO: em
//     arquivos de código (.ts, .tsx, .js, .css e o cabeçalho dos .astro) vale
//     o que está entre aspas e o texto escrito direto no JSX; comentários,
//     nomes de componentes e caminhos de import ficam de fora;
//   - uma linha com o comentário `check-ignore` é pulada.
// ---------------------------------------------------------------------------
const TERMOS_DE_EXEMPLO = ['Aurora', 'Estúdio Norte', 'lorem ipsum', 'exemplo.com', 'SEU ', '[', 'TODO'];

const EXTENSOES_DE_CODIGO = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css'];
const EXTENSOES_COM_JSX = ['.tsx', '.jsx']; // ilhas React em src/components/react/
const EXTENSOES_DE_TEXTO = ['.md', '.mdx', '.json', '.html', '.txt', '.svg'];

// Chaves do config que guardam endereço de link.
const CHAVE_DE_LINK = /^(href|url|link|to|whatsapp|checkout\w*|\w*(Href|Url|Link))$/;
// Trechos do caminho que indicam botão principal (CTA).
const CAMINHO_DE_CTA = /cta|bot[aã]o|button|checkout|whatsapp|comprar|acao|action/i;
// Caminhos do config que indicam a imagem de compartilhamento.
const CAMINHO_DE_COMPARTILHAMENTO = /og|social|share|compartilh/i;

const RAIZ = process.cwd();
const CONFIG = path.join(RAIZ, 'src', 'site.config.ts');

const falhas = [];
const avisos = [];
const falha = (titulo, itens = []) => falhas.push({ titulo, itens });
const aviso = (titulo, itens = []) => avisos.push({ titulo, itens });

const ler = (arquivo) => fs.readFileSync(arquivo, 'utf8');
const rel = (arquivo) => path.relative(RAIZ, arquivo).split(path.sep).join('/');
const linhaDe = (texto, indice) => texto.slice(0, indice).split('\n').length;
const apagar = (trecho) => trecho.replace(/[^\n]/g, ' ');

function listarArquivos(pasta, profundidadeMax = 20) {
  const saida = [];
  if (!fs.existsSync(pasta)) return saida;
  for (const entrada of fs.readdirSync(pasta, { withFileTypes: true })) {
    const caminho = path.join(pasta, entrada.name);
    if (entrada.isDirectory()) {
      if (profundidadeMax > 0) saida.push(...listarArquivos(caminho, profundidadeMax - 1));
    } else if (entrada.isFile()) {
      saida.push(caminho);
    }
  }
  return saida;
}

// --------------------------------------------------------------- pré-requisito

if (!fs.existsSync(CONFIG)) {
  console.error('Não encontrei src/site.config.ts nesta pasta.');
  if (fs.existsSync(path.join(RAIZ, 'templates'))) {
    console.error('Parece que o template ainda não foi escolhido. Rode antes:');
    console.error('  node scripts/escolher-template.mjs <produto|servico>');
  } else {
    console.error('Rode este script a partir da raiz do repositório: node scripts/check.mjs');
  }
  process.exit(1);
}

// ------------------------------------------------- leitor simples de TS/JS/CSS
// Separa o código em pedaços: textos entre aspas ("str"), palavras ("id") e
// pontuação ("p"). Comentários são descartados.

function tokenizar(codigo) {
  const tokens = [];
  tokens.comentarios = []; // [inicio, fim] de cada comentário, para poder apagá-los
  let i = 0;
  let linha = 1;
  const n = codigo.length;

  while (i < n) {
    const c = codigo[i];

    if (c === '\n') {
      linha++;
      i++;
    } else if (c === '/' && codigo[i + 1] === '/') {
      const inicio = i;
      while (i < n && codigo[i] !== '\n') i++;
      tokens.comentarios.push([inicio, i]);
    } else if (c === '/' && codigo[i + 1] === '*') {
      const fim = codigo.indexOf('*/', i + 2);
      const trecho = codigo.slice(i, fim === -1 ? n : fim + 2);
      tokens.comentarios.push([i, i + trecho.length]);
      linha += trecho.split('\n').length - 1;
      i += trecho.length;
    } else if (c === '"' || c === "'" || c === '`') {
      const inicio = linha;
      let valor = '';
      i++;
      while (i < n && codigo[i] !== c) {
        if (codigo[i] === '\\' && i + 1 < n) {
          const escapado = codigo[i + 1];
          valor += escapado === 'n' ? '\n' : escapado === 't' ? '\t' : escapado;
          if (escapado === '\n') linha++;
          i += 2;
          continue;
        }
        if (codigo[i] === '\n') {
          if (c !== '`') break; // aspas simples e duplas não atravessam linhas
          linha++;
        }
        valor += codigo[i];
        i++;
      }
      if (codigo[i] === c) i++;
      tokens.push({ t: 'str', v: valor, linha: inicio });
    } else if (/[\p{L}\p{N}_$]/u.test(c)) {
      let valor = '';
      while (i < n && /[\p{L}\p{N}_$]/u.test(codigo[i])) valor += codigo[i++];
      tokens.push({ t: 'id', v: valor, linha });
    } else if (/\s/.test(c)) {
      i++;
    } else {
      tokens.push({ t: 'p', v: c, linha });
      i++;
    }
  }
  return tokens;
}

// ------------------------------------------------ leitura estrutural do config
// Percorre o site.config.ts e devolve cada valor com o seu "caminho"
// (ex.: hero.cta.href), sem executar o arquivo.

function lerConfig(codigo) {
  const tokens = tokenizar(codigo);
  const pilha = [];
  const folhas = [];
  let chave = null;

  const topo = () => pilha[pilha.length - 1];
  const segmentoAtual = () => (topo()?.tipo === 'arr' ? `[${topo().idx}]` : chave);
  const montar = (segmentos) =>
    segmentos
      .filter(Boolean)
      .map((s, i) => (i === 0 || s.startsWith('[') ? s : `.${s}`))
      .join('');
  const caminho = (extra) => montar([...pilha.map((p) => p.chave), extra]);

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const prox = tokens[i + 1];

    if (tok.t === 'p') {
      if (tok.v === '{' || tok.v === '[') {
        pilha.push({ tipo: tok.v === '{' ? 'obj' : 'arr', chave: segmentoAtual(), idx: 0 });
        chave = null;
      } else if (tok.v === '}' || tok.v === ']') {
        pilha.pop();
        chave = null;
      } else if (tok.v === ',') {
        if (topo()?.tipo === 'arr') topo().idx++;
        chave = null;
      } else if (tok.v === ';') {
        chave = null;
      }
      continue;
    }

    const ehChave = topo()?.tipo === 'obj' && chave === null && prox?.t === 'p' && prox.v === ':';
    if (ehChave) {
      chave = tok.v;
      i++; // pula os dois-pontos
      continue;
    }

    if (tok.t === 'str') {
      folhas.push({ caminho: caminho(segmentoAtual()), chave: chave ?? '', valor: tok.v, linha: tok.linha });
    } else if (tok.v === 'true' || tok.v === 'false') {
      folhas.push({ caminho: caminho(segmentoAtual()), chave: chave ?? '', valor: tok.v === 'true', linha: tok.linha });
    }
  }
  return folhas;
}

// ---------------------------------------------------- 1. exemplo: true no config

const codigoConfig = ler(CONFIG);
const folhas = lerConfig(codigoConfig);

const exemploLigado = folhas.find((f) => f.chave === 'exemplo' && f.valor === true);
if (exemploLigado || /\bexemplo\s*:\s*true\b/.test(codigoConfig.replace(/\/\/.*$/gm, ''))) {
  falha('O site ainda está marcado como exemplo.', [
    `src/site.config.ts${exemploLigado ? `:${exemploLigado.linha}` : ''} tem \`exemplo: true\`. Troque para \`exemplo: false\` quando todo o conteúdo for o seu.`,
  ]);
}

// ---------------------------------------------------------- 2. texto de exemplo

function criarBusca(termo) {
  if (termo === '[') return /\[[A-ZÀ-Ý][^[\]\n]{1,60}\]/gu;
  const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const letra = /[\p{L}\p{N}]/u;
  const antes = letra.test(termo[0]) ? '(?<![\\p{L}\\p{N}_-])' : '';
  const depois = letra.test(termo[termo.length - 1]) ? '(?![\\p{L}\\p{N}_-])' : '';
  return new RegExp(antes + escapado + depois, termo === termo.toLowerCase() ? 'giu' : 'gu');
}

const buscas = TERMOS_DE_EXEMPLO.map((termo) => ({ termo, regex: criarBusca(termo) }));

// Texto visível escrito direto no JSX das ilhas React (entre > e <), que não
// está entre aspas. Pedaços com cara de código (; = return) são ignorados.
function textosDeJsx(codigo) {
  let limpo = codigo;
  for (const [inicio, fim] of tokenizar(codigo).comentarios) {
    limpo = limpo.slice(0, inicio) + apagar(limpo.slice(inicio, fim)) + limpo.slice(fim);
  }
  const trechos = [];
  const regex = />([^<>{}]+)(?=[<{])/g;
  let m;
  while ((m = regex.exec(limpo)) !== null) {
    if (m[1].trim() === '' || /[;=]|\breturn\b/.test(m[1])) continue;
    trechos.push({ texto: m[1], linha: linhaDe(limpo, m.index + 1) });
  }
  return trechos;
}

// Devolve os trechos de texto de um arquivo: [{ texto, linha }]
function trechosDeTexto(arquivo) {
  const ext = path.extname(arquivo).toLowerCase();
  const bruto = ler(arquivo);
  const semImports = (codigo) => codigo.replace(/\b(from|import)\s*(['"])[^'"\n]*\2/g, apagar);
  const soStrings = (codigo, deslocamento = 0) =>
    tokenizar(semImports(codigo))
      .filter((t) => t.t === 'str')
      .map((t) => ({ texto: t.v, linha: t.linha + deslocamento }));

  if (EXTENSOES_COM_JSX.includes(ext)) return [...soStrings(bruto), ...textosDeJsx(semImports(bruto))];
  if (EXTENSOES_DE_CODIGO.includes(ext)) return soStrings(bruto);
  if (EXTENSOES_DE_TEXTO.includes(ext)) return [{ texto: bruto, linha: 1 }];
  if (ext !== '.astro') return [];

  // .astro: cabeçalho (entre ---) é código; o resto é a página.
  let cabecalho = '';
  let pagina = bruto;
  const m = bruto.match(/^\s*---\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/);
  if (m) {
    cabecalho = m[1];
    pagina = apagar(bruto.slice(0, m[0].length)) + bruto.slice(m[0].length);
  }
  pagina = pagina
    .replace(/<script\b[\s\S]*?<\/script>/gi, apagar)
    .replace(/<style\b[\s\S]*?<\/style>/gi, apagar)
    .replace(/<!--[\s\S]*?-->/g, apagar)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, apagar)
    .replace(/<\/?[A-Z][\w.]*/g, apagar); // nomes de componentes
  const inicioCabecalho = m ? linhaDe(bruto, bruto.indexOf('---')) : 0;
  return [...soStrings(cabecalho, inicioCabecalho), { texto: pagina, linha: 1 }];
}

const sobras = [];
for (const arquivo of listarArquivos(path.join(RAIZ, 'src')).sort()) {
  const linhasDoArquivo = ler(arquivo).split('\n');
  const vistos = new Set();
  for (const trecho of trechosDeTexto(arquivo)) {
    for (const { termo, regex } of buscas) {
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(trecho.texto)) !== null) {
        const linha = trecho.linha + linhaDe(trecho.texto, m.index) - 1;
        const original = linhasDoArquivo[linha - 1] ?? '';
        const id = `${linha}:${termo}`;
        if (original.includes('check-ignore') || vistos.has(id)) continue;
        vistos.add(id);
        const amostra = original.trim().replace(/\s+/g, ' ');
        sobras.push(
          `${rel(arquivo)}:${linha}  termo "${termo === '[' ? m[0] : termo.trim()}"  ->  ${amostra.length > 90 ? amostra.slice(0, 90) + '...' : amostra}`,
        );
      }
    }
  }
}
if (sobras.length > 0) {
  falha(`Sobrou texto de demonstração em src/ (${sobras.length} ocorrência(s)).`, sobras);
}

// ------------------------------------------------------- 3. links dos botões

const CAMINHO_DE_EFEITOS = /(^|\.)effects(\.|$)/;
const desligadas = folhas
  .filter((f) => f.chave === 'enabled' && f.valor === false && !CAMINHO_DE_EFEITOS.test(f.caminho))
  .map((f) => f.caminho.replace(/\.?enabled$/, ''));
const efeitosDesligados = folhas
  .filter((f) => f.valor === false && CAMINHO_DE_EFEITOS.test(f.caminho))
  .map((f) => f.caminho.replace(/\.enabled$/, ''));
const dentroDeDesligada = (caminho) => desligadas.some((d) => d !== '' && (caminho.startsWith(d + '.') || caminho.startsWith(d + '[')));

const ctasRuins = [];
const linksFracos = [];
for (const f of folhas) {
  if (typeof f.valor !== 'string' || dentroDeDesligada(f.caminho)) continue;
  const valor = f.valor.trim();
  const ehLink = CHAVE_DE_LINK.test(f.chave);
  const ehCta = CAMINHO_DE_CTA.test(f.caminho);
  const onde = `src/site.config.ts:${f.linha}  ${f.caminho || '(sem nome)'}`;

  if (/wa\.me\/?(\?|$)/.test(valor) || /phone=(&|$)/.test(valor)) {
    ctasRuins.push(`${onde} = "${valor}"  (link de WhatsApp sem número)`);
  } else if ((valor === '' || valor === '#') && ehCta && (ehLink || valor === '#')) {
    ctasRuins.push(`${onde} = "${valor}"  (${valor === '' ? 'vazio' : 'aponta para "#"'})`);
  } else if ((valor === '' || valor === '#') && ehLink) {
    linksFracos.push(`${onde} = "${valor}"`);
  } else if (/(wa\.me\/|phone=)\+?\d*(0{7,}|9{8,})/.test(valor)) {
    linksFracos.push(`${onde} = "${valor}"  (parece número de exemplo)`);
  }
}
if (ctasRuins.length > 0) {
  falha('Há botão principal (CTA) sem destino de verdade.', ctasRuins);
}
if (linksFracos.length > 0) {
  aviso('Links que merecem uma olhada (vazios, "#" ou com cara de exemplo):', linksFracos);
}

// ------------------------------------------- 4. favicon e imagem de compartilhar

const pastaPublic = path.join(RAIZ, 'public');
const arquivosPublic = listarArquivos(pastaPublic, 3);
const nomesPublic = arquivosPublic.map((a) => path.basename(a));

if (!nomesPublic.some((n) => /^favicon[\w.-]*\.(svg|ico|png)$/i.test(n))) {
  falha('Falta o favicon (o ícone da aba do navegador).', [
    'Esperado em public/: favicon.svg, favicon.ico ou favicon.png.',
  ]);
}

const imagensNoConfig = folhas.filter(
  (f) => typeof f.valor === 'string' && CAMINHO_DE_COMPARTILHAMENTO.test(f.caminho) && /^\/?[^:?#]+\.(png|jpe?g|webp)$/i.test(f.valor.trim()),
);
if (imagensNoConfig.length > 0) {
  const faltando = imagensNoConfig.filter((f) => !fs.existsSync(path.join(pastaPublic, f.valor.trim().replace(/^\//, ''))));
  if (faltando.length > 0) {
    falha(
      'A imagem de compartilhamento indicada no config não existe em public/.',
      faltando.map((f) => `src/site.config.ts:${f.linha}  ${f.caminho} = "${f.valor}"  (arquivo não encontrado em public/)`),
    );
  }
} else if (!nomesPublic.some((n) => /^(og|social|share|compartilh\w*|open-?graph|twitter)[\w.-]*\.(png|jpe?g|webp)$/i.test(n))) {
  falha('Falta a imagem de compartilhamento (a que aparece quando o link é enviado no WhatsApp e nas redes).', [
    'Esperado em public/: um arquivo como og.png ou og-image.jpg (1200 x 630 px).',
  ]);
}

// ------------------------------------------------------------------- avisos

if (desligadas.length > 0) {
  aviso(
    `${desligadas.length} seção(ões) desligada(s) no config (não aparecem na página):`,
    desligadas.map((d) => d || '(seção sem nome)'),
  );
}

if (efeitosDesligados.length > 0) {
  aviso(
    `${efeitosDesligados.length} efeito(s) desligado(s) no bloco effects do config (confira se foi combinado com o aluno):`,
    efeitosDesligados,
  );
}

const BRIEFING = path.join(RAIZ, 'BRIEFING.md');
if (!fs.existsSync(BRIEFING)) {
  aviso('Não encontrei BRIEFING.md na raiz. Sem ele não dá para conferir as pendências.');
} else {
  const linhas = ler(BRIEFING).split(/\r?\n/);
  const inicio = linhas.findIndex((l) => /^#{1,6}\s*(\d+[.)]\s*)?pend[êe]ncias\b/i.test(l));
  if (inicio !== -1) {
    const nivel = linhas[inicio].match(/^#+/)[0].length;
    const pendencias = [];
    for (let i = inicio + 1; i < linhas.length; i++) {
      const cabecalho = linhas[i].match(/^(#+)\s/);
      if (cabecalho && cabecalho[1].length <= nivel) break;
      const item = linhas[i].match(/^\s*[-*]\s+(?:\[( |x|X)\]\s*)?(.+)$/);
      if (!item || item[1]?.toLowerCase() === 'x') continue;
      const texto = item[2].trim();
      if (/^\(?(nenhuma|nada|sem pend[êe]ncias)\b/i.test(texto) || /^_.*_$/.test(texto)) continue;
      pendencias.push(texto);
    }
    if (pendencias.length > 0) aviso(`${pendencias.length} pendência(s) em aberto no BRIEFING.md:`, pendencias);
  }
}

// ---------------------------------------------------------------- resultado

const imprimir = (grupo, saida) => {
  for (const { titulo, itens } of grupo) {
    saida(`  ${titulo}`);
    for (const item of itens) saida(`      - ${item}`);
    saida('');
  }
};

console.log('Conferência da landing\n');

if (avisos.length > 0) {
  console.log(`AVISOS (${avisos.length}) - não impedem a publicação, mas confira:\n`);
  imprimir(avisos, console.log);
}

if (falhas.length > 0) {
  console.error(`PROBLEMAS (${falhas.length}) - corrija antes de publicar:\n`);
  imprimir(falhas, console.error);
  console.error('Resultado: REPROVADO. Corrija os problemas acima e rode de novo: node scripts/check.mjs');
  process.exit(1);
}

console.log('Resultado: APROVADO. Nenhum problema que impeça a publicação.');
