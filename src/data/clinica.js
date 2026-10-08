/**
 * ════════════════════════════════════════════════════════════════════════
 *  DADOS DA CLÍNICA — fonte única de verdade
 * ════════════════════════════════════════════════════════════════════════
 *  Tudo o que identifica a clínica (nome, contatos, endereço, horários,
 *  dados legais e integrações) fica aqui. Os componentes leem este arquivo,
 *  então uma alteração aqui atualiza o site inteiro: cabeçalho, rodapé,
 *  botões de WhatsApp, mapa, dados estruturados (Google) e páginas legais.
 *
 *  Itens marcados com  ⚠️ TROCAR  são provisórios e precisam ser revisados
 *  antes da publicação. O comando `npm run check` lista os que restarem.
 * ════════════════════════════════════════════════════════════════════════
 */

export const clinica = {
  /* ── Identidade ─────────────────────────────────────────────────────── */
  nome: 'Bucalis Odontologia Especializada',
  nomeCurto: 'Bucalis',
  complementoMarca: 'Odontologia especializada',
  // Descrição padrão (Google, redes sociais). Até ~155 caracteres.
  descricao:
    'Bucalis Odontologia Especializada em Brasília. Conhecimento, planejamento e cuidado integrado para cada pessoa.',
  anoFundacao: null, // PENDENTE: confirmar a data de fundação; nunca divulgar data estimada
  consultorios: null, // PENDENTE: quantidade não comprovada; o site não divulga números

  /* ── Fotos (opcionais) ──────────────────────────────────────────────── */
  // Coloque os arquivos em public/fotos/ e informe o caminho, ex.: '/fotos/recepcao.webp'.
  // Sem foto, o site usa as composições desenhadas (parede ripada, azulejos).
  fotoFachada: '/fotos/foto-296.webp', // recepção oficial, foto enviada pela clínica
  fotoClinica: '/fotos/foto-141.webp', // avaliação e planejamento, foto enviada pela clínica
  textoAlternativoFotoClinica: 'Profissionais discutem exames e planejamento odontológico em uma sala da Bucalis',

  /* ── Página "A clínica" ─────────────────────────────────────────────── */
  historia: [
    'A Bucalis é uma clínica de Odontologia Especializada construída a partir do compromisso com o conhecimento, o planejamento e o cuidado individualizado.',
    'Nossa atuação integra diferentes especialidades para compreender necessidades, discutir possibilidades e orientar cada paciente com atenção e clareza.',
    'Preservamos uma forma de trabalhar em que a escuta e o diagnóstico vêm antes de qualquer procedimento.',
  ],
  valores: [
    { titulo: 'Escuta', texto: 'Entender antes de propor. Cada pessoa chega com sua história e suas necessidades.' },
    { titulo: 'Conhecimento', texto: 'Formação técnica e atualização constante orientam a prática clínica.' },
    { titulo: 'Precisão', texto: 'Diagnóstico e planejamento contribuem para decisões responsáveis.' },
    { titulo: 'Integração', texto: 'Diferentes especialidades podem colaborar quando um caso exige mais de um olhar.' },
    { titulo: 'Humanização', texto: 'Respeito à individualidade, às expectativas e ao tempo de cada paciente.' },
    { titulo: 'Ética e confiança', texto: 'Clareza nas orientações e indicação de cuidados adequados a cada situação.' },
  ],
  // Ambientes observáveis nas fotografias fornecidas; sem alegações de infraestrutura não verificadas.
  estrutura: [
    'Recepção e áreas de espera',
    'Consultórios e equipamentos para atendimento odontológico',
    'Ambientes para avaliação, diagnóstico e planejamento',
    'Espaços de apoio ao atendimento',
  ],

  /* ── Contato ────────────────────────────────────────────────────────── */
  contato: {
    // Somente dígitos, com DDI 55 + DDD + número.
    whatsapp: '5561992924408', // confirmado pelo material enviado em 08/10/2026
    whatsappExibicao: '(61) 9 9292-4408',
    telefone: '+556133461495', // confirmado pelo material enviado
    telefoneExibicao: '(61) 3346-1495',
    email: '', // PENDENTE: email institucional oficial não informado
    // Mensagem padrão que abre no WhatsApp.
    mensagemPadrao: 'Olá! Vim pelo site e gostaria de agendar uma avaliação.',
  },

  /* ── Endereço ───────────────────────────────────────────────────────── */
  endereco: {
    logradouro: 'SEPS Q 710/910',
    complemento: 'Edifício Via Brasil, salas 226, 228 e 230',
    bairro: 'Asa Sul',
    cidade: 'Brasília',
    uf: 'DF',
    cep: '70390-108',
    // Coordenadas aproximadas (Google Maps → clique com o botão direito no local).
    latitude: null, // PENDENTE: não publicar coordenadas aproximadas
    longitude: null, // PENDENTE: não publicar coordenadas aproximadas
    // Dicas que ajudam o paciente a chegar.
    comoChegar: 'Edifício Via Brasil, salas 226, 228 e 230. Confira o trajeto no mapa antes de sair.',
  },

  mapa: {
    // Texto pesquisado no Google Maps. Quando a clínica tiver perfil no Google,
    // use "Nome da Clínica, endereço" para o mapa mostrar o pin da empresa.
    consulta: 'Bucalis Odontologia Especializada, Edifício Via Brasil, SEPS Q 710/910, Brasília - DF, 70390-108',
    // Opcional: cole aqui o "src" do iframe gerado em Google Maps → Compartilhar → Incorporar.
    embedUrl: '',
  },

  /* ── Horários ───────────────────────────────────────────────────────── */
  // diasSemana: 0 = domingo … 6 = sábado. Horário de Brasília.
  horarios: [
    {
      rotulo: 'Segunda a sexta',
      diasSemana: [1, 2, 3, 4, 5],
      abre: '09:00',
      fecha: '18:00',
    },
  ],
  observacaoHorario: 'Segunda a sexta-feira, das 9h às 18h. Fechado aos sábados e domingos. Horários em feriados devem ser confirmados com a equipe.',

  /* ── Redes e Google ─────────────────────────────────────────────────── */
  redes: {
    instagram: 'bucalis.oficial',
    facebook: '', // URL completa (opcional)
    youtube: '', // URL completa do canal (opcional)
  },
  google: {
    // Link "Ver avaliações" (Google Maps → sua empresa → Compartilhar).
    perfilUrl: '', // ⚠️ TROCAR quando houver Perfil da Empresa no Google
    // Link "Escrever avaliação" (Perfil da Empresa → Pedir avaliações).
    avaliarUrl: '',
  },

  /* ── Dados legais (CFO e LGPD) ──────────────────────────────────────── */
  // O Código de Ética Odontológica exige, na publicidade de pessoa jurídica,
  // o nome e o número de inscrição da clínica e do responsável técnico.
  legal: {
    razaoSocial: '', // PENDENTE: não exibir razão social fictícia
    cnpj: '', // PENDENTE: não exibir CNPJ fictício
    inscricaoCro: '', // PENDENTE: confirmar registro da pessoa jurídica
    responsavelTecnico: {
      nome: '', // PENDENTE: validar responsável técnico
      cro: '', // PENDENTE: número real do responsável técnico
    },
    // Encarregado pelo tratamento de dados pessoais (LGPD, art. 41).
    encarregado: {
      nome: '', // PENDENTE: contato LGPD
      email: '', // PENDENTE: endereço verificado do encarregado
    },
    atualizacaoPoliticas: '8 de outubro de 2026',
  },

  /* ── Integrações (todas opcionais) ──────────────────────────────────── */
  integracoes: {
    // IDs dos widgets da Elfsight (painel Elfsight → widget → "Add to website").
    // Ex.: para "elfsight-app-1234abcd-…", use só "1234abcd-…".
    // IDs exibidos como EXEMPLO pelo usuário; deixe vazios até confirmar
    // que estão ativos, vinculados à Bucalis e prontos para publicação.
    // Google Reviews: 23de462b-ae38-4aac-95c6-f3b2e4cb36d0
    // Instagram Feed: 27adea07-24c9-475b-8dad-760fa3506282
    elfsightAvaliacoesGoogle: '',
    elfsightFeedInstagram: '',
    // Google Analytics 4 (ex.: "G-XXXXXXX"). Só carrega após consentimento.
    ga4: '',
    // Vídeo institucional no YouTube (só o ID, ex.: "dQw4w9WgXcQ"). Vazio = seção oculta.
    youtubeVideoId: '',
  },

  /* ── Endereço público do site ───────────────────────────────────────── */
  // Usado só em builds locais. No GitHub Actions a URL é detectada sozinha.
  urlPadrao: 'https://antonioordones.github.io/bucalis',
};

/** Anos de experiência calculados a partir do ano de fundação. */
export const anosDeExperiencia = clinica.anoFundacao ? __BUILD_YEAR__ - clinica.anoFundacao : null;

/** Endereço em uma linha, para textos e dados estruturados. */
export const enderecoCompleto = [
  clinica.endereco.logradouro,
  clinica.endereco.complemento,
  `${clinica.endereco.bairro}, ${clinica.endereco.cidade} – ${clinica.endereco.uf}`,
  `CEP ${clinica.endereco.cep}`,
]
  .filter(Boolean)
  .join(', ');
