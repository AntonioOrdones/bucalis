import Botao from '../components/Botao.jsx';
import CartaoTratamento from '../components/CartaoTratamento.jsx';
import ChamadaFinal from '../components/ChamadaFinal.jsx';
import Etapas from '../components/Etapas.jsx';
import TopoPagina, { ArcoTopo } from '../components/TopoPagina.jsx';
import { etapasPrimeiraConsulta } from '../data/conteudo.js';
import { tratamentos } from '../data/tratamentos.js';
import { schemaTrilha } from '../lib/seo.js';
import { linkWhatsApp } from '../lib/whatsapp.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Tratamentos', caminho: '/tratamentos/' },
];

export function meta() {
  return {
    titulo: 'Tratamentos odontológicos',
    descricao:
      'Implantes, ortodontia, estética, tratamento de canal, odontopediatria e mais: conheça os tratamentos da clínica, em Brasília.',
    caminho: '/tratamentos/',
    jsonLd: [schemaTrilha(trilha)],
  };
}

export default function Tratamentos() {
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Tratamentos"
        apoio="Conheça as especialidades da clínica, quando cada tratamento é indicado e como ele acontece na prática."
        visual={<ArcoTopo semente={1964} />}
      />

      <section className="secao" aria-label="Lista de tratamentos">
        <div className="conteiner">
          <ul className="cartoes-tratamento">
            {tratamentos.map((t) => (
              <li key={t.slug}>
                <CartaoTratamento tratamento={t} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="secao secao--marmore" aria-labelledby="comeco-titulo">
        <div className="conteiner">
          <div className="secao__cabeca">
            <h2 id="comeco-titulo" className="secao__titulo">
              Não sabe por onde começar?
            </h2>
            <p className="secao__apoio">
              Comece pela avaliação. Depois de entender o seu caso, indicamos o tratamento e o especialista
              certos.
            </p>
          </div>
          <Etapas itens={etapasPrimeiraConsulta} />
          <div className="grupo-botoes primeira-consulta__acoes">
            <Botao para={linkWhatsApp()} externo icone="whatsapp">
              Agendar minha avaliação
            </Botao>
          </div>
        </div>
      </section>

      <ChamadaFinal />
    </>
  );
}
