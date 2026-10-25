import { useEffect } from 'react';

/**
 * Custom Hook para cambiar el título de la pestaña del navegador.
 * @param {string} titulo - Título de la vista actual
 */
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Gas Gotita`;
  }, [titulo]);
}