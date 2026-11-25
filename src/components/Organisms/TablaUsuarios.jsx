import React from 'react';
import { Boton } from '../Atoms';

const colorRol = {
  ADMINISTRADOR: 'bg-danger',
  OPERADOR: 'bg-warning text-dark',
  REPARTIDOR: 'bg-primary',
  CLIENTE: 'bg-secondary',
};

// Organismo: tabla de usuarios con acciones (editar, activar/desactivar, eliminar, ver historial).
// Los datos vienen de la API; cada fila se identifica por su id. ocupado = hay una acción en curso.
export const TablaUsuarios = ({ usuarios = [], ocupado = false, onEditar, onCambiarActivo, onEliminar, onVerHistorial }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr className="small">
            <th>RUT</th>
            <th>Nombre y correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">No hay usuarios para este filtro.</td>
            </tr>
          ) : (
            usuarios.map((u) => (
              <tr key={u.id ?? u.rut}>
                <td className="small fw-bold">{u.rut}</td>
                <td>
                  <strong className="d-block">{u.nombre}</strong>
                  <small className="text-muted d-block">{u.email}</small>
                  {u.telefono && <small className="text-muted">{u.telefono}</small>}
                </td>
                <td><span className={`badge ${colorRol[u.rol] || 'bg-secondary'}`}>{u.rol}</span></td>
                <td>
                  <span className={`badge ${u.activo === false ? 'bg-secondary' : 'bg-success'}`}>
                    {u.activo === false ? 'Inactivo' : 'Activo'}
                  </span>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    <Boton texto="Editar" variante="outline-primary" tamano="sm" disabled={ocupado} onClick={() => onEditar(u)} />
                    <Boton texto={u.activo === false ? 'Activar' : 'Desactivar'} variante="outline-warning" tamano="sm" disabled={ocupado} onClick={() => onCambiarActivo(u)} />
                    {u.rol === 'CLIENTE' && onVerHistorial && (
                      <Boton texto="Historial" variante="outline-dark" tamano="sm" onClick={() => onVerHistorial(u)} />
                    )}
                    {u.activo !== false && (
                      <Boton texto="Eliminar" variante="outline-danger" tamano="sm" disabled={ocupado} onClick={() => onEliminar(u)} />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;