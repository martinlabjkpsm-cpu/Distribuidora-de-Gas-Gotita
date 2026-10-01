import React, { useState } from 'react';

// ✅ Importaciones corregidas con llaves { } y rutas exactas
import { EncabezadoPrincipal } from './components/Organisms/EncabezadoPrincipal';
import { GridProductosCliente } from './components/Organisms/GridProductosCliente';

export default function App() {
  // Estado local para probar las cantidades de los cilindros
  const [cantidades, setCantidades] = useState({});

  const manejarCambioCantidad = (e) => {
    const { name, value } = e.target;
    setCantidades((prev) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  // Datos del catálogo según catálogo oficial de Gas El Volcán / Gotita
  const productosCatalogo = [
    { id: 'gas5kg', nombre: 'Cilindro Gas 5 KG', precio: 10800, imagenSrc: 'img/gas5kg.jpeg' },
    { id: 'gas11kg', nombre: 'Cilindro Gas 11 KG', precio: 17500, imagenSrc: 'img/gas11kg.jpeg' },
    { id: 'gas15kg', nombre: 'Cilindro Gas 15 KG', precio: 23500, imagenSrc: 'img/gas15kg.jpeg' },
    { id: 'gas45kg', nombre: 'Cilindro Gas 45 KG', precio: 68000, imagenSrc: 'img/gasgotita45.jpeg' },
  ];

  return (
    <div className="pagina-inicio">
      {/* 1. Encabezado */}
      <EncabezadoPrincipal
        titulo="Distribuidora de Gas Gotita"
        showNav={true}
        linkHref="Login.html"
        linkTexto="Inicio de Sesión"
      />

      {/* 2. Banner de Bienvenida */}
      <section
        style={{
          backgroundColor: '#0056b3',
          color: '#fff',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <h1>¡Bienvenido a Distribuidora de Gas Gotita! 💧</h1>
        <p>
          Pide tu cilindro de gas de forma rápida, segura y al mejor precio en Chillán.
        </p>
      </section>

      {/* 3. Catálogo de Productos */}
      <main className="container my-5">
        <GridProductosCliente
          tituloSeccion="Formatos Disponibles"
          productos={productosCatalogo}
          cantidades={cantidades}
          onCantidadChange={manejarCambioCantidad}
        />
      </main>

      {/* 4. Pie de página */}
      <footer
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '20px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <p>&copy; 2026 Gas Gotita - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

/* import React from 'react';
import { Inicio } from './pages/Inicio';

function App() {
  return (
    <div className="App">
      <Inicio />
    </div>
  );
}

export default App;*/ 