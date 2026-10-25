import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarNombreFormulario,
  validarEmailFormulario,
  validarCampoObligatorio,
  sinErrores,
} from '../../utils/validaciones';

const vacio = { nombre: '', email: '', mensaje: '' };

// Organismo: formulario de contacto con validación en React.
export const FormularioContacto = ({ onEnviar }) => {
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
      nombre: validarNombreFormulario(datos.nombre, 'El nombre'),
      email: validarEmailFormulario(datos.email),
      mensaje: validarCampoObligatorio(datos.mensaje, 'El mensaje'),
    };
    setErrores(nuevosErrores);
    if (sinErrores(nuevosErrores)) {
      onEnviar(datos);
      setDatos(vacio);
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario id="contacto-nombre" name="nombre" label="Nombre" value={datos.nombre}
        onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario id="contacto-email" name="email" type="email" label="Correo" value={datos.email}
        onChange={manejarCambio} error={errores.email} />
      <CampoFormulario id="contacto-mensaje" name="mensaje" label="Mensaje" rows={4} value={datos.mensaje}
        onChange={manejarCambio} error={errores.mensaje} />
      <Boton type="submit" variant="danger">Enviar mensaje</Boton>
    </form>
  );
};

export default FormularioContacto;
