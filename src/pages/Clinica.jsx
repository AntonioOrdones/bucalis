import ChamadaFinal from '../components/ChamadaFinal.jsx';
import GaleriaEspaco from '../components/GaleriaEspaco.jsx';
import Icone from '../components/Icone.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { schemaClinica, schemaTrilha } from '../lib/seo.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'A clínica', caminho: '/clinica/' },
];
const iconesValores = ['conversa', 'equipe', 'documento', 'prevencao'];

export function meta() {
  return {
    titulo: 'A clínica, nossa equipe e os espaços',
    descricao: 'Conheça a Bucalis: um cuidado que começa na escuta e integra conhecimento especializado, planejamento e atenção individualizada. Veja nossos espaços.',
    caminho: '/clinica/',
    jsonLd: [schemaClinica(), schemaTrilha(trilha)],
  };
}

export default function Clinica() {
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Uma história construída com cuidado e confiança."
        apoio="Na Bucalis, a Odontologia especializada reúne conhecimento,
        planejamento e atenção à individualidade de cada paciente."
        visual={<ArcoTopo semente={1956} />}
      />

      <section className="secao" aria-labelledby="historia-titulo">
        <div className="conteiner duas-colunas">
          <div className="secao__cabeca">
            <p className="galeria-espaco__sobretitulo">Quem somos</p>
            <h2 id="historia-titulo" className="secao__titulo">Uma trajetória feita de pessoas.</h2>
            <p className="secao__apoio">Antes de qualquer tratamento, existe uma pessoa.</p>
          </div>
          <div className="texto-corrido">
            {clinica.historia.map((paragrafo) => (
              <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
            ))}
            <p>
              A avaliação clínica, o diagnóstico e o planejamento são etapas fundamentais
              para compreender necessidades, possibilidades e prioridades, respeitando
              o que faz sentido para cada paciente.
            </p>
          </div>
        </div>
      </section>

      <section className="secao secao--marmore" aria-labelledby="missao-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <p className="galeria-espaco__sobretitulo">Nossa essência</p>
            <h2 id="missao-titulo" className="secao__titulo">Fazer da Odontologia uma experiência de cuidado.</h2>
          </div>
          <div className="duas-colunas">
            <div className="texto-corrido">
              <h3>Missão</h3>
              <p>Oferecer Odontologia especializada, integrada e humanizada, com atenção ao
                conhecimento clínico, ao planejamento e às necessidades individuais.</p>
            </div>
            <div className="texto-corrido">
              <h3>Visão</h3>
              <p>Construir relações duradouras de confiança por meio do cuidado atento,
                da integração entre especialidades e da melhoria contínua.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="valores-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="valores-titulo" className="secao__titulo">O que nos guia</h2>
            <p className="secao__apoio">Escuta, conhecimento, precisão, integração, humanização e ética.</p>
          </div>
          <ul className="grade-itens">
            {clinica.valores.map((valor, i) => (
              <li key={valor.titulo} className="item-icone">
                <span className="item-icone__icone" aria-hidden="true">
                  <Icone nome={iconesValores[i % iconesValores.length]} />
                </span>
                <h3>{valor.titulo}</h3>
                <p>{valor.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GaleriaEspaco id="espaco" />

      <section className="secao equipe" id="equipe" aria-labelledby="equipe-titulo">
        <div className="conteiner duas-colunas">
          <div className="secao__cabeca">
            <p className="galeria-espaco__sobretitulo">Corpo clínico</p>
            <h2 id="equipe-titulo" className="secao__titulo">Pessoas por trás de cada cuidado.</h2>
          </div>
          <div className="texto-corrido">
            <p>
              Cada profissional contribui com seu conhecimento e seu olhar clínico.
              A proposta da Bucalis é integrar diferentes áreas da Odontologia
              quando isso beneficia o planejamento do atendimento.
            </p>
            <p>
              Os nomes, especialidades e registros profissionais serão
              incluídos nesta página após a conferência dos dados oficiais.
            </p>
          </div>
        </div>
      </section>

      <ChamadaFinal
        titulo="Seu cuidado começa com uma conversa."
        texto="Nossa equipe está disponível para ouvir suas necessidades e orientar o primeiro passo."
      />
    </>
  );
}
