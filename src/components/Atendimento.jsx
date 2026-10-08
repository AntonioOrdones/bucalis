import { useEffect, useId, useRef, useState } from 'react';
import { clinica } from '../data/clinica.js';
import { tratamentos } from '../data/tratamentos.js';
import { href } from '../lib/url.js';
import { linkTelefone, linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Horarios from './Horarios.jsx';
import Icone from './Icone.jsx';
import { Simbolo } from './Marca.jsx';

const PERIODOS = ['Manhã', 'Tarde', 'Qualquer horário'];

const OPCOES_TRATAMENTO = [
  ...tratamentos.map((t) => ({
    valor: t.slug,
    rotulo: t.nome,
    frase: t.nomeNaFrase ?? t.nome.toLowerCase(),
  })),
  { valor: 'nao-sei', rotulo: 'Ainda não sei', frase: '' },
];

function mensagem({ tratamento, periodo }) {
  const opcao = OPCOES_TRATAMENTO.find((o) => o.valor === tratamento);
  let texto = 'Olá! Vim pelo site e gostaria de agendar uma avaliação';
  texto += opcao?.frase ? ` de ${opcao.frase}.` : '.';
  if (periodo) texto += ` Melhor período: ${periodo.toLowerCase()}.`;
  return texto;
}

/**
 * Atendimento rápido: botão flutuante do WhatsApp que abre um pequeno painel
 * com atalhos (agendar, horários, convênios, telefone). Tudo termina no
 * WhatsApp ou em uma página do site — nenhum dado é enviado ou guardado aqui.
 */
export default function Atendimento() {
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState('inicio');
  const [escolha, setEscolha] = useState({ tratamento: '', periodo: '' });
  const painel = useRef(null);
  const botao = useRef(null);
  const tituloId = useId();
  const painelId = useId();

  useEffect(() => {
    if (!aberto) return undefined;
    painel.current?.querySelector('[data-foco-inicial]')?.focus();
    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [aberto, etapa]);

  const alternar = () => {
    setAberto((v) => !v);
    setEtapa('inicio');
  };

  return (
    <div className="atendimento">
      <section
        ref={painel}
        id={painelId}
        className="atendimento__painel"
        aria-labelledby={tituloId}
        hidden={!aberto}
      >
        <div className="atendimento__topo">
          <Simbolo className="atendimento__simbolo" />
          <div>
            <h2
              id={tituloId}
              className="atendimento__titulo"
              tabIndex={-1}
              data-foco-inicial={etapa === 'inicio' ? '' : undefined}
            >
              Atendimento {clinica.nomeCurto}
            </h2>
            <p className="atendimento__sub">Respondemos pelo WhatsApp no horário de funcionamento.</p>
          </div>
          <button type="button" className="atendimento__fechar" onClick={() => setAberto(false)}>
            <Icone nome="fechar" />
            <span className="visualmente-oculto">Fechar atendimento</span>
          </button>
        </div>

        {etapa === 'inicio' && (
          <div className="atendimento__corpo">
            <p className="atendimento__balao">Olá! Como podemos ajudar?</p>
            <ul className="atendimento__opcoes">
              <li>
                <button type="button" onClick={() => setEtapa('agendar')}>
                  <Icone nome="calendario" />
                  Agendar uma avaliação
                </button>
              </li>
              <li>
                <button type="button" onClick={() => setEtapa('horarios')}>
                  <Icone nome="relogio" />
                  Horários e endereço
                </button>
              </li>
              <li>
                <a href={href('/convenios/')}>
                  <Icone nome="check" />
                  Convênios atendidos
                </a>
              </li>
              <li>
                <a href={linkTelefone()}>
                  <Icone nome="telefone" />
                  Ligar para {clinica.contato.telefoneExibicao}
                </a>
              </li>
            </ul>
            <Botao
              para={linkWhatsApp()}
              externo
              icone="whatsapp"
              variante="whatsapp"
              className="atendimento__principal"
              data-evento="whatsapp_atendimento"
            >
              Conversar no WhatsApp
            </Botao>
          </div>
        )}

        {etapa === 'agendar' && (
          <div className="atendimento__corpo">
            <fieldset className="atendimento__grupo">
              <legend data-foco-inicial tabIndex={-1}>
                Qual tratamento você procura?
              </legend>
              <div className="atendimento__fichas">
                {OPCOES_TRATAMENTO.map((opcao) => (
                  <label key={opcao.valor} className="ficha">
                    <input
                      type="radio"
                      name="atendimento-tratamento"
                      value={opcao.valor}
                      checked={escolha.tratamento === opcao.valor}
                      onChange={() => setEscolha((e) => ({ ...e, tratamento: opcao.valor }))}
                    />
                    <span>{opcao.rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="atendimento__grupo">
              <legend>Qual o melhor período?</legend>
              <div className="atendimento__fichas">
                {PERIODOS.map((periodo) => (
                  <label key={periodo} className="ficha">
                    <input
                      type="radio"
                      name="atendimento-periodo"
                      value={periodo}
                      checked={escolha.periodo === periodo}
                      onChange={() => setEscolha((e) => ({ ...e, periodo }))}
                    />
                    <span>{periodo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Botao
              para={linkWhatsApp(mensagem(escolha))}
              externo
              icone="whatsapp"
              variante="whatsapp"
              className="atendimento__principal"
              data-evento="whatsapp_agendamento_rapido"
            >
              Enviar pelo WhatsApp
            </Botao>
            <button type="button" className="atendimento__voltar" onClick={() => setEtapa('inicio')}>
              Voltar
            </button>
          </div>
        )}

        {etapa === 'horarios' && (
          <div className="atendimento__corpo">
            <p className="atendimento__balao" data-foco-inicial tabIndex={-1}>
              {clinica.endereco.logradouro}, {clinica.endereco.bairro}, {clinica.endereco.cidade}.
            </p>
            <Horarios compacto />
            <Botao
              para={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinica.mapa.consulta)}`}
              externo
              variante="contorno"
              icone="local"
              className="atendimento__principal"
            >
              Como chegar
            </Botao>
            <button type="button" className="atendimento__voltar" onClick={() => setEtapa('inicio')}>
              Voltar
            </button>
          </div>
        )}
      </section>

      <button
        ref={botao}
        type="button"
        className="atendimento__botao"
        aria-expanded={aberto}
        aria-controls={painelId}
        onClick={alternar}
      >
        <Icone nome={aberto ? 'fechar' : 'whatsapp'} tamanho={28} />
        <span className="visualmente-oculto">
          {aberto ? 'Fechar atendimento' : 'Atendimento pelo WhatsApp'}
        </span>
      </button>
    </div>
  );
}
