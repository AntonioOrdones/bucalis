import { fotografias } from '../data/fotografias.js';
import { asset } from '../lib/url.js';
import Botao from './Botao.jsx';

/**
 * Galeria de registros reais da Bucalis.
 * Cada imagem abre seu arquivo original otimizado; não depende de JavaScript
 * nem de redes sociais. Os retratos não identificam pessoas sem autorização.
 */
export default function GaleriaEspaco({ limite = 0, id = 'espaco' }) {
  const itens = limite > 0 ? fotografias.slice(0, limite) : fotografias;

  return (
    <section className="secao secao--marmore galeria-espaco" id={id} aria-labelledby={`${id}-titulo`}>
      <div className="conteiner">
        <div className="galeria-espaco__cabecalho">
          <div className="secao__cabeca">
            <p className="galeria-espaco__sobretitulo">Bucalis por dentro</p>
            <h2 id={`${id}-titulo`} className="secao__titulo">Conheça nosso espaço</h2>
            <p className="secao__apoio">
              Um ambiente preparado para receber você: veja a recepção,
              os consultórios e os espaços de planejamento e atendimento.
            </p>
          </div>
          {limite > 0 && (
            <Botao para="/clinica/#espaco" variante="contorno" iconeFinal="seta">
              Ver todas as fotos
            </Botao>
          )}
        </div>
        <ul className="galeria-espaco__grade">
          {itens.map((foto) => (
            <li key={foto.id} className="galeria-espaco__item">
              <figure className="galeria-espaco__foto">
                <a
                  className="galeria-espaco__abrir"
                  href={asset(foto.src)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir foto em tamanho maior: ${foto.titulo} (nova aba)`}
                >
                  <img
                    src={asset(foto.src)}
                    alt={foto.descricao}
                    width="1280"
                    height="853"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption className="galeria-espaco__legenda">
                  <span className="galeria-espaco__categoria">{foto.categoria}</span>
                  <strong>{foto.titulo}</strong>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {!limite && (
          <p className="galeria-espaco__nota">
            Fotografias da Bucalis. Algumas imagens mostram profissionais em atividade;
            as identificações profissionais são apresentadas separadamente quando confirmadas.
          </p>
        )}
      </div>
    </section>
  );
}
