/** Corpo clínico Bucalis.
 * Não publicamos nomes, especialidades registradas ou números CRO sem
 * confirmação formal. Fotografias institucionais de equipe estão disponíveis
 * em "Conheça nosso espaço" e não identificam pessoas.
 *
 * Cadastro futuro:
 * { nome: 'Nome completo', titulo: 'Especialidade registrada', cro: 'CRO-DF ...',
 *   especialidades: ['slug-existente'], foto: '/fotos/retrato.webp' }
 */
export const equipe = [];

export function profissionaisDe(slug) {
  return equipe.filter((pessoa) => pessoa.especialidades.includes(slug));
}
