import { carregarScript } from './scripts.js';

/**
 * VLibras (Governo Federal): tradução de conteúdo para a Língua Brasileira
 * de Sinais. Carregado somente quando o visitante ativa o recurso no menu de
 * acessibilidade — assim o site não faz requisições externas sem necessidade.
 */

const ORIGEM = 'https://vlibras.gov.br/app';

export function vlibrasAtivo() {
  return typeof document !== 'undefined' && Boolean(document.querySelector('[vw]'));
}

export async function ativarVLibras() {
  if (typeof document === 'undefined' || vlibrasAtivo()) return;

  const raiz = document.createElement('div');
  raiz.setAttribute('vw', '');
  raiz.className = 'enabled';
  raiz.innerHTML =
    '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
  document.body.appendChild(raiz);

  try {
    await carregarScript(`${ORIGEM}/vlibras-plugin.js`);
    new window.VLibras.Widget(ORIGEM);
    // O widget se inicia no evento "load" da janela, que já passou quando o
    // recurso é ativado depois. Disparamos a inicialização manualmente.
    if (document.readyState === 'complete' && typeof window.onload === 'function') {
      window.onload();
    }
  } catch {
    raiz.remove();
    throw new Error('Não foi possível carregar o VLibras agora. Tente novamente em instantes.');
  }
}
