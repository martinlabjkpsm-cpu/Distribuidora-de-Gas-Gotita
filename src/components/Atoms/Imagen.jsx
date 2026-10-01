import React from 'react';

export const Imagen = ({ src, alt, className = '' }) => {
  return <img src={src} alt={alt} className={className} />;
};