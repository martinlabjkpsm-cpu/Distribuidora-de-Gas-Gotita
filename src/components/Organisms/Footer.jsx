import React from 'react';
import { LinkNav } from '../Atoms';

// Organismo: pie de página. Recibe onNavegar por props (no usa el router).
export const Footer = ({ onNavegar }) => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <strong>Distribuidora de Gas Gotita</strong>
            <p className="small text-white-50 mb-0">
              Gas licuado a domicilio en Chillán y la Región de Ñuble.
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex flex-wrap gap-3 justify-content-md-end align-items-start">
            <LinkNav to="/nosotros" onNavegar={onNavegar} className="link-light small">Nosotros</LinkNav>
            <LinkNav to="/blog" onNavegar={onNavegar} className="link-light small">Blog</LinkNav>
            <LinkNav to="/contacto" onNavegar={onNavegar} className="link-light small">Contacto</LinkNav>
            <LinkNav to="/" onNavegar={onNavegar} className="link-light small">Volver al inicio</LinkNav>
          </div>
        </div>
        <p className="small text-white-50 text-center mt-3 mb-0">&copy; 2026 Gas Gotita</p>
      </div>
    </footer>
  );
};

export default Footer;
