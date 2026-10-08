import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * Caminho-base do site.
 * - GitHub Pages de projeto: "/nome-do-repositorio/" (o workflow informa automaticamente).
 * - Domínio próprio ou repositório "usuario.github.io": "/".
 */
function normalizarBase(valor) {
  if (!valor) return '/';
  let base = valor.trim();
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base = `${base}/`;
  return base;
}

export default defineConfig(({ isSsrBuild }) => ({
  base: normalizarBase(process.env.BASE_PATH),
  plugins: [
    react(),
    {
      // Mantem as rotas do React acessiveis em npm run dev:
      // o arquivo index.html da raiz agora e a pagina ja publicada.
      name: 'servir-template-em-dev',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const pathname = (req.url || '').split('?')[0];
          if (
            pathname === '/' ||
            /^\/(?:clinica|tratamentos|convenios|contato|privacidade|termos|acessibilidade|404)(?:\/|$)/.test(pathname)
          ) {
            req.url = '/template.html';
          }
          next();
        });
      },
    },
  ],
  define: {
    // URL pública absoluta (canonical, Open Graph, sitemap). Preenchida pelo workflow.
    __SITE_URL__: JSON.stringify(process.env.SITE_URL ?? ''),
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // O manifesto permite ao pré-renderizador pré-carregar só o JS de cada página.
    manifest: !isSsrBuild,
    sourcemap: false,
    assetsInlineLimit: 2048,
    // O codigo-fonte HTML fica em template.html; index.html e o site compilado da main.
    rolldownOptions: isSsrBuild ? undefined : { input: resolve(import.meta.dirname, 'template.html') },
  },
  server: {
    port: 5173,
  },
  test: {
    include: ['tests/**/*.test.{js,jsx}'],
    environment: 'node',
  },
}));
