import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RutaProtegida } from './routes/RutaProtegida';

import { Inicio } from './pages/Inicio';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { ClientePage } from './pages/ClientePage';
import { OperadorPage } from './pages/OperadorPage';
import { RepartidorPage } from './pages/RepartidorPage';
import { AdminPage } from './pages/AdminPage';
import { PaginaError } from './pages/PaginaError';

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />

            {/* Rutas parametrizadas (para uso de useParams) */}
            <Route path="/categoria/:nombre" element={<ClientePage />} />
            <Route path="/producto/:id" element={<ClientePage />} />

            {/* Rutas Protegidas por Rol */}
            <Route element={<RutaProtegida rolesPermitidos={['CLIENTE', 'ADMINISTRADOR']} />}>
              <Route path="/cliente" element={<ClientePage />} />
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

            {/* Control de Errores y 404 */}
            <Route path="/sin-acceso" element={<PaginaError tipo="403" />} />
            <Route path="*" element={<PaginaError tipo="404" />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;