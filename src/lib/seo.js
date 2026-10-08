import { clinica } from '../data/clinica.js';
import { tratamentos } from '../data/tratamentos.js';
import { horariosSchema } from './horarios.js';
import { escaparHtml } from './texto.js';
import { asset, urlAbsoluta } from './url.js';

/**
 * Metadados de cada página.
 * @typedef {Object} Meta
 * @property {string} [titulo]     Título da página (sem o nome da clínica).
 * @property {string} [descricao]  Meta description (até ~155 caracteres).
 * @property {string} caminho      Caminho canônico ("/tratamentos/").
 * @property {string} [imagem]     Imagem Open Graph (arquivo em public/).
 * @property {Array}  [jsonLd]     Blocos de dados estruturados.
 * @property {boolean} [indexar]   false para noindex (ex.: 404).
 */

export function tituloCompleto(meta = {}) {
  return meta.titulo
    ? `${meta.titulo} | ${clinica.nome}`
    : `${clinica.nome} | Odontologia especializada em Brasília`;
}

const json = (dados) => JSON.stringify(dados).replace(/</g, '\\u003c');

/** Gera as tags do <head> de uma página (usado na pré-renderização). */
export function renderizarHead(meta = {}) {
  const titulo = escaparHtml(tituloCompleto(meta));
  const descricao = escaparHtml(meta.descricao || clinica.descricao);
  const canonical = urlAbsoluta(meta.caminho || '/');
  const imagem = urlAbsoluta(meta.imagem || '/og-bucalis-2026.png');
  const tags = [
    `<title>${titulo}</title>`,
    `<meta name="description" content="${descricao}">`,
    meta.indexar === false
      ? '<meta name="robots" content="noindex, follow">'
      : '<meta name="robots" content="index, follow, max-image-preview:large">',
    meta.indexar === false ? '' : `<link rel="canonical" href="${canonical}">`,
    '<meta property="og:locale" content="pt_BR">',
    `<meta property="og:site_name" content="${escaparHtml(clinica.nome)}">`,
    `<meta property="og:type" content="${meta.tipo || 'website'}">`,
    `<meta property="og:title" content="${titulo}">`,
    `<meta property="og:description" content="${descricao}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${imagem}">`,
    `<meta property="og:image:secure_url" content="${imagem}">`,
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${escaparHtml(clinica.nome)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:image" content="${imagem}">`,
    '<meta name="theme-color" content="#2e1711">',
    `<link rel="icon" href="${asset('/favicon-bucalis.svg')}" type="image/svg+xml">`,
    `<link rel="icon" href="${asset('/icons/favicon-bucalis-32.png')}" sizes="32x32" type="image/png">`,
    `<link rel="apple-touch-icon" href="${asset('/icons/apple-bucalis-touch-icon.png')}">`,
    `<link rel="manifest" href="${asset('/site.webmanifest')}">`,
    ...(meta.jsonLd || []).map((bloco) => `<script type="application/ld+json">${json(bloco)}</script>`),
  ];
  return tags.filter(Boolean).join('\n    ');
}

/* ── Dados estruturados (schema.org) ─────────────────────────────────── */

const ID_CLINICA = () => urlAbsoluta('/#clinica');

export function schemaClinica() {
  const { endereco, contato, redes } = clinica;
  const sameAs = [
    redes.instagram && `https://www.instagram.com/${redes.instagram}/`,
    redes.facebook,
    redes.youtube,
    clinica.google.perfilUrl,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': ID_CLINICA(),
    name: clinica.nome,
    description: clinica.descricao,
    url: urlAbsoluta('/'),
    image: urlAbsoluta('/og-bucalis-2026.png'),
    logo: urlAbsoluta('/icons/icon-bucalis-512.png'),
    telephone: contato.telefone,
    email: contato.email,
    foundingDate: String(clinica.anoFundacao),
    address: {
      '@type': 'PostalAddress',
      streetAddress: [endereco.logradouro, endereco.complemento].filter(Boolean).join(', '),
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: endereco.latitude,
      longitude: endereco.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinica.mapa.consulta)}`,
    areaServed: { '@type': 'City', name: 'Brasília' },
    openingHoursSpecification: horariosSchema(clinica.horarios),
    knowsAbout: tratamentos.map((t) => t.nome),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function schemaSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': urlAbsoluta('/#site'),
    name: clinica.nome,
    url: urlAbsoluta('/'),
    inLanguage: 'pt-BR',
    publisher: { '@id': ID_CLINICA() },
  };
}

/** @param {{nome: string, caminho: string}[]} itens */
export function schemaTrilha(itens) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: urlAbsoluta(item.caminho),
    })),
  };
}

/** @param {{pergunta: string, resposta: string}[]} perguntas */
export function schemaPerguntas(perguntas) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
}

export function schemaPaginaTratamento(tratamento) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: tratamento.nomeCompleto || tratamento.nome,
    description: tratamento.descricaoSeo,
    url: urlAbsoluta(`/tratamentos/${tratamento.slug}/`),
    inLanguage: 'pt-BR',
    about: {
      '@type': 'MedicalProcedure',
      name: tratamento.nomeCompleto || tratamento.nome,
    },
    publisher: { '@id': ID_CLINICA() },
    isPartOf: { '@id': urlAbsoluta('/#site') },
  };
}
