import { useId } from 'react';
import { href } from '../lib/url.js';
import Icone from './Icone.jsx';

/**
 * Perguntas frequentes com <details>/<summary>: funcionam sem JavaScript e
 * são acessíveis por teclado. O atributo `name` mantém uma resposta aberta
 * por vez nos navegadores que já o suportam.
 */
export default function Perguntas({ itens }) {
  const grupo = useId();
  return (
    <div className="perguntas">
      {itens.map((item) => (
        <details key={item.pergunta} className="pergunta" name={grupo}>
          <summary className="pergunta__resumo">
            <span>{item.pergunta}</span>
            <Icone nome="mais" className="pergunta__icone" />
          </summary>
          <div className="pergunta__resposta">
            <p>{item.resposta}</p>
            {item.link && (
              <a href={href(item.link.para)} className="pergunta__link">
                {item.link.texto}
              </a>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
