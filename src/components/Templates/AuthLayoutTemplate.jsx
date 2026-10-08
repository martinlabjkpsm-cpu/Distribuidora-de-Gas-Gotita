import React from 'react';
import { EncabezadoPrincipal } from '../Organisms/EncabezadoPrincipal';

export const AuthLayoutTemplate = ({ tituloHeader, children }) => {
  return (
    <div className="layout-autenticacion min-vh-100 d-flex flex-column">
      <EncabezadoPrincipal
        titulo={tituloHeader}
        showNav={false}
      />

      <main className="contenido-auth flex-grow-1 d-flex justify-content-center align-items-center py-5 bg-light">
        <div
          className="tarjeta-auth-wrapper shadow p-4 rounded bg-white"
          style={{ maxWidth: '420px', width: '100%' }}
        >
          {children}
        </div>
      </main>

      <footer className="pie-pagina text-center py-3 bg-white border-top">
        <p className="mb-0 text-muted">
          &copy; 2026 Distribuidora de Gas Gotita - Chillán, Región de Ñuble.
        </p>
      </footer>
    </div>
  );
};
