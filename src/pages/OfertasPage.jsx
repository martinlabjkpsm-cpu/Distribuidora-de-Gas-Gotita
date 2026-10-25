import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { CatalogoGas } from '../components/Organisms/CatalogoGas';
import { useProductos } from '../context/ProductosContext';
import { useCart } from '../context/CartContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { codigosDestacados } from '../data/contenido';

export const OfertasPage = () => {
  useTituloPagina('Ofertas y destacados');
  const navigate = useNavigate();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCart();
  const [aviso, setAviso] = useState('');

  const destacados = productos.filter((p) => codigosDestacados.includes(p.codigo));

  return (
    <MainLayoutTemplate tituloHeader="Ofertas y destacados">
      <p className="text-muted">
        Los productos más pedidos del mes. Recuerda que con tarifa comercial (PYME) el precio es menor.
      </p>
      {aviso && <div className="alert alert-success" role="status">{aviso}</div>}
      <CatalogoGas
        productos={destacados}
        onAgregar={(p) => {
          agregarAlCarrito(p);
          setAviso(`Se agregó ${p.producto} al carrito.`);
        }}
        onVerDetalle={(p) => navigate(`/producto/${p.codigo}`)}
      />
    </MainLayoutTemplate>
  );
};

export default OfertasPage;
