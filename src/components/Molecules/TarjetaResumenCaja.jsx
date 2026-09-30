import React from 'react';
import { Title } from '../atoms';

export const TarjetaResumenCaja = ({ titulo, monto, variante = 'normal' }) => {
  return (
    <div className={`tarjeta-resumen-caja ${variante}`}>
      <Title level={4}>{titulo}</Title>
      <p className="monto">
        {typeof monto === 'number' ? `$${monto.toLocaleString('es-CL')}` : monto}
      </p>
    </div>
  );
};
