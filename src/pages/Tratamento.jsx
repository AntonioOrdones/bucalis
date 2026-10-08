import Botao from '../components/Botao.jsx';
import CartaoTratamento from '../components/CartaoTratamento.jsx';
import ChamadaFinal from '../components/ChamadaFinal.jsx';
import Etapas from '../components/Etapas.jsx';
import Icone from '../components/Icone.jsx';
import Perguntas from '../components/Perguntas.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { avisoClinico } from '../data/conteudo.js';
import { profissionaisDe } from '../data/equipe.js';
import { encontrarTratamento } from '../data/tratamentos.js';
import { schemaPaginaTratamento, schemaPerguntas, schemaTrilha } from '../lib/seo.js';
import { linkTelefone, linkWhatsApp, mensagemTratamento } from '../lib/whatsapp.js';

function trilhaDe(t) {
  return [
    { nome: 'Início', caminho: '/' },
    { nome: 'Tratamentos', caminho: '/tratamentos/' },
    { nome: t.nome, caminho: `/tratamentos/${t.slug}/` },
  ];
}

export function meta({ slug }) {
  const t = encontrarTratamento(slug);
  return {
    titulo: `${t.nomeCompleto ?? t.nome} em Brasília`,
    descricao: t.descricaoSeo,
    caminho: `/tratamentos/${t.slug}/`,
    jsonLd: [schemaPaginaTratamento(t), schemaTrilha(trilhaDe(t)), schemaPerguntas(t.faq)],
  };
}

export default function Tratamento({ params }) {
  const t = encontrarTratamento(params.slug);
  const mensagem = t.mensagemWhatsApp ?? mensagemTratamento(t);
  const profissionais = profissionaisDe(t.slug);
  const relacionados = t.relacionados.map(encontrarTratamento).filter(Boolean);

  return (
    <>
      <TopoPagina
        trilha={trilhaDe(t)}
        titulo={t.nomeCompleto ?? t.nome}
        apoio={t.resumo}
        visual={<ArcoTopo icone={t.icone} semente={t.slug.length * 131} />}
      >
        <Botao para={linkWhatsApp(mensagem)} externo icone="whatsapp" data-evento="whatsapp_tratamento">
          Agendar avaliação
        </Botao>
        <Botao para="#perguntas-tratamento" variante="texto">
          Perguntas frequentes
        </Botao>
      </TopoPagina>

      <div className="secao">
        <div className="conteiner tratamento__grade">
          <article className="tratamento__conteudo">
            <div className="tratamento__introducao">
              {t.introducao.map((paragrafo) => (
                <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
              ))}
            </div>

            <section className="tratamento__bloco" aria-labelledby="indicacoes-titulo">
              <h2 id="indicacoes-titulo">Quando é indicado</h2>
              <ul className="lista-marcada">
                {t.indicacoes.map((item) => (
                  <li key={item}>
                    <Icone nome="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="tratamento__bloco" aria-labelledby="etapas-titulo">
              <h2 id="etapas-titulo">Como funciona</h2>
              <Etapas itens={t.etapas} vertical />
            </section>

            <p className="aviso-clinico">
              <Icone nome="prevencao" />
              <span>{avisoClinico}</span>
            </p>
          </article>

          <aside className="lateral" aria-label="Agendamento e equipe">
            <div className="lateral__cartao lateral__cartao--escuro tema-escuro">
              <h2>Agende sua avaliação</h2>
              <p>Conte o que você sente ou precisa. A nossa equipe responde com os horários disponíveis.</p>
              <Botao
                variante="bronze"
                para={linkWhatsApp(mensagem)}
                externo
                icone="whatsapp"
                data-evento="whatsapp_tratamento_lateral"
              >
                Agendar pelo WhatsApp
              </Botao>
              <Botao variante="claro" para={linkTelefone()} icone="telefone">
                {clinica.contato.telefoneExibicao}
              </Botao>
            </div>

            {profissionais.length > 0 && (
              <div className="lateral__cartao">
                <h2>Quem atende</h2>
                <ul className="lateral__lista">
                  {profissionais.map((p, i) => (
                    <li key={`${p.nome}-${i}`}>
                      <strong>{p.nome}</strong>
                      <span>
                        {p.titulo}. {p.cro}
                      </span>
                    </li>
                  ))}
                </ul>
                <Botao variante="texto" para="/clinica/#equipe">
                  Conhecer a equipe
                </Botao>
              </div>
            )}

            <div className="lateral__cartao">
              <h2>Convênios</h2>
              <p>Atendemos diversos planos e também de forma particular.</p>
              <Botao variante="contorno" para="/convenios/" tamanho="pequeno">
                Ver convênios aceitos
              </Botao>
            </div>
          </aside>
        </div>
      </div>

      <section className="secao secao--marmore" id="perguntas-tratamento" aria-labelledby="perguntas-titulo">
        <div className="conteiner perguntas-secao">
          <div className="secao__cabeca">
            <h2 id="perguntas-titulo" className="secao__titulo">
              Dúvidas sobre {t.nomeNaFrase ?? t.nome.toLowerCase()}
            </h2>
            <p className="secao__apoio">
              As respostas são gerais. Na avaliação, conversamos sobre o seu caso.
            </p>
          </div>
          <Perguntas itens={t.faq} />
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="secao" aria-labelledby="relacionados-titulo">
          <div className="conteiner">
            <div className="secao__cabeca">
              <h2 id="relacionados-titulo" className="secao__titulo">
                Tratamentos relacionados
              </h2>
            </div>
            <ul className="cartoes-tratamento">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <CartaoTratamento tratamento={r} nivelTitulo={3} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ChamadaFinal
        titulo="Vamos cuidar do seu sorriso?"
        texto={`Agende uma avaliação de ${t.nomeNaFrase ?? t.nome.toLowerCase()} pelo WhatsApp: a nossa equipe responde com os horários disponíveis.`}
        mensagem={mensagem}
      />
    </>
  );
}
