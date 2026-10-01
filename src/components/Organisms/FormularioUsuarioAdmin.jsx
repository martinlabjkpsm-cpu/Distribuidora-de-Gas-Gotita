import React from 'react';
import { Title } from '../Atoms/Title';
import { Boton } from '../Atoms/Boton';
import { CampoFormulario } from '../Molecules/CampoFormulario';

export const FormularioUsuarioAdmin = ({ formData = {}, onChange, onSubmit, esEdicion = false }) => {
  const opcionesRoles = [
    { value: 'OPERADOR', label: 'Operadora / Despachadora' },
    { value: 'REPARTIDOR', label: 'Repartidor' },
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'CLIENTE', label: 'Cliente' }
  ];

  return (
    <section className="organismo-form-usuario-admin">
      <Title level={2}>{esEdicion ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</Title>
      <form onSubmit={onSubmit} className="form-admin-usuario">
        <fieldset>
          <legend>{esEdicion ? 'Actualizar Datos de Cuenta' : 'Registro de Cuenta de Sistema'}</legend>
          <CampoFormulario
            id="admin-rut"
            name="rut"
            label="RUT del Usuario"
            placeholder="12345678-9"
            value={formData.rut || ''}
            onChange={onChange}
            required
          />
          <CampoFormulario
            id="admin-nombre"
            name="nombre"
            label="Nombre Completo"
            placeholder="Ej: Ana María Silva"
            value={formData.nombre || ''}
            onChange={onChange}
            required
          />
          <CampoFormulario
            id="admin-rol"
            name="rol"
            label="Rol en el Sistema (RBAC)"
            value={formData.rol || 'OPERADOR'}
            onChange={onChange}
            options={opcionesRoles}
            required
          />
          <CampoFormulario
            id="admin-contrasena"
            name="contrasena"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={formData.contrasena || ''}
            onChange={onChange}
            required={!esEdicion}
          />
          <Boton type="submit" variant="primary">
            {esEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
          </Boton>
        </fieldset>
      </form>
    </section>
  );
};
