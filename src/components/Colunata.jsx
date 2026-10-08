/**
 * Colunata — traço inspirado na fachada do Palácio da Alvorada (Oscar
 * Niemeyer): colunas que afinam até tocar o chão e arcos entre elas, com o
 * reflexo no espelho d'água. Desenho original, usado como ornamento discreto.
 */
export default function Colunata({ colunas = 10, reflexo = true, preenchida = false, className = '' }) {
  const largura = 100; // distância entre colunas
  const alto = 64; // altura do arco
  const laje = 10; // espessura da laje
  const total = colunas * largura;
  const chao = laje + alto;

  const arcos = [];
  for (let i = 0; i < colunas; i += 1) {
    const x0 = i * largura;
    const x1 = x0 + largura;
    const meio = x0 + largura / 2;
    arcos.push(
      `M${x0} ${chao}C${x0 + 10} ${chao - alto * 0.78} ${x0 + 24} ${laje} ${meio} ${laje}` +
        `C${x1 - 24} ${laje} ${x1 - 10} ${chao - alto * 0.78} ${x1} ${chao}`,
    );
  }
  const desenho = `M0 0H${total}M0 ${laje}H${total}${arcos.join('')}`;

  // Silhueta cheia: a laje e as colunas, com os arcos vazados.
  const vaos = [];
  for (let i = colunas - 1; i >= 0; i -= 1) {
    const x0 = i * largura;
    const x1 = x0 + largura;
    const meio = x0 + largura / 2;
    vaos.push(
      `C${x1 - 10} ${chao - alto * 0.78} ${x1 - 24} ${laje} ${meio} ${laje}` +
        `C${x0 + 24} ${laje} ${x0 + 10} ${chao - alto * 0.78} ${x0} ${chao}`,
    );
  }
  const silhueta = `M0 0H${total}V${chao}${vaos.join('')}Z`;
  const altura = reflexo ? chao * 2 + 2 : chao + 2;

  return (
    <svg
      className={`colunata ${className}`.trim()}
      viewBox={`0 -1 ${total} ${altura}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      {preenchida ? (
        <path d={silhueta} fill="currentColor" />
      ) : (
        <path
          d={desenho}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {reflexo && (
        <path
          d={desenho}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.28"
          transform={`translate(0 ${chao * 2}) scale(1 -1)`}
        />
      )}
    </svg>
  );
}
