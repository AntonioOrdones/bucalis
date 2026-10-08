/**
 * Cálculo de "aberto agora" no fuso de Brasília, independente do fuso do visitante.
 * Feriados não são considerados — use `observacaoHorario` para avisos pontuais.
 */

const FUSO = 'America/Sao_Paulo';
const DIAS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];
const DIA_CURTO = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Converte "08:30" em minutos desde 00:00. */
export function paraMinutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

/** "08:00" → "8h"; "08:30" → "8h30". */
export function formatarHora(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
}

/** Dia da semana (0–6) e minutos do dia no horário de Brasília. */
export function agoraEmBrasilia(data = new Date()) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: FUSO,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(data);
  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value;
  return {
    dia: DIA_CURTO[valor('weekday')],
    minutos: Number(valor('hour')) * 60 + Number(valor('minute')),
  };
}

function expedienteDoDia(horarios, dia) {
  return horarios.find((h) => h.diasSemana.includes(dia));
}

/**
 * Situação atual da clínica.
 * @returns {{ aberto: boolean, texto: string }}
 */
export function situacaoAtual(horarios, data = new Date()) {
  const { dia, minutos } = agoraEmBrasilia(data);
  const hoje = expedienteDoDia(horarios, dia);

  if (hoje && minutos >= paraMinutos(hoje.abre) && minutos < paraMinutos(hoje.fecha)) {
    return {
      aberto: true,
      texto: `Aberto agora. Fecha às ${formatarHora(hoje.fecha)}.`,
    };
  }
  if (hoje && minutos < paraMinutos(hoje.abre)) {
    return {
      aberto: false,
      texto: `Fechado agora. Abre hoje às ${formatarHora(hoje.abre)}.`,
    };
  }
  for (let i = 1; i <= 7; i += 1) {
    const proximoDia = (dia + i) % 7;
    const expediente = expedienteDoDia(horarios, proximoDia);
    if (expediente) {
      const quando = i === 1 ? 'amanhã' : `${DIAS[proximoDia]}`;
      return {
        aberto: false,
        texto: `Fechado agora. Abre ${quando} às ${formatarHora(expediente.abre)}.`,
      };
    }
  }
  return { aberto: false, texto: 'Fechado no momento.' };
}

/** Horários no formato OpeningHoursSpecification (schema.org). */
export function horariosSchema(horarios) {
  const nomes = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return horarios.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.diasSemana.map((d) => `https://schema.org/${nomes[d]}`),
    opens: h.abre,
    closes: h.fecha,
  }));
}
