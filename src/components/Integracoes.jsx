import { useEffect } from 'react';
import { usePagina } from '../contexto.js';
import { iniciarAnalytics, pararAnalytics, registrarEvento } from '../lib/analytics.js';
import { permite, useConsentimento } from '../lib/consentimento.js';

/**
 * Integrações sem interface:
 * - liga/desliga o Google Analytics conforme o consentimento;
 * - registra cliques em WhatsApp, telefone e e-mail (só se o GA estiver ativo).
 */
export default function Integracoes() {
  const consentimento = useConsentimento();
  const { caminho } = usePagina();

  useEffect(() => {
    if (permite(consentimento, 'medicao')) iniciarAnalytics();
    else if (consentimento) pararAnalytics();
  }, [consentimento]);

  useEffect(() => {
    const aoClicar = (evento) => {
      const alvo = evento.target.closest?.('a, button');
      if (!alvo) return;
      const destino = alvo.getAttribute('href') || '';
      const nome =
        alvo.dataset.evento ||
        (destino.includes('wa.me') && 'contato_whatsapp') ||
        (destino.startsWith('tel:') && 'contato_telefone') ||
        (destino.startsWith('mailto:') && 'contato_email');
      if (nome) registrarEvento(nome, { pagina: caminho });
    };
    document.addEventListener('click', aoClicar);
    return () => document.removeEventListener('click', aoClicar);
  }, [caminho]);

  return null;
}
