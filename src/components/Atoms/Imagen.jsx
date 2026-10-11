import React from 'react';

export const Imagen = ({ src, alt, className = '' }) => {
  return (
    <img 
      src={src} 
      alt={alt || 'Imagen del producto'} 
      className={className} 
      onError={(e) => {
        // Muestra un borde rojo si la imagen no se encuentra para facilitar el depurado
        const elemento = e['target'];
        if (elemento && elemento['style']) {
          elemento['style']['border'] = '2px solid red';
        }
      }}
    />
  );
};

export default Imagen;