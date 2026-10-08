import { useId, useMemo, useState } from 'react';
import { convenios } from '../data/convenios.js';
import { normalizar } from '../lib/texto.js';
import { linkWhatsApp } from '../lib/whatsapp.js';
import Botao from './Botao.jsx';
import Icone from './Icone.jsx';

/** Realça o trecho encontrado, ignorando acentos e maiúsculas. */
function Destaque({ texto, termo }) {
  const busca = normalizar(termo);
  if (!busca) return texto;
  // Normaliza letra a letra para manter as posições do texto original.
  const comparavel = Array.from(texto)
    .map((letra) => normalizar(letra) || letra)
    .join('');
  const inicio = comparavel.indexOf(busca);
  if (inicio < 0) return texto;
  const letras = Array.from(texto);
  return (
    <>
      {letras.slice(0, inicio).join('')}
      <mark>{letras.slice(inicio, inicio + busca.length).join('')}</mark>
      {letras.slice(inicio + busca.length).join('')}
    </>
  );
}

export default function BuscaConvenios({ limite }) {
  const [termo, setTermo] = useState('');
  const campoId = useId();
  const statusId = useId();

  const encontrados = useMemo(() => {
    const busca = normalizar(termo);
    return busca ? convenios.filter((c) => normalizar(c).includes(busca)) : convenios;
  }, [termo]);

  const exibidos = !termo && limite ? encontrados.slice(0, limite) : encontrados;

  return (
    <div className="busca-convenios" role="search" aria-label="Filtrar convênios atendidos">
      <label className="busca-convenios__rotulo" htmlFor={campoId}>
        Procure o seu convênio
      </label>
      <div className="busca-convenios__campo">
        <Icone nome="busca" />
        <input
          id={campoId}
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Ex.: Saúde Caixa"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          aria-describedby={statusId}
        />
      </div>
      <p id={statusId} className="busca-convenios__status" role="status">
        {termo
          ? `${encontrados.length} ${encontrados.length === 1 ? 'convênio encontrado' : 'convênios encontrados'}`
          : `${convenios.length} convênios atendidos`}
      </p>

      {exibidos.length > 0 && (
        <ul className="busca-convenios__lista">
          {exibidos.map((nome) => (
            <li key={nome}>
              <Destaque texto={nome} termo={termo} />
            </li>
          ))}
        </ul>
      )}

      {termo && encontrados.length === 0 && (
        <div className="busca-convenios__vazio">
          <p>
            Não encontramos “{termo}” na lista. Pergunte à nossa equipe, que confirma a cobertura do seu
            plano.
          </p>
          <Botao
            para={linkWhatsApp(`Olá! Vocês atendem o convênio ${termo.trim()}?`)}
            externo
            icone="whatsapp"
            variante="bronze"
            tamanho="pequeno"
            data-evento="whatsapp_convenio"
          >
            Perguntar pelo WhatsApp
          </Botao>
        </div>
      )}
    </div>
  );
}
