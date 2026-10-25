import React from 'react';

// Átomo: botón de Bootstrap. Siempre lleva la clase base "btn" + su variante.
export const Boton = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const variantClass = variant === 'disabled' ? 'btn-secondary' : `btn-${variant}`;
  const widthClass = fullWidth ? 'w-100' : '';

  return (
    <button
      type={type}
      disabled={disabled || variant === 'disabled'}
      onClick={onClick}
      className={`btn ${variantClass} ${widthClass} ${className}`.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </button>
  );
};

export default Boton;
