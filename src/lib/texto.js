/** Remove acentos e padroniza para busca ("Saúde" → "saude"). */
export function normalizar(texto = '') {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Iniciais para o monograma da equipe, ignorando títulos ("Dra. Ana Lima" → "AL"). */
export function iniciais(nome = '') {
  const partes = nome
    .replace(/^(dra?|dr\(a\))\.?\s+/i, '')
    .split(/\s+/)
    .filter((p) => p.length > 2 || /^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(p))
    .filter((p) => !/^(de|da|do|das|dos|e)$/i.test(p));
  if (partes.length === 0) return '';
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}

/** Escapa texto para uso seguro em HTML gerado como string (cabeçalho das páginas). */
export function escaparHtml(texto = '') {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** "Responsável técnica" ou "Responsável técnico", conforme o título (Dra./Dr.). */
export function rotuloResponsavelTecnico(nome = '') {
  return /^dra\b/i.test(nome.trim()) ? 'Responsável técnica' : 'Responsável técnico';
}
