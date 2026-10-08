import { describe, expect, it } from 'vitest';
import { clinica } from '../src/data/clinica.js';
import { convenios } from '../src/data/convenios.js';
import { equipe } from '../src/data/equipe.js';
import { fotografias } from '../src/data/fotografias.js';
import { perguntasFrequentes } from '../src/data/faq.js';
import { tratamentos } from '../src/data/tratamentos.js';

const slugs = new Set(tratamentos.map((t) => t.slug));

describe('dados do site', () => {
  it('tratamentos têm slugs únicos e campos obrigatórios', () => {
    expect(slugs.size).toBe(tratamentos.length);
    for (const t of tratamentos) {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
      for (const campo of ['nome', 'icone', 'resumo', 'descricaoSeo'])
        expect(t[campo], `${t.slug}.${campo}`).toBeTruthy();
      expect(t.descricaoSeo.length, `${t.slug}: descrição para o Google`).toBeLessThanOrEqual(170);
      expect(t.introducao.length).toBeGreaterThan(0);
      expect(t.indicacoes.length).toBeGreaterThan(0);
      expect(t.etapas.length).toBeGreaterThan(1);
      expect(t.faq.length).toBeGreaterThan(0);
    }
  });

  it('tratamentos relacionados apontam para páginas existentes', () => {
    for (const t of tratamentos) {
      for (const r of t.relacionados) expect(slugs.has(r), `${t.slug} → ${r}`).toBe(true);
    }
  });

  it('especialidades da equipe existem em tratamentos.js', () => {
    for (const pessoa of equipe) {
      expect(pessoa.cro, pessoa.nome).toBeTruthy();
      for (const e of pessoa.especialidades) expect(slugs.has(e), `${pessoa.nome} → ${e}`).toBe(true);
    }
  });

  it('dados da clínica estão no formato esperado', () => {
    expect(clinica.contato.whatsapp).toMatch(/^55\d{10,11}$/);
    expect(clinica.contato.telefone).toMatch(/^\+55\d{10,11}$/);
    expect(clinica.descricao.length).toBeLessThanOrEqual(170);
    for (const h of clinica.horarios) {
      expect(h.abre).toMatch(/^\d{2}:\d{2}$/);
      expect(h.fecha).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('usa contatos, endereco e horarios oficiais informados pela Bucalis', () => {
    expect(clinica.contato.whatsapp).toBe('5561992924408');
    expect(clinica.contato.telefone).toBe('+556133461495');
    expect(clinica.endereco.cep).toBe('70390-108');
    expect(clinica.endereco.logradouro).toBe('SEPS Q 710/910');
    expect(clinica.horarios).toHaveLength(1);
    expect(clinica.horarios[0]).toMatchObject({ abre: '09:00', fecha: '18:00', diasSemana: [1, 2, 3, 4, 5] });
    expect(clinica.anoFundacao).toBeNull();
    expect(clinica.legal.cnpj).toBe('');
  });

  it('cataloga as 19 fotografias reais e usa caminhos locais unicos', () => {
    expect(fotografias).toHaveLength(19);
    expect(new Set(fotografias.map((f) => f.id)).size).toBe(19);
    for (const foto of fotografias) {
      expect(foto.src).toMatch(/^\/fotos\/foto-\d{3}\.webp$/);
      expect(foto.descricao.length).toBeGreaterThan(15);
    }
  });

  it('convênios e perguntas não têm duplicatas', () => {
    expect(new Set(convenios).size).toBe(convenios.length);
    expect(new Set(perguntasFrequentes.map((p) => p.pergunta)).size).toBe(perguntasFrequentes.length);
  });
});
