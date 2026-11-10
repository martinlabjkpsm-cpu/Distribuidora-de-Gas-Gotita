import React from 'react';
import { Boton, LinkNav } from '../Atoms';

// Ruta del portal según el rol de quien inició sesión.
const rutaPortal = (rol) => {
  const r = String(rol || '').toUpperCase();
  if (r === 'ADMINISTRADOR') return '/admin';
  if (r === 'OPERADOR') return '/operador';
  if (r === 'REPARTIDOR') return '/repartidor';
  return '/cliente';
};

// Organismo: barra de navegación responsiva (se colapsa en celular con el botón ☰).
// No conoce el router: recibe onNavegar y onLogout por props desde la plantilla.
export const EncabezadoPrincipal = ({
  titulo = 'Gas Gotita',
  usuario = null,
  enlaces = [],
  cantidadCarrito = 0,
  onNavegar,
  onLogout,
}) => {
  const esCliente = usuario && String(usuario.rol).toUpperCase() === 'CLIENTE';

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
      <div className="container">
        <LinkNav to="/" onNavegar={onNavegar} className="navbar-brand fw-bold fs-4">
          🔥 {titulo}
        </LinkNav>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <nav className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.ruta}>
                <LinkNav to={enlace.ruta} onNavegar={onNavegar} className="nav-link">
                  {enlace.texto}
                </LinkNav>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-wrap align-items-center gap-2 pb-2 pb-lg-0">
            {(!usuario || esCliente) && (
              <Boton
                texto={`🛒 Carrito (${cantidadCarrito})`}
                variante="light"
                tamano="sm"
                className="fw-bold text-danger"
                onClick={() => onNavegar('/cliente')}
              />
            )}

            {usuario ? (
              <>
                <span className="text-white small d-none d-md-inline">
                  Hola, <strong>{usuario.nombre}</strong>
                </span>
                {esCliente && (
                  <Boton texto="Mis pedidos" variante="outline-light" tamano="sm" onClick={() => onNavegar('/mis-pedidos')} />
                )}
                <Boton texto="Mi portal" variante="outline-light" tamano="sm" onClick={() => onNavegar(rutaPortal(usuario.rol))} />
                <Boton texto="Cerrar sesión" variante="outline-light" tamano="sm" onClick={onLogout} />
              </>
            ) : (
              <>
                <Boton texto="Iniciar sesión" variante="outline-light" tamano="sm" onClick={() => onNavegar('/login')} />
                <Boton texto="Registrarse" variante="light" tamano="sm" className="text-danger" onClick={() => onNavegar('/registro')} />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default EncabezadoPrincipal;
