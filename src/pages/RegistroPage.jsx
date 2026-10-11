import React from 'react';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioRegistro } from '../components/Organisms/FormularioRegistro';

export const RegistroPage = ({ formData, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
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

export default RegistroPage;