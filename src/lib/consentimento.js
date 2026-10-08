import { useSyncExternalStore } from 'react';
import { gravarPreferencia, lerPreferencia } from './armazenamento.js';

/**
 * Consentimento (LGPD) para conteúdos e serviços de terceiros.
 *
 * Por padrão NADA de terceiros é carregado. Cada categoria só é liberada
 * depois de uma escolha explícita do visitante, que pode ser revista a
 * qualquer momento em "Preferências de privacidade", no rodapé.
 */

const CHAVE = 'clinica:consentimento:v1';
export const EVENTO_ABRIR_PREFERENCIAS = 'clinica:abrir-preferencias';

export const CATEGORIAS = {
  terceiros: {
    titulo: 'Conteúdo de terceiros',
    descricao:
      'Avaliações do Google, feed do Instagram (via Elfsight), mapa do Google Maps e vídeos do YouTube. Esses serviços podem receber dados técnicos do seu navegador, como endereço IP.',
  },
  medicao: {
    titulo: 'Estatísticas de visita',
    descricao:
      'Google Analytics, para entendermos de forma agregada quais páginas são mais úteis. Só é ativado se você permitir.',
  },
};

let estado; // undefined = ainda não lido; null = sem escolha; objeto = escolha feita
const ouvintes = new Set();

function ler() {
  if (estado === undefined) estado = lerPreferencia(CHAVE, null);
  return estado;
}

function avisar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function obterConsentimento() {
  if (typeof window === 'undefined') return null;
  return ler();
}

export function salvarConsentimento({ terceiros = false, medicao = false }) {
  estado = {
    terceiros: Boolean(terceiros),
    medicao: Boolean(medicao),
    data: new Date().toISOString(),
  };
  gravarPreferencia(CHAVE, estado);
  avisar();
}

function assinar(ouvinte) {
  ouvintes.add(ouvinte);
  const aoMudarEmOutraAba = (evento) => {
    if (evento.key === CHAVE) {
      estado = lerPreferencia(CHAVE, null);
      avisar();
    }
  };
  window.addEventListener('storage', aoMudarEmOutraAba);
  return () => {
    ouvintes.delete(ouvinte);
    window.removeEventListener('storage', aoMudarEmOutraAba);
  };
}

/** Hook React: devolve a escolha atual (ou null). No servidor, sempre null. */
export function useConsentimento() {
  return useSyncExternalStore(assinar, obterConsentimento, () => null);
}

export function permite(consentimento, categoria) {
  return Boolean(consentimento && consentimento[categoria]);
}

/** Abre o painel de preferências de qualquer lugar do site. */
export function abrirPreferencias() {
  window.dispatchEvent(new CustomEvent(EVENTO_ABRIR_PREFERENCIAS));
}
