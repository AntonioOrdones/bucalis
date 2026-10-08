import { useEffect, useRef, useState } from 'react';
import { clinica } from '../data/clinica.js';
import { menuPrincipal } from '../data/navegacao.js';
import { usePagina } from '../contexto.js';
import { href } from '../lib/url.js';
import { linkTelefone, linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Icone from './Icone.jsx';
import Marca from './Marca.jsx';
import MenuAcessibilidade from './MenuAcessibilidade.jsx';

function estadoDoItem(item, caminho) {
  if (!item.secao) return {};
  if (caminho === item.secao) return { 'aria-current': 'page', 'data-atual': '' };
  if (caminho.startsWith(item.secao)) return { 'data-atual': '' };
  return {};
}

export default function Cabecalho() {
  const { caminho } = usePagina();
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const dialogo = useRef(null);

  // Clique no fundo escurecido ou em um link fecha o menu do celular.
  useEffect(() => {
    const menu = dialogo.current;
    const aoClicar = (evento) => {
      if (evento.target === menu || evento.target.closest('a')) menu.close();
    };
    menu.addEventListener('click', aoClicar);
    return () => menu.removeEventListener('click', aoClicar);
  }, []);

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  const abrirMenu = () => {
    dialogo.current?.showModal();
    setMenuAberto(true);
  };
  const fecharMenu = () => dialogo.current?.close();

  return (
    <header className="cabecalho" data-rolado={rolado ? '' : undefined}>
      <div className="cabecalho__interno conteiner">
        <a className="cabecalho__marca" href={href('/')}>
          <Marca />
          <span className="visualmente-oculto">, página inicial</span>
        </a>

        <nav className="cabecalho__nav" aria-label="Principal">
          <ul className="cabecalho__lista">
            {menuPrincipal.map((item) => (
              <li key={item.para}>
                <a className="cabecalho__link" href={href(item.para)} {...estadoDoItem(item, caminho)}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cabecalho__acoes">
          <MenuAcessibilidade />
          <Botao
            className="cabecalho__cta"
            para={linkWhatsApp()}
            externo
            icone="whatsapp"
            tamanho="pequeno"
            data-evento="whatsapp_cabecalho"
          >
            Agendar avaliação
          </Botao>
          <button
            type="button"
            className="cabecalho__menu-botao"
            aria-haspopup="dialog"
            aria-expanded={menuAberto}
            aria-controls="menu-movel"
            onClick={abrirMenu}
          >
            <Icone nome="menu" />
            <span className="visualmente-oculto">Abrir menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="menu-movel"
        ref={dialogo}
        className="menu-movel"
        aria-label="Menu"
        onClose={() => setMenuAberto(false)}
      >
        <div className="menu-movel__painel">
          <div className="menu-movel__topo">
            <Marca />
            <button type="button" className="menu-movel__fechar" onClick={fecharMenu}>
              <Icone nome="fechar" />
              <span className="visualmente-oculto">Fechar menu</span>
            </button>
          </div>
          <nav aria-label="Principal (celular)">
            <ul className="menu-movel__lista">
              <li>
                <a href={href('/')} aria-current={caminho === '/' ? 'page' : undefined}>
                  Início
                </a>
              </li>
              {menuPrincipal.map((item) => (
                <li key={item.para}>
                  <a href={href(item.para)} {...estadoDoItem(item, caminho)}>
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-movel__contato">
            <Botao para={linkWhatsApp()} externo icone="whatsapp" data-evento="whatsapp_menu">
              Agendar pelo WhatsApp
            </Botao>
            <a className="menu-movel__telefone" href={linkTelefone()}>
              <Icone nome="telefone" />
              {clinica.contato.telefoneExibicao}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
