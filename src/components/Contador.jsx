import { useEffect, useRef, useState } from 'react';

/**
 * Número que "conta" até o valor final quando aparece na tela.
 * O HTML pré-renderizado já traz o valor final (bom para SEO e para quem
 * navega sem JavaScript); a animação respeita o movimento reduzido.
 */
export default function Contador({ valor, duracao = 1400 }) {
  const [atual, setAtual] = useState(valor);
  const elemento = useRef(null);

  useEffect(() => {
    const reduzir =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.getAttribute('data-movimento') === 'reduzido';
    if (reduzir || !('IntersectionObserver' in window)) return undefined;

    let quadro;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const passo = (agora) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          const suave = 1 - (1 - t) ** 3;
          setAtual(Math.round(valor * suave));
          if (t < 1) quadro = requestAnimationFrame(passo);
        };
        setAtual(0);
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    observador.observe(elemento.current);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor, duracao]);

  return (
    <span ref={elemento} className="contador">
      <span aria-hidden="true">{atual}</span>
      <span className="visualmente-oculto">{valor}</span>
    </span>
  );
}
