# Integrações e privacidade

O site é estático: não há servidor nem banco de dados próprios. Os serviços externos abaixo são opcionais e configurados em `src/data/clinica.js → integracoes`.

## Consentimento (LGPD)

- Por padrão, **nenhum serviço de terceiros é carregado**. O aviso de privacidade oferece “Aceitar tudo”, “Só o essencial” e “Personalizar”.
- Categorias: **Conteúdo de terceiros** (Elfsight, Google Maps, YouTube) e **Estatísticas de visita** (Google Analytics).
- Cada conteúdo bloqueado mostra um aviso com o botão “Carregar”, que libera só aquele item.
- A escolha fica no `localStorage` do navegador (`clinica:consentimento:v1`) e pode ser revista a qualquer momento em “Preferências de privacidade”, no rodapé.
- Código: `src/lib/consentimento.js`, `src/components/Consentimento.jsx` e `src/components/Terceiros.jsx`.

Se mudar as categorias ou os serviços, atualize a página `src/pages/Privacidade.jsx`.

## Avaliações do Google e feed do Instagram (Elfsight)

1. Crie os widgets em [elfsight.com](https://elfsight.com/) (“Google Reviews” e “Instagram Feed”) e conecte o Perfil da Empresa no Google e o Instagram da clínica.
2. Em _Add to website_, copie o identificador que aparece em `elfsight-app-XXXXXXXX-XXXX-...`.
3. Cole **só a parte depois de `elfsight-app-`** em `elfsightAvaliacoesGoogle` e `elfsightFeedInstagram`.

Comportamento:

- A seção de avaliações só aparece quando há widget **ou** o link do Perfil da Empresa (`google.perfilUrl`).
- Sem widget de Instagram, a seção mostra um painel de azulejos que leva ao perfil (`redes.instagram`).
- O script `elfsightcdn.com/platform.js` só é carregado após o consentimento.
- Os IDs são públicos (fazem parte do código de incorporação) — não são senhas.

## Google Analytics 4

1. Crie uma propriedade GA4 e copie o ID de medição (`G-XXXXXXX`) para `ga4`.
2. O GA só carrega para quem aceitar “Estatísticas de visita”; se a pessoa revogar, a coleta para.
3. Eventos já enviados: `contato_whatsapp`, `contato_telefone`, `contato_email`, `agendamento_formulario` e cliques com `data-evento` (ex.: `whatsapp_fachada`, `whatsapp_tratamento`, `whatsapp_convenio`).

Nunca coloque chaves de API, senhas ou tokens no código: tudo aqui é público.

## Google Maps

O mapa usa um esquema desenhado do Plano Piloto até o visitante clicar em “Carregar mapa”. Configure `mapa.consulta` (texto da busca) ou `mapa.embedUrl` (iframe oficial do Google Maps). O link “Como chegar” abre o Google Maps com o destino preenchido.

## YouTube

Informe o ID do vídeo em `youtubeVideoId` para exibir a seção “Conheça a clínica por dentro” na home. O vídeo usa o domínio de privacidade avançada (`youtube-nocookie.com`) e só carrega com consentimento ou clique.

## WhatsApp

Botões e formulário apenas **montam links** `wa.me` com a mensagem pronta; nada é enviado ao site nem armazenado. O número fica em `contato.whatsapp`.

## VLibras

O tradutor de Libras do Governo Federal é carregado somente quando o visitante o ativa no menu de acessibilidade. A escolha fica salva no navegador e o widget volta a carregar nas próximas visitas.

## Fontes

Jost e Source Sans 3 são servidas pelo próprio site (pacotes Fontsource), sem chamadas ao Google Fonts.

## Antes de adicionar um novo serviço externo

Registre: finalidade, dados que podem ser enviados, quando o script carrega, se depende de consentimento, política de privacidade do fornecedor, comportamento quando o serviço falha e quem administra a conta. Depois, inclua o serviço na categoria certa do consentimento e na política de privacidade.
