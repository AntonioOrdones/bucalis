import { href } from '../lib/url.js';
import Icone from './Icone.jsx';

/** Cartão de tratamento (página de tratamentos e "veja também"). */
export default function CartaoTratamento({ tratamento, nivelTitulo = 2 }) {
  const Titulo = `h${nivelTitulo}`;
  return (
    <article className="cartao-tratamento">
      <span className="cartao-tratamento__icone">
        <Icone nome={tratamento.icone} />
      </span>
      <Titulo className="cartao-tratamento__titulo">
        <a href={href(`/tratamentos/${tratamento.slug}/`)}>{tratamento.nomeCompleto ?? tratamento.nome}</a>
      </Titulo>
      <p>{tratamento.resumo}</p>
      <span className="cartao-tratamento__mais" aria-hidden="true">
        Saiba mais
        <Icone nome="seta" />
      </span>
    </article>
  );
}
