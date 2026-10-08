import { tratamentos } from '../data/tratamentos.js';
import { href } from '../lib/url.js';
import Botao from './Botao.jsx';
import Icone from './Icone.jsx';

const DESTAQUES = [
  'implantodontia',
  'ortodontia',
  'odontopediatria',
  'estetica-dental',
  'endodontia',
  'periodontia',
];

/**
 * Especialidades em cartões que se empilham ao rolar a página (efeito
 * inspirado na referência). Em telas pequenas, viram uma lista simples.
 */
export default function Especialidades() {
  const itens = DESTAQUES.map((slug) => tratamentos.find((t) => t.slug === slug)).filter(Boolean);

  return (
    <section
      className="secao secao--escura especialidades tema-escuro"
      aria-labelledby="especialidades-titulo"
    >
      <div className="conteiner especialidades__grade">
        <div className="especialidades__cabeca">
          <span className="pilula">Especialidades</span>
          <h2 id="especialidades-titulo" className="secao__titulo">
            Todas as especialidades em um só lugar
          </h2>
          <p className="secao__apoio">
            Da prevenção aos tratamentos mais complexos, cada caso é conduzido por um especialista — e
            discutido em equipe quando envolve mais de uma área.
          </p>
          <Botao variante="bronze" para="/tratamentos/" iconeFinal="seta">
            Ver todos os tratamentos
          </Botao>
        </div>

        <ul className="especialidades__pilha">
          {itens.map((t, i) => (
            <li key={t.slug} className="especialidade" style={{ '--indice': i }}>
              <span className="especialidade__icone">
                <Icone nome={t.icone} />
              </span>
              <h3 className="especialidade__titulo">
                <a href={href(`/tratamentos/${t.slug}/`)}>{t.nomeCompleto ?? t.nome}</a>
              </h3>
              <p>{t.resumo}</p>
              <span className="especialidade__mais" aria-hidden="true">
                Saiba mais
                <Icone nome="seta" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
