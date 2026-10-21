import React from 'react'; 
import { Title } from '../Atoms'; 

export const TarjetaResumenCaja = ({ titulo, monto, variante = 'normal' }) => { 
  return ( 
    <div className={`tarjeta-resumen-caja card p-3 text-center shadow-sm ${variante}`}> 
      <Title level={4} className="fs-6 text-muted mb-2">{titulo}</Title> 
      <p className="monto fs-4 fw-bold text-primary m-0"> 
        {typeof monto === 'number' ? `$${monto.toLocaleString('es-CL')}` : monto} 
      </p> 
    </div> 
  ); 
}; 

export default TarjetaResumenCaja;
