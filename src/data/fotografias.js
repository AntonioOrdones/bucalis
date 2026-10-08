/** Fotografias fornecidas pela Bucalis em 08/10/2026.
 * Descrições baseadas somente no que é visível; nomes de pessoas não foram
 * identificados pelas imagens. A ordem destaca os espaços antes de retratos.
 * Fonte binária: scripts/assets/fotos-bucalis-web.zip (19 WebP otimizados).
 */
export const fotografias = [
  { id: 296, titulo: 'Recepção', descricao: 'Balcão de atendimento e sala de espera da Bucalis.', categoria: 'Espaços' },
  { id: 341, titulo: 'Identidade Bucalis', descricao: 'Letreiro Bucalis na parede da clínica.', categoria: 'Espaços' },
  { id: 334, titulo: 'Espaço de apoio', descricao: 'Cantinho do café e assentos junto à recepção.', categoria: 'Espaços' },
  { id: 330, titulo: 'Sala de espera', descricao: 'Ambiente com sofá, cadeiras e iluminação acolhedora.', categoria: 'Espaços' },
  { id: 40, titulo: 'Ambiente de acolhimento', descricao: 'Profissionais da clínica na área de espera.', categoria: 'Espaços' },
  { id: 288, titulo: 'Circulação interna', descricao: 'Corredor de acesso às salas da clínica.', categoria: 'Espaços' },
  { id: 281, titulo: 'Sala de planejamento', descricao: 'Ambiente de avaliação com mesa e tela para exames.', categoria: 'Consultórios' },
  { id: 291, titulo: 'Sala de avaliação', descricao: 'Mesa com cadeiras em sala de planejamento odontológico.', categoria: 'Consultórios' },
  { id: 141, titulo: 'Discussão clínica', descricao: 'Profissionais observam exames odontológicos em um monitor.', categoria: 'Atendimento' },
  { id: 280, titulo: 'Equipamentos odontológicos', descricao: 'Cadeira e equipamentos em consultório odontológico.', categoria: 'Consultórios' },
  { id: 287, titulo: 'Consultório odontológico', descricao: 'Consultório equipado e iluminado naturalmente.', categoria: 'Consultórios' },
  { id: 108, titulo: 'Atendimento odontológico', descricao: 'Profissional atende paciente na cadeira odontológica.', categoria: 'Atendimento' },
  { id: 310, titulo: 'Instalações da clínica', descricao: 'Ambiente sanitário de acabamento claro.', categoria: 'Espaços' },
  { id: 292, titulo: 'Detalhes de arquitetura', descricao: 'Peça escultórica em madeira na decoração da clínica.', categoria: 'Espaços' },
  { id: 5, titulo: 'A equipe na Bucalis', descricao: 'Profissionais ao lado da marca Bucalis na entrada.', categoria: 'Equipe' },
  { id: 16, titulo: 'Retrato profissional', descricao: 'Retrato de um profissional com uniforme da Bucalis.', categoria: 'Equipe' },
  { id: 27, titulo: 'Retrato profissional', descricao: 'Retrato de uma profissional com uniforme da Bucalis.', categoria: 'Equipe' },
  { id: 74, titulo: 'Equipe da Bucalis', descricao: 'Profissional em uma sala de atendimento.', categoria: 'Equipe' },
  { id: 89, titulo: 'Ambiente de trabalho', descricao: 'Profissional da clínica junto à mesa de trabalho.', categoria: 'Equipe' },
].map((foto) => ({ ...foto, src: `/fotos/foto-${String(foto.id).padStart(3, '0')}.webp` }));
