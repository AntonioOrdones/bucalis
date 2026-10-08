import { clinica } from '../data/clinica.js';
import { linkTelefone, linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';

/** Faixa de encerramento: convite para agendar, com WhatsApp e telefone. */
export default function ChamadaFinal({
  titulo = 'Seu sorriso merece um plano pensado para você.',
  texto = 'Agende uma avaliação e converse com nossa equipe sobre o cuidado indicado para sua saúde bucal.',
  mensagem,
}) {
  return (
    <section className="chamada tema-escuro" aria-labelledby="chamada-titulo">
      <div className="conteiner chamada__conteudo">
        <h2 id="chamada-titulo" className="chamada__titulo">
          {titulo}
        </h2>
        <p className="chamada__texto">{texto}</p>
        <div className="grupo-botoes chamada__acoes">
          <Botao
            variante="bronze"
            tamanho="grande"
            icone="whatsapp"
            para={linkWhatsApp(mensagem)}
            externo
            data-evento="whatsapp_chamada_final"
          >
            Agendar pelo WhatsApp
          </Botao>
          <Botao variante="claro" tamanho="grande" icone="telefone" para={linkTelefone()}>
            {clinica.contato.telefoneExibicao}
          </Botao>
        </div>
      </div>
    </section>
  );
}
