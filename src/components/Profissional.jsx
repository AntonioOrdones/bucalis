import { sementeDeTexto } from '../lib/aleatorio.js';
import { iniciais, rotuloResponsavelTecnico } from '../lib/texto.js';
import { asset } from '../lib/url.js';
import Azulejos from './Azulejos.jsx';
import Icone from './Icone.jsx';

/** Retrato em arco: a foto do profissional ou um monograma sobre azulejos. */
function Retrato({ pessoa, indice }) {
  if (pessoa.foto) {
    return (
      <img
        src={asset(pessoa.foto)}
        alt={`Retrato de ${pessoa.nome}`}
        loading="lazy"
        decoding="async"
        width="600"
        height="800"
      />
    );
  }
  return (
    <div className="retrato-vazio">
      <Azulejos
        colunas={2}
        linhas={3}
        semente={sementeDeTexto(pessoa.nome) + indice * 97}
        paleta="bronze"
        preencher
      />
      <span className="retrato-vazio__iniciais" aria-hidden="true">
        {iniciais(pessoa.nome)}
      </span>
    </div>
  );
}

export default function Profissional({ pessoa, indice = 0, nivelTitulo = 3 }) {
  const Titulo = `h${nivelTitulo}`;
  return (
    <article className="profissional">
      <div className="arco profissional__retrato">
        <Retrato pessoa={pessoa} indice={indice} />
      </div>
      <div className="profissional__texto">
        <Titulo className="profissional__nome">{pessoa.nome}</Titulo>
        <p className="profissional__area">{pessoa.titulo}</p>
        <p className="profissional__cro">{pessoa.cro}</p>
        {pessoa.responsavelTecnico && (
          <p className="profissional__selo">{rotuloResponsavelTecnico(pessoa.nome)}</p>
        )}
        {pessoa.instagram && (
          <a
            className="profissional__instagram"
            href={`https://www.instagram.com/${pessoa.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icone nome="instagram" />
            <span className="visualmente-oculto">Instagram de {pessoa.nome} (abre em nova aba)</span>
          </a>
        )}
      </div>
    </article>
  );
}
