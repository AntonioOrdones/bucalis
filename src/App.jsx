import Atendimento from './components/Atendimento.jsx';
import Cabecalho from './components/Cabecalho.jsx';
import Consentimento from './components/Consentimento.jsx';
import Integracoes from './components/Integracoes.jsx';
import Rodape from './components/Rodape.jsx';
import { ContextoPagina } from './contexto.js';

/** Estrutura comum a todas as páginas. */
export default function App({ Pagina, params, caminho }) {
  return (
    <ContextoPagina.Provider value={{ caminho }}>
      <a className="pular-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Pagina params={params} />
      </main>
      <Rodape />
      <Atendimento />
      <Consentimento />
      <Integracoes />
    </ContextoPagina.Provider>
  );
}
