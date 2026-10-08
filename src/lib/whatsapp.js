import { clinica } from '../data/clinica.js';

/** Link para conversar no WhatsApp com uma mensagem já escrita. */
export function linkWhatsApp(mensagem = clinica.contato.mensagemPadrao) {
  const numero = String(clinica.contato.whatsapp).replace(/\D/g, '');
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : '';
  return `https://wa.me/${numero}${texto}`;
}

/**
 * Mensagem de agendamento para um tratamento específico.
 * Recebe o tratamento (usa `nomeNaFrase` quando existir, para manter siglas como "DTM").
 */
export function mensagemTratamento(tratamento) {
  const nome = tratamento.nomeNaFrase ?? tratamento.nome.toLowerCase();
  return `Olá! Vim pelo site e gostaria de agendar uma avaliação de ${nome}.`;
}

/**
 * Monta a mensagem do formulário de agendamento.
 * Nada é armazenado: o texto só existe no navegador até abrir o WhatsApp.
 */
export function mensagemAgendamento({ nome, tratamento, periodo, convenio, observacoes }) {
  const linhas = [`Olá! Meu nome é ${nome.trim()} e gostaria de agendar uma avaliação.`];
  if (tratamento) linhas.push(`Tratamento de interesse: ${tratamento}`);
  if (periodo) linhas.push(`Melhor período: ${periodo}`);
  if (convenio) linhas.push(`Convênio: ${convenio}`);
  if (observacoes && observacoes.trim()) linhas.push(`Observações: ${observacoes.trim()}`);
  return linhas.join('\n');
}

/** Link de telefone (tel:) a partir do número em formato E.164. */
export function linkTelefone(numero = clinica.contato.telefone) {
  return `tel:${String(numero).replace(/[^\d+]/g, '')}`;
}
