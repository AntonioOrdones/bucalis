import { clinica } from '../data/clinica.js';
import { asset } from '../lib/url.js';
import Botao from './Botao.jsx';

/** Apresentação institucional da Bucalis, sem números não confirmados. */
export default function SobreClinica() {
  return (
    <section className="secao sobre" aria-labelledby="sobre-titulo">
      <div className="conteiner sobre__grade">
        <div className="sobre__texto">
          <p className="galeria-espaco__sobretitulo">Cuidado que começa na escuta</p>
          <h2 id="sobre-titulo" className="secao__titulo">
            Conhecimento especializado. Olhar integrado.
          </h2>
          <p className="secao__apoio">
            A Bucalis reúne experiência clínica, planejamento e atenção
            individualizada para compreender a saúde bucal de cada pessoa.
          </p>
          <p>
            Mais do que tratar dentes, cuidamos de histórias, necessidades e pessoas.
            Nossa forma de trabalhar começa pela escuta, passa pelo diagnóstico
            e reúne os conhecimentos necessários para orientar cada decisão.
          </p>
          <p>
            Escutar. Diagnosticar. Planejar. Cuidar.
            Essa é a nossa forma de fazer Odontologia.
          </p>
          <div className="grupo-botoes">
            <Botao variante="contorno" para="/clinica/" iconeFinal="seta">
              Conheça a Bucalis
            </Botao>
          </div>
        </div>
        <figure className="sobre__visual">
          <div className="arco sobre__arco">
            <img
              src={asset(clinica.fotoClinica)}
              alt={clinica.textoAlternativoFotoClinica}
              loading="lazy"
              decoding="async"
              width="1280"
              height="853"
            />
          </div>
          <figcaption className="sobre__legenda">
            Conversa, avaliação e planejamento fazem parte do cuidado.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
