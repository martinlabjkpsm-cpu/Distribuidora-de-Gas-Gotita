import React from 'react';
import { Etiqueta } from '../Atoms';
import { formatearMoneda, formatearFecha } from '../../utils/formato';

// Organismo: comprobante (boleta) de un pedido: datos del cliente, detalle y total.
export const ComprobantePedido = ({ pedido }) => {
  if (!pedido) return null;

  return (
    <div className="card shadow-sm border-success">
      <div className="card-header bg-success text-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <strong>Pedido #{pedido.id}</strong>
        <Etiqueta variant={pedido.estado} />
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-12 col-md-6 small">
            <p className="mb-1"><strong>Fecha:</strong> {formatearFecha(pedido.fecha)}</p>
            <p className="mb-1"><strong>Cliente:</strong> {pedido.clienteNombre}</p>
            {pedido.clienteEmail && <p className="mb-1"><strong>Correo:</strong> {pedido.clienteEmail}</p>}
            <p className="mb-1"><strong>Dirección:</strong> {pedido.direccion}</p>
            {pedido.zona && <p className="mb-1"><strong>Zona:</strong> {pedido.zona}</p>}
            {pedido.indicaciones && <p className="mb-1"><strong>Indicaciones:</strong> {pedido.indicaciones}</p>}
            <p className="mb-1"><strong>Pago:</strong> {pedido.metodoPago} · <strong>Tarifa:</strong> {pedido.tipoTarifa}</p>
            <p className="mb-0"><strong>Repartidor:</strong> {pedido.repartidorNombre || 'Sin asignar'}</p>
          </div>
          <div className="col-12 col-md-6">
            <strong className="d-block small mb-1">Detalle</strong>
            <ul className="list-unstyled small mb-2">
              {(pedido.items || []).map((item) => (
                <li key={item.codigo || item.nombre} className="d-flex justify-content-between gap-2">
                  <span>{item.cantidad}x {item.nombre}</span>
                  <span className="fw-bold">{formatearMoneda(item.cantidad * item.precioUnitario)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between border-top pt-1 fw-bold text-success">
              <span>Total</span>
              <span>{formatearMoneda(pedido.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprobantePedido;
