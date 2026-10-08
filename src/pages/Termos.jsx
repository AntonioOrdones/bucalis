import TopoPagina from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { schemaTrilha } from '../lib/seo.js';
import { href } from '../lib/url.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Termos de uso', caminho: '/termos/' },
];

export function meta() {
  return {
    titulo: 'Termos de uso',
    descricao: `Condições de uso do site da ${clinica.nome}, clínica odontológica em Brasília.`,
    caminho: '/termos/',
    jsonLd: [schemaTrilha(trilha)],
  };
}

export default function Termos() {
  const { legal, contato } = clinica;
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Termos de uso"
        apoio={`Regras simples para o uso deste site. Atualizados em ${legal.atualizacaoPoliticas}.`}
      />
      <div className="secao">
        <div className="conteiner">
          <article className="texto-corrido">
            <h2>1. Sobre o site</h2>
            <p>
              Este é o site institucional da {clinica.nome}, criado para oferecer informações
              sobre a clínica, seus tratamentos e canais de atendimento. Dados cadastrais
              completos da pessoa jurídica serão acrescentados após confirmação.
            </p>

            <h2>2. Conteúdo informativo</h2>
            <p>
              As informações sobre tratamentos têm caráter educativo e não substituem a consulta com um
              cirurgião-dentista. Diagnóstico e indicação de tratamento dependem de avaliação clínica
              individual.
            </p>

            <h2>3. Agendamentos</h2>
            <p>
              Os pedidos feitos pelo WhatsApp, por telefone ou pelo formulário só são confirmados depois do
              retorno da nossa equipe, conforme a disponibilidade da agenda.
            </p>

            <h2>4. Propriedade intelectual</h2>
            <p>
              Textos, marca, ilustrações e demais elementos visuais deste site pertencem à clínica ou são
              usados com autorização. A reprodução depende de permissão prévia por escrito.
            </p>

            <h2>5. Links e serviços de terceiros</h2>
            <p>
              O site pode exibir conteúdos e links de terceiros, como Google, Instagram, YouTube e WhatsApp.
              Esses serviços têm termos e políticas próprios. Integrações opcionais só são carregadas com a
              sua permissão. As fontes web estão explicadas na <a href={href('/privacidade/')}>política de privacidade</a>.
            </p>

            <h2>6. Disponibilidade</h2>
            <p>
              Trabalhamos para manter o site no ar e com informações atualizadas, mas podem ocorrer
              interrupções ou mudanças sem aviso prévio.
            </p>

            <h2>7. Legislação e foro</h2>
            <p>
              Estes termos seguem a legislação brasileira. Fica eleito o foro de Brasília, Distrito Federal,
              ressalvados os direitos do consumidor.
            </p>

            <h2>8. Contato</h2>
            <p>
              Dúvidas sobre estes termos: {contato.telefoneExibicao}.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
