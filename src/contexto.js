import { createContext, useContext } from 'react';

/** Informações da página atual (caminho interno, ex.: "/tratamentos/"). */
export const ContextoPagina = createContext({ caminho: '/' });

export function usePagina() {
  return useContext(ContextoPagina);
}
