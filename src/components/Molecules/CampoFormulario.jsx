import React from 'react';
import { Label, Input, Select, Textarea } from '../Atoms';

// Molécula: etiqueta + caja (input, select o textarea) + mensaje de error.
// No guarda el texto ni valida: muestra el valor que le entregan por props y avisa con onChange.
function CampoFormulario(props) {
  const claseInvalida = props.error ? 'is-invalid' : '';
  const opciones = props.options || [];

  let control;
  if (props.rows) {
    control = (
      <Textarea
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        rows={props.rows}
        className={`form-control ${claseInvalida}`}
      />
    );
  } else if (opciones.length > 0) {
    control = (
      <Select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        options={opciones}
        required={props.required}
        className={`form-select ${claseInvalida}`}
      />
    );
  } else {
    control = (
      <Input
        id={props.id}
        name={props.name}
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        className={`form-control ${claseInvalida}`}
      />
    );
  }

  return (
    <div className={`mb-3 ${props.className || ''}`.trim()}>
      <Label htmlFor={props.id} className="fw-semibold small" texto={props.label} />
      {control}
      {props.error && <div className="invalid-feedback">{props.error}</div>}
    </div>
  );
}

export { CampoFormulario };
export default CampoFormulario;
