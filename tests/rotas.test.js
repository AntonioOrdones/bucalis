import { describe, expect, it } from 'vitest';
import { tratamentos } from '../src/data/tratamentos.js';
import { normalizarCaminho } from '../src/lib/url.js';
import { encontrarRota, todosOsCaminhos } from '../src/routes.js';

describe('rotas', () => {
  it('normaliza caminhos', () => {
    expect(normalizarCaminho('/tratamentos')).toBe('/tratamentos/');
    expect(normalizarCaminho('/contato/index.html')).toBe('/contato/');
    expect(normalizarCaminho('/convenios/?x=1#topo')).toBe('/convenios/');
  });

  it('encontra páginas fixas e dinâmicas', () => {
    expect(encontrarRota('/').rota.caminho).toBe('/');
    expect(encontrarRota('/tratamentos/implantodontia/').params).toEqual({ slug: 'implantodontia' });
  });

  it('não aceita tratamentos inexistentes', () => {
    expect(encontrarRota('/tratamentos/nao-existe/')).toBeNull();
    expect(encontrarRota('/qualquer-coisa/')).toBeNull();
  });

  it('lista todas as páginas para pré-renderizar', () => {
    const caminhos = todosOsCaminhos();
    expect(caminhos).toContain('/');
    expect(caminhos.filter((c) => c.startsWith('/tratamentos/') && c !== '/tratamentos/')).toHaveLength(
      tratamentos.length,
    );
    expect(new Set(caminhos).size).toBe(caminhos.length);
  });
});
