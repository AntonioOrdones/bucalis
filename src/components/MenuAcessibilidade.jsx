import { useEffect, useId, useRef, useState } from 'react';
import { atualizarPreferencias, obterPreferencias, usePreferencias } from '../lib/preferencias.js';
import { href } from '../lib/url.js';
import { ativarVLibras, vlibrasAtivo } from '../lib/vlibras.js';
import Icone from './Icone.jsx';

const TAMANHOS = ['Padrão', 'Grande', 'Maior'];

export default function MenuAcessibilidade() {
  const [aberto, setAberto] = useState(false);
  const prefs = usePreferencias();
  const [aviso, setAviso] = useState('');
  const painelId = useId();
  const botao = useRef(null);
  const painel = useRef(null);

  // Quem ativou o VLibras em outra visita volta a tê-lo carregado.
  useEffect(() => {
    if (obterPreferencias().libras) ativarVLibras().catch(() => {});
  }, []);

  useEffect(() => {
    if (!aberto) return undefined;
    const aoClicarFora = (e) => {
      if (!painel.current?.contains(e.target) && !botao.current?.contains(e.target)) setAberto(false);
    };
    const aoTeclar = (e) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener('pointerdown', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('pointerdown', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  const atualizar = atualizarPreferencias;

  const alternarLibras = async () => {
    if (vlibrasAtivo()) {
      atualizar({ libras: false });
      setAviso('O VLibras será desativado ao recarregar a página.');
      return;
    }
    setAviso('Carregando o VLibras…');
    try {
      await ativarVLibras();
      atualizar({ libras: true });
      setAviso('VLibras ativado. Use o botão azul no canto da tela.');
    } catch (erro) {
      setAviso(erro.message);
    }
  };

  return (
    <div className="acessibilidade">
      <button
        ref={botao}
        type="button"
        className="acessibilidade__botao"
        aria-expanded={aberto}
        aria-controls={painelId}
        onClick={() => setAberto((v) => !v)}
      >
        <Icone nome="acessibilidade" />
        <span className="visualmente-oculto">Recursos de acessibilidade</span>
      </button>

      <div
        ref={painel}
        id={painelId}
        className="acessibilidade__painel"
        role="group"
        aria-label="Recursos de acessibilidade"
        hidden={!aberto}
      >
        <p className="acessibilidade__titulo">Acessibilidade</p>

        <fieldset className="acessibilidade__grupo">
          <legend>Tamanho do texto</legend>
          <div className="acessibilidade__segmentos">
            {TAMANHOS.map((rotulo, nivel) => (
              <button
                key={rotulo}
                type="button"
                aria-pressed={prefs.fonte === nivel}
                onClick={() => atualizar({ fonte: nivel })}
                style={{ fontSize: `${0.875 + nivel * 0.125}rem` }}
              >
                {rotulo}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className="acessibilidade__alternar"
          aria-pressed={prefs.contraste}
          onClick={() => atualizar({ contraste: !prefs.contraste })}
        >
          <Icone nome="contraste" />
          <span>Alto contraste</span>
          <span className="acessibilidade__estado" aria-hidden="true">
            {prefs.contraste ? 'Ligado' : 'Desligado'}
          </span>
        </button>

        <button
          type="button"
          className="acessibilidade__alternar"
          aria-pressed={prefs.movimento}
          onClick={() => atualizar({ movimento: !prefs.movimento })}
        >
          <Icone nome="movimento" />
          <span>Reduzir animações</span>
          <span className="acessibilidade__estado" aria-hidden="true">
            {prefs.movimento ? 'Ligado' : 'Desligado'}
          </span>
        </button>

        <button
          type="button"
          className="acessibilidade__alternar"
          aria-pressed={prefs.libras}
          onClick={alternarLibras}
        >
          <Icone nome="libras" />
          <span>Tradutor de Libras (VLibras)</span>
          <span className="acessibilidade__estado" aria-hidden="true">
            {prefs.libras ? 'Ligado' : 'Desligado'}
          </span>
        </button>

        <p className="acessibilidade__aviso" role="status">
          {aviso}
        </p>

        <a className="acessibilidade__link" href={href('/acessibilidade/')}>
          Declaração de acessibilidade
        </a>
      </div>
    </div>
  );
}
