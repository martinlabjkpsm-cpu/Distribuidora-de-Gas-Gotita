import React from 'react';
import { Boton } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

// Molécula: una fila del carrito con cantidad (- / +), subtotal y botón para quitar.
export const ItemCarrito = ({ nombre, cantidad, precioUnitario, onSumar, onRestar, onEliminar }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2 px-0 py-2">
      <div className="me-2 flex-grow-1">
        <strong className="d-block small">{nombre}</strong>
        <small className="text-muted d-block">{formatearMoneda(precioUnitario)} c/u</small>
      </div>

      <div className="d-flex align-items-center gap-1">
        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={onRestar}>
          -
        </Boton>
        <span className="fw-bold px-1 small" aria-label="cantidad">
          {cantidad}
        </span>
        <Boton variant="outline-secondary" className="btn-sm px-2 py-0" onClick={onSumar}>
          +
        </Boton>
      </div>

      <strong className="text-success small">{formatearMoneda(cantidad * precioUnitario)}</strong>

      <Boton variant="outline-danger" className="btn-sm py-0 px-2" onClick={onEliminar}>
        ×
      </Boton>
    </li>
  );
};

export default ItemCarrito;
