import React from 'react';
import { Title, Boton } from '../Atoms';
import { ItemCarrito } from '../Molecules';
import { formatearMoneda } from '../../utils/formato';
import { precioSegunCliente, calcularTotal } from '../../utils/precios';

// Organismo: el carrito (pedido en curso). Recibe los ítems y las acciones por props.
export const CarritoCompras = ({
  items = [],
  tipoTarifa = 'RESIDENCIAL',
  onCambiarTarifa,
  onSumar,
  onRestar,
  onEliminar,
  onVaciar,
}) => {
  const total = calcularTotal(items, tipoTarifa);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <Title level={2} className="fs-5 m-0">🛒 Tu carrito</Title>
        {items.length > 0 && (
          <Boton variant="outline-danger" className="btn-sm" onClick={onVaciar}>Vaciar</Boton>
        )}
      </div>

      <div className="mb-3 p-2 bg-light rounded border d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="small fw-bold">Tarifa:</span>
        <div className="btn-group btn-group-sm" role="group" aria-label="Tipo de tarifa">
          {['RESIDENCIAL', 'COMERCIAL'].map((tipo) => (
            <Boton
              key={tipo}
              variant={tipoTarifa === tipo ? 'danger' : 'outline-danger'}
              onClick={() => onCambiarTarifa(tipo)}
            >
              {tipo === 'RESIDENCIAL' ? 'Residencial' : 'Comercial'}
            </Boton>
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-muted small py-3 mb-0">No has agregado productos al carrito.</p>
      ) : (
        <>
          <ul className="list-group list-group-flush mb-2">
            {items.map((item) => (
              <ItemCarrito
                key={item.codigo}
                nombre={item.nombre}
                cantidad={item.cantidad}
                precioUnitario={precioSegunCliente(item, tipoTarifa)}
                onSumar={() => onSumar(item)}
                onRestar={() => onRestar(item.codigo)}
                onEliminar={() => onEliminar(item.codigo)}
              />
            ))}
          </ul>
          <div className="d-flex justify-content-between border-top pt-2 fw-bold fs-5">
            <span>Total:</span>
            <span className="text-success">{formatearMoneda(total)}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default CarritoCompras;
