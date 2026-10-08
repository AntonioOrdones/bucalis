import { href } from '../lib/url.js';
import Azulejos from './Azulejos.jsx';
import Icone from './Icone.jsx';

/** Trilha de navegação ("Início › Tratamentos › Implantodontia"). */
export function Trilha({ itens }) {
  return (
    <nav className="trilha" aria-label="Você está em">
      <ol>
        {itens.map((item, i) => (
          <li key={item.caminho}>
            {i < itens.length - 1 ? (
              <a href={href(item.caminho)}>{item.nome}</a>
            ) : (
              <span aria-current="page">{item.nome}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Arco decorativo do topo: azulejos ou o ícone de um tratamento. */
export function ArcoTopo({ icone, semente = 1970 }) {
  return (
    <div className="arco arco-topo">
      <Azulejos colunas={3} linhas={4} semente={semente} paleta={icone ? 'bronze' : 'misto'} preencher />
      {icone && (
        <span className="arco-topo__icone">
          <Icone nome={icone} />
        </span>
      )}
    </div>
  );
}

/** Cabeçalho das páginas internas. */
export default function TopoPagina({ trilha, titulo, apoio, visual, children }) {
  return (
    <header className="topo-pagina">
      <div className="conteiner topo-pagina__grade">
        <div className="topo-pagina__texto">
          {trilha && <Trilha itens={trilha} />}
          <h1 className="topo-pagina__titulo">{titulo}</h1>
          {apoio && <p className="topo-pagina__apoio">{apoio}</p>}
          {children && <div className="grupo-botoes topo-pagina__acoes">{children}</div>}
        </div>
        {visual && (
          <div className="topo-pagina__visual" aria-hidden="true">
            {visual}
          </div>
        )}
      </div>
    </header>
  );
}
