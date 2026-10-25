import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EncabezadoPrincipal } from '../Organisms/EncabezadoPrincipal';
import { Footer } from '../Organisms/Footer';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { enlacesMenu } from '../../data/contenido';

// Plantilla: estructura común de las páginas (cabecera, contenido y pie).
// Aquí nace "navigate" y baja por props al encabezado y al pie (ellos no conocen el router).
// "children" es el contenido que cada página pone dentro de <MainLayoutTemplate>.
export const MainLayoutTemplate = ({ tituloHeader, children }) => {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const { cantidadTotal } = useCart();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <EncabezadoPrincipal
        usuario={usuario}
        enlaces={enlacesMenu}
        cantidadCarrito={cantidadTotal}
        onNavegar={navigate}
        onLogout={cerrarSesion}
      />

      <main className="container flex-grow-1 py-4">
        {tituloHeader && <h1 className="h3 fw-bold mb-4">{tituloHeader}</h1>}
        {children}
      </main>

      <Footer onNavegar={navigate} />
    </div>
  );
};

export default MainLayoutTemplate;
