import React from 'react';
import { EncabezadoPrincipal } from '../Organisms/EncabezadoPrincipal';

export const MainLayoutTemplate = ({ tituloHeader, children }) => {
  return (
    <div className="layout-principal">
      {/* Se inhibe la navegación de hipervínculos HTML */}
      <EncabezadoPrincipal
        titulo={tituloHeader}
        showNav={false}
      />

      <main className="contenido-main container py-4">
        {children}
      </main>

      <footer className="pie-pagina text-center py-3 bg-light border-top">
        <p className="mb-0">
          &copy; 2026 Distribuidora de Gas Gotita - Chillán, Región de Ñuble.
        </p>
      </footer>
    </div>
  );
};
