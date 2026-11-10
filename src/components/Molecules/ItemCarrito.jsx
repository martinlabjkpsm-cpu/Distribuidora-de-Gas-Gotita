import React from 'react';
import { Boton } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

// Molécula: una fila del carrito con cantidad (- / +), subtotal y botón para quitar.
// Recibe los datos por props y avisa al padre con onSumar / onRestar / onEliminar.
function ItemCarrito(props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2 px-0 py-2">
      <div className="me-2 flex-grow-1">
        <strong className="d-block small">{props.nombre}</strong>
        <small className="text-muted d-block">{formatearMoneda(props.precioUnitario)} c/u</small>
      </div>

      <div className="d-flex align-items-center gap-1">
        <Boton texto="-" ariaLabel="Restar uno" variante="outline-secondary" tamano="sm" className="px-2 py-0" onClick={props.onRestar} />
        <span className="fw-bold px-1 small" aria-label="cantidad">
          {props.cantidad}
        </span>
        <Boton texto="+" ariaLabel="Sumar uno" variante="outline-secondary" tamano="sm" className="px-2 py-0" onClick={props.onSumar} />
      </div>

      <strong className="text-success small">{formatearMoneda(props.cantidad * props.precioUnitario)}</strong>

      <Boton texto="×" ariaLabel="Quitar del carrito" variante="outline-danger" tamano="sm" className="py-0 px-2" onClick={props.onEliminar} />
    </li>
  );
}

export { ItemCarrito };
export default ItemCarrito;
