import { describe, expect, it } from 'vitest';
import { formatarHora, horariosSchema, situacaoAtual } from '../src/lib/horarios.js';

const horarios = [
  { rotulo: 'Segunda a sexta', diasSemana: [1, 2, 3, 4, 5], abre: '08:00', fecha: '19:00' },
  { rotulo: 'Sábado', diasSemana: [6], abre: '08:00', fecha: '12:00' },
];

// Datas em UTC; Brasília = UTC−3.
const em = (iso) => new Date(iso);

describe('horários', () => {
  it('formata horas', () => {
    expect(formatarHora('08:00')).toBe('8h');
    expect(formatarHora('18:30')).toBe('18h30');
  });

  it('aberto durante o expediente (quarta, 10h em Brasília)', () => {
    const s = situacaoAtual(horarios, em('2026-10-07T13:00:00Z'));
    expect(s.aberto).toBe(true);
    expect(s.texto).toContain('Fecha às 19h');
  });

  it('fechado antes de abrir (quarta, 7h)', () => {
    const s = situacaoAtual(horarios, em('2026-10-07T10:00:00Z'));
    expect(s.aberto).toBe(false);
    expect(s.texto).toContain('Abre hoje às 8h');
  });

  it('sábado à tarde aponta a segunda-feira', () => {
    const s = situacaoAtual(horarios, em('2026-10-10T18:00:00Z'));
    expect(s.aberto).toBe(false);
    expect(s.texto).toContain('segunda-feira às 8h');
  });

  it('sexta à noite aponta o dia seguinte', () => {
    const s = situacaoAtual(horarios, em('2026-10-09T23:30:00Z'));
    expect(s.texto).toContain('amanhã às 8h');
  });

  it('gera horários no formato schema.org', () => {
    const schema = horariosSchema(horarios);
    expect(schema[0].dayOfWeek).toHaveLength(5);
    expect(schema[1]).toMatchObject({ opens: '08:00', closes: '12:00' });
  });
});
