import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductosProvider } from './context/ProductosContext';
import { RutaProtegida } from './routes/RutaProtegida';

import { Inicio } from './pages/Inicio';
import { CatalogoPage } from './pages/CatalogoPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { ProductoDetallePage } from './pages/ProductoDetallePage';
import { OfertasPage } from './pages/OfertasPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { ContactoPage } from './pages/ContactoPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetallePage } from './pages/BlogDetallePage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { ClientePage } from './pages/ClientePage';
import { PedidoResultadoPage } from './pages/PedidoResultadoPage';
import { MisPedidosPage } from './pages/MisPedidosPage';
import { OperadorPage } from './pages/OperadorPage';
import { RepartidorPage } from './pages/RepartidorPage';
import { AdminPage } from './pages/AdminPage';
import { PaginaError } from './pages/PaginaError';

// El mapa de rutas: para cada dirección, qué página se dibuja.
// Un ":" en el path crea un parámetro que la página lee con useParams.
export const App = () => {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/categoria/:nombre" element={<CatalogoPage />} />
              <Route path="/buscar/:texto" element={<CatalogoPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/producto/:id" element={<ProductoDetallePage />} />
              <Route path="/ofertas" element={<OfertasPage />} />
              <Route path="/nosotros" element={<NosotrosPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetallePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />

              {/* Rutas protegidas por rol */}
              <Route element={<RutaProtegida rolesPermitidos={['CLIENTE', 'ADMINISTRADOR']} />}>
                <Route path="/cliente" element={<ClientePage />} />
                <Route path="/mis-pedidos" element={<MisPedidosPage />} />
                <Route path="/pedido/:id" element={<PedidoResultadoPage />} />
              </Route>

              <Route element={<RutaProtegida rolesPermitidos={['OPERADOR', 'ADMINISTRADOR']} />}>
                <Route path="/operador" element={<OperadorPage />} />
              </Route>

              <Route element={<RutaProtegida rolesPermitidos={['REPARTIDOR', 'ADMINISTRADOR']} />}>
                <Route path="/repartidor" element={<RepartidorPage />} />
              </Route>

              <Route element={<RutaProtegida rolesPermitidos={['ADMINISTRADOR']} />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              {/* Errores */}
              <Route path="/sin-acceso" element={<PaginaError tipo="403" />} />
              <Route path="*" element={<PaginaError tipo="404" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductosProvider>
    </AuthProvider>
  );
};

export default App;
