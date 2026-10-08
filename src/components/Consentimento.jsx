import { useEffect, useId, useRef, useState } from 'react';
import {
  CATEGORIAS,
  EVENTO_ABRIR_PREFERENCIAS,
  salvarConsentimento,
  useConsentimento,
} from '../lib/consentimento.js';
import { useNoNavegador } from '../lib/preferencias.js';
import { href } from '../lib/url.js';
import Botao from './Botao.jsx';

/**
 * Aviso de privacidade (LGPD) + painel de preferências.
 * O aviso só aparece no navegador, para quem ainda não fez uma escolha.
 */
export default function Consentimento() {
  const consentimento = useConsentimento();
  const montado = useNoNavegador();
  const [escolhas, setEscolhas] = useState({
    terceiros: false,
    medicao: false,
  });
  const dialogo = useRef(null);
  const aviso = useRef(null);
  const tituloId = useId();

  useEffect(() => {
    const abrir = () => {
      setEscolhas({
        terceiros: Boolean(consentimento?.terceiros),
        medicao: Boolean(consentimento?.medicao),
      });
      dialogo.current?.showModal();
    };
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, abrir);
  }, [consentimento]);

  const mostrarAviso = montado && consentimento === null;

  // Reserva espaço para o aviso, para ele não cobrir o botão de atendimento.
  useEffect(() => {
    const raiz = document.documentElement;
    if (!mostrarAviso || !aviso.current) {
      raiz.style.removeProperty('--altura-aviso');
      return undefined;
    }
    const medir = () => raiz.style.setProperty('--altura-aviso', `${aviso.current.offsetHeight}px`);
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(aviso.current);
    return () => {
      observador.disconnect();
      raiz.style.removeProperty('--altura-aviso');
    };
  }, [mostrarAviso]);

  const decidir = (valores) => {
    salvarConsentimento(valores);
    dialogo.current?.close();
  };

  return (
    <>
      {mostrarAviso && (
        <section ref={aviso} className="aviso-privacidade" aria-label="Aviso de privacidade">
          <p>
            <strong>Sua privacidade em primeiro lugar.</strong> Por padrão, usamos só o essencial. Com a sua
            permissão, carregamos avaliações do Google, o feed do Instagram, mapas, vídeos e estatísticas de
            visita. <a href={href('/privacidade/')}>Política de privacidade</a>
          </p>
          <div className="aviso-privacidade__acoes">
            <Botao tamanho="pequeno" onClick={() => decidir({ terceiros: true, medicao: true })}>
              Aceitar tudo
            </Botao>
            <Botao
              tamanho="pequeno"
              variante="contorno"
              onClick={() => decidir({ terceiros: false, medicao: false })}
            >
              Só o essencial
            </Botao>
            <Botao
              tamanho="pequeno"
              variante="texto"
              onClick={() => {
                setEscolhas({ terceiros: false, medicao: false });
                dialogo.current?.showModal();
              }}
            >
              Personalizar
            </Botao>
          </div>
        </section>
      )}

      <dialog ref={dialogo} className="preferencias" aria-labelledby={tituloId}>
        <form
          method="dialog"
          className="preferencias__conteudo"
          onSubmit={(e) => {
            e.preventDefault();
            decidir(escolhas);
          }}
        >
          <h2 id={tituloId} className="preferencias__titulo">
            Preferências de privacidade
          </h2>
          <p>
            Escolha o que pode ser carregado neste navegador. Você pode mudar de ideia a qualquer momento pelo
            link “Preferências de privacidade”, no rodapé.
          </p>

          <div className="preferencias__item">
            <div>
              <h3>Essenciais</h3>
              <p>
                Guardam no seu navegador as escolhas de privacidade e de acessibilidade. Não identificam você
                e não podem ser desligados.
              </p>
            </div>
            <span className="preferencias__fixo">Sempre ativos</span>
          </div>

          {Object.entries(CATEGORIAS).map(([chave, categoria]) => (
            <div className="preferencias__item" key={chave}>
              <div>
                <h3 id={`${tituloId}-${chave}`}>{categoria.titulo}</h3>
                <p>{categoria.descricao}</p>
              </div>
              <label className="chave">
                <input
                  type="checkbox"
                  role="switch"
                  aria-labelledby={`${tituloId}-${chave}`}
                  checked={escolhas[chave]}
                  onChange={(e) =>
                    setEscolhas((atual) => ({
                      ...atual,
                      [chave]: e.target.checked,
                    }))
                  }
                />
                <span className="chave__trilho" aria-hidden="true" />
              </label>
            </div>
          ))}

          <div className="preferencias__acoes">
            <Botao type="submit" variante="contorno">
              Salvar escolhas
            </Botao>
            <Botao onClick={() => decidir({ terceiros: true, medicao: true })}>Aceitar tudo</Botao>
          </div>
          <a className="preferencias__link" href={href('/privacidade/')}>
            Ler a política de privacidade
          </a>
        </form>
      </dialog>
    </>
  );
}
