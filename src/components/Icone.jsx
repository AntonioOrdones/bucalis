/**
 * Ícones de traço (24×24), desenhados para o site. Herdam a cor do texto.
 * Uso: <Icone nome="whatsapp" /> — decorativo por padrão (aria-hidden).
 * Para ícone com significado próprio, passe `rotulo`.
 */

const DENTE =
  'M7.6 3.6c-2.3 0-4 1.8-4 4.4 0 2.5.9 4.3 1.6 6.2.6 1.8.8 3.6 1.2 5.2.3 1.2.8 1.7 1.4 1.7.9 0 1.2-1 1.5-2.5.3-1.6.7-3.3 2.7-3.3s2.4 1.7 2.7 3.3c.3 1.5.6 2.5 1.5 2.5.6 0 1.1-.5 1.4-1.7.4-1.6.6-3.4 1.2-5.2.7-1.9 1.6-3.7 1.6-6.2 0-2.6-1.7-4.4-4-4.4-1.6 0-2.7.8-4.4.8s-2.8-.8-4.4-.8Z';

const TRACOS = {
  whatsapp: (
    <>
      <path d="M4.2 19.8 5.3 16A8.2 8.2 0 1 1 8.4 19z" />
      <path d="M9.2 8.3c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.7 1.2 1.6 2 2.8 2.6.2.1.4.1.6-.1l.6-.6c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6 0 .9-.6 1.8-1.6 2-1 .2-2.4 0-4.2-1.2-1.7-1.1-2.9-2.7-3.4-3.9-.5-1.3-.4-2.6.4-3.3Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  telefone: (
    <path d="M6.6 3.8h2.6l1.4 3.8-1.9 1.3a10.6 10.6 0 0 0 6.4 6.4l1.3-1.9 3.8 1.4v2.6a2 2 0 0 1-2.2 2A16.4 16.4 0 0 1 4.6 6a2 2 0 0 1 2-2.2Z" />
  ),
  email: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  local: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  seta: <path d="M5 12h13M13 6.5 18.5 12 13 17.5" />,
  divisa: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  acessibilidade: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="7.4" r="1.2" fill="currentColor" stroke="none" />
      <path d="M7.2 9.6c1.6.5 3.1.8 4.8.8s3.2-.3 4.8-.8M12 10.4v3.4m0 0-2.2 4.4M12 13.8l2.2 4.4" />
    </>
  ),
  busca: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.7 4.7" />
    </>
  ),
  estrela: (
    <path
      d="m12 3.6 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.5l-5.1 2.8L8 13.6l-4.3-4 5.8-.7L12 3.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  play: <path d="M8.5 5.8v12.4a.8.8 0 0 0 1.2.7l9.6-6.2a.8.8 0 0 0 0-1.4L9.7 5.1a.8.8 0 0 0-1.2.7Z" />,
  externo: (
    <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  mais: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  contraste: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" />
    </>
  ),
  movimento: (
    <>
      <path d="M4 12c2.5-4 5.5-4 8 0s5.5 4 8 0" />
      <path d="M4 17.5h16" />
    </>
  ),
  libras: (
    <>
      <path d="M8.5 13V6.2a1.3 1.3 0 0 1 2.6 0V11m0-1.5V4.8a1.3 1.3 0 0 1 2.6 0V11m0-4.5a1.3 1.3 0 0 1 2.6 0V13" />
      <path d="M16.3 10.5a1.3 1.3 0 0 1 2.6 0v3.2c0 3.8-2.6 6.8-6.4 6.8-2.5 0-4.1-1.1-5.4-3.2L5 14.1a1.3 1.3 0 0 1 2.2-1.3l1.3 1.8" />
    </>
  ),
  conversa: (
    <>
      <path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-6l-4.5 3.5V16a2.5 2.5 0 0 1-2-2.5Z" />
      <path d="M9 10h.01M12 10h.01M15 10h.01" strokeWidth="2.2" />
    </>
  ),
  equipe: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M15.4 14.4c2.6-.3 4.6 1.2 5.1 4.1" />
    </>
  ),
  documento: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M14 3.5V8h4M9 12h6M9 15.5h6" />
    </>
  ),
  cookie: (
    <>
      <path d="M20.4 12.6A8.5 8.5 0 1 1 11.4 3.6a3 3 0 0 0 3.7 3.7 3 3 0 0 0 3.6 3.6 3 3 0 0 0 1.7 1.7Z" />
      <circle cx="9" cy="10" r=".8" fill="currentColor" />
      <circle cx="14.5" cy="15" r=".8" fill="currentColor" />
      <circle cx="9.5" cy="15.5" r=".8" fill="currentColor" />
    </>
  ),

  /* ── Especialidades ─────────────────────────────────────────────── */
  prevencao: (
    <>
      <path d="M12 3 5 5.8v5.6c0 4.4 3 7.7 7 9.1 4-1.4 7-4.7 7-9.1V5.8L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  implante: (
    <>
      <path d="M7 4.2c1.3-.8 3.2-.4 5 .1 1.8-.5 3.7-.9 5-.1 1.4.9 1.4 3 .5 5.2H6.5C5.6 7.2 5.6 5.1 7 4.2Z" />
      <path d="M9 12h6M9.6 14.6h4.8M10.2 17.2h3.6M11 19.8h2M9 9.4l.4 2.6M15 9.4l-.4 2.6" />
    </>
  ),
  ortodontia: (
    <>
      <path d={DENTE} />
      <rect x="9.6" y="7.6" width="4.8" height="3.6" rx="0.8" />
      <path d="M3.6 9.4h6M14.4 9.4h6" />
    </>
  ),
  crianca: (
    <>
      <path d={DENTE} />
      <path d="M9.4 9.4h.01M14.6 9.4h.01" strokeWidth="2.2" />
      <path d="M9.6 11.6c1.4 1.3 3.4 1.3 4.8 0" />
    </>
  ),
  estetica: (
    <>
      <path d={DENTE} />
      <path d="M19.5 2.5v3M18 4h3M21.2 8.6v2M20.2 9.6h2" />
    </>
  ),
  canal: (
    <>
      <path d={DENTE} />
      <path d="M10.3 8.5c0 3 .1 6.1-.9 9M13.7 8.5c0 3-.1 6.1.9 9" strokeDasharray="1.6 1.6" />
    </>
  ),
  gengiva: (
    <>
      <path d="M8 3.8c-2 0-3.4 1.6-3.4 3.9 0 2.1.7 3.6 1.3 5h12.2c.6-1.4 1.3-2.9 1.3-5 0-2.3-1.4-3.9-3.4-3.9-1.5 0-2.4.7-4 .7s-2.5-.7-4-.7Z" />
      <path d="M3.5 12.7c1.4 0 1.9 1.3 3.4 1.3s2-1.3 3.5-1.3 2 1.3 3.5 1.3 2-1.3 3.4-1.3 2 1.3 3.2 1.3M7 16.5v3.6M12 16.5v3.6M17 16.5v3.6" />
    </>
  ),
  protese: (
    <>
      <path d="M5 9.5 6.6 4.5l3.2 2.8L12 3.5l2.2 3.8 3.2-2.8L19 9.5Z" />
      <path d="M5.5 12.2h13M6.6 12.2c.4 3.3 1 6.4 2.2 7.8M17.4 12.2c-.4 3.3-1 6.4-2.2 7.8M9.6 20h4.8" />
    </>
  ),
  cirurgia: (
    <>
      <path d="M4 20 14.6 9.4l2.1 2.1L7.3 21H4v-1Z" />
      <path d="m14.6 9.4 3.6-3.6a1.5 1.5 0 0 1 2.1 2.1l-3.6 3.6" />
    </>
  ),
  articulacao: (
    <>
      <path d="M5 6.5c0 5.6 2.3 10.8 7 12.9 1.3.6 2.8.6 4.1-.1l2.4-1.3" />
      <path d="M5 6.5c0-1.4 1.1-2.5 2.5-2.5S10 5.1 10 6.5v2.2c0 2.8 1.7 5.3 4.3 6.4l4.2 1.8" />
      <circle cx="7.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function Icone({ nome, rotulo, tamanho = 24, className = '', ...props }) {
  const traco = TRACOS[nome];
  if (!traco) return null;
  const acessivel = rotulo
    ? { role: 'img', 'aria-label': rotulo }
    : { 'aria-hidden': true, focusable: 'false' };
  return (
    <svg
      className={`icone ${className}`.trim()}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...acessivel}
      {...props}
    >
      {traco}
    </svg>
  );
}
