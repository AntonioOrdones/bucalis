import BuscaConvenios from '../components/BuscaConvenios.jsx';
import ChamadaFinal from '../components/ChamadaFinal.jsx';
import Etapas from '../components/Etapas.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { convenios } from '../data/convenios.js';
import { schemaTrilha } from '../lib/seo.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Convênios', caminho: '/convenios/' },
];

const passos = [
  {
    titulo: 'Confira a lista',
    texto: 'Procure o seu plano na busca ao lado. Se não encontrar, pergunte: a lista pode ter novidades.',
  },
  {
    titulo: 'Agende informando o plano',
    texto: 'Ao marcar a consulta, diga o nome do convênio e o tipo de plano que aparece na carteirinha.',
  },
  {
    titulo: 'Traga os documentos',
    texto: 'No dia, apresente a carteirinha do convênio e um documento oficial com foto.',
  },
  {
    titulo: 'Autorizações',
    texto:
      'Alguns procedimentos exigem autorização prévia do plano. A nossa equipe orienta você nesse pedido.',
  },
];

export function meta() {
  return {
    titulo: 'Convênios atendidos',
    descricao: `Veja os convênios odontológicos e planos de saúde atendidos pela ${clinica.nome}, em Brasília, e como funciona o atendimento.`,
    caminho: '/convenios/',
    jsonLd: [schemaTrilha(trilha)],
  };
}

export default function Convenios() {
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Convênios"
        apoio={`Atendemos ${convenios.length} planos odontológicos e de saúde, além do atendimento particular.`}
        visual={<ArcoTopo icone="check" semente={1967} />}
      />

      <section className="secao" aria-label="Busca de convênios e orientações">
        <div className="conteiner duas-colunas">
          <div className="convenios-pagina__busca">
            <BuscaConvenios />
          </div>
          <div>
            <div className="secao__cabeca">
              <h2 className="secao__titulo">Como funciona</h2>
            </div>
            <Etapas itens={passos} vertical />
          </div>
        </div>
      </section>

      <section className="secao secao--marmore" aria-labelledby="particular-titulo">
        <div className="conteiner duas-colunas">
          <div className="secao__cabeca">
            <h2 id="particular-titulo" className="secao__titulo">
              Atendimento particular
            </h2>
          </div>
          <div className="texto-corrido">
            <p>
              Se o seu plano não estiver na lista — ou se você preferir —, o atendimento também pode ser
              particular. Depois da avaliação, você recebe o plano de tratamento com as opções indicadas para
              o seu caso.
            </p>
            <p>
              Para reembolso pelo seu plano de saúde, solicite à recepção a documentação necessária: as regras
              de cada operadora variam.
            </p>
          </div>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
