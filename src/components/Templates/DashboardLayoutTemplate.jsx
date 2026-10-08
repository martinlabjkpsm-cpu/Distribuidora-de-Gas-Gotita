import React from 'react';
import { EncabezadoPrincipal } from '../Organisms/EncabezadoPrincipal';

export const DashboardLayoutTemplate = ({ tituloHeader, children }) => {
  return (
    <div className="layout-dashboard">
      <EncabezadoPrincipal
        titulo={tituloHeader}
        showNav={false}
      />

      <main className="contenido-dashboard container-fluid py-4">
        {children}
      </main>

      <footer className="pie-pagina text-center py-2 bg-dark text-white mt-auto">
        <small>&copy; 2026 Gas Gotita - Central de Operaciones</small>
      </footer>
    </div>
  );
};
