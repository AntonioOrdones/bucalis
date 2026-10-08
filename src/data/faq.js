import { clinica } from './clinica.js';

/**
 * PERGUNTAS FREQUENTES GERAIS (home e página de contato).
 * As perguntas de cada tratamento ficam em tratamentos.js.
 * `link` é opcional e aparece como "Saiba mais" ao final da resposta.
 */
export const perguntasFrequentes = [
  {
    pergunta: 'Vocês atendem por convênio?',
    resposta:
      'Sim. Atendemos os convênios da nossa lista e também de forma particular. Como a cobertura varia de plano para plano, confirme com a nossa equipe antes da consulta.',
    link: { texto: 'Ver convênios', para: '/convenios/' },
  },
  {
    pergunta: 'Como faço para agendar?',
    resposta:
      'Pelo WhatsApp, por telefone ou pelo formulário de agendamento. Informe o tratamento de interesse e o melhor período: nossa equipe responde com os horários disponíveis.',
    link: { texto: 'Agendar agora', para: '/contato/' },
  },
  {
    pergunta: 'O que acontece na primeira consulta?',
    resposta:
      'Conversamos sobre sua saúde e suas expectativas, fazemos o exame clínico e, se necessário, pedimos exames de imagem. Ao final, você recebe orientações e, se houver tratamento indicado, um plano detalhado por escrito.',
  },
  {
    pergunta: 'Vocês atendem urgências?',
    resposta:
      'Em caso de dor, inchaço ou pancada nos dentes, chame no WhatsApp. Nossa equipe orienta e procura encaixar o atendimento o quanto antes, dentro do horário de funcionamento.',
  },
  {
    pergunta: 'A partir de que idade as crianças podem ser atendidas?',
    resposta:
      'Desde bebês. A odontopediatria recomenda a primeira consulta logo após o nascimento do primeiro dente, antes de a criança completar um ano.',
    link: {
      texto: 'Conhecer a odontopediatria',
      para: '/tratamentos/odontopediatria/',
    },
  },
  {
    pergunta: 'O que devo levar no dia da consulta?',
    resposta:
      'Um documento com foto, a carteirinha do convênio (se for o caso), exames recentes que você tiver e a lista dos medicamentos que usa.',
  },
  {
    pergunta: 'Onde fica a clínica e como chegar?',
    resposta: clinica.endereco.comoChegar,
    link: { texto: 'Ver localização', para: '/contato/#localizacao' },
  },
];
