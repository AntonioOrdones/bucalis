/** Carrega um script de terceiros uma única vez (devolve sempre a mesma promessa). */
const carregados = new Map();

export function carregarScript(src, atributos = {}) {
  if (typeof document === 'undefined') return Promise.resolve();
  if (carregados.has(src)) return carregados.get(src);

  const promessa = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    Object.entries(atributos).forEach(([nome, valor]) => script.setAttribute(nome, valor));
    script.addEventListener('load', () => resolve(script));
    script.addEventListener('error', () => {
      carregados.delete(src);
      script.remove();
      reject(new Error(`Não foi possível carregar ${src}`));
    });
    document.head.appendChild(script);
  });

  carregados.set(src, promessa);
  return promessa;
}
