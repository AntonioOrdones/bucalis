import { clinica } from '../data/clinica.js';

/**
 * Símbolo da marca: um dente desenhado como um trecho da colunata do
 * Palácio da Alvorada — a laje no alto, as colunas que afinam até tocar o
 * chão e o arco entre elas. (Marca provisória: troque à vontade.)
 */
export const CAMINHO_SIMBOLO =
  'M4 9H44C40 12 38.6 18 37.6 26 36.8 32 36 37 35 42 32.5 31 29.5 22 24 22 18.5 22 15.5 31 13 42 12 37 11.2 32 10.4 26 9.4 18 8 12 4 9Z';

export function Simbolo({ className = '', preenchido = false, ...props }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
      <path
        d={CAMINHO_SIMBOLO}
        fill={preenchido ? 'currentColor' : 'none'}
        stroke={preenchido ? 'none' : 'currentColor'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Marca completa: símbolo + nome. `vertical` é usada na fachada da home. */
export default function Marca({ variante = 'horizontal', className = '' }) {
  return (
    <span className={`marca marca--${variante} ${className}`.trim()}>
      <Simbolo className="marca__simbolo" />
      <span className="marca__texto">
        <span className="marca__nome">{clinica.nomeCurto}</span>
        <span className="marca__complemento">{clinica.complementoMarca}</span>
      </span>
    </span>
  );
}
