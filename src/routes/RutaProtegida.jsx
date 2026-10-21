import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RutaProtegida = ({ rolesPermitidos = [] }) => {
  const auth = useAuth() || {};
  const usuario = auth.usuario;
  const cargando = auth.cargando;

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const rolUsuario = usuario?.rol ? String(usuario.rol).toUpperCase() : '';

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolUsuario)) {
    return <Navigate to="/sin-acceso" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;