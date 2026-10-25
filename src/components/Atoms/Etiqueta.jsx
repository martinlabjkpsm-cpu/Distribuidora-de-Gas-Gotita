import React from 'react';

// Átomo: etiqueta de estado de un pedido (badge de Bootstrap con el color de cada estado).
const coloresPorEstado = {
  PENDIENTE: 'bg-warning text-dark',
  'EN CAMINO': 'bg-info text-dark',
  ENTREGADO: 'bg-success',
  CANCELADO: 'bg-danger',
};

export const Etiqueta = ({ variant = 'PENDIENTE', children, className = '' }) => {
  const color = coloresPorEstado[String(variant).toUpperCase()] || 'bg-secondary';
  return <span className={`badge ${color} ${className}`.trim()}>{children ?? variant}</span>;
};

export default Etiqueta;
