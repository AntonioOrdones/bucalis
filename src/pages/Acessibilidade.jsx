import TopoPagina from '../components/TopoPagina.jsx';
import { clinica } from '../data/clinica.js';
import { schemaTrilha } from '../lib/seo.js';
import { linkWhatsApp } from '../lib/whatsapp.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Acessibilidade', caminho: '/acessibilidade/' },
];

export function meta() {
  return {
    titulo: 'Declaração de acessibilidade',
    descricao: `Recursos de acessibilidade do site da ${clinica.nome} e como relatar dificuldades de uso.`,
    caminho: '/acessibilidade/',
    jsonLd: [schemaTrilha(trilha)],
  };
}

export default function Acessibilidade() {
  const { contato, endereco, legal } = clinica;
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Acessibilidade"
        apoio="Queremos que todas as pessoas consigam usar este site e chegar até a clínica com autonomia."
      />
      <div className="secao">
        <div className="conteiner">
          <article className="texto-corrido">
            <h2>Nosso compromisso</h2>
            <p>
              Este site foi desenvolvido tendo como referência as Diretrizes de Acessibilidade para Conteúdo
              Web (WCAG 2.2), nível AA, e o Modelo de Acessibilidade em Governo Eletrônico (eMAG).
            </p>

            <h2>Recursos disponíveis</h2>
            <ul>
              <li>
                Menu de acessibilidade (ícone no topo da página) para aumentar o texto, ativar o alto
                contraste e reduzir animações.
              </li>
              <li>Tradutor de Libras (VLibras, do Governo Federal), ativado pelo mesmo menu.</li>
              <li>Navegação completa por teclado, com foco visível e o atalho “Pular para o conteúdo”.</li>
              <li>Estrutura de títulos, regiões e listas que facilita o uso de leitores de tela.</li>
              <li>Textos alternativos em imagens informativas e rótulos em todos os campos de formulário.</li>
              <li>
                Cores com contraste adequado e layout que se adapta a telas pequenas e ao zoom do navegador.
              </li>
              <li>Respeito à preferência do sistema por menos movimento.</li>
            </ul>

            <h2>Na clínica</h2>
            <p>{endereco.comoChegar}</p>

            <h2>Limitações conhecidas</h2>
            <p>
              Conteúdos de terceiros — como mapas, vídeos, avaliações do Google e o feed do Instagram — são
              fornecidos por outras empresas e podem não seguir os mesmos padrões. Sempre oferecemos um
              caminho alternativo, como o link direto para o serviço.
            </p>

            <h2>Encontrou alguma barreira?</h2>
            <p>
              Conte para nós pelo{' '}
              <a href={linkWhatsApp('Olá! Encontrei uma dificuldade de acessibilidade no site.')}>WhatsApp</a>
              ou pelo telefone {contato.telefoneExibicao}.
              {contato.email && (
                <> Também estamos disponíveis no e-mail <a href={`mailto:${contato.email}`}>{contato.email}</a>.</>
              )} Nossa equipe responderá durante o horário de atendimento.
            </p>
            <p>Última revisão: {legal.atualizacaoPoliticas}.</p>
          </article>
        </div>
      </div>
    </>
  );
}
