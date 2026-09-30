import React from 'react';

export const Select = ({
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = 'form-control',
  children,
}) => {
  return (
    <select
      id={id}
      name={name || id}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    >
      {options.length > 0
        ? options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        : children}
    </select>
  );
};
