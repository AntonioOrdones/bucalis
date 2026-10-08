import Botao from '../components/Botao.jsx';
import ChamadaFinal from '../components/ChamadaFinal.jsx';
import Especialidades from '../components/Especialidades.jsx';
import Etapas from '../components/Etapas.jsx';
import Fachada from '../components/Fachada.jsx';
import Localizacao from '../components/Localizacao.jsx';
import PainelConvenios from '../components/PainelConvenios.jsx';
import Perguntas from '../components/Perguntas.jsx';
import Profissional from '../components/Profissional.jsx';
import { Avaliacoes, Instagram } from '../components/RedesSociais.jsx';
import SobreClinica from '../components/SobreClinica.jsx';
import { VideoYouTube } from '../components/Terceiros.jsx';
import { clinica } from '../data/clinica.js';
import { etapasPrimeiraConsulta } from '../data/conteudo.js';
import { equipe } from '../data/equipe.js';
import { perguntasFrequentes } from '../data/faq.js';
import { schemaClinica, schemaPerguntas, schemaSite } from '../lib/seo.js';
import { linkWhatsApp } from '../lib/whatsapp.js';

export function meta() {
  return {
    caminho: '/',
    jsonLd: [schemaClinica(), schemaSite(), schemaPerguntas(perguntasFrequentes)],
  };
}

const EQUIPE_NA_HOME = 8;

export default function Inicio() {
  const { youtubeVideoId } = clinica.integracoes;

  return (
    <>
      <Fachada />
      <SobreClinica />

      {youtubeVideoId && (
        <section className="secao secao--marmore" aria-labelledby="video-titulo">
          <div className="conteiner video-secao">
            <div className="secao__cabeca">
              <h2 id="video-titulo" className="secao__titulo">
                Conheça a clínica por dentro
              </h2>
            </div>
            <VideoYouTube id={youtubeVideoId} titulo={`Vídeo de apresentação da ${clinica.nome}`} />
          </div>
        </section>
      )}

      <Especialidades />

      <section className="secao primeira-consulta" aria-labelledby="primeira-consulta-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="primeira-consulta-titulo" className="secao__titulo">
              Como é a sua primeira consulta
            </h2>
            <p className="secao__apoio">
              Uma avaliação completa e sem pressa, para você entender o que precisa e decidir com
              tranquilidade.
            </p>
          </div>
          <Etapas itens={etapasPrimeiraConsulta} />
          <div className="grupo-botoes primeira-consulta__acoes">
            <Botao para={linkWhatsApp()} externo icone="whatsapp" data-evento="whatsapp_primeira_consulta">
              Agendar minha avaliação
            </Botao>
          </div>
        </div>
      </section>

      <section className="secao secao--marmore equipe" id="equipe" aria-labelledby="equipe-titulo">
        <div className="conteiner">
          <div className="equipe__cabeca">
            <div className="secao__cabeca">
              <h2 id="equipe-titulo" className="secao__titulo">
                Conheça nossos profissionais
              </h2>
              <p className="secao__apoio">
                Especialistas que trabalham em conjunto para planejar cada tratamento — e explicar cada etapa
                a você.
              </p>
            </div>
            {equipe.length > EQUIPE_NA_HOME && (
              <Botao variante="contorno" para="/clinica/#equipe" iconeFinal="seta">
                Ver toda a equipe
              </Botao>
            )}
          </div>
          <ul className="equipe__grade">
            {equipe.slice(0, EQUIPE_NA_HOME).map((pessoa, i) => (
              <li key={`${pessoa.nome}-${i}`}>
                <Profissional pessoa={pessoa} indice={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PainelConvenios />
      <Avaliacoes />
      <Instagram />

      <section className="secao secao--marmore" id="perguntas" aria-labelledby="perguntas-titulo">
        <div className="conteiner perguntas-secao">
          <div className="secao__cabeca">
            <h2 id="perguntas-titulo" className="secao__titulo">
              Perguntas frequentes
            </h2>
            <p className="secao__apoio">Não encontrou a sua dúvida? A nossa equipe responde pelo WhatsApp.</p>
            <Botao para={linkWhatsApp()} externo variante="contorno" icone="whatsapp">
              Tirar uma dúvida
            </Botao>
          </div>
          <Perguntas itens={perguntasFrequentes} />
        </div>
      </section>

      <Localizacao />
      <ChamadaFinal />
    </>
  );
}
