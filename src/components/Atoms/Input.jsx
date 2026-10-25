import React from 'react';

// Átomo: caja de texto controlada (recibe value y avisa con onChange).
export const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  min,
  max,
  className = 'form-control',
}) => {
  return (
    <input
      id={id}
      name={name || id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      className={className}
    />
  );
};

export default Input;
