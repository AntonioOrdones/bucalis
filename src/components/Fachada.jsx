import { clinica } from '../data/clinica.js';
import { asset } from '../lib/url.js';
import { linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Marca from './Marca.jsx';

/** Hero com fotografia real da recepção Bucalis enviada pela clínica. */
export default function Fachada() {
  return (
    <section className="fachada tema-escuro" aria-labelledby="fachada-titulo">
      <div className="fachada__parede" aria-hidden="true">
        <img className="fachada__foto" src={asset(clinica.fotoFachada)} alt="" fetchPriority="high" />
        <div className="fachada__luzes" />
      </div>
      <div className="fachada__conteudo conteiner">
        <div className="fachada__letreiro" aria-hidden="true">
          <Marca variante="vertical" />
        </div>
        <p className="fachada__destaque">Odontologia especializada em Brasília</p>
        <h1 id="fachada-titulo" className="fachada__titulo">
          Odontologia especializada para cuidar de você por inteiro.
        </h1>
        <p className="fachada__apoio">
          Na Bucalis, cada tratamento começa na escuta, no diagnóstico e no planejamento.
          Integramos diferentes conhecimentos para construir cuidados individualizados
          para a saúde, a função e a estética do sorriso.
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
            Agende sua avaliação
          </Botao>
          <Botao variante="claro" tamanho="grande" para="/clinica/">
            Conheça a Bucalis
          </Botao>
        </div>
      </div>
    </section>
  );
}
