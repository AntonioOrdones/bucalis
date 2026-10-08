/**
 * Verificação do site gerado (dist/). Roda no GitHub Actions antes de publicar.
 *
 *   npm run check            → erros interrompem; pendências de conteúdo só avisam
 *   npm run check -- --estrito → pendências de conteúdo também interrompem
 *
 * Erros: links internos quebrados, âncoras inexistentes, imagens sem alt,
 * páginas sem título/descrição/canonical/h1, IDs duplicados, JSON-LD inválido.
 * Avisos: dados provisórios ainda presentes (telefone 0000, "Nome Sobrenome"…).
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { parseHTML } from 'linkedom';

const raiz = resolve(import.meta.dirname, '..');
const dist = join(raiz, 'dist');
const estrito = process.argv.includes('--estrito');

const erros = [];
const avisos = [];
const erro = (arquivo, msg) => erros.push(`${arquivo}: ${msg}`);

async function existe(caminho) {
  try {
    await stat(caminho);
    return true;
  } catch {
    return false;
  }
}

async function listarHtml(pasta) {
  const itens = await readdir(pasta, { withFileTypes: true });
  const arquivos = await Promise.all(
    itens.map((item) => {
      const caminho = join(pasta, item.name);
      if (item.isDirectory()) return listarHtml(caminho);
      return item.name.endsWith('.html') ? [caminho] : [];
    }),
  );
  return arquivos.flat();
}

if (!(await existe(dist))) {
  console.error('A pasta dist/ não existe. Rode "npm run build" antes.');
  process.exit(1);
}

const arquivos = await listarHtml(dist);
const paginas = new Map(); // arquivo → document
for (const arquivo of arquivos) {
  const { document } = parseHTML(await readFile(arquivo, 'utf8'));
  paginas.set(arquivo, document);
}

/* Caminho-base, deduzido do script principal (ex.: /repositorio/assets/index-abc.js). */
const home = paginas.get(join(dist, 'index.html'));
const scriptPrincipal =
  home?.querySelector('script[type="module"][src*="assets/"]')?.getAttribute('src') ?? '/assets/';
const base = scriptPrincipal.slice(0, scriptPrincipal.indexOf('assets/')); // ex.: /repositorio/

const titulos = new Map();

for (const [arquivo, doc] of paginas) {
  const nome = relative(dist, arquivo).split(sep).join('/');
  const eh404 = nome === '404.html';

  if (doc.documentElement.getAttribute('lang') !== 'pt-BR') erro(nome, 'falta lang="pt-BR" em <html>');

  const titulo = doc.querySelector('title')?.textContent?.trim();
  if (!titulo) erro(nome, 'sem <title>');
  else if (!eh404) titulos.set(titulo, [...(titulos.get(titulo) ?? []), nome]);

  const descricao = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (descricao.length < 50 || descricao.length > 170)
    erro(nome, `meta description com ${descricao.length} caracteres (ideal: 50–170)`);

  if (!eh404) {
    const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
    if (!/^https?:\/\//.test(canonical)) erro(nome, 'canonical ausente ou não absoluto');
  }

  const h1s = doc.querySelectorAll('h1');
  if (h1s.length !== 1) erro(nome, `deveria ter 1 <h1>, tem ${h1s.length}`);

  // Hierarquia de títulos sem saltos (ex.: h2 → h4)
  let nivelAnterior = 0;
  for (const h of doc.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')) {
    const nivel = Number(h.tagName[1]);
    if (nivelAnterior && nivel > nivelAnterior + 1)
      avisos.push(`${nome}: título <${h.tagName.toLowerCase()}> “${h.textContent.trim()}” pula um nível`);
    nivelAnterior = nivel;
  }

  // IDs únicos
  const ids = new Map();
  for (const el of doc.querySelectorAll('[id]')) {
    const id = el.getAttribute('id');
    ids.set(id, (ids.get(id) ?? 0) + 1);
  }
  for (const [id, total] of ids) if (total > 1) erro(nome, `id duplicado "${id}" (${total}×)`);

  // Imagens com alt
  for (const img of doc.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) erro(nome, `imagem sem alt: ${img.getAttribute('src')}`);
  }

  // Botões e links com nome acessível
  for (const el of doc.querySelectorAll('a[href], button')) {
    const nomeAcessivel =
      (el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title');
    if (!nomeAcessivel) erro(nome, `<${el.tagName.toLowerCase()}> sem texto ou aria-label`);
  }

  // Links que abrem nova aba devem ter rel="noopener"
  for (const a of doc.querySelectorAll('a[target="_blank"]')) {
    if (!/noopener/.test(a.getAttribute('rel') ?? ''))
      erro(nome, `link sem rel="noopener": ${a.getAttribute('href')}`);
  }

  // JSON-LD válido
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      JSON.parse(script.textContent);
    } catch {
      erro(nome, 'JSON-LD inválido');
    }
  }

  // Links internos
  for (const a of doc.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) continue;
    if (href.startsWith('#')) {
      const alvo = decodeURIComponent(href.slice(1));
      if (alvo && !doc.getElementById(alvo)) erro(nome, `âncora inexistente ${href}`);
      continue;
    }
    if (!href.startsWith(base)) {
      erro(nome, `link interno fora do caminho-base (${base}): ${href}`);
      continue;
    }
    const [caminho, ancora] = href.slice(base.length).split('#');
    let destino = join(dist, decodeURI(caminho.split('?')[0]));
    if (caminho === '' || caminho.endsWith('/')) destino = join(destino, 'index.html');
    if (!(await existe(destino))) {
      erro(nome, `link quebrado: ${href}`);
      continue;
    }
    if (ancora) {
      const docDestino = paginas.get(destino);
      if (docDestino && !docDestino.getElementById(decodeURIComponent(ancora)))
        erro(nome, `âncora inexistente em ${href}`);
    }
  }
}

for (const [titulo, nomes] of titulos) {
  if (nomes.length > 1) avisos.push(`título repetido em ${nomes.join(', ')}: “${titulo}”`);
}

/* Arquivos obrigatórios */
for (const obrigatorio of [
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'site.webmanifest',
  'favicon.svg',
  'og-image.jpg',
  'og-bucalis-2026.png',
  'favicon-bucalis.svg',
  'icons/favicon-bucalis-32.png',
]) {
  if (!(await existe(join(dist, obrigatorio)))) erros.push(`arquivo ausente: ${obrigatorio}`);
}

/* Pendências de conteúdo (dados provisórios) */
const pendencias = [
  [/\(61\) [39]0{3,4}-0000/, 'telefone/WhatsApp provisório'],
  [/Nome Sobrenome/, 'profissionais com nome provisório (src/data/equipe.js)'],
  [/CRO-DF( EPAO nº)? 0000/, 'número de CRO provisório'],
  [/00\.000\.000\/0001-00/, 'CNPJ provisório'],
  [/Razão Social da Clínica/, 'razão social provisória'],
  [/suaclinica\.com\.br/, 'e-mail provisório'],
  [/seu\.perfil/, 'Instagram provisório'],
  [/Edifício Exemplo|SHLS 000/, 'endereço provisório'],
  [/Nome do encarregado/, 'encarregado de dados (LGPD) não definido'],
];
const textoHome = home?.documentElement?.outerHTML ?? '';
const textoPrivacidade =
  paginas.get(join(dist, 'privacidade', 'index.html'))?.documentElement?.outerHTML ?? '';
for (const [padrao, descricao] of pendencias) {
  if (padrao.test(textoHome) || padrao.test(textoPrivacidade)) avisos.push(`pendência: ${descricao}`);
}
try {
  const { listaDeExemplo } = await import(new URL('../src/data/convenios.js', import.meta.url));
  if (listaDeExemplo)
    avisos.push('pendência: lista de convênios ainda é a de exemplo (src/data/convenios.js)');
} catch {
  /* sem acesso ao arquivo de dados: ignora */
}

/* Relatório */
console.log(`Verificadas ${paginas.size} páginas em dist/ (caminho-base ${base}).`);
if (avisos.length) {
  console.log(`\n⚠️  ${avisos.length} aviso(s):`);
  avisos.forEach((a) => console.log(`   - ${a}`));
}
if (erros.length) {
  console.error(`\n✖ ${erros.length} erro(s):`);
  erros.forEach((e) => console.error(`   - ${e}`));
  process.exit(1);
}
if (estrito && avisos.some((a) => a.startsWith('pendência'))) {
  console.error('\n✖ Modo estrito: resolva as pendências de conteúdo antes de publicar.');
  process.exit(1);
}
console.log('\n✔ Nenhum erro encontrado.');
