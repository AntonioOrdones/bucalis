import { clinica } from '../data/clinica.js';
import { asset } from '../lib/url.js';
import { linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Colunata from './Colunata.jsx';
import Marca from './Marca.jsx';

/**
 * Abertura da home: uma parede ripada de jacarandá com o letreiro da clínica
 * aceso — como a recepção que inspira a referência. As luzes "acendem" uma
 * única vez ao carregar. Com `clinica.fotoFachada` definido, a foto real
 * substitui a parede desenhada.
 */
export default function Fachada() {
  return (
    <section className="fachada tema-escuro" aria-labelledby="fachada-titulo">
      <div className="fachada__parede" aria-hidden="true">
        {clinica.fotoFachada ? (
          <img
            className="fachada__foto"
            src={asset(clinica.fotoFachada)}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <div className="fachada__ripas" />
        )}
        <div className="fachada__luzes" />
        <div className="fachada__halo" />
      </div>

      <div className="fachada__conteudo conteiner">
        <div className="fachada__letreiro" aria-hidden="true">
          <Marca variante="vertical" />
        </div>

        <h1 id="fachada-titulo" className="fachada__titulo">
          Clínica odontológica completa no coração de Brasília
        </h1>
        <p className="fachada__apoio">
          Especialistas em todas as áreas da odontologia, com tempo para ouvir você e planejar cada etapa do
          tratamento.
        </p>
        <div className="grupo-botoes fachada__acoes">
          <Botao
            variante="bronze"
            tamanho="grande"
            icone="whatsapp"
            para={linkWhatsApp()}
            externo
            data-evento="whatsapp_fachada"
          >
            Agendar avaliação
          </Botao>
          <Botao variante="claro" tamanho="grande" para="/tratamentos/">
            Conhecer os tratamentos
          </Botao>
        </div>
      </div>

      <Colunata colunas={12} reflexo={false} className="fachada__colunata" />
    </section>
  );
}
