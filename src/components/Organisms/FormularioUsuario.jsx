import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarRutFormulario,
  validarNombreFormulario,
  validarEmailFormulario,
  validarPasswordFormulario,
  validarTelefonoFormulario,
  sinErrores,
} from '../../utils/validaciones';

const usuarioVacio = { rut: '', nombre: '', email: '', telefono: '', password: '', rol: 'OPERADOR' };

export const opcionesRoles = [
  { value: 'ADMINISTRADOR', label: 'Administrador' },
  { value: 'OPERADOR', label: 'Operadora / Despachadora' },
  { value: 'REPARTIDOR', label: 'Repartidor' },
  { value: 'CLIENTE', label: 'Cliente' },
];

// Organismo: crear o editar un usuario (panel de administración, conectado a la API).
// - Crear: RUT, nombre, correo, teléfono (opcional), contraseña (mín. 8) y rol.
// - Editar: el RUT y la contraseña no se cambian (la API no lo permite); sí nombre, correo, teléfono y rol.
// erroresCampos: errores por campo que devolvió la API en un 400 ({ email: '...' }).
export const FormularioUsuario = ({
  usuarioEditar = null,
  errorGeneral = '',
  erroresCampos = {},
  cargando = false,
  onEnviar,
  onCancelar,
}) => {
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

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = {
      rut: esEdicion ? '' : validarRutFormulario(datos.rut),
      nombre: validarNombreFormulario(datos.nombre, 'El nombre'),
      email: validarEmailFormulario(datos.email),
      telefono: validarTelefonoFormulario(datos.telefono),
      password: esEdicion ? '' : validarPasswordFormulario(datos.password, 8),
    };
    setErrores(nuevosErrores);
    if (!sinErrores(nuevosErrores)) return;
    const exito = await onEnviar(datos);
    if (exito && !esEdicion) setDatos(usuarioVacio);
  };

  // Primero el error local; si no hay, el que devolvió la API para ese campo.
  const errorDe = (campo) => errores[campo] || erroresCampos[campo] || '';

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <h3 className="fs-5 fw-bold mb-3">{esEdicion ? 'Editar usuario' : 'Registrar nuevo usuario'}</h3>
      {errorGeneral && <div className="alert alert-danger py-2 small" role="alert">{errorGeneral}</div>}

      <CampoFormulario id="usr-rut" name="rut" label="RUT" placeholder="12.345.678-5" value={datos.rut}
        onChange={manejarCambio} error={errorDe('rut')} disabled={esEdicion || cargando} />
      <CampoFormulario id="usr-nombre" name="nombre" label="Nombre completo" value={datos.nombre}
        onChange={manejarCambio} error={errorDe('nombre')} disabled={cargando} />
      <CampoFormulario id="usr-email" name="email" type="email" label="Correo" value={datos.email}
        onChange={manejarCambio} error={errorDe('email')} disabled={cargando} />
      <CampoFormulario id="usr-telefono" name="telefono" label="Teléfono (opcional)" placeholder="+56912345678"
        value={datos.telefono} onChange={manejarCambio} error={errorDe('telefono')} disabled={cargando} />
      {!esEdicion && (
        <CampoFormulario id="usr-password" name="password" type="password" label="Contraseña (mínimo 8)"
          value={datos.password} onChange={manejarCambio} error={errorDe('password')} disabled={cargando} />
      )}
      <CampoFormulario id="usr-rol" name="rol" label="Rol en el sistema" value={datos.rol}
        onChange={manejarCambio} options={opcionesRoles} disabled={cargando} />

      <div className="d-flex flex-wrap gap-2">
        <Boton
          texto={cargando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Guardar usuario'}
          type="submit"
          variante="primary"
          disabled={cargando}
        />
        {esEdicion && <Boton texto="Cancelar" variante="outline-secondary" onClick={onCancelar} disabled={cargando} />}
      </div>
    </form>
  );
};

export default FormularioUsuario;