# Site da clínica odontológica

Site institucional para uma clínica odontológica em Brasília, feito em **React 19 + Vite** e **pré-renderizado**: cada página vira um arquivo HTML pronto (rápido e bom para o Google) e o React assume a interatividade no navegador. A publicação no **GitHub Pages** é automática pelo GitHub Actions.

> **Nome e dados provisórios.** O site usa o nome “Alvorada Odontologia” e dados de exemplo (telefone, endereço, equipe, convênios). Tudo fica em `src/data/` — veja [Antes de publicar](#antes-de-publicar).

---

## Publicar no GitHub Pages (passo a passo)

1. **Crie um repositório** no GitHub (ex.: `site-clinica`). Pode ser público ou privado (privado exige plano pago para Pages).
2. **Envie os arquivos** desta pasta para a raiz do repositório:
   - **GitHub Desktop ou Git** (recomendado): copie o conteúdo da pasta para o repositório clonado, faça o commit e o push.
   - **Pelo navegador**: _Add file → Upload files_ e arraste **o conteúdo** da pasta (não a pasta em si). O GitHub aceita até 100 arquivos por envio: mande primeiro a pasta `src` e, em seguida, o restante.
     ⚠️ A pasta `.github` é oculta. No macOS, aperte <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> no Finder para vê-la; no Windows, ative “Itens ocultos” no Explorador. Sem ela, o site não é publicado.
3. No repositório, abra **Settings → Pages** e, em **Build and deployment → Source**, escolha **GitHub Actions**.
4. Abra a aba **Actions**: o fluxo “Publicar no GitHub Pages” roda sozinho a cada envio para a `main` (ou clique em _Run workflow_). Em 1–2 minutos o endereço aparece no resumo da execução, algo como `https://seu-usuario.github.io/site-clinica/`.

O fluxo descobre sozinho o endereço e o caminho do site — inclusive com **domínio próprio** (configure em _Settings → Pages → Custom domain_). Não é preciso editar nada no código para isso.

---

## Rodar no computador

Requer [Node.js 22](https://nodejs.org/) ou mais recente.

```bash
npm ci            # instala as dependências (exatamente as do package-lock.json)
npm run dev       # abre em http://localhost:5173 e atualiza a cada alteração
```

| Comando                      | O que faz                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                | Servidor de desenvolvimento                                                                                   |
| `npm run build`              | Gera o site final em `dist/` (cliente + HTML pré-renderizado + sitemap)                                       |
| `npm run preview`            | Abre o `dist/` localmente, como ficará publicado                                                              |
| `npm run check`              | Verifica o `dist/`: links quebrados, títulos, descrições, imagens sem `alt`, JSON-LD e pendências de conteúdo |
| `npm run check -- --estrito` | Igual, mas falha se ainda houver dados provisórios                                                            |
| `npm run lint`               | ESLint (inclui regras de acessibilidade para JSX)                                                             |
| `npm test`                   | Testes (Vitest): dados, rotas, horários, WhatsApp e renderização de todas as páginas                          |
| `npm run format`             | Formata o código com Prettier                                                                                 |
| `npm run verify`             | lint + testes + build + verificação, em sequência                                                             |

---

## Onde editar

| O quê                                                                                                                                                       | Arquivo                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Nome, telefone, WhatsApp, e-mail, endereço, mapa, horários, redes, CNPJ, responsável técnico, encarregado (LGPD), história, valores, estrutura, integrações | `src/data/clinica.js`                                            |
| Tratamentos (cards, menu e uma página para cada um)                                                                                                         | `src/data/tratamentos.js`                                        |
| Equipe                                                                                                                                                      | `src/data/equipe.js`                                             |
| Convênios                                                                                                                                                   | `src/data/convenios.js`                                          |
| Perguntas frequentes                                                                                                                                        | `src/data/faq.js`                                                |
| Itens do menu e links legais                                                                                                                                | `src/data/navegacao.js`                                          |
| Cores, fontes, espaçamentos                                                                                                                                 | `src/styles/tokens.css`                                          |
| Fotos                                                                                                                                                       | `public/fotos/` (e o caminho no arquivo de dados correspondente) |
| Imagem de compartilhamento (WhatsApp, redes)                                                                                                                | `public/og-image.jpg` (1200 × 630)                               |
| Ícones do site                                                                                                                                              | `public/favicon.svg` e `public/icons/`                           |

Detalhes em [`docs/CONTEUDO.md`](docs/CONTEUDO.md).

---

## Antes de publicar

`npm run check` lista o que ainda está provisório. Em resumo:

- [ ] Nome da clínica, telefone, WhatsApp, e-mail e endereço reais (`clinica.js`)
- [ ] Coordenadas e texto de busca do mapa (`clinica.js → endereco` e `mapa`)
- [ ] Horários de funcionamento
- [ ] Razão social, CNPJ, inscrição da clínica no CRO-DF e **responsável técnico com CRO** — exigência do Código de Ética Odontológica
- [ ] Encarregado de dados (LGPD) com e-mail
- [ ] Equipe real, com nº de CRO e apenas especialidades registradas no Conselho (`equipe.js`)
- [ ] Convênios com contrato ativo; depois, `listaDeExemplo = false` (`convenios.js`)
- [ ] Ano de fundação e número de consultórios (os “anos de experiência” são calculados)
- [ ] História, valores e estrutura da clínica
- [ ] Revisão dos textos de tratamentos pelo responsável técnico
- [ ] Perfil do Instagram, link do Perfil da Empresa no Google e, se quiser, IDs da Elfsight, do GA4 e do vídeo (`clinica.js → integracoes`)
- [ ] Fotos com autorização de uso (equipe, recepção)

---

## O que o site tem

**Da referência (Primore):** abertura com a recepção em madeira e o letreiro aceso, botões em bronze polido, apresentação com números, especialidades em cartões que se empilham ao rolar, equipe com foto, nome, área e Instagram, painel de convênios, avaliações e chamada final para o WhatsApp.

**Do projeto Espaço Niño:** avaliações do Google e feed do Instagram (Elfsight), WhatsApp com mensagem pronta, mapa sob demanda, busca de convênios, perguntas frequentes, menu de acessibilidade com VLibras, aviso de privacidade, páginas legais e eventos prontos para o GA4.

**Novidades:**

- Uma página para cada tratamento (indicações, etapas, dúvidas, profissionais e tratamentos relacionados) — mais conteúdo para o Google e para o paciente.
- Consentimento com **bloqueio prévio de verdade**: Elfsight, Google Maps, YouTube e GA4 só fazem requisições depois da permissão.
- Atendimento rápido no botão do WhatsApp: agendamento em dois toques, horários, convênios e telefone.
- Formulário de agendamento que monta a mensagem e abre o WhatsApp — sem servidor e sem guardar dados.
- “Aberto agora” calculado no fuso de Brasília.
- Dados estruturados (Dentist, FAQPage, BreadcrumbList, MedicalWebPage), sitemap, canonical e Open Graph em todas as páginas.
- Fontes hospedadas no próprio site (sem chamadas ao Google Fonts).
- Itens exigidos pelo CFO no rodapé e textos sem promessa de resultado nem preços.
- Página 404, manifesto para instalar na tela inicial e verificação automática antes de cada publicação.

**Toque de Brasília** (detalhes em [`docs/IDENTIDADE-VISUAL.md`](docs/IDENTIDADE-VISUAL.md)): o símbolo é um dente desenhado como um trecho da colunata do Palácio da Alvorada; arcos e uma colunata em traço fino lembram as curvas de Niemeyer; azulejos originais seguem o método de Athos Bulcão (poucos módulos, assentados em rotações livres); e o bronze dos botões homenageia Alfredo Ceschiatti.

---

## Estrutura

```
├── .github/
│   ├── workflows/publicar.yml   # verifica e publica no GitHub Pages
│   └── dependabot.yml           # atualizações mensais de dependências
├── docs/                        # guias de conteúdo, publicação, integrações e identidade
├── public/                      # arquivos copiados como estão (ícones, imagem de compartilhamento, fotos)
├── scripts/
│   ├── prerender.mjs            # gera o HTML de cada página, sitemap, robots e manifesto
│   └── check-site.mjs           # verificação do site gerado
├── src/
│   ├── components/              # componentes React (cabeçalho, fachada, azulejos, formulário…)
│   ├── data/                    # TODO o conteúdo editável
│   ├── lib/                     # utilidades (URLs, WhatsApp, SEO, consentimento, horários…)
│   ├── pages/                   # uma página por arquivo
│   ├── styles/                  # CSS com tokens e camadas (@layer)
│   ├── App.jsx                  # estrutura comum
│   ├── entry-client.jsx         # hidratação no navegador
│   ├── entry-server.jsx         # renderização no build
│   └── routes.js                # mapa de páginas
├── tests/                       # testes (Vitest)
├── index.html                   # modelo de página
└── vite.config.js
```

Mais em [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) e [`docs/PUBLICACAO.md`](docs/PUBLICACAO.md).

---

## Licença e créditos

Código sem licença definida — defina com os responsáveis pelo projeto antes de reutilizar. Os azulejos, o símbolo e as ilustrações são desenhos originais deste projeto, inspirados nos artistas citados, sem reproduzir obras deles. Fontes: Jost e Source Sans 3 (SIL Open Font License), via Fontsource.
