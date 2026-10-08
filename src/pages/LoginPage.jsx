import React from 'react';
import { AuthLayoutTemplate } from '../Templates/AuthLayoutTemplate';
import { FormularioLogin } from '../Organisms/FormularioLogin';

export const LoginPage = ({ formData, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <AuthLayoutTemplate tituloHeader="Gas Gotita - Acceso al Sistema">
      <FormularioLogin
        formData={formData}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
    </AuthLayoutTemplate>
  );
};
