import { describe, expect, it } from 'vitest';
import { escaparHtml, iniciais, normalizar, rotuloResponsavelTecnico } from '../src/lib/texto.js';

describe('texto', () => {
  it('normaliza acentos e caixa para a busca', () => {
    expect(normalizar('  Saúde CAIXA ')).toBe('saude caixa');
    expect(normalizar('Pró-Social')).toBe('pro-social');
  });

  it('gera iniciais ignorando títulos e preposições', () => {
    expect(iniciais('Dra. Ana Lima')).toBe('AL');
    expect(iniciais('Dr. João da Silva Costa')).toBe('JC');
    expect(iniciais('Marina')).toBe('M');
  });

  it('escapa HTML', () => {
    expect(escaparHtml('<a href="x">&</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
  });

  it('flexiona o rótulo de responsável técnico', () => {
    expect(rotuloResponsavelTecnico('Dra. Ana')).toBe('Responsável técnica');
    expect(rotuloResponsavelTecnico('Dr. João')).toBe('Responsável técnico');
  });
});
