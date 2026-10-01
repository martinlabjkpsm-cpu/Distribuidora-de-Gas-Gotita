import React from 'react';
import { Imagen } from '../Atoms/Imagen';
import { Title } from '../Atoms/Title';
import { Label } from '../Atoms/Label';
import { SelectorCantidad } from './SelectorCantidad';

export const TarjetaProducto = ({
  id,
  nombre,
  imagenSrc,
  precio,
  cantidad = 0,
  onCantidadChange,
}) => {
  return (
    <article className="tarjeta-producto card p-3" style={{ width: '250px' }}>
      {imagenSrc && <Imagen src={imagenSrc} alt={nombre} className="card-img-top img-producto" />}
      <div className="card-body text-center">
        <Title level={4}>{nombre}</Title>
        <p className="precio-producto fw-bold text-primary">
          ${precio ? precio.toLocaleString('es-CL') : '0'}
        </p>
        <Label htmlFor={id}>Cantidad:</Label>
        <SelectorCantidad
          id={id}
          name={id}
          cantidad={cantidad}
          onChange={onCantidadChange}
        />
      </div>
    </article>
  );
};