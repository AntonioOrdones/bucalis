import { clinica } from '../data/clinica.js';

/** Caminho-base definido no build ("/" ou "/nome-do-repositorio/"). */
export const BASE = import.meta.env.BASE_URL;

/** URL pública absoluta, sem barra final (ex.: https://usuario.github.io/repositorio). */
export const SITE_URL = (__SITE_URL__ || clinica.urlPadrao).replace(/\/+$/, '');

const EXTERNO = /^(?:[a-z][a-z\d+\-.]*:|#|\/\/)/i;

/**
 * Converte um caminho interno do site ("/tratamentos/") em um link que
 * funciona no GitHub Pages, respeitando o caminho-base. Links externos,
 * âncoras, mailto: e tel: passam intactos.
 */
export function href(caminho = '/') {
  if (EXTERNO.test(caminho)) return caminho;
  return BASE + caminho.replace(/^\/+/, '');
}

/** Arquivos da pasta public/ (imagens, ícones). */
export const asset = href;

/** URL absoluta para canonical, Open Graph, sitemap e dados estruturados. */
export function urlAbsoluta(caminho = '/') {
  if (/^https?:\/\//i.test(caminho)) return caminho;
  return SITE_URL + '/' + caminho.replace(/^\/+/, '');
}

/**
 * Padroniza um caminho interno: remove "index.html" e garante barra
 * inicial e final ("/tratamentos/implantodontia/").
 */
export function normalizarCaminho(caminho = '/') {
  let resultado = caminho.split(/[?#]/)[0];
  try {
    resultado = decodeURI(resultado);
  } catch {
    /* mantém o valor original */
  }
  resultado = resultado.replace(/index\.html?$/, '').replace(/\/{2,}/g, '/');
  if (!resultado.startsWith('/')) resultado = `/${resultado}`;
  if (!resultado.endsWith('/')) resultado = `${resultado}/`;
  return resultado;
}

/** Caminho interno a partir do endereço do navegador (remove o caminho-base). */
export function caminhoDoEndereco(pathname = '/') {
  const baseSemBarra = BASE.replace(/\/$/, '');
  let caminho = pathname;
  if (baseSemBarra && (caminho === baseSemBarra || caminho.startsWith(BASE))) {
    caminho = caminho.slice(baseSemBarra.length);
  }
  return normalizarCaminho(caminho);
}
