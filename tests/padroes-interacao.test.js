import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const luminancia = (hex) => {
  const rgb = [1, 3, 5].map((at) => Number.parseInt(hex.slice(at, at + 2), 16) / 255);
  const linear = rgb.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};
const contraste = (frente, fundo) => {
  const a = luminancia(frente);
  const b = luminancia(fundo);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

describe('Padrões GOVBR-DS adaptados à marca Bucalis', () => {
  it('preserva contraste WCAG AA nos pares usados para texto de tamanho comum', () => {
    for (const [frente, fundo] of [
      ['#481310', '#ede3d7'],
      ['#2e1711', '#ede3d7'],
      ['#735e59', '#ede3d7'],
      ['#cacaca', '#2e1711'],
      ['#481310', '#ffffff'],
    ]) {
      expect(contraste(frente, fundo)).toBeGreaterThanOrEqual(4.5);
    }
    // O oliva institucional e uma cor de detalhe, nao texto pequeno sobre areia.
    expect(contraste('#7b7562', '#ede3d7')).toBeLessThan(4.5);
  });

  it('fornece tokens de estado, espacamento, grid, elevacao e movimento', () => {
    const css = read('src/styles/padroes-interacao.css');
    for (const token of [
      '--estado-foco', '--estado-erro', '--estado-desabilitado',
      '--superficie-base', '--grid-gutter', '--densidade-regular',
      '--elevacao-modal', '--movimento-padrao', '--controle-altura-minima',
    ]) expect(css).toContain(token);
    expect(css).toContain("html[data-movimento='reduzido']");
    expect(css).toContain('prefers-reduced-motion');
    expect(read('src/styles/main.css')).toContain("padroes-interacao.css");
  });

  it('mantem rotulos e mensagens de erro associadas ao formulario', () => {
    const source = read('src/components/FormularioAgendamento.jsx');
    expect(source).toContain('className="campo__erro" role="alert"');
    expect(source).toContain("aria-describedby={erro ?");
    expect(source).toContain('ref={campoNome}');
    expect(source).toContain('fieldset');
    expect(source).toContain('legend');
  });

  it('oferece gerenciador de preferencias reversivel e modal que pode ser fechado', () => {
    const cookie = read('src/components/Consentimento.jsx');
    expect(cookie).toContain('Rejeitar opcionais');
    expect(cookie).toContain('Fechar preferências sem salvar');
    expect(cookie).toContain('aria-describedby={');
    expect(cookie).toContain('Aceitar tudo');
    expect(cookie).toContain('Salvar escolhas');
  });

  it('usa FAQ nativo, retorno de busca, skip link e roles de navegação', () => {
    expect(read('src/components/Perguntas.jsx')).toContain('<details');
    expect(read('src/components/Perguntas.jsx')).toContain('<summary');
    expect(read('src/components/BuscaConvenios.jsx')).toContain('role="search"');
    expect(read('src/components/BuscaConvenios.jsx')).toContain('role="status"');
    expect(read('src/App.jsx')).toContain('href="#conteudo"');
    expect(read('src/components/TopoPagina.jsx')).toContain('aria-current="page"');
    expect(read('src/styles/padroes-interacao.css')).toContain('.etapas--vertical .etapas__lista');
  });

  it('documenta os componentes aplicaveis e os nao aplicaveis', () => {
    const doc = read('docs/DESIGN-SYSTEM-GOVBR-AUDITORIA.md');
    for (const recurso of [
      'Fundamentos visuais', 'Padrões de design', 'Componentes',
      'Não aplicável', 'Pendente', 'Contraste', 'Poppins',
    ]) expect(doc.toLowerCase()).toContain(recurso.toLowerCase());
  });
});
