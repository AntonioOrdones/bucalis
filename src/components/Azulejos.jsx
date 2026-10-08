import { useId } from 'react';
import { criarAleatorio } from '../lib/aleatorio.js';

/**
 * Painel de azulejos inspirado no MÉTODO de Athos Bulcão — poucos módulos
 * simples, assentados em rotações livres, de modo que o desenho final nunca
 * se repete. Os módulos aqui são originais (quarto de círculo, arco e faixa);
 * não reproduzem nenhum painel do artista.
 *
 * A rotação vem de um gerador com semente: o servidor e o navegador
 * desenham o mesmo painel (sem diferenças na hidratação).
 */

/* Nomes das paletas preservados para compatibilidade com componentes antigos.
 * Todas as variacoes agora utilizam exclusivamente as cores oficiais Bucalis. */
const PALETAS = {
  azul: { fundo: '#ede3d7', figura: '#735e59', rejunte: '#cacaca' },
  bronze: { fundo: '#ede3d7', figura: '#7b7562', rejunte: '#a29c8a' },
  misto: {
    fundo: '#ede3d7',
    figura: '#735e59',
    rejunte: '#a29c8a',
    destaque: { fundo: '#cacaca', figura: '#481310' },
    chance: 0.22,
  },
  escuro: { fundo: '#2e1711', figura: '#a29c8a', rejunte: '#481310' },
  noite: { fundo: '#481310', figura: '#ede3d7', rejunte: '#2e1711' },
};

// As figuras usam currentColor: a cor de cada peça é definida na hora de assentar.
const MODULOS = {
  // Quarto de círculo no canto
  canto: <path d="M0 0H56A56 56 0 0 1 0 56Z" />,
  // Arco: meio círculo apoiado na borda (eco das curvas de Niemeyer)
  arco: <path d="M14 100A36 36 0 0 1 86 100Z" />,
  // Faixa na borda com pequeno disco no canto oposto
  faixa: (
    <>
      <rect x="0" y="0" width="100" height="22" />
      <circle cx="78" cy="78" r="12" />
    </>
  ),
  // Meio quadrado em diagonal
  diagonal: <path d="M0 0H100L0 100Z" />,
};

const NOMES = Object.keys(MODULOS);

export default function Azulejos({
  colunas = 8,
  linhas = 1,
  semente = 7,
  paleta = 'azul',
  modulos = NOMES,
  className = '',
  rotulo,
  preencher = false,
  vazio = -1,
}) {
  const id = `az${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const cores = PALETAS[paleta] ?? PALETAS.azul;
  const aleatorio = criarAleatorio(semente);
  const pecas = [];

  for (let l = 0; l < linhas; l += 1) {
    for (let c = 0; c < colunas; c += 1) {
      const modulo = modulos[Math.floor(aleatorio() * modulos.length)];
      const giro = Math.floor(aleatorio() * 4) * 90;
      const destaque = cores.destaque && aleatorio() < cores.chance;
      const tons = destaque ? cores.destaque : cores;
      const indice = l * colunas + c;
      pecas.push({
        chave: `${l}-${c}`,
        x: c * 100,
        y: l * 100,
        modulo,
        giro,
        tons,
        falta: indice === vazio,
      });
    }
  }

  const acessivel = rotulo ? { role: 'img', 'aria-label': rotulo } : { 'aria-hidden': true };

  return (
    <svg
      className={`azulejos ${className}`.trim()}
      viewBox={`0 0 ${colunas * 100} ${linhas * 100}`}
      preserveAspectRatio={preencher ? 'xMidYMid slice' : 'xMidYMid meet'}
      focusable="false"
      {...acessivel}
    >
      <defs>
        <clipPath id={`${id}-recorte`}>
          <rect x="1.5" y="1.5" width="97" height="97" />
        </clipPath>
        {NOMES.map((nome) => (
          <g id={`${id}-${nome}`} key={nome} fill="currentColor">
            {MODULOS[nome]}
          </g>
        ))}
      </defs>
      <rect width={colunas * 100} height={linhas * 100} fill={cores.rejunte} />
      {pecas.map((p) =>
        p.falta ? (
          <rect
            key={p.chave}
            className="azulejos__falta"
            x={p.x + 8}
            y={p.y + 8}
            width="84"
            height="84"
            rx="2"
            fill="none"
            stroke={cores.figura}
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        ) : (
          <g key={p.chave} transform={`translate(${p.x} ${p.y})`}>
            <g
              className="azulejos__peca"
              style={{ '--giro': `${p.giro}deg` }}
              clipPath={`url(#${id}-recorte)`}
              color={p.tons.figura}
            >
              <rect x="1.5" y="1.5" width="97" height="97" fill={p.tons.fundo} />
              <use href={`#${id}-${p.modulo}`} />
            </g>
          </g>
        ),
      )}
    </svg>
  );
}
