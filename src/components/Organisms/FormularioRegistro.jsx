import React, { useState } from 'react';
import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { LinkNav } from '../Atoms/LinkNav';
import { CampoFormulario } from '../Molecules/CampoFormulario';
import { validarRut, validarRequerido, validarEmail } from '../../utils/validaciones';

export const FormularioRegistro = ({ onEnviar }) => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    email: '',
    password: ''
  });

  const [errores, setErrores] = useState({
    rut: '',
    nombre: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorRut = !validarRut(formData.rut) ? 'RUT no válido' : '';
    const errorNombre = !validarRequerido(formData.nombre) ? 'El nombre es obligatorio' : '';
    const errorEmail = !validarEmail(formData.email) ? 'Ingrese un correo electrónico válido' : '';
    const errorPass = !validarRequerido(formData.password) ? 'La contraseña es obligatoria' : '';

    if (errorRut || errorNombre || errorEmail || errorPass) {
      setErrores({
        rut: errorRut,
        nombre: errorNombre,
        email: errorEmail,
        password: errorPass
      });
    } else if (onEnviar) {
      onEnviar(formData);
    }
  };

  return (
    <section className="contenedor-registro">
      <Title level={2}>Registro de Nuevo Cliente</Title>
      <form onSubmit={handleSubmit} className="form-registro" noValidate>
        <CampoFormulario
          id="rut"
          name="rut"
          label="RUT"
          placeholder="12345678-9"
          value={formData.rut}
          onChange={handleChange}
          error={errores.rut}
        />
        <CampoFormulario
          id="nombre"
          name="nombre"
          label="Nombre Completo"
          placeholder="Ej: Juan Pérez"
          value={formData.nombre}
          onChange={handleChange}
          error={errores.nombre}
        />
        <CampoFormulario
          id="email"
          name="email"
          type="email"
          label="Correo Electrónico"
          placeholder="juan@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          error={errores.email}
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
          Crear Cuenta
        </Boton>
      </form>

      <nav className="links-auxiliares mt-3">
        <LinkNav to="/login">¿Ya tienes cuenta? Inicia sesión</LinkNav>
      </nav>
    </section>
  );
};

export default FormularioRegistro;