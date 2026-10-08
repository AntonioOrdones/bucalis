import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (relative) => readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');
const colors = ['#cacaca', '#ede3d7', '#a29c8a', '#7b7562', '#735e59', '#481310', '#2e1711'];

describe('Identidade visual oficial Bucalis', () => {
  it('centraliza os sete tons oficiais em tokens', () => {
    const css = read('src/styles/tokens.css');
    for (const color of colors) expect(css).toContain(color);
  });

  it('estabelece Poppins e familias editoriais do manual', () => {
    const css = read('src/styles/tokens.css');
    for (const face of ['Poppins', 'Boston Angel', 'Higuen', 'TAN Garland', 'Burgues Script']) {
      expect(css).toContain(face);
    }
    const html = read('template.html');
    expect(html).toContain('fonts.googleapis.com/css2');
    expect(html).toContain('Poppins');
    expect(read('src/styles/main.css')).toContain('identidade-bucalis.css');
  });

  it('elimina o azul do painel decorativo de azulejos', () => {
    const azulejos = read('src/components/Azulejos.jsx');
    expect(azulejos).not.toContain('#1f4e8c');
    for (const match of azulejos.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
      expect(colors).toContain(match[0].toLowerCase());
    }
  });

  it('usa a paleta tambem em favicon e imagem social', () => {
    const generator = read('scripts/gerar-identidade.py');
    for (const color of ['#2e1711', '#481310', '#ede3d7', '#a29c8a', '#735e59']) {
      expect(generator).toContain(color);
    }
    expect(read('src/lib/seo.js')).toContain('#2e1711');
  });
});
