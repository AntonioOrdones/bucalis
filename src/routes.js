import { tratamentos } from './data/tratamentos.js';
import { normalizarCaminho } from './lib/url.js';

/**
 * Mapa de páginas do site.
 * - caminho: endereço público (sempre com barra final);
 * - modulo: arquivo da página (usado para pré-carregar o JS certo);
 * - carregar: importação sob demanda — cada página vira um arquivo JS próprio;
 * - parametros: lista de valores possíveis para rotas dinâmicas.
 *
 * Toda página exporta `default` (componente) e `meta(params)` (título,
 * descrição e dados estruturados).
 */
export const rotas = [
  {
    caminho: '/',
    modulo: 'src/pages/Inicio.jsx',
    carregar: () => import('./pages/Inicio.jsx'),
  },
  {
    caminho: '/clinica/',
    modulo: 'src/pages/Clinica.jsx',
    carregar: () => import('./pages/Clinica.jsx'),
  },
  {
    caminho: '/tratamentos/',
    modulo: 'src/pages/Tratamentos.jsx',
    carregar: () => import('./pages/Tratamentos.jsx'),
  },
  {
    caminho: '/tratamentos/:slug/',
    modulo: 'src/pages/Tratamento.jsx',
    carregar: () => import('./pages/Tratamento.jsx'),
    parametros: () => tratamentos.map((t) => ({ slug: t.slug })),
  },
  {
    caminho: '/convenios/',
    modulo: 'src/pages/Convenios.jsx',
    carregar: () => import('./pages/Convenios.jsx'),
  },
  {
    caminho: '/contato/',
    modulo: 'src/pages/Contato.jsx',
    carregar: () => import('./pages/Contato.jsx'),
  },
  {
    caminho: '/privacidade/',
    modulo: 'src/pages/Privacidade.jsx',
    carregar: () => import('./pages/Privacidade.jsx'),
  },
  {
    caminho: '/termos/',
    modulo: 'src/pages/Termos.jsx',
    carregar: () => import('./pages/Termos.jsx'),
  },
  {
    caminho: '/acessibilidade/',
    modulo: 'src/pages/Acessibilidade.jsx',
    carregar: () => import('./pages/Acessibilidade.jsx'),
  },
];

export const rotaNaoEncontrada = {
  caminho: '/404/',
  modulo: 'src/pages/NaoEncontrada.jsx',
  carregar: () => import('./pages/NaoEncontrada.jsx'),
};

function casar(padrao, caminho) {
  const partesPadrao = padrao.split('/').filter(Boolean);
  const partes = caminho.split('/').filter(Boolean);
  if (partesPadrao.length !== partes.length) return null;
  const params = {};
  for (let i = 0; i < partesPadrao.length; i += 1) {
    if (partesPadrao[i].startsWith(':')) params[partesPadrao[i].slice(1)] = partes[i];
    else if (partesPadrao[i] !== partes[i]) return null;
  }
  return params;
}

/**
 * Encontra a página de um caminho interno. Rotas dinâmicas só casam com
 * valores existentes (ex.: um slug de tratamento que existe em tratamentos.js).
 * @returns {{ rota: object, params: object, caminho: string } | null}
 */
export function encontrarRota(caminhoInterno) {
  const caminho = normalizarCaminho(caminhoInterno);
  for (const rota of rotas) {
    const params = casar(rota.caminho, caminho);
    if (!params) continue;
    if (rota.parametros) {
      const valido = rota.parametros().some((p) => Object.keys(p).every((k) => p[k] === params[k]));
      if (!valido) continue;
    }
    return { rota, params, caminho };
  }
  return null;
}

/** Todos os caminhos a pré-renderizar (inclui cada página de tratamento). */
export function todosOsCaminhos() {
  return rotas.flatMap((rota) => {
    if (!rota.parametros) return [rota.caminho];
    return rota
      .parametros()
      .map((params) =>
        Object.entries(params).reduce((c, [chave, valor]) => c.replace(`:${chave}`, valor), rota.caminho),
      );
  });
}
