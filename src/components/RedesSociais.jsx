import { clinica } from '../data/clinica.js';
import Azulejos from './Azulejos.jsx';
import Botao from './Botao.jsx';
import Icone from './Icone.jsx';
import { WidgetElfsight } from './Terceiros.jsx';

const { integracoes, google, redes } = clinica;

/**
 * Avaliações do Google (widget Elfsight). A seção só aparece quando há um
 * widget configurado ou, ao menos, o link do Perfil da Empresa no Google.
 */
export function Avaliacoes() {
  if (!integracoes.elfsightAvaliacoesGoogle && !google.perfilUrl) return null;

  const linkGoogle = google.perfilUrl && (
    <Botao tamanho="pequeno" variante="texto" para={google.perfilUrl} externo>
      Ver no Google
    </Botao>
  );

  return (
    <section className="secao secao--marmore avaliacoes" aria-labelledby="avaliacoes-titulo">
      <div className="conteiner">
        <div className="secao__cabeca secao__cabeca--centro">
          <p className="estrelas" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <Icone key={n} nome="estrela" />
            ))}
          </p>
          <h2 id="avaliacoes-titulo" className="secao__titulo">
            O que dizem nossos pacientes
          </h2>
          <p className="secao__apoio">Avaliações publicadas no Google por quem já foi atendido aqui.</p>
        </div>

        {integracoes.elfsightAvaliacoesGoogle ? (
          <WidgetElfsight
            id={integracoes.elfsightAvaliacoesGoogle}
            servico="o Google e a Elfsight"
            descricao="As avaliações são carregadas diretamente do Google."
            acao="Mostrar avaliações"
            alternativa={linkGoogle}
          />
        ) : (
          <div className="grupo-botoes avaliacoes__links">
            <Botao para={google.perfilUrl} externo>
              Ler as avaliações no Google
            </Botao>
            {google.avaliarUrl && (
              <Botao para={google.avaliarUrl} externo variante="contorno">
                Avaliar a clínica
              </Botao>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Instagram: feed via Elfsight (com consentimento) ou, sem widget, um painel
 * de azulejos que leva ao perfil.
 */
export function Instagram() {
  if (!redes.instagram) return null;
  const perfil = `https://www.instagram.com/${redes.instagram}/`;

  const painel = (
    <a className="instagram__painel" href={perfil} target="_blank" rel="noopener noreferrer">
      <Azulejos colunas={12} linhas={2} semente={1958} paleta="misto" />
      <span className="instagram__selo">
        <Icone nome="instagram" />@{redes.instagram}
      </span>
      <span className="visualmente-oculto"> (abre o Instagram em nova aba)</span>
    </a>
  );

  return (
    <section className="secao instagram" aria-labelledby="instagram-titulo">
      <div className="conteiner">
        <div className="instagram__cabeca">
          <div>
            <h2 id="instagram-titulo" className="secao__titulo">
              Acompanhe no Instagram
            </h2>
            <p className="secao__apoio">Dicas de cuidado, bastidores da clínica e novidades da equipe.</p>
          </div>
          <Botao para={perfil} externo variante="contorno" icone="instagram">
            Seguir @{redes.instagram}
          </Botao>
        </div>

        {integracoes.elfsightFeedInstagram ? (
          <WidgetElfsight
            id={integracoes.elfsightFeedInstagram}
            servico="o Instagram e a Elfsight"
            descricao="As publicações são carregadas diretamente do Instagram."
            acao="Mostrar publicações"
            decoracao={painel}
          />
        ) : (
          painel
        )}
      </div>
    </section>
  );
}
