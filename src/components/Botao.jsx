import { href } from '../lib/url.js';
import Icone from './Icone.jsx';

/**
 * Botão ou link com aparência de botão.
 * - `para`: vira <a>. Caminhos internos ("/contato/") recebem o caminho-base.
 * - `externo`: abre em nova aba, com aviso para leitores de tela.
 * - variantes: primario (cacau), bronze (metálico), contorno, claro, texto.
 */
export default function Botao({
  para,
  externo = false,
  variante = 'primario',
  tamanho = 'medio',
  icone,
  iconeFinal,
  className = '',
  children,
  ...props
}) {
  const classes = `botao botao--${variante} botao--${tamanho} ${className}`.trim();
  const conteudo = (
    <>
      {icone && <Icone nome={icone} className="botao__icone" />}
      <span className="botao__rotulo">{children}</span>
      {iconeFinal && <Icone nome={iconeFinal} className="botao__icone botao__icone--final" />}
      {externo && <span className="visualmente-oculto"> (abre em nova aba)</span>}
    </>
  );

  if (para) {
    const alvo = externo ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a className={classes} href={href(para)} {...alvo} {...props}>
        {conteudo}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {conteudo}
    </button>
  );
}
