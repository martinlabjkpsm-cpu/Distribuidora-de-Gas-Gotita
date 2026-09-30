import React from 'react';

export const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  required = false,
  className = 'form-control',
}) => {
  return (
    <textarea
      id={id}
      name={name || id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={className}
    />
  );
};
