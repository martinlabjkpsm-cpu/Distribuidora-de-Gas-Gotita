import React, { useState } from 'react';
import { Boton, Input } from '../Atoms';

// Molécula: caja de búsqueda + botón. Guarda lo que se escribe y avisa con props.onBuscar(texto).
function Buscador(props) {
  const [texto, setTexto] = useState(props.valorInicial || '');

  function manejarEnvio(e) {
    e.preventDefault();
    if (texto.trim()) props.onBuscar(texto.trim());
  }

  return (
    <form className="d-flex gap-2" onSubmit={manejarEnvio} role="search">
      <Input
        id="buscador"
        name="buscador"
        type="search"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={props.placeholder || 'Buscar producto...'}
      />
      <Boton texto="Buscar" type="submit" variante="danger" />
    </form>
  );
}

export { Buscador };
export default Buscador;
