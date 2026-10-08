import { clinica } from '../data/clinica.js';
import Botao from './Botao.jsx';
import { Bloqueio, useLiberacao } from './Terceiros.jsx';

export const linkComoChegar = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinica.mapa.consulta)}`;
export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinica.mapa.consulta)}`;

/**
 * Esquema do Plano Piloto (desenho livre, fora de escala): o Eixo Rodoviário
 * em arco, o Eixo Monumental e o Lago Paranoá, com a clínica na Asa Sul.
 * Fica no lugar do mapa até o visitante pedir para carregar o Google Maps.
 */
function PlanoPiloto() {
  return (
    <svg className="plano-piloto" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
      <path
        className="plano-piloto__lago"
        d="M300 4c-24 34-30 70-26 104 3 24 14 40 14 64 0 34-28 64-74 90-30 17-70 26-110 30l-2 12c56-2 104-14 140-36 50-30 80-66 82-112 1-30-12-50-14-74-2-28 8-54 26-78Z"
      />
      <path className="plano-piloto__eixo" d="M262 28C186 70 150 112 150 150s36 80 112 122" />
      <path className="plano-piloto__eixo" d="M46 150H300" />
      <circle className="plano-piloto__centro" cx="150" cy="150" r="4" />
      <text x="124" y="70" className="plano-piloto__rotulo">
        Asa Norte
      </text>
      <text x="138" y="246" className="plano-piloto__rotulo">
        Asa Sul
      </text>
      <text x="54" y="140" className="plano-piloto__rotulo plano-piloto__rotulo--suave">
        Eixo Monumental
      </text>
      <text x="300" y="214" className="plano-piloto__rotulo plano-piloto__rotulo--lago">
        Lago Paranoá
      </text>
      <g className="plano-piloto__pino" transform="translate(182 206)">
        <path d="M0 0c-9-11-14-19-14-26a14 14 0 0 1 28 0c0 7-5 15-14 26Z" />
        <circle cx="0" cy="-26" r="5" />
      </g>
    </svg>
  );
}

export default function Mapa() {
  const { liberado, liberar } = useLiberacao();
  const embed =
    clinica.mapa.embedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(clinica.mapa.consulta)}&z=16&output=embed`;

  if (liberado) {
    return (
      <div className="mapa">
        <iframe
          src={embed}
          title={`Mapa com a localização da ${clinica.nome}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="mapa">
      <Bloqueio
        className="bloqueio--mapa"
        servico="o Google"
        descricao="Mapa interativo do Google Maps"
        acao="Carregar mapa"
        onCarregar={liberar}
        alternativa={
          <Botao tamanho="pequeno" variante="texto" para={linkMapa} externo>
            Abrir no Google Maps
          </Botao>
        }
      >
        <PlanoPiloto />
      </Bloqueio>
    </div>
  );
}
