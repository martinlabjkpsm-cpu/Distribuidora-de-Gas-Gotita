import React, { useState, useEffect } from 'react';
import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { CampoFormulario } from '../Molecules/CampoFormulario';
import { validarRut, validarRequerido } from '../../utils/validaciones';

export const FormularioUsuarioAdmin = ({ onEnviar, esEdicion = false, datosIniciales = null }) => {
  const [formData, setFormData] = useState({ rut: '', nombre: '', rol: 'OPERADOR', contrasena: '' });
  const [errores, setErrores] = useState({ rut: '', nombre: '', rol: '', contrasena: '' });

  useEffect(() => {
    if (esEdicion && datosIniciales) {
      setFormData({
        rut: datosIniciales.rut || '',
        nombre: datosIniciales.nombre || '',
        rol: datosIniciales.rol || 'OPERADOR',
        contrasena: ''
      });
    }
  }, [esEdicion, datosIniciales]);

  const opcionesRoles = [
    { value: 'OPERADOR', label: 'Operadora / Despachadora' },
    { value: 'REPARTIDOR', label: 'Repartidor' },
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'CLIENTE', label: 'Cliente' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorRut = !validarRut(formData.rut) ? 'RUT no válido' : '';
    const errorNombre = !validarRequerido(formData.nombre) ? 'El nombre es obligatorio' : '';
    const errorPass = (!esEdicion && !validarRequerido(formData.contrasena)) ? 'La contraseña es obligatoria' : '';

    if (errorRut || errorNombre || errorPass) {
      setErrores({ rut: errorRut, nombre: errorNombre, contrasena: errorPass });
    } else if (onEnviar) {
      onEnviar(formData);
    }
  };

  return (
    <section className="organismo-form-usuario-admin">
      <Title level={2}>{esEdicion ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</Title>
      <form onSubmit={handleSubmit} className="form-admin-usuario" noValidate>
        <fieldset>
          <legend>{esEdicion ? 'Actualizar Datos de Cuenta' : 'Registro de Cuenta de Sistema'}</legend>
          <CampoFormulario
            id="admin-rut" name="rut" label="RUT del Usuario" placeholder="12345678-9"
            value={formData.rut} onChange={handleChange}
            error={errores.rut}
          />
          <CampoFormulario
            id="admin-nombre" name="nombre" label="Nombre Completo" placeholder="Ej: Ana María Silva"
            value={formData.nombre} onChange={handleChange}
            error={errores.nombre}
          />
          <CampoFormulario
            id="admin-rol" name="rol" label="Rol en el Sistema (RBAC)"
            value={formData.rol} onChange={handleChange}
            options={opcionesRoles}
          />
          <CampoFormulario
            id="admin-contrasena" name="contrasena" type="password" label="Contraseña" placeholder="••••••••"
            value={formData.contrasena} onChange={handleChange}
            error={errores.contrasena}
          />
          <Boton type="submit" variant="primary">
            {esEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
          </Boton>
        </fieldset>
      </form>
    </section>
  );
};

export default FormularioUsuarioAdmin;