import { useEffect, useState } from 'react';
import { clinica } from '../data/clinica.js';
import { formatarHora, situacaoAtual } from '../lib/horarios.js';

/**
 * Horários de funcionamento com a situação atual ("Aberto agora…").
 * A situação é calculada só no navegador, para refletir a hora real da visita.
 */
export default function Horarios({ compacto = false, mostrarSituacao = true }) {
  const [situacao, setSituacao] = useState(null);

  useEffect(() => {
    if (!mostrarSituacao) return undefined;
    const atualizar = () => setSituacao(situacaoAtual(clinica.horarios));
    atualizar();
    const intervalo = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(intervalo);
  }, [mostrarSituacao]);

  const fechaDomingo = !clinica.horarios.some((h) => h.diasSemana.includes(0));

  return (
    <div className={`horarios${compacto ? ' horarios--compacto' : ''}`}>
      {mostrarSituacao && (
        <p className="horarios__situacao" data-aberto={situacao?.aberto ? 'sim' : 'nao'} hidden={!situacao}>
          <span className="horarios__ponto" aria-hidden="true" />
          {situacao?.texto}
        </p>
      )}
      <dl className="horarios__lista">
        {clinica.horarios.map((h) => (
          <div key={h.rotulo}>
            <dt>{h.rotulo}</dt>
            <dd>
              {formatarHora(h.abre)} às {formatarHora(h.fecha)}
            </dd>
          </div>
        ))}
        {fechaDomingo && (
          <div>
            <dt>Domingos e feriados</dt>
            <dd>Fechado</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
