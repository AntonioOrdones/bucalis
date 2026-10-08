# Guia de conteúdo

Todo o conteúdo editável fica em `src/data/`. Depois de alterar, rode `npm run dev` para conferir e envie para a `main` — o site é republicado automaticamente.

## Dados da clínica — `src/data/clinica.js`

- **Identidade:** `nome` (completo, usado em títulos e no Google), `nomeCurto` (aparece na marca do cabeçalho) e `complementoMarca`.
- **`descricao`:** texto que aparece no Google e ao compartilhar o site. Até ~155 caracteres.
- **`anoFundacao`:** calcula os “anos de experiência” automaticamente a cada publicação.
- **Contato:** o WhatsApp vai **só com números**, começando por 55 + DDD (ex.: `5561991234567`). O telefone segue o formato `+556133334444`; os campos `...Exibicao` são o texto mostrado na tela.
- **Endereço e mapa:** `latitude`/`longitude` (no Google Maps, clique com o botão direito no local). Em `mapa.consulta`, quando a clínica tiver Perfil da Empresa no Google, use “Nome da clínica, endereço” para o mapa mostrar o pin da empresa. Também é possível colar em `mapa.embedUrl` o endereço do iframe gerado em _Google Maps → Compartilhar → Incorporar um mapa_.
- **Horários:** `diasSemana` usa 0 = domingo … 6 = sábado. Feriados e recessos podem ser avisados em `observacaoHorario`.
- **Dados legais:** razão social, CNPJ, inscrição no CRO-DF, responsável técnico e encarregado de dados (LGPD). O Código de Ética Odontológica exige que a publicidade de clínicas mostre o nome e a inscrição da clínica e do responsável técnico — por isso esses dados aparecem no rodapé e na página da clínica.
- **História, valores e estrutura:** textos da página “A clínica”. Liste em `estrutura` apenas o que a clínica realmente oferece.

## Tratamentos — `src/data/tratamentos.js`

Cada tratamento gera um card na home, um item no rodapé e uma página em `/tratamentos/<slug>/`.

| Campo                                       | Uso                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`                                      | Endereço da página (minúsculas, sem acentos, com hífens). **Evite mudar depois de publicado**: links e posições no Google se perdem.                                  |
| `nome`, `nomeCompleto`                      | Título; `nomeCompleto` é opcional (ex.: “Endodontia (tratamento de canal)”).                                                                                          |
| `nomeNaFrase`                               | Como o nome aparece no meio de frases e na mensagem do WhatsApp (ex.: “tratamento de canal”).                                                                         |
| `mensagemWhatsApp`                          | Opcional: substitui a mensagem padrão do WhatsApp para esse tratamento.                                                                                               |
| `icone`                                     | Um dos ícones de `src/components/Icone.jsx` (`implante`, `ortodontia`, `crianca`, `estetica`, `canal`, `gengiva`, `protese`, `cirurgia`, `articulacao`, `prevencao`). |
| `resumo`                                    | Texto curto dos cards.                                                                                                                                                |
| `descricaoSeo`                              | Texto para o Google (até ~155 caracteres).                                                                                                                            |
| `introducao`, `indicacoes`, `etapas`, `faq` | Conteúdo da página. As etapas são numeradas, então descreva uma sequência real.                                                                                       |
| `relacionados`                              | Slugs de outros tratamentos sugeridos ao final da página.                                                                                                             |

**Redação e ética profissional:** o conteúdo é informativo. Evite promessas de resultado (“sem dor”, “resultado garantido”), superlativos (“o melhor”), preços, descontos ou formas de pagamento — vedados pelo Código de Ética Odontológica. Peça ao responsável técnico para revisar.

Para **retirar** um tratamento, apague o objeto e remova o slug de `relacionados` (em outros tratamentos) e de `especialidades` (em `equipe.js`). `npm test` avisa se alguma referência ficar quebrada.

## Equipe — `src/data/equipe.js`

- Use “Dra.” e “Dr.” conforme o caso — o rótulo de “responsável técnica/técnico” se ajusta sozinho.
- `cro` é obrigatório. Anuncie apenas especialidades registradas no CRO.
- `especialidades` liga a pessoa às páginas de tratamento (“Quem atende”).
- `responsavelTecnico: true` mostra o selo no card.
- `instagram`: só o usuário, sem @.

## Convênios — `src/data/convenios.js`

A lista é de **exemplo**. Mantenha apenas os planos com contrato ativo e mude `listaDeExemplo` para `false`. A busca ignora acentos e maiúsculas, e quem não encontra o plano recebe um atalho para perguntar pelo WhatsApp.

## Perguntas frequentes — `src/data/faq.js`

Perguntas gerais (home e contato). O campo `link` é opcional e aponta para uma página do site. As perguntas de cada tratamento ficam no próprio tratamento.

## Fotos

O site funciona sem fotos (usa a parede de madeira desenhada, os azulejos e monogramas). Para usar fotos reais:

1. Exporte em **WebP** (ou JPG), com boa compressão — use, por exemplo, o [Squoosh](https://squoosh.app/).
2. Coloque em `public/fotos/` (crie a pasta) com nomes descritivos, sem espaços nem acentos: `public/fotos/equipe/ana-lima.webp`.
3. Informe o caminho começando por `/fotos/...`:
   - Equipe (`equipe.js → foto`): retrato 3:4, cerca de 900 × 1200 px, até ~150 KB.
   - Abertura da home (`clinica.js → fotoFachada`): horizontal, cerca de 2400 × 1400 px, até ~350 KB.
   - Seção “A clínica” da home (`clinica.js → fotoClinica`): vertical, cerca de 1200 × 1500 px, e o texto alternativo em `textoAlternativoFotoClinica`.

Use apenas fotos com autorização de uso. Fotos de pacientes — inclusive “antes e depois” — exigem autorização por escrito e seguem regras próprias do CFO.

## Imagem de compartilhamento e ícones

- `public/og-image.jpg` (1200 × 630): aparece ao compartilhar o link no WhatsApp e nas redes. A atual não traz o nome da clínica, então continua válida após trocar o nome.
- `public/favicon.svg` e `public/icons/*.png`: ícones do navegador e da tela inicial. Se trocar o símbolo da marca, gere novamente os PNGs (32, 180, 192, 512 e 512 “maskable”, com margem de segurança).


## Dados atualizados em 8 de outubro de 2026

Os dados abaixo foram fornecidos pela Bucalis e substituem todos os exemplos usados no protótipo:

- **Endereço:** SEPS Q 710/910, Edifício Via Brasil, salas 226, 228 e 230, Asa Sul, Brasília – DF, CEP 70390-108.
- **Telefone fixo:** (61) 3346-1495.
- **WhatsApp:** (61) 9 9292-4408.
- **Horários:** segunda a sexta-feira, das 9h às 18h; sábados e domingos fechados. Feriados ainda não foram informados.
- **Fotografias reais:** 19 registros da recepção, dos consultórios, das áreas de planejamento e dos ambientes internos. Os arquivos WebP originais para o build estão em `scripts/assets/fotos-bucalis-web.zip`, descritos em `src/data/fotografias.js`.

### Conceito editorial e textos fornecidos

O material institucional encaminhado em 8 de outubro apresenta a assinatura:
**“Odontologia especializada. Cuidado integrado.”** E o conceito emocional: **“Cuidar começa por escutar.”**

A página principal e “A clínica” passaram a refletir escuta, diagnóstico, planejamento, precisão e integração. As duas páginas distinguem os serviços clínicos da apresentação institucional. O texto é usado como referência editorial; **não confirma, por si só, diplomas, títulos de especialista, CRO ou serviços efetivamente oferecidos**.

### Pendências para publicação institucional definitiva

- Razão social, CNPJ e inscrição CRO da pessoa jurídica.
- Nome e registro do responsável técnico, CRO dos profissionais e autorização para associar nomes a retratos.
- E-mail oficial e canal LGPD (nome/contato do encarregado ou canal estabelecido).
- Data de fundação, quantidade de consultórios e lista final de especialidades efetivamente atendidas (os números anteriores eram provisórios e foram retirados).
- IDs **confirmados** de Google Reviews e Instagram Feed da conta Elfsight Bucalis, se os exemplos fornecidos forem apenas ilustrativos.
- Perfil da Empresa no Google e horários de feriados.
- Conferência das operadoras e regras de cobertura da lista de convênios.

Nenhum dos dados cadastrais fictícios do protótipo deve aparecer no site público. Os campos permanecem vazios em `src/data/clinica.js` e o corpo clínico sem perfis nominais até validação.
