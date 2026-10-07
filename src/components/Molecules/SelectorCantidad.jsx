import React from 'react';
import { Boton, Input } from '../Atoms';

export const SelectorCantidad = ({ id, name, cantidad = 0, onChange, min = 0, max = 20 }) => {
  const valor = Number(cantidad) || 0;
  const campo = name || id;

  const cambiarA = (nuevo) => onChange({ target: { name: campo, value: nuevo } });

  return (
    <div className="selector-cantidad">
      <Boton
        variant="secondary"
        onClick={() => cambiarA(valor - 1)}
        disabled={valor <= min}
      >
        -
      </Boton>
      <Input
        id={id}
        name={campo}
        type="number"
        value={valor}
        onChange={onChange}
        min={min}
        max={max}
        className="form-control input-cantidad"
      />
      <Boton
        variant="secondary"
        onClick={() => cambiarA(valor + 1)}
        disabled={valor >= max}
      >
        +
      </Boton>
    </div>
  );
};