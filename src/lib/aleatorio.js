/**
 * Gerador pseudoaleatório com semente (mulberry32).
 * O mesmo número-semente produz sempre a mesma sequência — assim o servidor
 * (pré-renderização) e o navegador desenham os azulejos exatamente iguais.
 */
export function criarAleatorio(semente = 1) {
  let estado = semente >>> 0;
  return function proximo() {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Semente estável a partir de um texto (ex.: nome de uma pessoa). */
export function sementeDeTexto(texto = '') {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
