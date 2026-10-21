import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Boton } from '../Atoms';

export const EncabezadoPrincipal = ({ titulo = 'Gas Gotita' }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const obtenerRutaPortal = () => {
    if (!usuario) return '/login';
    const rol = usuario?.rol ? String(usuario.rol).toUpperCase() : '';
    if (rol === 'ADMINISTRADOR') return '/admin';
    if (rol === 'OPERADOR') return '/operador';
    if (rol === 'REPARTIDOR') return '/repartidor';
    return '/cliente';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-danger px-3 shadow-sm mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2">
          {titulo}
        </Link>

        <div className="d-flex align-items-center gap-2">
          {usuario ? (
            <>
              <span className="text-white small me-2 d-none d-md-inline">
                Sesión: <strong>{usuario.nombre || usuario.rut || 'Usuario'}</strong>
              </span>
              <Boton
                variant="light"
                className="btn btn-light btn-sm fw-bold text-danger"
                onClick={() => navigate(obtenerRutaPortal())}
              >
                Mi Portal
              </Boton>
              <Boton
                variant="outline-light"
                className="btn btn-outline-light btn-sm fw-bold"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Boton>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm fw-bold">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="btn btn-light btn-sm fw-bold text-danger">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default EncabezadoPrincipal;