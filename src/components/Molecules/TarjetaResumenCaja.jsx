import React from 'react';
import { Title } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

// Molécula: tarjeta con un título y un número (monto o cantidad), recibidos por props.
function TarjetaResumenCaja(props) {
  const esDinero = props.esDinero !== false; // por defecto muestra el monto como dinero
  const color = props.color || 'primary';
  const valor = typeof props.monto === 'number' && esDinero ? formatearMoneda(props.monto) : props.monto;

  return (
    <div className={`card h-100 p-3 text-center shadow-sm border-0 border-top border-4 border-${color}`}>
      <Title level={3} className="fs-6 text-muted mb-2" texto={props.titulo} />
      <p className={`fs-4 fw-bold text-${color} m-0`}>{valor}</p>
    </div>
  );
}

export { TarjetaResumenCaja };
export default TarjetaResumenCaja;
