import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../src/App.jsx';
import { encontrarRota, rotaNaoEncontrada, todosOsCaminhos } from '../src/routes.js';

async function renderizar(caminho) {
  const achado = encontrarRota(caminho);
  const rota = achado?.rota ?? rotaNaoEncontrada;
  const modulo = await rota.carregar();
  const html = renderToString(
    <App Pagina={modulo.default} params={achado?.params ?? {}} caminho={caminho} />,
  );
  return { html, meta: modulo.meta?.(achado?.params ?? {}) ?? {} };
}

describe('pré-renderização das páginas', () => {
  for (const caminho of [...todosOsCaminhos(), '/404/']) {
    it(`renderiza ${caminho}`, async () => {
      const { html, meta } = await renderizar(caminho);
      expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
      expect(html).toContain('id="conteudo"');
      if (caminho !== '/') expect(meta.titulo).toBeTruthy();
    });
  }
});
