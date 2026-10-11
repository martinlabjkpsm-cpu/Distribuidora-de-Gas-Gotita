import React, { useState } from 'react';
import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { LinkNav } from '../Atoms/LinkNav';
import { CampoFormulario } from '../Molecules/CampoFormulario';
import { validarRut, validarRequerido } from '../../utils/validaciones';

export const FormularioLogin = ({ onEnviar }) => {
  const [formData, setFormData] = useState({ rut: '', password: '' });
  const [errores, setErrores] = useState({ rut: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorRut = !validarRut(formData.rut) ? 'RUT no válido' : '';
    const errorPass = !validarRequerido(formData.password) ? 'La contraseña es requerida' : '';

    if (errorRut || errorPass) {
      setErrores({ rut: errorRut, password: errorPass });
    } else if (onEnviar) {
      onEnviar(formData);
    }
  };

  return (
    <section className="contenedor-login">
      <Title level={2}>Iniciar Sesión</Title>
      <form onSubmit={handleSubmit} className="form-login" noValidate>
        <CampoFormulario
          id="rut"
          name="rut"
          label="RUT del Usuario"
          placeholder="12345678-9"
          value={formData.rut}
          onChange={handleChange}
          error={errores.rut}
        />
        <CampoFormulario
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errores.password}
        />
        <Boton type="submit" variant="primary" fullWidth className="mt-3">
          Ingresar al Sistema
        </Boton>
      </form>

      <nav className="links-auxiliares mt-3 d-flex flex-column gap-2">
        <LinkNav to="/registro">¿No tienes cuenta? Regístrate aquí</LinkNav>
        <LinkNav to="/">Volver al Inicio</LinkNav>
      </nav>
    </section>
  );
};

export default FormularioLogin;