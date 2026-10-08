import { clinica } from '../data/clinica.js';
import { carregarScript } from './scripts.js';

/**
 * Google Analytics 4 — carregado somente após consentimento de "Estatísticas".
 * Sem ID configurado em src/data/clinica.js, nada é carregado.
 */

let iniciado = false;

export function iniciarAnalytics() {
  const id = clinica.integracoes.ga4;
  if (!id || typeof window === 'undefined') return;
  window[`ga-disable-${id}`] = false;
  if (iniciado) return;
  iniciado = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);
  carregarScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`).catch(() => {
    /* bloqueado por extensão ou rede: o site segue normalmente */
  });
}

/** Revogação: desativa a coleta na sessão atual. */
export function pararAnalytics() {
  const id = clinica.integracoes.ga4;
  if (id && typeof window !== 'undefined') window[`ga-disable-${id}`] = true;
}

export function registrarEvento(nome, parametros = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', nome, parametros);
  }
}
