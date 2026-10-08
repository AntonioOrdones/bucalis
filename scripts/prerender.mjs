/**
 * Pré-renderização: transforma cada página React em um arquivo HTML estático.
 *
 * Executado depois de `vite build` (cliente) e `vite build --ssr` (servidor).
 * Gera dist/<rota>/index.html para todas as páginas, dist/404.html,
 * sitemap.xml, robots.txt e site.webmanifest.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const raiz = resolve(import.meta.dirname, '..');
const dist = join(raiz, 'dist');
const distSsr = join(raiz, 'dist-ssr');

const template = await readFile(join(dist, 'index.html'), 'utf8');
const manifesto = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf8'));
const servidor = await import(pathToFileURL(join(distSsr, 'entry-server.js')).href);
const { BASE, SITE_URL } = servidor;

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html precisa conter <!--app-head--> e <!--app-html-->.');
}

/* JS da página: o arquivo da rota e os pedaços que ele importa. */
function preloadsDoModulo(id) {
  const vistos = new Set();
  const arquivos = [];
  const visitar = (chave) => {
    const entrada = manifesto[chave];
    if (!entrada || vistos.has(chave)) return;
    vistos.add(chave);
    arquivos.push(entrada.file);
    (entrada.imports ?? []).forEach(visitar);
  };
  visitar(id);
  return arquivos
    .filter((arquivo) => !template.includes(arquivo))
    .map((arquivo) => `<link rel="modulepreload" crossorigin href="${BASE}${arquivo}">`);
}

/* Fontes principais (subconjunto latino) — evitam o "salto" do texto. */
const assets = await readdir(join(dist, 'assets'));
const fontes = assets
  .filter((nome) => /^(jost|source-sans-3)-latin-wght-normal-.*\.woff2$/.test(nome))
  .map((nome) => `<link rel="preload" href="${BASE}assets/${nome}" as="font" type="font/woff2" crossorigin>`);

async function gravarPagina(arquivo, { head, html, modulo }) {
  const cabecalho = [head, ...fontes, ...preloadsDoModulo(modulo)].join('\n    ');
  const pagina = template.replace('<!--app-head-->', cabecalho).replace('<!--app-html-->', html);
  const destino = join(dist, arquivo);
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, pagina);
}

const caminhos = servidor.todosOsCaminhos();
for (const caminho of caminhos) {
  const resultado = await servidor.renderizar(caminho);
  const arquivo = caminho === '/' ? 'index.html' : join(caminho, 'index.html');
  await gravarPagina(arquivo, resultado);
  console.log(`  ✓ ${caminho}`);
}

await gravarPagina('404.html', await servidor.renderizar('/404/'));
console.log('  ✓ 404.html');

/* sitemap.xml */
const hoje = new Date().toISOString().slice(0, 10);
const prioridade = (c) => (c === '/' ? '1.0' : c.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${caminhos
  .map(
    (c) =>
      `  <url><loc>${SITE_URL}${c}</loc><lastmod>${hoje}</lastmod><priority>${prioridade(c)}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);

/* robots.txt */
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

/* site.webmanifest */
await writeFile(join(dist, 'site.webmanifest'), JSON.stringify(servidor.manifestoWeb(), null, 2));

/* Limpeza: o pacote do servidor só serve para gerar o HTML. */
await rm(distSsr, { recursive: true, force: true });
await rm(join(dist, '.vite'), { recursive: true, force: true });

console.log(
  `\nPré-renderização concluída: ${caminhos.length + 1} páginas em ${SITE_URL}${BASE === '/' ? '' : ` (base ${BASE})`}`,
);
