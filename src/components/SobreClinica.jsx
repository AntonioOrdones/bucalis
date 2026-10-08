import { anosDeExperiencia, clinica } from '../data/clinica.js';
import { equipe } from '../data/equipe.js';
import { asset } from '../lib/url.js';
import Azulejos from './Azulejos.jsx';
import Botao from './Botao.jsx';
import Contador from './Contador.jsx';

/** Apresentação da clínica na home: texto, números e o painel em arco. */
export default function SobreClinica() {
  const numeros = [
    { valor: anosDeExperiencia, rotulo: 'anos de experiência' },
    { valor: equipe.length, rotulo: 'especialistas' },
    { valor: clinica.consultorios, rotulo: 'consultórios' },
  ];

  return (
    <section className="secao sobre" aria-labelledby="sobre-titulo">
      <div className="conteiner sobre__grade">
        <div className="sobre__texto">
          <h2 id="sobre-titulo" className="secao__titulo">
            {anosDeExperiencia} anos cuidando de sorrisos em Brasília
          </h2>
          <p className="secao__apoio">
            Uma clínica que reúne especialistas de todas as áreas da odontologia para cuidar de você e da sua
            família — da primeira consulta aos tratamentos mais complexos.
          </p>
          <p>
            Cada plano de tratamento é discutido em equipe e explicado com clareza, com tempo para tirar
            dúvidas. Técnicas atuais e um atendimento sem pressa, em um espaço pensado para o seu conforto.
          </p>

          <dl className="numeros">
            {numeros.map((n) => (
              <div key={n.rotulo} className="numeros__item">
                <dt>{n.rotulo}</dt>
                <dd>
                  <Contador valor={n.valor} />
                </dd>
              </div>
            ))}
          </dl>

          <Botao variante="contorno" para="/clinica/" iconeFinal="seta">
            Conheça a clínica
          </Botao>
        </div>

        <figure className="sobre__visual">
          <div className="arco sobre__arco">
            {clinica.fotoClinica ? (
              <img
                src={asset(clinica.fotoClinica)}
                alt={clinica.textoAlternativoFotoClinica}
                loading="lazy"
              />
            ) : (
              <Azulejos colunas={4} linhas={6} semente={1960} paleta="misto" preencher />
            )}
          </div>
          {!clinica.fotoClinica && (
            <figcaption className="sobre__legenda">
              Azulejos desenhados para a clínica, em homenagem ao método de Athos Bulcão: módulos simples,
              assentados em posições livres.
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
