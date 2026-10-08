import { describe, expect, it } from 'vitest';
import { linkTelefone, linkWhatsApp, mensagemAgendamento, mensagemTratamento } from '../src/lib/whatsapp.js';

describe('WhatsApp', () => {
  it('codifica a mensagem no link', () => {
    const link = linkWhatsApp('Olá! Tudo bem?');
    expect(link).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(link.split('text=')[1])).toBe('Olá! Tudo bem?');
  });

  it('usa o nome do tratamento na frase', () => {
    expect(mensagemTratamento({ nome: 'Ortodontia' })).toContain('avaliação de ortodontia');
    expect(mensagemTratamento({ nome: 'DTM e dor orofacial', nomeNaFrase: 'DTM e dor orofacial' })).toContain(
      'de DTM e dor orofacial',
    );
  });

  it('monta a mensagem do formulário só com o que foi preenchido', () => {
    const texto = mensagemAgendamento({
      nome: ' Ana ',
      tratamento: 'Implantodontia',
      periodo: '',
      convenio: '',
    });
    expect(texto).toContain('Meu nome é Ana');
    expect(texto).toContain('Tratamento de interesse: Implantodontia');
    expect(texto).not.toContain('Convênio');
  });

  it('gera link de telefone sem formatação', () => {
    expect(linkTelefone('+55 (61) 3000-0000')).toBe('tel:+556130000000');
  });
});
