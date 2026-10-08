import { useId, useRef, useState } from 'react';
import { convenios } from '../data/convenios.js';
import { tratamentos } from '../data/tratamentos.js';
import { registrarEvento } from '../lib/analytics.js';
import { linkWhatsApp, mensagemAgendamento } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';

const PERIODOS = ['Manhã', 'Tarde', 'Qualquer horário'];
const VAZIO = {
  nome: '',
  tratamento: '',
  periodo: '',
  convenio: '',
  observacoes: '',
};

/**
 * Formulário de agendamento: monta a mensagem e abre o WhatsApp da clínica.
 * Não há servidor nem banco de dados — nenhum dado fica guardado no site.
 */
export default function FormularioAgendamento() {
  const [valores, setValores] = useState(VAZIO);
  const [erro, setErro] = useState('');
  const [linkGerado, setLinkGerado] = useState('');
  const campoNome = useRef(null);
  const id = useId();

  const alterar = (campo) => (evento) => setValores((v) => ({ ...v, [campo]: evento.target.value }));

  const enviar = (evento) => {
    evento.preventDefault();
    if (!valores.nome.trim()) {
      setErro('Informe o seu nome para a equipe saber com quem está falando.');
      campoNome.current?.focus();
      return;
    }
    setErro('');
    const link = linkWhatsApp(mensagemAgendamento(valores));
    setLinkGerado(link);
    registrarEvento('agendamento_formulario', {
      tratamento: valores.tratamento || 'não informado',
    });
    window.open(link, '_blank', 'noopener');
  };

  return (
    <form className="formulario" onSubmit={enviar} noValidate aria-labelledby={`${id}-titulo`}>
      <h2 id={`${id}-titulo`} className="formulario__titulo">
        Pedir horário pelo WhatsApp
      </h2>
      <p className="formulario__intro">
        Preencha e toque em enviar: a mensagem chega pronta no WhatsApp da clínica.
      </p>

      <div className="campo">
        <label htmlFor={`${id}-nome`}>
          Seu nome <span className="campo__obrigatorio">(obrigatório)</span>
        </label>
        <input
          ref={campoNome}
          id={`${id}-nome`}
          name="nome"
          autoComplete="name"
          required
          value={valores.nome}
          onChange={alterar('nome')}
          aria-invalid={erro ? 'true' : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
        />
        {erro && (
          <p id={`${id}-erro`} className="campo__erro">
            {erro}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor={`${id}-tratamento`}>Tratamento de interesse</label>
        <select
          id={`${id}-tratamento`}
          name="tratamento"
          value={valores.tratamento}
          onChange={alterar('tratamento')}
        >
          <option value="">Ainda não sei</option>
          {tratamentos.map((t) => (
            <option key={t.slug} value={t.nome}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="campo">
        <legend>Melhor período</legend>
        <div className="formulario__fichas">
          {PERIODOS.map((periodo) => (
            <label key={periodo} className="ficha">
              <input
                type="radio"
                name="periodo"
                value={periodo}
                checked={valores.periodo === periodo}
                onChange={alterar('periodo')}
              />
              <span>{periodo}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="campo">
        <label htmlFor={`${id}-convenio`}>Convênio</label>
        <input
          id={`${id}-convenio`}
          name="convenio"
          list={`${id}-convenios`}
          placeholder="Particular ou nome do plano"
          value={valores.convenio}
          onChange={alterar('convenio')}
        />
        <datalist id={`${id}-convenios`}>
          <option value="Particular" />
          {convenios.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div className="campo">
        <label htmlFor={`${id}-observacoes`}>Mensagem</label>
        <textarea
          id={`${id}-observacoes`}
          name="observacoes"
          rows={3}
          maxLength={500}
          value={valores.observacoes}
          onChange={alterar('observacoes')}
          aria-describedby={`${id}-dica`}
        />
        <p id={`${id}-dica`} className="campo__dica">
          Opcional. Não é preciso detalhar a sua saúde agora: na consulta conversamos com calma.
        </p>
      </div>

      <Botao
        type="submit"
        variante="whatsapp"
        icone="whatsapp"
        tamanho="grande"
        className="formulario__enviar"
      >
        Enviar pelo WhatsApp
      </Botao>
      <p className="formulario__nota">
        Nenhum dado é armazenado neste site: a mensagem vai direto para o WhatsApp.
      </p>

      {linkGerado && (
        <p className="formulario__status" role="status">
          Mensagem pronta. Se o WhatsApp não abriu,{' '}
          <a href={linkGerado} target="_blank" rel="noopener noreferrer">
            toque aqui para abrir
          </a>
          .
        </p>
      )}
    </form>
  );
}
