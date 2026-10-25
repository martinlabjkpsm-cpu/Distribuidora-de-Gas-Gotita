import React from 'react';
import { Label, Input, Select, Textarea } from '../Atoms';

// Molécula: etiqueta + caja (input, select o textarea) + mensaje de error.
// No guarda el texto ni valida: muestra el valor que le entregan y avisa con onChange.
export const CampoFormulario = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  options = [],
  rows,
  className = '',
  error,
}) => {
  const claseInvalida = error ? 'is-invalid' : '';

  let control;
  if (rows) {
    control = (
      <Textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`form-control ${claseInvalida}`}
      />
    );
  } else if (options.length > 0) {
    control = (
      <Select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        required={required}
        className={`form-select ${claseInvalida}`}
      />
    );
  } else {
    control = (
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-control ${claseInvalida}`}
      />
    );
  }

  return (
    <div className={`mb-3 ${className}`.trim()}>
      <Label htmlFor={id} className="fw-semibold small">
        {label}
      </Label>
      {control}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CampoFormulario;
