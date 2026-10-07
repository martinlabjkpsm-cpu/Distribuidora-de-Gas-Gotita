import React from 'react';
import { AuthLayoutTemplate } from '../Templates/AuthLayoutTemplate';
import { FormularioRegistro } from '../Organisms/FormularioRegistro';

export const RegistroPage = ({ formData, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <AuthLayoutTemplate tituloHeader="Gas Gotita - Registro de Cliente">
      <FormularioRegistro
        formData={formData}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
    </AuthLayoutTemplate>
  );
};
