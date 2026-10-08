# Identidade visual

A base vem da referência (Primore): madeira escura, bronze, fundos claros, botões em pílula e um bronze polido nas ações principais. Sobre ela, três homenagens discretas a Brasília.

## Brasília em três detalhes

| Referência                        | Onde aparece                                                                                                                                                                             | Arquivo                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Curvas de Oscar Niemeyer**      | Símbolo da marca (um dente desenhado como um trecho da colunata do Palácio da Alvorada); molduras em arco nas fotos; colunata em traço fino na base da abertura; arcos ligando as etapas | `components/Marca.jsx`, `components/Colunata.jsx`, `components/Etapas.jsx` |
| **Azulejos de Athos Bulcão**      | Painel da seção “A clínica”, monogramas da equipe, faixa do rodapé, painel do Instagram e página 404                                                                                     | `components/Azulejos.jsx`                                                  |
| **Bronzes de Alfredo Ceschiatti** | Botões em bronze polido e números da apresentação                                                                                                                                        | `--metal-bronze` em `styles/tokens.css`                                    |

Os azulejos são **módulos originais** (quarto de círculo, arco, faixa e diagonal) assentados em rotações livres — o método que Athos Bulcão usava —, sem reproduzir painéis do artista. As rotações vêm de um gerador com semente: o desenho é sempre o mesmo para uma mesma `semente`, e o servidor e o navegador o desenham igual. Passe o mouse sobre um azulejo: ele gira.

A página “A clínica” explica essas homenagens na seção “Brasília em cada detalhe”.

## Tokens

Definidos em `src/styles/tokens.css`:

- **Madeira:** `--jacaranda-900` (fundos escuros, rodapé) e `--cacau-700` (botão principal).
- **Bronze:** `--bronze-600` (títulos), `--bronze-500`, `--bronze-300` e `--bronze-100`.
- **Mármore:** `--branco`, `--marmore-100` (seções alternadas) e `--linha` (bordas).
- **Azulejo:** `--azulejo-600`, usado com parcimônia — foco do teclado, rótulos e alguns azulejos.
- **Tipografia:** Jost (títulos; herdeira da Futura, a letra do modernismo) e Source Sans 3 (textos). Escala de 14 a 72 px em `--fs-0` a `--fs-7`.
- **Formas:** pílula para ações, raio grande para painéis e **arco** (`--raio-arco`) para imagens.

## Trocar a marca

- **Nome:** `clinica.nome` e `clinica.nomeCurto` em `src/data/clinica.js`. O letreiro da abertura e o cabeçalho usam o nome em texto, então mudam sozinhos.
- **Símbolo:** o desenho está em `CAMINHO_SIMBOLO` (`components/Marca.jsx`) e em `public/favicon.svg`. Para usar um logotipo em imagem, substitua o componente `Simbolo` por uma `<img>`.
- **Cores:** ajuste os tokens. Mantenha contraste mínimo de 4,5:1 para textos (verifique em [contrast-ratio.com](https://contrast-ratio.com/)).

## Movimento

Um único momento orquestrado: as luzes da abertura “acendem” ao carregar. O restante do movimento responde ao visitante (azulejos que giram, cartões que se empilham ao rolar). Tudo é desligado com “Reduzir animações” ou com a preferência do sistema.
