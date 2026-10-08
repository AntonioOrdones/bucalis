import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { clinica } from './data/clinica.js';
import { renderizarHead } from './lib/seo.js';
import { BASE, SITE_URL } from './lib/url.js';
import { encontrarRota, rotaNaoEncontrada, todosOsCaminhos } from './routes.js';

/**
 * Renderiza uma página em HTML (usado por scripts/prerender.mjs no build).
 * @param {string} caminho Caminho interno, ex.: "/tratamentos/implantodontia/"
 */
export async function renderizar(caminho) {
  const achado = caminho === rotaNaoEncontrada.caminho ? null : encontrarRota(caminho);
  const rota = achado?.rota ?? rotaNaoEncontrada;
  const params = achado?.params ?? {};
  const caminhoFinal = achado?.caminho ?? rotaNaoEncontrada.caminho;
  const modulo = await rota.carregar();

  const html = renderToString(<App Pagina={modulo.default} params={params} caminho={caminhoFinal} />);
  const meta = { caminho: caminhoFinal, ...(modulo.meta?.(params) ?? {}) };

  return { html, head: renderizarHead(meta), modulo: rota.modulo, meta };
}

/** Manifesto do app (instalação na tela inicial). */
export function manifestoWeb() {
  return {
    name: clinica.nome,
    short_name: clinica.nomeCurto,
    description: clinica.descricao,
    lang: 'pt-BR',
    start_url: BASE,
    scope: BASE,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2b140a',
    icons: [
      { src: `${BASE}icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${BASE}icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
      {
        src: `${BASE}icons/icon-maskable-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

export { BASE, SITE_URL, todosOsCaminhos };
