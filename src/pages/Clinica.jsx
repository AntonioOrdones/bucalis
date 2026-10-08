import Azulejos from '../components/Azulejos.jsx';
import ChamadaFinal from '../components/ChamadaFinal.jsx';
import Colunata from '../components/Colunata.jsx';
import Icone from '../components/Icone.jsx';
import Profissional from '../components/Profissional.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { anosDeExperiencia, clinica } from '../data/clinica.js';
import { equipe } from '../data/equipe.js';
import { schemaClinica, schemaTrilha } from '../lib/seo.js';
import { rotuloResponsavelTecnico } from '../lib/texto.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'A clínica', caminho: '/clinica/' },
];

const ICONES_VALORES = ['conversa', 'equipe', 'documento', 'prevencao'];

export function meta() {
  return {
    titulo: 'A clínica e a equipe',
    descricao: `Conheça a história, a estrutura e os especialistas da ${clinica.nome}, clínica odontológica na Asa Sul, em Brasília.`,
    caminho: '/clinica/',
    jsonLd: [schemaClinica(), schemaTrilha(trilha)],
  };
}

export default function Clinica() {
  const { legal } = clinica;
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="A clínica"
        apoio={`Há ${anosDeExperiencia} anos reunimos especialistas de todas as áreas da odontologia em um só endereço, no coração de Brasília.`}
        visual={<ArcoTopo semente={1956} />}
      />

      <section className="secao" aria-labelledby="historia-titulo">
        <div className="conteiner duas-colunas">
          <div className="secao__cabeca">
            <h2 id="historia-titulo" className="secao__titulo">
              Nossa história
            </h2>
          </div>
          <div className="texto-corrido">
            {clinica.historia.map((paragrafo) => (
              <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="secao secao--marmore" aria-labelledby="valores-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="valores-titulo" className="secao__titulo">
              O que nos guia
            </h2>
          </div>
          <ul className="grade-itens">
            {clinica.valores.map((valor, i) => (
              <li key={valor.titulo} className="item-icone">
                <span className="item-icone__icone">
                  <Icone nome={ICONES_VALORES[i % ICONES_VALORES.length]} />
                </span>
                <h3>{valor.titulo}</h3>
                <p>{valor.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao" aria-labelledby="estrutura-titulo">
        <div className="conteiner duas-colunas">
          <div className="secao__cabeca">
            <h2 id="estrutura-titulo" className="secao__titulo">
              Estrutura
            </h2>
            <p className="secao__apoio">
              {clinica.consultorios} consultórios e um ambiente pensado para o conforto de pacientes e
              acompanhantes.
            </p>
          </div>
          <ul className="lista-estrutura">
            {clinica.estrutura.map((item) => (
              <li key={item}>
                <Icone nome="check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--marmore equipe" id="equipe" aria-labelledby="equipe-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="equipe-titulo" className="secao__titulo">
              Nossa equipe
            </h2>
            <p className="secao__apoio">
              Cirurgiões-dentistas inscritos no Conselho Regional de Odontologia do Distrito Federal (CRO-DF).
            </p>
          </div>
          <ul className="equipe__grade">
            {equipe.map((pessoa, i) => (
              <li key={`${pessoa.nome}-${i}`}>
                <Profissional pessoa={pessoa} indice={i} />
              </li>
            ))}
          </ul>
          <div className="registro equipe__registro">
            <p>
              <strong>{rotuloResponsavelTecnico(legal.responsavelTecnico.nome)}:</strong>{' '}
              {legal.responsavelTecnico.nome}, {legal.responsavelTecnico.cro}.
            </p>
            <p>
              {legal.razaoSocial}, CNPJ {legal.cnpj}, inscrição {legal.inscricaoCro}.
            </p>
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="brasilia-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="brasilia-titulo" className="secao__titulo">
              Brasília em cada detalhe
            </h2>
            <p className="secao__apoio">
              A identidade da clínica presta três homenagens discretas à cidade onde nasceu.
            </p>
          </div>
          <ul className="homenagens">
            <li className="homenagem">
              <div className="homenagem__figura" aria-hidden="true">
                <Colunata colunas={5} preenchida />
              </div>
              <h3>As curvas de Niemeyer</h3>
              <p>
                O símbolo da marca é um dente desenhado como um trecho da colunata do Palácio da Alvorada, e
                os arcos que emolduram as imagens ecoam a leveza das curvas de Oscar Niemeyer.
              </p>
            </li>
            <li className="homenagem">
              <div className="homenagem__figura" aria-hidden="true">
                <Azulejos colunas={4} linhas={2} semente={1962} paleta="misto" />
              </div>
              <h3>Os azulejos de Athos Bulcão</h3>
              <p>
                Nossos azulejos usam poucos módulos assentados em posições livres — o método com que Athos
                Bulcão espalhou cor e ritmo pelos prédios da cidade.
              </p>
            </li>
            <li className="homenagem">
              <div className="homenagem__figura" aria-hidden="true">
                <span className="homenagem__bronze" />
              </div>
              <h3>O bronze de Ceschiatti</h3>
              <p>
                O tom bronze dos botões e detalhes lembra as esculturas de Alfredo Ceschiatti, como as Iaras
                do espelho d’água do Palácio da Alvorada.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
