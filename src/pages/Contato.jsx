import FormularioAgendamento from '../components/FormularioAgendamento.jsx';
import Horarios from '../components/Horarios.jsx';
import Icone from '../components/Icone.jsx';
import Localizacao from '../components/Localizacao.jsx';
import Perguntas from '../components/Perguntas.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { perguntasFrequentes } from '../data/faq.js';
import { schemaClinica, schemaTrilha } from '../lib/seo.js';
import { linkTelefone, linkWhatsApp } from '../lib/whatsapp.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Agendamento e contato', caminho: '/contato/' },
];

export function meta() {
  return {
    titulo: 'Agendamento e contato',
    descricao: `Agende sua avaliação na ${clinica.nome} pelo WhatsApp ou por telefone. Endereço, horários e como chegar à clínica, na Asa Sul.`,
    caminho: '/contato/',
    jsonLd: [schemaClinica(), schemaTrilha(trilha)],
  };
}

export default function Contato() {
  const { contato, redes } = clinica;
  const canais = [
    {
      icone: 'whatsapp',
      titulo: 'WhatsApp',
      valor: contato.whatsappExibicao,
      para: linkWhatsApp(),
      externo: true,
    },
    {
      icone: 'telefone',
      titulo: 'Telefone',
      valor: contato.telefoneExibicao,
      para: linkTelefone(),
    },
    {
      icone: 'email',
      titulo: 'E-mail',
      valor: contato.email,
      para: `mailto:${contato.email}`,
    },
    redes.instagram && {
      icone: 'instagram',
      titulo: 'Instagram',
      valor: `@${redes.instagram}`,
      para: `https://www.instagram.com/${redes.instagram}/`,
      externo: true,
    },
  ].filter(Boolean);

  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Agende sua avaliação"
        apoio="Escolha o canal mais prático para você. A nossa equipe responde com os horários disponíveis."
        visual={<ArcoTopo icone="calendario" semente={1961} />}
      />

      <section className="secao" aria-label="Formulário e canais de atendimento">
        <div className="conteiner contato__grade">
          <FormularioAgendamento />

          <div className="contato__canais">
            <h2 className="contato__titulo">Outros canais</h2>
            <ul className="canais">
              {canais.map((canal) => (
                <li key={canal.titulo}>
                  <a
                    className="canal"
                    href={canal.para}
                    {...(canal.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="canal__icone">
                      <Icone nome={canal.icone} />
                    </span>
                    <span>
                      <span className="canal__titulo">{canal.titulo}</span>
                      <span className="canal__valor">{canal.valor}</span>
                    </span>
                    {canal.externo && <span className="visualmente-oculto"> (abre em nova aba)</span>}
                  </a>
                </li>
              ))}
            </ul>
            <div className="contato__horarios">
              <h2 className="contato__titulo">Horários</h2>
              <Horarios />
              <p className="contato__observacao">{clinica.observacaoHorario}</p>
            </div>
          </div>
        </div>
      </section>

      <Localizacao titulo="Como chegar" />

      <section className="secao secao--marmore" aria-labelledby="perguntas-contato-titulo">
        <div className="conteiner perguntas-secao">
          <div className="secao__cabeca">
            <h2 id="perguntas-contato-titulo" className="secao__titulo">
              Antes de vir
            </h2>
            <p className="secao__apoio">Respostas rápidas para as dúvidas mais comuns sobre o atendimento.</p>
          </div>
          <Perguntas itens={perguntasFrequentes} />
        </div>
      </section>
    </>
  );
}
