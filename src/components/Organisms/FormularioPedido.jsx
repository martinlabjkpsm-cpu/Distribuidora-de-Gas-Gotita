import React, { useState } from 'react';
import { Boton } from '../Atoms';
import { CampoFormulario } from '../Molecules';
import {
  validarNombreFormulario,
  validarEmailFormulario,
  validarDireccionFormulario,
  validarCampoObligatorio,
  sinErrores,
} from '../../utils/validaciones';

// Organismo: confirmación del pedido (checkout).
// Si el cliente inició sesión, sus datos llegan en "datosIniciales" y el formulario se completa solo.
export const FormularioPedido = ({ datosIniciales = {}, zonas = [], deshabilitado = false, onEnviar }) => {
  const [nombreInicial = '', ...resto] = String(datosIniciales.nombre || '').split(' ');

  const [datos, setDatos] = useState({
    nombre: nombreInicial,
    apellidos: resto.join(' '),
    email: datosIniciales.email || '',
    direccion: '',
    zona: '',
    indicaciones: '',
    metodoPago: 'EFECTIVO',
  });
  const [errores, setErrores] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {
      nombre: validarNombreFormulario(datos.nombre, 'El nombre'),
      apellidos: validarNombreFormulario(datos.apellidos, 'El apellido'),
      email: validarEmailFormulario(datos.email),
      direccion: validarDireccionFormulario(datos.direccion),
      zona: validarCampoObligatorio(datos.zona, 'La zona de despacho'),
    };
    setErrores(nuevosErrores);
    if (sinErrores(nuevosErrores)) {
      onEnviar({ ...datos, direccion: datos.direccion.trim(), indicaciones: datos.indicaciones.trim() });
    }
  };

  const opcionesZona = [
    { value: '', label: '-- Selecciona tu zona --' },
    ...zonas.map((z) => ({ value: z.zona, label: `${z.zona} (${z.comunas})` })),
  ];

  return (
    <form onSubmit={manejarEnvio} noValidate className="mt-3 border-top pt-3">
      <h3 className="fs-6 fw-bold mb-3">Datos para el despacho</h3>

      <div className="row g-2">
        <div className="col-12 col-sm-6">
          <CampoFormulario id="ped-nombre" name="nombre" label="Nombre" value={datos.nombre}
            onChange={manejarCambio} error={errores.nombre} />
        </div>
        <div className="col-12 col-sm-6">
          <CampoFormulario id="ped-apellidos" name="apellidos" label="Apellidos" value={datos.apellidos}
            onChange={manejarCambio} error={errores.apellidos} />
        </div>
      </div>

      <CampoFormulario id="ped-email" name="email" type="email" label="Correo" value={datos.email}
        onChange={manejarCambio} error={errores.email} />

      <CampoFormulario id="ped-direccion" name="direccion" label="Dirección de entrega"
        placeholder="Ej: Av. Libertad 450, Depto 302" value={datos.direccion}
        onChange={manejarCambio} error={errores.direccion} />

      <CampoFormulario id="ped-zona" name="zona" label="Zona de despacho" value={datos.zona}
        onChange={manejarCambio} options={opcionesZona} error={errores.zona} />

      <CampoFormulario id="ped-indicaciones" name="indicaciones" label="Indicaciones para el repartidor (opcional)"
        placeholder="Ej: Timbre descompuesto, llamar al llegar" value={datos.indicaciones}
        onChange={manejarCambio} rows={2} />

      <CampoFormulario id="ped-pago" name="metodoPago" label="Método de pago (al recibir)" value={datos.metodoPago}
        onChange={manejarCambio}
        options={[
          { value: 'EFECTIVO', label: 'Efectivo al repartidor' },
          { value: 'TRANSFERENCIA', label: 'Transferencia bancaria' },
          { value: 'DEBITO', label: 'Débito / tarjeta (POS en terreno)' },
        ]} />

      <Boton type="submit" variant="success" fullWidth className="fw-bold" disabled={deshabilitado}>
        Confirmar pedido
      </Boton>
      {deshabilitado && (
        <p className="small text-muted text-center mt-2 mb-0">Agrega productos al carrito para confirmar.</p>
      )}
    </form>
  );
};

export default FormularioPedido;
