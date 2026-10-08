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
    'Bucalis Odontologia Especializada: atendimento odontológico e cuidados com a saúde bucal. Conheça os serviços e entre em contato para saber mais.',
  anoFundacao: 2008, // ⚠️ TROCAR — calcula os "anos de experiência"
  consultorios: 6, // ⚠️ TROCAR

  /* ── Fotos (opcionais) ──────────────────────────────────────────────── */
  // Coloque os arquivos em public/fotos/ e informe o caminho, ex.: '/fotos/recepcao.webp'.
  // Sem foto, o site usa as composições desenhadas (parede ripada, azulejos).
  fotoFachada: '', // abertura da home — horizontal, ~2400×1400 px
  fotoClinica: '', // seção "A clínica" — vertical, ~1200×1500 px
  textoAlternativoFotoClinica: 'Recepção da clínica',

  /* ── Página "A clínica" ─────────────────────────────────────────────── */
  historia: [
    // ⚠️ TROCAR — conte a história real da clínica.
    'A clínica nasceu da vontade de reunir, em um só endereço, especialistas de todas as áreas da odontologia. Assim, quem chega para uma consulta de rotina encontra a mesma equipe quando precisa de um implante, de um aparelho ou de um tratamento de canal.',
    'Ao longo dos anos, a equipe cresceu, mas o jeito de trabalhar continua o mesmo: ouvir com atenção, explicar cada etapa com clareza e planejar os tratamentos em conjunto, sempre que o caso envolve mais de uma especialidade.',
  ],
  valores: [
    {
      titulo: 'Escuta antes de tudo',
      texto:
        'A primeira consulta é uma conversa. Entender a sua rotina e as suas expectativas vem antes de qualquer proposta.',
    },
    {
      titulo: 'Planejamento em equipe',
      texto:
        'Casos que envolvem mais de uma especialidade são discutidos entre os profissionais, para um plano único e coerente.',
    },
    {
      titulo: 'Clareza em cada etapa',
      texto:
        'Você recebe o plano por escrito, com as opções possíveis, os prazos e o que esperar de cada fase.',
    },
    {
      titulo: 'Biossegurança rigorosa',
      texto:
        'Instrumentais esterilizados e protocolos de controle de infecção seguidos à risca, em todos os atendimentos.',
    },
  ],
  // ⚠️ TROCAR — liste apenas o que a clínica realmente oferece.
  estrutura: [
    'Consultórios individuais e climatizados',
    'Central de esterilização com controle de ciclos',
    'Radiografia digital no consultório',
    'Acesso por rampa e elevador',
    'Sala de espera com área para crianças',
    'Wi-Fi para pacientes e acompanhantes',
  ],

  /* ── Contato ────────────────────────────────────────────────────────── */
  contato: {
    // Somente dígitos, com DDI 55 + DDD + número.
    whatsapp: '5561900000000', // ⚠️ TROCAR
    whatsappExibicao: '(61) 90000-0000', // ⚠️ TROCAR
    telefone: '+556130000000', // ⚠️ TROCAR — formato E.164 (usado em links tel:)
    telefoneExibicao: '(61) 3000-0000', // ⚠️ TROCAR
    email: 'contato@suaclinica.com.br', // ⚠️ TROCAR
    // Mensagem padrão que abre no WhatsApp.
    mensagemPadrao: 'Olá! Vim pelo site e gostaria de agendar uma avaliação.',
  },

  /* ── Endereço ───────────────────────────────────────────────────────── */
  endereco: {
    logradouro: 'SHLS 000, Bloco 0, Sala 000', // ⚠️ TROCAR
    complemento: 'Edifício Exemplo', // ⚠️ TROCAR (ou deixe '')
    bairro: 'Asa Sul',
    cidade: 'Brasília',
    uf: 'DF',
    cep: '70000-000', // ⚠️ TROCAR
    // Coordenadas aproximadas (Google Maps → clique com o botão direito no local).
    latitude: -15.8166, // ⚠️ TROCAR
    longitude: -47.9035, // ⚠️ TROCAR
    // Dicas que ajudam o paciente a chegar.
    comoChegar: 'Estacionamento público em frente ao prédio. Acesso por rampa e elevador.', // ⚠️ TROCAR
  },

  mapa: {
    // Texto pesquisado no Google Maps. Quando a clínica tiver perfil no Google,
    // use "Nome da Clínica, endereço" para o mapa mostrar o pin da empresa.
    consulta: 'Asa Sul, Brasília - DF', // ⚠️ TROCAR
    // Opcional: cole aqui o "src" do iframe gerado em Google Maps → Compartilhar → Incorporar.
    embedUrl: '',
  },

  /* ── Horários ───────────────────────────────────────────────────────── */
  // diasSemana: 0 = domingo … 6 = sábado. Horário de Brasília.
  horarios: [
    {
      rotulo: 'Segunda a sexta',
      diasSemana: [1, 2, 3, 4, 5],
      abre: '08:00',
      fecha: '19:00',
    }, // ⚠️ TROCAR
    { rotulo: 'Sábado', diasSemana: [6], abre: '08:00', fecha: '12:00' }, // ⚠️ TROCAR
  ],
  observacaoHorario: 'Atendimento com hora marcada. Em caso de urgência, chame no WhatsApp.',

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
    razaoSocial: 'Razão Social da Clínica Ltda.', // ⚠️ TROCAR
    cnpj: '00.000.000/0001-00', // ⚠️ TROCAR
    inscricaoCro: 'CRO-DF EPAO nº 0000', // ⚠️ TROCAR
    responsavelTecnico: {
      nome: 'Dra. Nome Sobrenome', // ⚠️ TROCAR
      cro: 'CRO-DF 0000', // ⚠️ TROCAR
    },
    // Encarregado pelo tratamento de dados pessoais (LGPD, art. 41).
    encarregado: {
      nome: 'Nome do encarregado', // ⚠️ TROCAR
      email: 'privacidade@suaclinica.com.br', // ⚠️ TROCAR
    },
    atualizacaoPoliticas: '8 de outubro de 2026',
  },

  /* ── Integrações (todas opcionais) ──────────────────────────────────── */
  integracoes: {
    // IDs dos widgets da Elfsight (painel Elfsight → widget → "Add to website").
    // Ex.: para "elfsight-app-1234abcd-…", use só "1234abcd-…".
    elfsightAvaliacoesGoogle: '',
    elfsightFeedInstagram: '',
    // Google Analytics 4 (ex.: "G-XXXXXXX"). Só carrega após consentimento.
    ga4: '',
    // Vídeo institucional no YouTube (só o ID, ex.: "dQw4w9WgXcQ"). Vazio = seção oculta.
    youtubeVideoId: '',
  },

  /* ── Endereço público do site ───────────────────────────────────────── */
  // Usado só em builds locais. No GitHub Actions a URL é detectada sozinha.
  urlPadrao: 'https://antonioordones.github.io/site2',
};

/** Anos de experiência calculados a partir do ano de fundação. */
export const anosDeExperiencia = __BUILD_YEAR__ - clinica.anoFundacao;

/** Endereço em uma linha, para textos e dados estruturados. */
export const enderecoCompleto = [
  clinica.endereco.logradouro,
  clinica.endereco.complemento,
  `${clinica.endereco.bairro}, ${clinica.endereco.cidade} – ${clinica.endereco.uf}`,
  `CEP ${clinica.endereco.cep}`,
]
  .filter(Boolean)
  .join(', ');
