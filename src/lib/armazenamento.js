/**
 * Acesso ao localStorage com tolerância a falhas (modo privado, bloqueio de
 * cookies, cota cheia). Guarde aqui apenas preferências — nunca dados de saúde.
 */

export function lerPreferencia(chave, padrao = null) {
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch {
    return padrao;
  }
}

export function gravarPreferencia(chave, valor) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}
