import React from 'react';

export const Boton = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false, 
  onClick, 
  className = '' 
}) => {
  const variantClass = disabled || variant === 'disabled' ? 'btn-disabled' : `btn-${variant}`;
  const widthClass = fullWidth ? 'btn-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variantClass} ${widthClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
