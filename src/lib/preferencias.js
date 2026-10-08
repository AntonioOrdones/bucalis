import { useSyncExternalStore } from 'react';
import { gravarPreferencia, lerPreferencia } from './armazenamento.js';

/**
 * Preferências de acessibilidade (tamanho do texto, contraste, movimento e
 * VLibras), guardadas no navegador. O script em index.html aplica essas
 * escolhas antes da primeira pintura; este módulo as mantém em sincronia.
 */

const CHAVE = 'clinica:acessibilidade';
export const PREFERENCIAS_PADRAO = Object.freeze({
  fonte: 0,
  contraste: false,
  movimento: false,
  libras: false,
});

let atuais;
const ouvintes = new Set();

function ler() {
  if (atuais === undefined) atuais = { ...PREFERENCIAS_PADRAO, ...lerPreferencia(CHAVE, {}) };
  return atuais;
}

function aplicarNoDocumento(prefs) {
  const raiz = document.documentElement;
  const definir = (atributo, valor) =>
    valor ? raiz.setAttribute(atributo, valor) : raiz.removeAttribute(atributo);
  definir('data-fonte', prefs.fonte ? String(prefs.fonte) : '');
  definir('data-contraste', prefs.contraste ? 'alto' : '');
  definir('data-movimento', prefs.movimento ? 'reduzido' : '');
}

export function obterPreferencias() {
  return typeof window === 'undefined' ? PREFERENCIAS_PADRAO : ler();
}

export function atualizarPreferencias(mudanca) {
  atuais = { ...ler(), ...mudanca };
  aplicarNoDocumento(atuais);
  gravarPreferencia(CHAVE, atuais);
  ouvintes.forEach((ouvinte) => ouvinte());
}

function assinar(ouvinte) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

export function usePreferencias() {
  return useSyncExternalStore(assinar, obterPreferencias, () => PREFERENCIAS_PADRAO);
}

/** true somente no navegador, depois da hidratação (sem efeito colateral). */
const semAssinatura = () => () => {};
export function useNoNavegador() {
  return useSyncExternalStore(
    semAssinatura,
    () => true,
    () => false,
  );
}
