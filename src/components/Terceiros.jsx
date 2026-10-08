import { useEffect, useState } from 'react';
import { abrirPreferencias, permite, useConsentimento } from '../lib/consentimento.js';
import { carregarScript } from '../lib/scripts.js';
import Botao from './Botao.jsx';

/**
 * Conteúdo de terceiros com bloqueio prévio (LGPD).
 * Nada é requisitado ao serviço externo antes de o visitante permitir —
 * de forma geral (preferências) ou só para aquele conteúdo (botão "Carregar").
 */
export function useLiberacao() {
  const consentimento = useConsentimento();
  const [liberadoAqui, setLiberadoAqui] = useState(false);
  return {
    liberado: permite(consentimento, 'terceiros') || liberadoAqui,
    liberar: () => setLiberadoAqui(true),
  };
}

/** Aviso exibido no lugar do conteúdo bloqueado. */
export function Bloqueio({
  servico,
  descricao,
  acao,
  onCarregar,
  alternativa,
  className = '',
  varianteAcao = 'primario',
  iconeAcao,
  children,
}) {
  return (
    <div className={`bloqueio ${className}`.trim()}>
      {children}
      <div className="bloqueio__texto">
        <p className="bloqueio__titulo">{descricao}</p>
        <p className="bloqueio__nota">
          Ao carregar, {servico} poderá receber dados técnicos do seu navegador.{' '}
          <button type="button" className="bloqueio__preferencias" onClick={abrirPreferencias}>
            Preferências de privacidade
          </button>
        </p>
      </div>
      <div className="grupo-botoes bloqueio__acoes">
        <Botao tamanho="pequeno" variante={varianteAcao} icone={iconeAcao} onClick={onCarregar}>
          {acao}
        </Botao>
        {alternativa}
      </div>
    </div>
  );
}

/** Widget da Elfsight (avaliações do Google, feed do Instagram…). */
export function WidgetElfsight({ id, servico, descricao, acao, alternativa, decoracao }) {
  const { liberado, liberar } = useLiberacao();

  useEffect(() => {
    if (liberado && id) {
      carregarScript('https://elfsightcdn.com/platform.js').catch(() => {
        /* serviço indisponível: o aviso abaixo continua útil */
      });
    }
  }, [liberado, id]);

  if (!liberado) {
    return (
      <Bloqueio
        servico={servico}
        descricao={descricao}
        acao={acao}
        onCarregar={liberar}
        alternativa={alternativa}
      >
        {decoracao}
      </Bloqueio>
    );
  }

  return (
    <div className="widget-terceiro">
      <div className={`elfsight-app-${id}`} data-elfsight-app-lazy />
    </div>
  );
}

/** Vídeo do YouTube em modo de privacidade avançada (youtube-nocookie). */
export function VideoYouTube({ id, titulo }) {
  const { liberado, liberar } = useLiberacao();

  if (!liberado) {
    return (
      <div className="video">
        <Bloqueio
          className="bloqueio--video"
          varianteAcao="bronze"
          iconeAcao="play"
          servico="o YouTube"
          descricao={titulo}
          acao="Assistir ao vídeo"
          onCarregar={liberar}
          alternativa={
            <Botao tamanho="pequeno" variante="texto" para={`https://www.youtube.com/watch?v=${id}`} externo>
              Abrir no YouTube
            </Botao>
          }
        />
      </div>
    );
  }

  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={titulo}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
