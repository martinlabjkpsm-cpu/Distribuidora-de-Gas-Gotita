import React from 'react';


export const Imagen = ({ src, alt, className = '' }) => { 
  return ( 
    <img 
      src={src} 
      alt={alt || 'Imagen del producto'} 
      className={className} 
      onError={(e) => { 
        const elemento = e['target']; 
        if (elemento && elemento['classList']) { 
          elemento['classList'].add('img-error'); 
        } 
      }} 
    /> 
  ); 
}; 


export default Imagen;
