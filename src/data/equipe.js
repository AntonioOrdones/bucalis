/**
 * EQUIPE
 * ⚠️ TROCAR — os nomes abaixo são marcadores. Substitua pelos profissionais
 * reais, com o número de inscrição no CRO (exigência do Código de Ética).
 * Anuncie apenas especialidades registradas no Conselho.
 *
 * foto: caminho de um arquivo em public/ (ex.: '/fotos/equipe/ana-lima.webp').
 *       Sem foto, o card mostra um monograma com as iniciais.
 *       Recomendado: retrato 3:4, 900×1200 px, WebP, até ~150 KB.
 * especialidades: slugs de src/data/tratamentos.js — ligam o profissional às
 *       páginas de tratamento.
 */

export const equipe = [
  {
    nome: 'Dra. Nome Sobrenome',
    titulo: 'Implantodontia e prótese dentária',
    cro: 'CRO-DF 0000',
    especialidades: ['implantodontia', 'protese-dentaria'],
    instagram: '',
    foto: '',
    responsavelTecnico: true,
  },
  {
    nome: 'Dr. Nome Sobrenome',
    titulo: 'Ortodontia',
    cro: 'CRO-DF 0000',
    especialidades: ['ortodontia'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dra. Nome Sobrenome',
    titulo: 'Odontopediatria',
    cro: 'CRO-DF 0000',
    especialidades: ['odontopediatria'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dr. Nome Sobrenome',
    titulo: 'Endodontia',
    cro: 'CRO-DF 0000',
    especialidades: ['endodontia'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dra. Nome Sobrenome',
    titulo: 'Periodontia e estética dental',
    cro: 'CRO-DF 0000',
    especialidades: ['periodontia', 'estetica-dental'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dr. Nome Sobrenome',
    titulo: 'Cirurgia bucomaxilofacial',
    cro: 'CRO-DF 0000',
    especialidades: ['cirurgia-bucomaxilofacial', 'implantodontia'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dra. Nome Sobrenome',
    titulo: 'Clínica geral e dentística',
    cro: 'CRO-DF 0000',
    especialidades: ['clinica-geral-e-prevencao', 'estetica-dental'],
    instagram: '',
    foto: '',
  },
  {
    nome: 'Dra. Nome Sobrenome',
    titulo: 'DTM e dor orofacial',
    cro: 'CRO-DF 0000',
    especialidades: ['dtm-e-dor-orofacial'],
    instagram: '',
    foto: '',
  },
];

/** Profissionais que atuam em um tratamento. */
export function profissionaisDe(slug) {
  return equipe.filter((p) => p.especialidades.includes(slug));
}
