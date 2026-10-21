import React from 'react';

export const Etiqueta = ({ variant = 'pendiente', children, className = '' }) => { 
  const etiquetaClass = `etiqueta etiqueta-${variant.toString().toLowerCase()}`; 
  return ( 
    <span className={`${etiquetaClass} ${className}`.trim()}> 
      {children} 
    </span> 
  ); 
}; 

export default Etiqueta;
