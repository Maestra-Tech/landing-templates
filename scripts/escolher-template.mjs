#!/usr/bin/env node
// Escolhe um dos templates e o promove para a raiz do repositório.
//
// Uso (sempre a partir da raiz do repositório):
//   node scripts/escolher-template.mjs produto
//   node scripts/escolher-template.mjs servico
//   node scripts/escolher-template.mjs servico --dry-run   (só lista o que faria)
//
// O que faz:
//   1. Move TODO o conteúdo de templates/<nome>/ para a raiz (inclusive arquivos ocultos).
//   2. Se já existe README.md na raiz, o README do template vira TEMPLATE.md.
//   3. Nunca sobrescreve o que está em PROTEGIDOS (o arquivo da raiz é mantido).
//   4. Junta o .gitignore do template com o da raiz, sem repetir linhas.
//   5. Apaga a pasta templates/ (o outro template vai junto).
//
// Node puro, sem dependências. Pode rodar de novo sem medo: se o template já
// foi escolhido, o script avisa e sai sem mexer em nada.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TEMPLATES = ['produto', 'servico'];

// Itens da raiz que nunca são sobrescritos pelo conteúdo do template.
const PROTEGIDOS = ['scripts', '.claude', '.agents', 'BRIEFING.md', 'AGENTS.md', 'CLAUDE.md', 'LICENSE.md'];

// Lixo do sistema que não vale a pena mover.
const IGNORADOS = ['.DS_Store', 'Thumbs.db'];

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function sair(mensagem, codigo = 1) {
  (codigo === 0 ? console.log : console.error)(mensagem);
  process.exit(codigo);
}

function mesmoCaminho(a, b) {
  const real = (p) => {
    try {
      return fs.realpathSync(p);
    } catch {
      return path.resolve(p);
    }
  };
  const [ra, rb] = [real(a), real(b)];
  return process.platform === 'win32' || process.platform === 'darwin'
    ? ra.toLowerCase() === rb.toLowerCase()
    : ra === rb;
}

function existe(caminho) {
  try {
    fs.lstatSync(caminho);
    return true;
  } catch {
    return false;
  }
}

function ehPastaReal(caminho) {
  try {
    return fs.lstatSync(caminho).isDirectory();
  } catch {
    return false;
  }
}

function conteudoIgual(a, b) {
  try {
    const [sa, sb] = [fs.lstatSync(a), fs.lstatSync(b)];
    if (!sa.isFile() || !sb.isFile() || sa.size !== sb.size) return false;
    return fs.readFileSync(a).equals(fs.readFileSync(b));
  } catch {
    return false;
  }
}

function normalizarNome(texto) {
  return String(texto)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// ---------------------------------------------------------------- argumentos

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const desconhecidas = args.filter((a) => a.startsWith('-') && a !== '--dry-run');
const posicionais = args.filter((a) => !a.startsWith('-'));

const USO = [
  'Uso: node scripts/escolher-template.mjs <produto|servico> [--dry-run]',
  '',
  '  produto   landing de produto, SaaS, app ou infoproduto, com preços na página',
  '  servico   landing de serviço vendido por conversa (WhatsApp, formulário)',
  '  --dry-run mostra o que seria feito, sem mudar nenhum arquivo',
].join('\n');

if (desconhecidas.length > 0) sair(`Opção desconhecida: ${desconhecidas.join(', ')}\n\n${USO}`);
if (posicionais.length !== 1) sair(USO);

const nome = normalizarNome(posicionais[0]);
if (!TEMPLATES.includes(nome)) {
  sair(`Template "${posicionais[0]}" não existe. Escolha um destes: ${TEMPLATES.join(' ou ')}.\n\n${USO}`);
}

// ---------------------------------------------------------------- validações

if (!mesmoCaminho(process.cwd(), RAIZ)) {
  sair(
    [
      'Este script precisa ser rodado a partir da raiz do repositório.',
      `  Pasta atual:    ${process.cwd()}`,
      `  Raiz esperada:  ${RAIZ}`,
      'Entre na pasta raiz e rode de novo: node scripts/escolher-template.mjs ' + nome,
    ].join('\n'),
  );
}

const pastaTemplates = path.join(RAIZ, 'templates');
const origem = path.join(pastaTemplates, nome);

if (!ehPastaReal(pastaTemplates)) {
  if (existe(path.join(RAIZ, 'src', 'site.config.ts'))) {
    sair(
      'O template já foi escolhido antes: a pasta templates/ não existe mais e src/site.config.ts já está na raiz.\nNada a fazer.',
      0,
    );
  }
  sair(
    'Não encontrei a pasta templates/ nem src/site.config.ts na raiz.\nConfira se você está no repositório certo e se ele foi baixado por completo.',
  );
}

if (!ehPastaReal(origem)) {
  sair(`Não encontrei a pasta templates/${nome}/. Confira se o repositório foi baixado por completo.`);
}

if (fs.readdirSync(origem).filter((n) => !IGNORADOS.includes(n)).length === 0) {
  sair(`A pasta templates/${nome}/ está vazia. Nada foi alterado.`);
}

// ---------------------------------------------------------------------- plano

/** @type {{tipo: 'mover'|'mesclar'|'manter'|'igual'|'conflito', de: string, para: string, pasta: boolean}[]} */
const plano = [];

function planejar(pastaOrigem, pastaDestino, relativo) {
  const naRaiz = relativo === '';
  const entradas = fs.readdirSync(pastaOrigem, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  for (const entrada of entradas) {
    if (IGNORADOS.includes(entrada.name)) continue;

    const de = path.join(pastaOrigem, entrada.name);
    const relDe = path.join(relativo, entrada.name);
    const topo = relDe.split(path.sep)[0];

    let nomeDestino = entrada.name;
    if (naRaiz && entrada.name === 'README.md' && existe(path.join(RAIZ, 'README.md'))) {
      nomeDestino = 'TEMPLATE.md';
    }
    const para = path.join(pastaDestino, nomeDestino);
    const relPara = path.join(relativo, nomeDestino);
    const pasta = entrada.isDirectory();
    const item = { de: path.join('templates', nome, relDe), para: relPara, pasta };

    if (!existe(para)) {
      plano.push({ tipo: 'mover', ...item });
    } else if (pasta && ehPastaReal(para)) {
      planejar(de, para, relDe);
    } else if (naRaiz && entrada.name === '.gitignore') {
      plano.push({ tipo: 'mesclar', ...item });
    } else if (PROTEGIDOS.includes(topo)) {
      plano.push({ tipo: 'manter', ...item });
    } else if (conteudoIgual(de, para)) {
      plano.push({ tipo: 'igual', ...item });
    } else {
      plano.push({ tipo: 'conflito', ...item });
    }
  }
}

planejar(origem, RAIZ, '');

const doTipo = (tipo) => plano.filter((p) => p.tipo === tipo);
const rotulo = (item) => (item.pasta ? item.para + path.sep : item.para);

const conflitos = doTipo('conflito');
if (conflitos.length > 0) {
  console.error('Parei antes de mexer em qualquer arquivo: estes itens já existem na raiz com conteúdo diferente do template.');
  for (const c of conflitos) console.error(`  - ${rotulo(c)}`);
  console.error('');
  console.error('Para resolver: renomeie ou apague esses itens da raiz (se forem sobras de uma tentativa anterior) e rode o script de novo.');
  process.exit(1);
}

const outros = TEMPLATES.filter((t) => t !== nome && ehPastaReal(path.join(pastaTemplates, t)));

console.log(dryRun ? `Simulação (--dry-run): nada será alterado.\n` : `Promovendo o template "${nome}" para a raiz...\n`);

const verbo = dryRun
  ? { mover: 'Moveria', mesclar: 'Juntaria', manter: 'Manteria o da raiz', igual: 'Já está igual', apagar: 'Apagaria' }
  : { mover: 'Movido', mesclar: 'Juntado', manter: 'Mantido o da raiz', igual: 'Já estava igual', apagar: 'Apagado' };

// ------------------------------------------------------------------ execução

function moverItem(de, para) {
  fs.mkdirSync(path.dirname(para), { recursive: true });
  try {
    fs.renameSync(de, para);
  } catch (erro) {
    if (erro.code !== 'EXDEV') throw erro;
    // Discos diferentes: copia e depois apaga a origem.
    fs.cpSync(de, para, { recursive: true, errorOnExist: true, force: false, verbatimSymlinks: true });
    fs.rmSync(de, { recursive: true, force: true });
  }
}

function mesclarGitignore(de, para) {
  const atual = fs.readFileSync(para, 'utf8');
  const existentes = new Set(atual.split(/\r?\n/).map((l) => l.trim()));
  const novas = fs
    .readFileSync(de, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.trim() !== '' && !l.trim().startsWith('#') && !existentes.has(l.trim()));
  if (novas.length === 0) return 0;
  const separador = atual.endsWith('\n') || atual === '' ? '' : '\n';
  fs.writeFileSync(para, `${atual}${separador}\n# Vindo do template "${nome}"\n${novas.join('\n')}\n`);
  return novas.length;
}

try {
  for (const item of plano) {
    const de = path.join(RAIZ, item.de);
    const para = path.join(RAIZ, item.para);

    if (item.tipo === 'mover') {
      if (!dryRun) moverItem(de, para);
      const renomeado = path.basename(item.de) !== path.basename(item.para) ? `  (era ${path.basename(item.de)})` : '';
      console.log(`  ${verbo.mover}: ${rotulo(item)}${renomeado}`);
    } else if (item.tipo === 'mesclar') {
      const linhas = dryRun ? null : mesclarGitignore(de, para);
      console.log(`  ${verbo.mesclar}: ${item.para}${linhas === null ? '' : ` (${linhas} linha(s) nova(s))`}`);
    } else if (item.tipo === 'manter') {
      console.log(`  ${verbo.manter}: ${rotulo(item)}  (protegido; a versão do template foi descartada)`);
    } else if (item.tipo === 'igual') {
      console.log(`  ${verbo.igual}: ${rotulo(item)}`);
    }
  }

  if (!dryRun) fs.rmSync(pastaTemplates, { recursive: true, force: true });
  const aviso = outros.length > 0 ? `  (inclui o template não escolhido: ${outros.join(', ')})` : '';
  console.log(`  ${verbo.apagar}: templates${path.sep}${aviso}`);
} catch (erro) {
  console.error('');
  console.error(`Algo deu errado no meio do caminho: ${erro.message}`);
  console.error('Nenhum arquivo foi sobrescrito. Rode o mesmo comando de novo para continuar de onde parou.');
  process.exit(1);
}

console.log('');
if (dryRun) {
  console.log(`Resumo: ${doTipo('mover').length} item(ns) seriam movidos para a raiz e a pasta templates/ seria apagada.`);
  console.log(`Para fazer de verdade: node scripts/escolher-template.mjs ${nome}`);
} else {
  console.log(`Pronto. O template "${nome}" agora está na raiz do repositório.`);
  console.log('Próximos passos:');
  console.log('  1. npm install');
  console.log('  2. Editar o conteúdo em src/site.config.ts e a identidade em src/styles/tokens.css');
  console.log('  3. npm run dev   (para ver a prévia)');
  console.log('  4. node scripts/check.mjs   (antes de publicar)');
}
