import './styles/main.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { tituloCompleto } from './lib/seo.js';
import { caminhoDoEndereco } from './lib/url.js';
import { encontrarRota, rotaNaoEncontrada } from './routes.js';

async function iniciar() {
  const achado = encontrarRota(caminhoDoEndereco(window.location.pathname));
  const rota = achado?.rota ?? rotaNaoEncontrada;
  const params = achado?.params ?? {};
  const caminho = achado?.caminho ?? rotaNaoEncontrada.caminho;
  const modulo = await rota.carregar();

  const app = (
    <StrictMode>
      <App Pagina={modulo.default} params={params} caminho={caminho} />
    </StrictMode>
  );

  const raiz = document.getElementById('root');
  if (raiz.firstElementChild) {
    // Página pré-renderizada: o React só "assume" o HTML que já está na tela.
    hydrateRoot(raiz, app);
  } else {
    // Modo de desenvolvimento (npm run dev): renderiza do zero.
    document.title = tituloCompleto(modulo.meta?.(params));
    createRoot(raiz).render(app);
  }

  // Âncora na URL (ex.: /clinica/#equipe) depois que a página está pronta.
  if (window.location.hash) {
    const alvo = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    alvo?.scrollIntoView();
  }
}

iniciar();
