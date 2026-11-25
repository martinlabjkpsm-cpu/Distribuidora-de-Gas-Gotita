import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarRutFormulario,
  validarNombreFormulario,
  validarEmailFormulario,
  validarPasswordFormulario,
  validarTelefonoFormulario,
  validarConfirmacionClave,
  sinErrores,
} from '../../utils/validaciones';

const vacio = { rut: '', nombre: '', email: '', telefono: '', password: '', confirmacion: '' };

// Valida TODOS los campos al enviar y muestra cada error junto a su campo (sin alert()).
export const FormularioRegistro = ({ onEnviar, errorGeneral = '', cargando = false }) => {
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState(vacio);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {
      rut: validarRutFormulario(datos.rut),
      nombre: validarNombreFormulario(datos.nombre, 'El nombre'),
      email: validarEmailFormulario(datos.email),
      telefono: validarTelefonoFormulario(datos.telefono),
      password: validarPasswordFormulario(datos.password, 8),
      confirmacion: validarConfirmacionClave(datos.password, datos.confirmacion),
    };
    setErrores(nuevosErrores);

    if (sinErrores(nuevosErrores)) {
      onEnviar({
        rut: datos.rut.trim(),
        nombre: datos.nombre.trim(),
        email: datos.email.trim(),
        telefono: datos.telefono.trim(),
        password: datos.password,
      });
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      {errorGeneral && (
        <div className="alert alert-danger py-2 small" role="alert">
          {errorGeneral}
        </div>
      )}

      <CampoFormulario id="reg-rut" name="rut" label="RUT" placeholder="Ej: 12345678-9"
        value={datos.rut} onChange={manejarCambio} error={errores.rut} />

      <CampoFormulario id="reg-nombre" name="nombre" label="Nombre completo" placeholder="Ej: Juan Pérez"
        value={datos.nombre} onChange={manejarCambio} error={errores.nombre} />

      <CampoFormulario id="reg-email" name="email" type="email" label="Correo electrónico"
        placeholder="ejemplo@correo.cl" value={datos.email} onChange={manejarCambio} error={errores.email} />

      <CampoFormulario id="reg-telefono" name="telefono" label="Teléfono (opcional)" placeholder="+56912345678"
        value={datos.telefono} onChange={manejarCambio} error={errores.telefono} />

      <CampoFormulario id="reg-password" name="password" type="password" label="Contraseña"
        placeholder="Mínimo 8 caracteres" value={datos.password} onChange={manejarCambio} error={errores.password} />

      <CampoFormulario id="reg-confirmacion" name="confirmacion" type="password" label="Repite la contraseña"
        value={datos.confirmacion} onChange={manejarCambio} error={errores.confirmacion} />

      <Boton texto={cargando ? 'Creando cuenta...' : 'Crear mi cuenta'} type="submit" variante="success" anchoCompleto className="fw-bold" disabled={cargando} />
    </form>
  );
};

export default FormularioRegistro;