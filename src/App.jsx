import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Inicio } from './pages/Inicio';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { ClientePage } from './pages/ClientePage';
import { OperadorPage } from './pages/OperadorPage';
import { RepartidorPage } from './pages/RepartidorPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/operador" element={<OperadorPage />} />
        <Route path="/repartidor" element={<RepartidorPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}