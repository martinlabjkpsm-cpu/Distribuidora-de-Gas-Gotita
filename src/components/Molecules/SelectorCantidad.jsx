import React from 'react';
import { Boton, Input } from '../atoms';

export const SelectorCantidad = ({ id, name, cantidad = 0, onChange, min = 0, max = 20 }) => {
  const decrementar = () => {
    if (cantidad > min) {
      onChange({ target: { name: name || id, value: cantidad - 1 } });
    }
  };

  const incrementar = () => {
    if (cantidad < max) {
      onChange({ target: { name: name || id, value: cantidad + 1 } });
    }
  };

  return (
    <div className="selector-cantidad">
      <Boton variant="secondary" onClick={decrementar} disabled={cantidad <= min}>
        -
      </Boton>
      <Input
        id={id}
        name={name}
        type="number"
        value={cantidad}
        onChange={onChange}
        min={min}
        max={max}
        className="input-cantidad"
      />
      <Boton variant="secondary" onClick={incrementar} disabled={cantidad >= max}>
        +
      </Boton>
    </div>
  );
};
