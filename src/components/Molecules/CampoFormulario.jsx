
import React from 'react';
import { Label, Input, Select, Textarea } from '../Atoms';

export const CampoFormulario = ({
  id, name, label, type = 'text', value, onChange, placeholder = '', required = false, options = [], rows, className = '',
  error
}) => {
 
  const errorClass = error ? 'campo-error' : ''; 

  return (
    <div className={`campo-formulario ${className}`.trim()}>
      <Label htmlFor={id}>{label}</Label>
      {rows ? (
        <Textarea id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className={errorClass} />
      ) : options.length > 0 ? (
        <Select id={id} name={name} value={value} onChange={onChange} options={options} required={required} className={errorClass} />
      ) : (
        <Input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={errorClass} />
      )}
     
      {error && <span className="texto-error" style={{color: '#a3242f', fontSize: '0.85em'}}>{error}</span>}
    </div>
  );
};