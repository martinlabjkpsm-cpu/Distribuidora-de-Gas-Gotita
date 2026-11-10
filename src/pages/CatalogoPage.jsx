import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton } from '../components/Atoms';
import { Buscador } from '../components/Molecules';
import { CatalogoGas } from '../components/Organisms/CatalogoGas';
import { useProductos } from '../context/ProductosContext';
import { useCart } from '../context/CartContext';
import { useTituloPagina } from '../hooks/useTituloPagina';

// Página: catálogo. Sirve para tres rutas (ver App.jsx):
//   /catalogo           todos los productos
//   /categoria/:nombre  los de una categoría
//   /buscar/:texto      el resultado de una búsqueda
export const CatalogoPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { productos, categorias } = useProductos();
  const { agregarAlCarrito } = useCart();
  const [aviso, setAviso] = useState('');

  let visibles = productos;
  let titulo = 'Catálogo completo';

  if (params.nombre) {
    visibles = productos.filter((p) => p.categoria === params.nombre);
    titulo = params.nombre;
  }
  if (params.texto) {
    const buscado = params.texto.toLowerCase();
    visibles = productos.filter(
      (p) =>
        p.producto.toLowerCase().includes(buscado) ||
        String(p.descripcion || '').toLowerCase().includes(buscado)
    );
    titulo = `Resultados para "${params.texto}"`;
  }

  useTituloPagina(titulo);

  const agregar = (producto) => {
    agregarAlCarrito(producto);
    setAviso(`Se agregó ${producto.producto} al carrito.`);
  };

  return (
    <MainLayoutTemplate tituloHeader={titulo}>
      <div className="row g-3 mb-3 align-items-center">
        <div className="col-12 col-md-6">
          {/* key: reinicia el buscador cuando cambia la búsqueda en la dirección */}
          <Buscador
            key={params.texto || 'vacio'}
            valorInicial={params.texto || ''}
            onBuscar={(texto) => navigate(`/buscar/${encodeURIComponent(texto)}`)}
          />
        </div>
        <div className="col-12 col-md-6 d-flex flex-wrap gap-2 justify-content-md-end">
          <Boton texto="Todos" variante={!params.nombre ? 'dark' : 'outline-dark'} tamano="sm" onClick={() => navigate('/catalogo')} />
          {categorias.map((cat) => (
            <Boton
              texto={cat}
              key={cat}
              variante={params.nombre === cat ? 'dark' : 'outline-dark'}
              tamano="sm"
              onClick={() => navigate(`/categoria/${encodeURIComponent(cat)}`)}
            />
          ))}
        </div>
      </div>

      {aviso && (
        <div className="alert alert-success d-flex flex-wrap justify-content-between align-items-center gap-2" role="status">
          <span>{aviso}</span>
          <Boton texto="Ir a confirmar pedido" variante="success" tamano="sm" onClick={() => navigate('/cliente')} />
        </div>
      )}

      <CatalogoGas
        productos={visibles}
        onAgregar={agregar}
        onVerDetalle={(p) => navigate(`/producto/${p.codigo}`)}
      />
    </MainLayoutTemplate>
  );
};

export default CatalogoPage;
