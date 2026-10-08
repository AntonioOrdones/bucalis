# Arquitetura

## Visão geral

```
            build (npm run build)                          navegador
┌──────────────────────────────────────────────┐   ┌──────────────────────────────┐
│ vite build            → dist/assets (JS, CSS) │   │ HTML pronto aparece na hora  │
│ vite build --ssr      → dist-ssr (temporário) │──▶│ entry-client.jsx carrega o JS│
│ scripts/prerender.mjs → dist/**/index.html,   │   │ da página e o React “hidrata”│
│                         404.html, sitemap…    │   │ (menus, busca, formulário…)  │
└──────────────────────────────────────────────┘   └──────────────────────────────┘
```

- **Uma página por arquivo** em `src/pages/`. Cada uma exporta o componente (`default`) e `meta(params)` — título, descrição e dados estruturados.
- **`src/routes.js`** lista as páginas. Rotas dinâmicas (`/tratamentos/:slug/`) declaram os valores possíveis, e o pré-renderizador gera uma página para cada um.
- **Site multipágina:** os links são `<a href>` comuns. Cada página tem seu próprio HTML, e o JS de cada uma é carregado sob demanda (`import()`), com `modulepreload` no `<head>`.
- **Hidratação sem divergências:** o que depende do navegador (consentimento, preferências, “aberto agora”) usa `useSyncExternalStore` com um valor de servidor fixo, ou é calculado depois da hidratação. Os azulejos usam um gerador pseudoaleatório com semente.

## Caminho-base

O GitHub Pages de projeto publica em `/nome-do-repositorio/`. Toda URL interna passa por `href()` (`src/lib/url.js`), que acrescenta o caminho-base definido no build (`BASE_PATH`). URLs absolutas (canonical, Open Graph, sitemap) usam `SITE_URL`. O workflow preenche as duas variáveis.

## CSS

- Arquivos por componente em `src/styles/componentes/`, importados por `src/styles/main.css`.
- `src/styles/identidade-bucalis.css` garante a identidade visual institucional; `src/styles/padroes-interacao.css` implementa estados, densidade, controles, grid, mensagens, foco e movimento inspirados nas diretrizes do GOVBR-DS sem incorporar a marca governamental.
- Matriz de auditoria: `docs/DESIGN-SYSTEM-GOVBR-AUDITORIA.md`.
- Camadas (`@layer reset, base, layout, componentes, paginas, utilitarios`) evitam disputas de especificidade.
- Classes em português no padrão bloco__elemento--modificador.
- Preferências de acessibilidade viram atributos no `<html>` (`data-fonte`, `data-contraste`, `data-movimento`), aplicados por um script curto no `<head>` antes da primeira pintura.

## Qualidade

| Ferramenta                                              | Verifica                                                                                                                     |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ESLint (+ regras de hooks e de acessibilidade para JSX) | Erros de código e problemas comuns de acessibilidade                                                                         |
| Prettier                                                | Formatação                                                                                                                   |
| Vitest                                                  | Dados (slugs, referências cruzadas), rotas, horários, mensagens do WhatsApp e renderização de todas as páginas               |
| `scripts/check-site.mjs`                                | HTML final: links e âncoras, `<title>`, descrição, canonical, um `<h1>`, `alt`, IDs únicos, JSON-LD e pendências de conteúdo |

Durante o desenvolvimento deste projeto, o site também foi auditado com axe-core (WCAG 2.1 AA) e testado em telas de celular e computador.

## Decisões

- **React com pré-renderização em vez de SPA:** conteúdo indexável sem depender de JavaScript, carregamento rápido e funcionamento no GitHub Pages sem truques de redirecionamento.
- **Sem roteador no cliente:** para um site institucional, navegação por links comuns é mais simples, robusta e acessível.
- **Sem backend:** contatos vão pelo WhatsApp; nenhum dado pessoal fica no site.
- **Consentimento antes de terceiros:** nenhum script externo é requisitado sem permissão.
