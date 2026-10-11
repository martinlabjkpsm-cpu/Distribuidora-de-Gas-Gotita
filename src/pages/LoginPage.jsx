import React from 'react';
import { AuthLayoutTemplate } from '../components/Templates/AuthLayoutTemplate';
import { FormularioLogin } from '../components/Organisms/FormularioLogin';

export const LoginPage = ({ onLogin }) => {
  const handleLoginSubmit = (datosFormulario) => {
    console.log('Datos de inicio de sesión capturados:', datosFormulario);

    // Si la página recibe la función onLogin desde las rutas o estado global
    if (onLogin) {
      onLogin(datosFormulario);
    }
  };

  return (
    <AuthLayoutTemplate tituloHeader="Gas Gotita - Iniciar Sesión">
      <FormularioLogin onSubmit={handleLoginSubmit} />
    </AuthLayoutTemplate>
  );
};

export default LoginPage;