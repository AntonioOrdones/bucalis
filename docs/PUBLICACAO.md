# Publicação

## Como funciona

O arquivo `.github/workflows/publicar.yml` roda a cada envio:

| Evento                           | O que acontece                                     |
| -------------------------------- | -------------------------------------------------- |
| Pull request                     | lint → testes → build → verificação (não publica)  |
| Push na `main` ou “Run workflow” | o mesmo e, se tudo passar, publica no GitHub Pages |

Se algum passo falhar, **o site no ar não muda** — a versão anterior continua publicada. Veja o motivo em _Actions → execução com ❌ → passo com erro_.

O passo “Ler o endereço do GitHub Pages” (`actions/configure-pages`) informa ao build o caminho (`/nome-do-repositorio`) e o endereço público. Com isso, links, canonical, sitemap e dados estruturados saem certos tanto em `usuario.github.io/repositorio` quanto em domínio próprio.

## Primeira publicação

1. _Settings → Pages → Build and deployment → Source:_ **GitHub Actions**.
2. Envie o código para a `main` (ou rode o fluxo manualmente em _Actions_).
3. O endereço aparece no resumo da execução e em _Settings → Pages_.

## Domínio próprio

1. Em _Settings → Pages → Custom domain_, informe o domínio (ex.: `www.suaclinica.com.br`) e salve.
2. No provedor do domínio, crie o registro DNS indicado pelo GitHub (CNAME para `usuario.github.io` no caso de `www`).
3. Marque **Enforce HTTPS** quando ficar disponível.
4. Rode o fluxo novamente (_Actions → Run workflow_) para regenerar o site com o novo endereço.

Com domínio próprio, o `robots.txt` passa a ficar na raiz do domínio e é lido pelos buscadores. Cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie o `sitemap.xml`.

## Build local (sem GitHub Actions)

```bash
npm ci
BASE_PATH=/nome-do-repositorio/ SITE_URL=https://usuario.github.io/nome-do-repositorio npm run build
npm run check
```

O resultado fica em `dist/`. Sem as variáveis, o build usa `/` e o endereço de `clinica.urlPadrao`.

## Voltar a uma versão anterior

1. Em _Code → commits_, encontre a última versão boa.
2. Desfaça a alteração com `git revert <commit>` (ou pelo GitHub Desktop: _History → Revert changes in commit_) e envie para a `main`.
3. O fluxo publica a versão restaurada.

## Problemas comuns

| Sintoma                            | Causa provável                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| A aba _Actions_ não mostra o fluxo | A pasta oculta `.github` não foi enviada.                                                                           |
| Erro “Get Pages site failed”       | _Source_ de Pages não está como **GitHub Actions**.                                                                 |
| Página sem estilo, links quebrados | Build feito localmente sem `BASE_PATH`. Use o fluxo do GitHub ou informe a variável.                                |
| `npm ci` falha                     | `package-lock.json` ausente ou fora de sincronia com o `package.json`. Rode `npm install` e envie o lockfile.       |
| Mudança não aparece                | Cache do navegador: recarregue com <kbd>Ctrl</kbd>+<kbd>F5</kbd> (ou <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>). |
