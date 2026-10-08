import { clinica } from '../data/clinica.js';
import { linkTelefone } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Horarios from './Horarios.jsx';
import Icone from './Icone.jsx';
import Mapa, { linkComoChegar } from './Mapa.jsx';

const { endereco, contato } = clinica;

export default function Localizacao({ titulo = 'No coração de Brasília', nivelTitulo = 2 }) {
  const Titulo = `h${nivelTitulo}`;
  return (
    <section className="secao localizacao" id="localizacao" aria-labelledby="localizacao-titulo">
      <div className="conteiner localizacao__grade">
        <div className="localizacao__texto">
          <Titulo id="localizacao-titulo" className="secao__titulo">
            {titulo}
          </Titulo>
          <address className="localizacao__endereco">
            <Icone nome="local" />
            <span>
              {endereco.logradouro}
              {endereco.complemento && (
                <>
                  <br />
                  {endereco.complemento}
                </>
              )}
              <br />
              {endereco.bairro}, {endereco.cidade} – {endereco.uf}
              <br />
              CEP {endereco.cep}
            </span>
          </address>
          {endereco.comoChegar && <p className="localizacao__dica">{endereco.comoChegar}</p>}
          <Horarios />
          <div className="grupo-botoes">
            <Botao para={linkComoChegar} externo icone="local">
              Como chegar
            </Botao>
            <Botao para={linkTelefone()} variante="contorno" icone="telefone">
              {contato.telefoneExibicao}
            </Botao>
          </div>
        </div>
        <Mapa />
      </div>
    </section>
  );
}
