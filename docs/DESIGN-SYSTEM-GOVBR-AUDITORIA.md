# Auditoria e adaptação do Design System GOV.BR ao site Bucalis

Data de referência: 8 de outubro de 2026. Projeto: `AntonioOrdones/bucalis` (React 19, Vite e GitHub Pages). Esta auditoria avalia **padrões aplicáveis** ao site institucional de uma clínica odontológica.

## Escopo e interpretação

O [Padrão Digital de Governo](https://www.gov.br/ds/) é dirigido a soluções digitais governamentais. A Bucalis não é uma interface GOV.BR; utilizamos orientações de **arquitetura da informação, desenho de interação, componentes semânticos, comportamento responsivo e acessibilidade**, sem copiar cabeçalhos, cores, marcas ou autenticação federais.

Adotar boas práticas do GOVBR-DS **não equivale a afirmar conformidade oficial**, nem constitui avaliação certificada WCAG/eMAG. Esta auditoria é estática, de código e de execução automatizada. **Inspeção visual real, navegação por teclado e com leitor de tela em navegadores diferentes ainda precisam de validação humana.**

**Legenda:** Aplicado = recurso implementado e verificado por código/testes; Adaptado = padrão relevante adequado à Bucalis; Parcial = requer validação adicional; Não aplicável = nenhuma interface do projeto precisa desse componente; Pendente = ação depende de dados/arquivos externos.

## 1. Fundamentos visuais

| Fundamento (documentação oficial) | Situação | Aplicação na Bucalis |
| --- | --- | --- |
| [Cores](https://www.gov.br/ds/fundamentos-visuais/cores) | Adaptado | Paleta oficial própria em `tokens.css`, uso semântico em `padroes-interacao.css`, contraste validado para pares principais; o sistema de cores do governo **não** substitui a marca |
| [Iconografia](https://www.gov.br/ds/fundamentos-visuais/iconografia) | Adaptado | Ícones SVG de `Icone.jsx`; comandos só com ícones recebem rótulos; ornamentos são ocultos de leitores de tela |
| [Espaçamento](https://www.gov.br/ds/fundamentos-visuais/espacamento) | Aplicado | Escala `--esp-1..8`, tokens semânticos de densidade e gutters fluidos |
| [Estados](https://www.gov.br/ds/fundamentos-visuais/estados) | Aplicado | Foco visível, seleção, expandido, erro, desabilitado, mensagens de retorno e estado vazio em componentes que precisam |
| [Ilustração](https://www.gov.br/ds/fundamentos-visuais/ilustracao) | Adaptado | Azulejos vetoriais e ornamentos autorais em cores Bucalis; não aplicar ilustrações GOV.BR como decoração institucional |
| [Sistema de grid](https://www.gov.br/ds/fundamentos-visuais/grid) | Aplicado | Largura de conteúdo, gutters fluidos, colunas responsivas e prevenção de overflow |
| [Superfície](https://www.gov.br/ds/fundamentos-visuais/superficie) | Aplicado | `--superficie-base/suave/inversa`, agrupamento de cards, modal e formulário |
| [Elevação](https://www.gov.br/ds/fundamentos-visuais/elevacao) | Aplicado | `--elevacao-painel/modal`; uso discreto sem depender exclusivamente de sombra para legibilidade |
| [Movimento](https://www.gov.br/ds/fundamentos-visuais/movimento) | Aplicado | Durações tokenizadas e respeito a `prefers-reduced-motion` e preferência persistida |
| [Tipografia](https://www.gov.br/ds/fundamentos-visuais/tipografia) | Parcial | Poppins para leitura; títulos com famílias do manual Bucalis e substitutas abertas. Boston Angel, Higuen, TAN Garland e Burgues exigem webfonts completas/licenciadas |

## 2. Padrões de design

| Padrão | Situação | Decisão |
| --- | --- | --- |
| [Ajuda e Comunicação](https://www.gov.br/ds/padroes/design/ajuda-comunicacao) | Aplicado | Textos de ajuda, erros próximos aos campos e retorno em linguagem simples |
| [Densidade](https://www.gov.br/ds/padroes/design/densidade) | Adaptado | Densidade regular, controles com área mínima de 44px e espaços ampliados em contexto de toque |
| [Content Overflow](https://www.gov.br/ds/padroes/design/contentoverflow) | Aplicado | Containers fluidos; barra de cookies, menus e dialogos com rolagem interna limitada, sem cortar ações |
| [Dropdown](https://www.gov.br/ds/padroes/design/dropdown) | Adaptado | `select` nativo com label, sem construir dropdown customizado desnecessário |
| [Formulário](https://www.gov.br/ds/padroes/design/formulario) | Aplicado | Label sempre visível, legendas em grupos de radio, erro relacionado via `aria-describedby` e `role=alert` |
| [Gráfico](https://www.gov.br/ds/padroes/design/grafico) | Não aplicável | O site não apresenta dados quantitativos gráficos; não incluir visualizações decorativas |
| [Onboarding](https://www.gov.br/ds/padroes/design/onboarding) | Não aplicável | Não há sistema com primeiro acesso nem etapas de configuração |
| [Collapse](https://www.gov.br/ds/padroes/design/collapse) | Aplicado | FAQ com `details/summary` nativos, funcional sem JavaScript |
| [Navegação](https://www.gov.br/ds/padroes/design/navegacao) | Aplicado | Menu com página ativa, breadcrumbs, salto ao conteúdo, menu mobile por `dialog` |
| [Empty States](https://www.gov.br/ds/padroes/design/emptystates) | Aplicado | Busca de convênios informa ausência de resultado e oferece próxima ação; página 404 orienta retorno |

## 3. Componentes

O objetivo **não** é instalar os componentes GOV.BR automaticamente. São padrões de comportamento equivalentes, implementados nativamente em React/HTML com identidade Bucalis.

| Componente | Situação | Implementação ou motivo |
| --- | --- | --- |
| [Accordion](https://www.gov.br/ds/components/accordion) | Aplicado | `Perguntas.jsx` com `details/summary` e estado visual de expansão |
| [Avatar](https://www.gov.br/ds/components/avatar) | Adaptado | Retratos e iniciais alternativas em `Profissional.jsx` |
| [Breadcrumb](https://www.gov.br/ds/components/breadcrumb) | Aplicado | `Trilha` de `TopoPagina.jsx`; `aria-current=page` |
| [Button](https://www.gov.br/ds/components/button) | Aplicado | `Botao.jsx`: ação por botão, navegação por link, foco e tamanhos de toque |
| [Card](https://www.gov.br/ds/components/card) | Aplicado | Cards de tratamentos, especialidades, equipe e avisos |
| [Carousel](https://www.gov.br/ds/components/carousel) | Não aplicável | Não há coleção de slides; listas estáticas são mais previsíveis |
| [Checkbox](https://www.gov.br/ds/components/checkbox) | Aplicado | Opções explícitas de privacidade nativas |
| [Cookiebar](https://www.gov.br/ds/components/cookiebar) | Aplicado | Aceitar, rejeitar não essenciais, personalizar, fechar sem salvar; preferências persistentes |
| [DateTimePicker](https://www.gov.br/ds/components/datetimepicker) | Não aplicável | Não existe integração com agenda; solicitação segue para WhatsApp |
| [Divider](https://www.gov.br/ds/components/divider) | Adaptado | Bordas, filetes e separadores semânticos de seções |
| [Footer](https://www.gov.br/ds/components/footer) | Aplicado | `Rodape.jsx` com navegação e links institucionais |
| [Header](https://www.gov.br/ds/components/header) | Aplicado | `Cabecalho.jsx` fixo com menu responsivo |
| [Input](https://www.gov.br/ds/components/input) | Aplicado | Campos nome e convênio, `label` e foco acessível |
| [Item](https://www.gov.br/ds/components/item) | Adaptado | Itens da pesquisa de planos e canais de contato |
| [List](https://www.gov.br/ds/components/list) | Aplicado | HTML `ul/ol` para navegação, tratamentos e etapas |
| [Loading](https://www.gov.br/ds/components/loading) | Parcial | Mensagem de carregamento em ações externas, mas não existe estado assíncrono prolongado próprio da aplicação |
| [Magic Button](https://www.gov.br/ds/components/magicbutton) | Não aplicável | Não há assistente de IA nem ação especial que o exija |
| [Menu](https://www.gov.br/ds/components/menu) | Aplicado | `Cabecalho.jsx` com `dialog` no celular |
| [Message](https://www.gov.br/ds/components/message) | Aplicado | Erros de formulário e instruções de busca |
| [Modal](https://www.gov.br/ds/components/modal) | Aplicado | `Consentimento.jsx`, nativo, com tecla Esc e fechamento sem salvar |
| [Notification](https://www.gov.br/ds/components/notification) | Adaptado | Feedback textual em `role=status` e `role=alert`; não criar notificações desnecessárias |
| [Pagination](https://www.gov.br/ds/components/pagination) | Não aplicável | Listas curtas e páginas sem resultados paginados |
| [Radio](https://www.gov.br/ds/components/radio) | Aplicado | Períodos/ tratamentos agrupados em `fieldset/legend` |
| [Scrim](https://www.gov.br/ds/components/scrim) | Aplicado | Escurecimento do fundo de `dialog::backdrop` |
| [Select](https://www.gov.br/ds/components/select) | Aplicado | Tratamentos por seleção nativa |
| [Sign-in](https://www.gov.br/ds/components/signin) | Não aplicável | Site público sem autenticação |
| [Skip Link](https://www.gov.br/ds/components/skiplink) | Aplicado | Link “Pular para o conteúdo”, visível no foco |
| [Step](https://www.gov.br/ds/components/step) | Adaptado | `Etapas.jsx` com sequência ordenada; não confundir com assistente interativo |
| [Switch](https://www.gov.br/ds/components/switch) | Aplicado | Alternância opcional de categorias de consentimento |
| [Tab](https://www.gov.br/ds/components/tab) | Não aplicável | Não há painéis alternativos que precisem de abas |
| [Table](https://www.gov.br/ds/components/table) | Não aplicável | Site não apresenta dados que necessitem de tabela |
| [Tag](https://www.gov.br/ds/components/tag) | Adaptado | Pílulas e marcadores visuais |
| [Textarea](https://www.gov.br/ds/components/textarea) | Aplicado | Mensagem opcional do formulário com dica sobre dados sensíveis |
| [Tooltip](https://www.gov.br/ds/components/tooltip) | Não aplicável | Ações têm rótulos visíveis e dicas em texto; evitar dependência de hover |
| [Upload](https://www.gov.br/ds/components/upload) | Não aplicável | O site não recebe arquivos dos visitantes |
| [Wizard](https://www.gov.br/ds/components/wizard) | Não aplicável | Não há jornada multifase do próprio sistema |

## 4. Casos de teste e contrastes

- `#481310` sobre `#ede3d7`: **12,04:1** (texto normal AA).
- `#2e1711` sobre `#ede3d7`: **13,29:1**.
- `#735e59` sobre `#ede3d7`: **4,77:1**.
- `#cacaca` sobre `#2e1711`: **10,28:1**.
- `#7b7562` sobre `#ede3d7`: **3,63:1**; **não usar** para texto corrido normal (AA exige 4,5:1). Reservar a bordas e ícones decorativos.

Os números verificam pares definidos, não um teste automático de todas as combinações renderizadas, interações e estados. O arquivo `tests/padroes-interacao.test.js` inclui regressões para as configurações críticas.

## 5. Melhorias e bloqueios restantes

**Pendente de dados oficiais da clínica:**
- Os dados de telefone, WhatsApp, endereço, CEP, CRO/CNPJ, encarregado LGPD, fundação e parte dos textos são provisórios em `src/data/clinica.js`. **Não se deve publicar esses dados como definitivos.** O script `npm run check -- --estrito` sinaliza algumas dessas pendências, mas a publicação habitual não é bloqueada.
- Não presumir que um nome de plano listado garante cobertura de todos os procedimentos.
- Registrar a versão completa e licenciada das fontes Boston Angel, Higuen, TAN Garland e Burgues; por enquanto são usados fallbacks abertos.

**Pendente de validação humana:**
- Verificação com leitores de tela, zoom 200–400%, navegação por teclado, Safari/Firefox e dispositivos touch.
- Auditoria visual real de todos os 19 HTMLs e imagens geradas.
- Análise dos dados pessoais e cookies na operação clínica, não apenas no código.

**Privacidade de fontes:** Poppins e famílias editoriais de fallback são requisitadas de `fonts.googleapis.com`/`fonts.gstatic.com`, carregadas no acesso inicial como recurso visual. A política explicita isso. A futura hospedagem local das fontes evita essa conexão externa. Isso é distinto de integração opcional do Google Analytics, Maps e Elfsight, que o visitante pode rejeitar.

## 6. Fluxo de manutenção

1. Atualizar cores/espacamentos em `src/styles/tokens.css` e estados em `src/styles/padroes-interacao.css`.
2. Verificar componentes nativos em `src/components/`; evitar inventar widgets que o site não usa.
3. Executar `npm run lint && npm test && npm run build && npm run check`.
4. Compilar na `main`, manter fonte React; sincronizar somente os arquivos estáticos na `gh-pages` enquanto ela for a origem do GitHub Pages.
5. Se o site mudar de URL, revisar `BASE_PATH`, `SITE_URL`, `og:image`, favicon e mapa de páginas.

## 7. Fontes oficiais consultadas

- [Design System GOV.BR — versão 3 e fundamentos](https://www.gov.br/ds/)
- [Guia de sistema de governo digital e aplicabilidade](https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/sisp/guia-do-gestor/guia-orientativo-de-padroes-e-fluxos-das-tecnologias-de-transformacao-digital/padrao-de-governo-digital-design-system)
- [Modelo de formulário e rótulos (referência técnica V4 em desenvolvimento)](https://next-ds.estaleiro.serpro.gov.br/padroes/formulario)
- [Componente Cookiebar — referência de implementação](https://webcomponent-ds.estaleiro.serpro.gov.br/docs/components/cookiebar/)
- [Template base e atalhos de navegação](https://www.gov.br/ds/templates/base)
- [Padrão de estados vazios](https://www.gov.br/ds/padroes/design/emptystates)

**Nota sobre a V4:** a documentação V4 ainda está em desenvolvimento; não a tratamos como versão normativa/estável equivalente à V3.
