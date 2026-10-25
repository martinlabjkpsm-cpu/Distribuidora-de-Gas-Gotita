import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import { validarRutFormulario, validarPasswordFormulario, sinErrores } from '../../utils/validaciones';

// Organismo: formulario de inicio de sesión.
// Es el dueño del estado (rut, clave y errores). Al enviar valida y,
// solo si todo está bien, avisa a la página con onEnviar({ rut, password }).
export const FormularioLogin = ({ onEnviar, errorGeneral = '' }) => {
  const [datos, setDatos] = useState({ rut: '', password: '' });
  const [errores, setErrores] = useState({ rut: '', password: '' });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: '' }); // al corregir, se borra el error de ese campo
  };

  const manejarEnvio = (e) => {
    e.preventDefault(); // evita que el navegador recargue la página
    const nuevosErrores = {
      rut: validarRutFormulario(datos.rut),
      password: validarPasswordFormulario(datos.password),
    };
    setErrores(nuevosErrores);
    if (sinErrores(nuevosErrores)) {
      onEnviar({ rut: datos.rut.trim(), password: datos.password });
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {errorGeneral && (
        <div className="alert alert-danger py-2 small" role="alert">
          {errorGeneral}
        </div>
      )}

      <CampoFormulario
        id="login-rut"
        name="rut"
        label="RUT"
        placeholder="12345678-9"
        value={datos.rut}
        onChange={manejarCambio}
        error={errores.rut}
      />

      <CampoFormulario
        id="login-password"
        name="password"
        type="password"
        label="Contraseña"
        placeholder="••••••••"
        value={datos.password}
        onChange={manejarCambio}
        error={errores.password}
      />

      <Boton type="submit" variant="danger" fullWidth className="fw-bold">
        Ingresar al sistema
      </Boton>
    </form>
  );
};

export default FormularioLogin;
