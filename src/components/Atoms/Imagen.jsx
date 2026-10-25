import React from 'react';

// Átomo: imagen. Si el archivo no carga, le agrega la clase "img-error".
export const Imagen = ({ src, alt, className = '', style }) => {
  return (
    <img
      src={src}
      alt={alt || 'Imagen del producto'}
      className={className}
      style={style}
      onError={(e) => e.target.classList.add('img-error')}
    />
  );
};

export default Imagen;
