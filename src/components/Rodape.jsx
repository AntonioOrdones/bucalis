import { clinica } from '../data/clinica.js';
import { linksLegais } from '../data/navegacao.js';
import { tratamentos } from '../data/tratamentos.js';
import { abrirPreferencias } from '../lib/consentimento.js';
import { rotuloResponsavelTecnico } from '../lib/texto.js';
import { href } from '../lib/url.js';
import { linkTelefone, linkWhatsApp } from '../lib/whatsapp.js';
import Azulejos from './Azulejos.jsx';
import Horarios from './Horarios.jsx';
import Icone from './Icone.jsx';
import Marca from './Marca.jsx';

const { contato, endereco, legal, redes } = clinica;

export default function Rodape() {
  return (
    <footer className="rodape tema-escuro">
      <div className="rodape__friso" aria-hidden="true">
        <Azulejos colunas={36} linhas={1} semente={1960} paleta="escuro" preencher />
      </div>

      <div className="conteiner rodape__grade">
        <div className="rodape__marca">
          <a href={href('/')}>
            <Marca />
            <span className="visualmente-oculto">, página inicial</span>
          </a>
          <p>Odontologia especializada no coração de Brasília, com todas as especialidades em um só lugar.</p>
          {redes.instagram && (
            <a
              className="rodape__social"
              href={`https://www.instagram.com/${redes.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icone nome="instagram" />
              <span>@{redes.instagram}</span>
              <span className="visualmente-oculto"> (abre em nova aba)</span>
            </a>
          )}
        </div>

        <nav className="rodape__coluna" aria-labelledby="rodape-tratamentos">
          <h2 id="rodape-tratamentos" className="rodape__titulo">
            Tratamentos
          </h2>
          <ul>
            {tratamentos.map((t) => (
              <li key={t.slug}>
                <a href={href(`/tratamentos/${t.slug}/`)}>{t.nome}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="rodape__coluna" aria-labelledby="rodape-clinica">
          <h2 id="rodape-clinica" className="rodape__titulo">
            A clínica
          </h2>
          <ul>
            <li>
              <a href={href('/clinica/')}>Quem somos</a>
            </li>
            <li>
              <a href={href('/clinica/#equipe')}>Equipe</a>
            </li>
            <li>
              <a href={href('/convenios/')}>Convênios</a>
            </li>
            <li>
              <a href={href('/#perguntas')}>Perguntas frequentes</a>
            </li>
            <li>
              <a href={href('/contato/')}>Agendamento e contato</a>
            </li>
          </ul>
        </nav>

        <div className="rodape__coluna rodape__contato">
          <h2 className="rodape__titulo">Atendimento</h2>
          <address>
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" data-evento="whatsapp_rodape">
              <Icone nome="whatsapp" />
              <span>
                WhatsApp {contato.whatsappExibicao}
                <span className="visualmente-oculto"> (abre em nova aba)</span>
              </span>
            </a>
            <a href={linkTelefone()}>
              <Icone nome="telefone" />
              <span>{contato.telefoneExibicao}</span>
            </a>
            <a href={`mailto:${contato.email}`}>
              <Icone nome="email" />
              <span>{contato.email}</span>
            </a>
            <p>
              <Icone nome="local" />
              <span>
                {endereco.logradouro}
                {endereco.complemento && `, ${endereco.complemento}`}
                <br />
                {endereco.bairro}, {endereco.cidade} – {endereco.uf}, {endereco.cep}
              </span>
            </p>
          </address>
          <Horarios compacto />
        </div>
      </div>

      <div className="conteiner rodape__legal">
        <div className="rodape__registro">
          <p>
            {legal.razaoSocial}, CNPJ {legal.cnpj}. Inscrição {legal.inscricaoCro}.
          </p>
          <p>
            {rotuloResponsavelTecnico(legal.responsavelTecnico.nome)}: {legal.responsavelTecnico.nome},{' '}
            {legal.responsavelTecnico.cro}.
          </p>
        </div>
        <ul className="rodape__links-legais">
          {linksLegais.map((link) => (
            <li key={link.para}>
              <a href={href(link.para)}>{link.rotulo}</a>
            </li>
          ))}
          <li>
            <button type="button" className="rodape__preferencias" onClick={abrirPreferencias}>
              Preferências de privacidade
            </button>
          </li>
        </ul>
        <p className="rodape__copia">
          © {__BUILD_YEAR__} {clinica.nome}. Conteúdo informativo, que não substitui a consulta com um
          cirurgião-dentista.
        </p>
      </div>
    </footer>
  );
}
