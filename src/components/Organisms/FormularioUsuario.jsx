import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarRutFormulario,
  validarNombreFormulario,
  validarEmailFormulario,
  validarPasswordFormulario,
  sinErrores,
} from '../../utils/validaciones';

const usuarioVacio = { rut: '', nombre: '', email: '', password: '', rol: 'OPERADOR' };

export const opcionesRoles = [
  { value: 'ADMINISTRADOR', label: 'Administrador' },
  { value: 'OPERADOR', label: 'Operadora / Despachadora' },
  { value: 'REPARTIDOR', label: 'Repartidor' },
  { value: 'CLIENTE', label: 'Cliente' },
];

// Organismo: crear o editar un usuario (panel de administración).
// En edición el RUT no se cambia y la contraseña es opcional (vacía = se mantiene).
export const FormularioUsuario = ({ usuarioEditar = null, errorGeneral = '', onEnviar, onCancelar }) => {
  const esEdicion = Boolean(usuarioEditar);
  const [datos, setDatos] = useState(
    usuarioEditar ? { ...usuarioVacio, ...usuarioEditar, password: '' } : usuarioVacio
  );
  const [errores, setErrores] = useState({});

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
      password: esEdicion && !datos.password ? '' : validarPasswordFormulario(datos.password),
    };
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) return;

    onEnviar({
      rut: datos.rut.trim(),
      nombre: datos.nombre.trim(),
      email: datos.email.trim(),
      password: datos.password,
      rol: datos.rol,
    });
    if (!esEdicion) setDatos(usuarioVacio);
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <h3 className="fs-5 fw-bold mb-3">{esEdicion ? 'Editar usuario' : 'Registrar nuevo usuario'}</h3>
      {errorGeneral && <div className="alert alert-danger py-2 small">{errorGeneral}</div>}

      <CampoFormulario id="usr-rut" name="rut" label="RUT" placeholder="12345678-9" value={datos.rut}
        onChange={manejarCambio} error={errores.rut} disabled={esEdicion} />
      <CampoFormulario id="usr-nombre" name="nombre" label="Nombre completo" value={datos.nombre}
        onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario id="usr-email" name="email" type="email" label="Correo" value={datos.email}
        onChange={manejarCambio} error={errores.email} />
      <CampoFormulario id="usr-password" name="password" type="password"
        label={esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña'}
        value={datos.password} onChange={manejarCambio} error={errores.password} />
      <CampoFormulario id="usr-rol" name="rol" label="Rol en el sistema" value={datos.rol}
        onChange={manejarCambio} options={opcionesRoles} />

      <div className="d-flex flex-wrap gap-2">
        <Boton type="submit" variant="primary">{esEdicion ? 'Guardar cambios' : 'Guardar usuario'}</Boton>
        {esEdicion && <Boton variant="outline-secondary" onClick={onCancelar}>Cancelar</Boton>}
      </div>
    </form>
  );
};

export default FormularioUsuario;
