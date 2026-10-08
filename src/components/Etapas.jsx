/**
 * Etapas numeradas (o conteúdo é uma sequência real). No computador, os
 * marcadores são ligados por arcos — um eco das curvas de Niemeyer.
 */
export default function Etapas({ itens, nivelTitulo = 3, vertical = false }) {
  const Titulo = `h${nivelTitulo}`;
  const total = itens.length;
  const largura = total * 100;
  const arcos = itens
    .slice(0, -1)
    .map((_, i) => {
      const x1 = i * 100 + 50;
      const x2 = x1 + 100;
      return `M${x1 + 14} 40Q${x1 + 50} -6 ${x2 - 14} 40`;
    })
    .join('');

  return (
    <div className={`etapas${vertical ? ' etapas--vertical' : ''}`} style={{ '--colunas': total }}>
      <svg
        className="etapas__arcos"
        viewBox={`0 0 ${largura} 48`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={arcos}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ol className="etapas__lista">
        {itens.map((etapa, i) => (
          <li key={etapa.titulo} className="etapa">
            <span className="etapa__marcador" aria-hidden="true">
              {i + 1}
            </span>
            <Titulo className="etapa__titulo">{etapa.titulo}</Titulo>
            <p className="etapa__texto">{etapa.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
