# Manual de identidade visual aplicado ao site Bucalis

**Documentos complementares:** [Auditoria do Design System GOV.BR](./DESIGN-SYSTEM-GOVBR-AUDITORIA.md) — padrões de interação, estados, navegação, grids, responsividade, cookies, mensagens e matriz de componentes realmente utilizados. O arquivo `src/styles/padroes-interacao.css` reúne os tokens e comportamentos adicionais.

Base: PDF **Boston angel.pdf** enviado pela clínica (4 páginas). Esta referência substitui os temas anteriores inspirados em Alvorada, madeira bronze e azul.

## Paleta oficial

| Token | Hex | Uso |
| --- | --- | --- |
| `--bucalis-cinza` | `#cacaca` | Apoios visuais e divisórias claras |
| `--bucalis-areia` | `#ede3d7` | Fundo de seções, texto em fundos escuros e identidade |
| `--bucalis-taupe` | `#a29c8a` | Linhas, ícones decorativos, detalhes |
| `--bucalis-oliva` | `#7b7562` | Ícones e recursos auxiliares |
| `--bucalis-malva` | `#735e59` | Texto secundário sobre fundo claro |
| `--bucalis-vinho` | `#481310` | Botões, links, títulos e destaques |
| `--bucalis-cacau` | `#2e1711` | Fundo de painéis escuros e tipografia |

Estas sete cores estão definidas em `src/styles/tokens.css`. Nomes CSS antigos como `--bronze-500` e `--azulejo-600` são aliases de valores oficiais; continuam disponíveis apenas para compatibilidade, **sem introduzir azul ou dourado na interface**.

Branco puro pode aparecer como superfície funcional de formulários, cartões e controles. A transparência dos tons oficiais também é permitida para sombras e efeitos, sem adicionar outra cor institucional.

**Acessibilidade:** o texto principal usa vinho/cacau sobre areia/branco; o cinza e o oliva são preferidos para decorações e bordas, não para parágrafos pequenos. O modo de alto contraste continua independente da paleta.

## Tipografia

O manual enviado mostra os seguintes nomes (páginas 3 e 4):

- **Poppins Regular/Bold/Italic/Bold Italic:** texto de leitura, interface, navegação, formulários e botões; fonte aberta carregada pela folha de estilos do Google Fonts no arquivo `template.html`.
- **Boston Angel Light/Bold:** títulos principais e aberturas. Token `--fonte-exibicao`; alternativa aberta temporária: Bodoni Moda.
- **Higuen Elegant Serif:** destaques editoriais. Token `--fonte-higuen`; alternativa temporária: Cormorant Garamond.
- **TAN Garland:** painéis editoriais e chamadas de convênios. Token `--fonte-tan`; alternativa temporária: Cormorant Garamond.
- **Burgues Script:** caligrafia de acentos muito curtos. Token `--fonte-assinatura`; alternativa temporária: Great Vibes. Não usar para parágrafos.
- **Logotipo Bucalis:** a assinatura existente em `src/components/Marca.jsx` é desenho vetorial e **não** deve ser reescrita com uma fonte tipográfica.

### Limitação dos arquivos de fonte

O PDF contém **amostras incorporadas como subconjuntos de fonte**, não necessariamente arquivos completos com todos os caracteres necessários a um site. Não extraia nem redistribua subconjuntos comerciais do PDF. Para exibir Boston Angel, Higuen, TAN Garland e Burgues Script **exatamente como no material**, a clínica precisa fornecer arquivos de fonte completos e uma licença adequada para uso na web (`woff2`/webfont). Sem isso, o navegador usa as alternativas abertas acima. Nenhuma imagem vetorial da assinatura foi substituída.

## Aplicação por componente

| Área | Aplicação |
| --- | --- |
| Início e títulos h1/h2 | Boston Angel com alternativa Bodoni Moda |
| Títulos de chamadas | Higuen com alternativa Cormorant Garamond |
| Painel de convênios | TAN Garland com alternativa Cormorant Garamond |
| Navegação e menus | Poppins |
| Descrições e textos | Poppins |
| Formulários, agendamento e atendimento | Poppins |
| Rodapé e links legais | Poppins + tons oficiais |
| Controles de acessibilidade | Vinho/areia; modo alto contraste preservado |
| Painéis de azulejos | Apenas os sete tons da paleta |
| Redes sociais, favicon e manifest | Tons oficiais definidos em `scripts/gerar-identidade.py` |

## Manutenção

1. Evite especificar novas cores hexadecimal nos componentes; utilize tokens `--bucalis-*`.
2. Para novas seções, defina a hierarquia com fonte editorial nos títulos e Poppins no texto.
3. Preserve contraste e legibilidade, inclusive no celular.
4. Depois de alterar a identidade, execute `npm run verify`. O GitHub Actions também regenera as imagens, o HTML e a versão compilada do site.
5. O repositório principal permanece em `main`. A publicação atual do Pages utiliza os arquivos HTML compilados espelhados em `gh-pages`, até que o proprietário altere a fonte em Settings → Pages.
