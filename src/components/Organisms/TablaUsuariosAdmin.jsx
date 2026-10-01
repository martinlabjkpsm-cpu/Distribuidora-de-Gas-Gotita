import React from 'react';
import { Title } from '../Atoms/Title';
import { Etiqueta } from '../Atoms/Etiqueta';
import { Boton } from '../Atoms/Boton';

export const TablaUsuariosAdmin = ({ usuarios = [], onEditar, onDesactivar }) => {
  return (
    <section className="organismo-tabla-usuarios">
      <Title level={3}>Usuarios Registrados</Title>
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="5" className="texto-centro">No hay usuarios registrados.</td>
            </tr>
          ) : (
            usuarios.map((usr) => (
              <tr key={usr.rut}>
                <td>{usr.rut}</td>
                <td>{usr.nombre}</td>
                <td>
                  <Etiqueta variant={usr.rol}>{usr.rol}</Etiqueta>
                </td>
                <td>{usr.activo ? 'Activo' : 'Inactivo'}</td>
                <td>
                  <Boton variant="secondary" onClick={() => onEditar(usr.rut)}>
                    Editar
                  </Boton>
                  {' '}
                  <Boton variant="secondary" onClick={() => onDesactivar(usr.rut)}>
                    {usr.activo ? 'Desactivar' : 'Activar'}
                  </Boton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

