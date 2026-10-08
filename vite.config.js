import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  plugins: [react()],
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
  },
  server: {
    port: 5173,
  },
  test: {
    include: ['tests/**/*.test.{js,jsx}'],
    environment: 'node',
  },
}));
