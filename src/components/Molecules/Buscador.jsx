import React, { useState } from 'react';
import { Boton, Input } from '../Atoms';

// Molécula: caja de búsqueda + botón. Guarda lo que se escribe y avisa con onBuscar(texto).
export const Buscador = ({ valorInicial = '', onBuscar, placeholder = 'Buscar producto...' }) => {
  const [texto, setTexto] = useState(valorInicial);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (texto.trim()) onBuscar(texto.trim());
  };

  return (
    <form className="d-flex gap-2" onSubmit={manejarEnvio} role="search">
      <Input
        id="buscador"
        name="buscador"
        type="search"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
      />
      <Boton type="submit" variant="danger">
        Buscar
      </Boton>
    </form>
  );
};

export default Buscador;
