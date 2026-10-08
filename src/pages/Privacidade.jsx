import Botao from '../components/Botao.jsx';
import TopoPagina from '../components/TopoPagina.jsx';
import { clinica, enderecoCompleto } from '../data/clinica.js';
import { abrirPreferencias } from '../lib/consentimento.js';
import { schemaTrilha } from '../lib/seo.js';

const trilha = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Política de privacidade', caminho: '/privacidade/' },
];

export function meta() {
  return {
    titulo: 'Política de privacidade',
    descricao: `Como a ${clinica.nome} trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).`,
    caminho: '/privacidade/',
    jsonLd: [schemaTrilha(trilha)],
  };
}

export default function Privacidade() {
  const { legal, contato } = clinica;
  return (
    <>
      <TopoPagina
        trilha={trilha}
        titulo="Política de privacidade"
        apoio={`Como tratamos os seus dados pessoais, em linguagem simples. Atualizada em ${legal.atualizacaoPoliticas}.`}
      />
      <div className="secao">
        <div className="conteiner">
          <article className="texto-corrido">
            <h2>1. Quem é o responsável pelos seus dados</h2>
            <p>
              O controlador dos dados é {legal.razaoSocial}, CNPJ {legal.cnpj}, com endereço em{' '}
              {enderecoCompleto}. O encarregado pelo tratamento de dados pessoais é {legal.encarregado.nome},
              que pode ser contatado pelo e-mail{' '}
              <a href={`mailto:${legal.encarregado.email}`}>{legal.encarregado.email}</a>.
            </p>

            <h2>2. Quais dados tratamos</h2>
            <ul>
              <li>
                <strong>Dados que você nos envia</strong> por WhatsApp, telefone ou e-mail: nome, contato,
                convênio e informações sobre o atendimento desejado.
              </li>
              <li>
                <strong>Formulário de agendamento:</strong> o site não guarda o que você preenche. O texto é
                montado no seu navegador e enviado por você, pelo WhatsApp.
              </li>
              <li>
                <strong>Preferências no seu navegador:</strong> as escolhas de privacidade e de acessibilidade
                ficam guardadas no próprio aparelho (armazenamento local) e não são enviadas para nós.
              </li>
              <li>
                <strong>Dados técnicos de navegação:</strong> o site é hospedado no GitHub Pages, que pode
                registrar dados como o endereço IP para segurança e funcionamento do serviço.
              </li>
              <li>
                <strong>Somente com a sua permissão:</strong> estatísticas de visita (Google Analytics) e
                conteúdos de terceiros — avaliações do Google e feed do Instagram (via Elfsight), mapa do
                Google Maps e vídeos do YouTube.
              </li>
              <li>
                <strong>Dados de saúde</strong> são tratados somente no atendimento clínico (prontuário), com
                o sigilo exigido pela lei e pelo Código de Ética Odontológica — nunca por este site.
              </li>
            </ul>

            <h2>3. Para que usamos os dados</h2>
            <ul>
              <li>Responder contatos e agendar consultas (procedimentos preliminares ao atendimento).</li>
              <li>Prestar o atendimento odontológico e manter o prontuário, como exige a legislação.</li>
              <li>Solicitar autorizações ao seu convênio, quando o atendimento for por plano.</li>
              <li>Entender, de forma agregada, como o site é usado — somente com o seu consentimento.</li>
              <li>Manter a segurança do site e prevenir fraudes.</li>
            </ul>

            <h2>4. Bases legais</h2>
            <p>
              Tratamos dados com base na Lei nº 13.709/2018 (LGPD): execução de contrato e procedimentos
              preliminares (art. 7º, V), cumprimento de obrigação legal (art. 7º, II), tutela da saúde (art.
              11, II, “f”), legítimo interesse (art. 7º, IX) e consentimento (art. 7º, I), este último para
              estatísticas e conteúdos de terceiros no site.
            </p>

            <h2>5. Com quem compartilhamos</h2>
            <p>
              Não vendemos dados pessoais. Compartilhamos apenas o necessário com: operadoras de convênio,
              para autorizações; laboratórios de prótese, para a confecção de trabalhos; prestadores de
              tecnologia que viabilizam a comunicação e o site (como WhatsApp, Google, Elfsight e GitHub); e
              autoridades, quando houver obrigação legal.
            </p>

            <h2>6. Cookies e tecnologias semelhantes</h2>
            <p>
              Por padrão, o site usa apenas o armazenamento local essencial. Estatísticas e conteúdos de
              terceiros só são carregados depois da sua escolha, que pode ser alterada a qualquer momento.
            </p>
            <p>
              <Botao variante="contorno" tamanho="pequeno" onClick={abrirPreferencias} icone="cookie">
                Abrir preferências de privacidade
              </Botao>
            </p>

            <h2>7. Por quanto tempo guardamos</h2>
            <p>
              Mensagens de contato são mantidas pelo tempo necessário ao atendimento. O prontuário
              odontológico é guardado pelo prazo previsto na legislação e nas normas do Conselho Federal de
              Odontologia.
            </p>

            <h2>8. Seus direitos</h2>
            <p>Pela LGPD (art. 18), você pode, a qualquer momento:</p>
            <ul>
              <li>confirmar se tratamos seus dados e acessá-los;</li>
              <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>pedir a portabilidade dos dados;</li>
              <li>saber com quem compartilhamos seus dados;</li>
              <li>revogar o consentimento e se opor a tratamentos.</li>
            </ul>
            <p>
              Para exercer seus direitos, escreva para{' '}
              <a href={`mailto:${legal.encarregado.email}`}>{legal.encarregado.email}</a>. Você também pode
              apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>

            <h2>9. Crianças e adolescentes</h2>
            <p>
              Dados de crianças e adolescentes atendidos na clínica são tratados no melhor interesse deles,
              com o consentimento de pelo menos um dos pais ou responsável legal.
            </p>

            <h2>10. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não
              autorizados, perdas e alterações. Nenhum sistema é totalmente imune a incidentes; se algo
              acontecer, comunicaremos os titulares e a ANPD nos termos da lei.
            </p>

            <h2>11. Contato</h2>
            <p>
              Dúvidas sobre esta política:{' '}
              <a href={`mailto:${legal.encarregado.email}`}>{legal.encarregado.email}</a> ou{' '}
              {contato.telefoneExibicao}.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
