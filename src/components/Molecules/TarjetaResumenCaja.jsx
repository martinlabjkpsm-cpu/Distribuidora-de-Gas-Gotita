import React from 'react';
import { Title } from '../Atoms';
import { formatearMoneda } from '../../utils/formato';

// Molécula: tarjeta con un título y un número (monto o cantidad).
export const TarjetaResumenCaja = ({ titulo, monto, esDinero = true, color = 'primary' }) => {
  const valor = typeof monto === 'number' && esDinero ? formatearMoneda(monto) : monto;
  return (
    <div className={`card h-100 p-3 text-center shadow-sm border-0 border-top border-4 border-${color}`}>
      <Title level={3} className="fs-6 text-muted mb-2">
        {titulo}
      </Title>
      <p className={`fs-4 fw-bold text-${color} m-0`}>{valor}</p>
    </div>
  );
};

export default TarjetaResumenCaja;
