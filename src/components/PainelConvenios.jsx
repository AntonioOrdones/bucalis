import { convenios } from '../data/convenios.js';
import Botao from './Botao.jsx';
import BuscaConvenios from './BuscaConvenios.jsx';

/** Painel de convênios da home (painel arredondado, como na referência). */
export default function PainelConvenios() {
  return (
    <section className="secao convenios-home" aria-labelledby="convenios-titulo">
      <div className="conteiner">
        <div className="painel-convenios tema-escuro">
          <svg className="painel-convenios__curva" viewBox="0 0 600 400" aria-hidden="true" focusable="false">
            <path d="M-20 360C90 360 120 60 300 60S510 360 620 360" fill="none" stroke="currentColor" />
            <path d="M-20 392C110 392 140 110 300 110S490 392 620 392" fill="none" stroke="currentColor" />
          </svg>
          <div className="painel-convenios__cabeca">
            <h2 id="convenios-titulo">Convênios</h2>
            <p>
              Consulte os {convenios.length} convênios listados em nosso material institucional.
              Confirme com a equipe se o seu plano, a modalidade e o procedimento estão cobertos.
            </p>
            <Botao variante="claro" para="/convenios/" iconeFinal="seta">
              Ver todos os convênios
            </Botao>
          </div>
          <div className="painel-convenios__busca">
            <BuscaConvenios limite={12} />
          </div>
        </div>
      </div>
    </section>
  );
}
