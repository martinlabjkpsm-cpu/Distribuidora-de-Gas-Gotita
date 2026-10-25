import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Title, Boton, Imagen } from '../components/Atoms';
import { useProductos } from '../context/ProductosContext';
import { useCart } from '../context/CartContext';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { formatearMoneda } from '../utils/formato';

// Página: detalle de un producto. Ruta: /producto/:id (el id es el código, ej: CL002).
export const ProductoDetallePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { productos } = useProductos();
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.codigo === params.id);
  useTituloPagina(producto ? producto.producto : 'Producto no encontrado');

  if (!producto) {
    return (
      <MainLayoutTemplate tituloHeader="Producto no encontrado">
        <p>No existe un producto con el código "{params.id}".</p>
        <Boton variant="danger" onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
      </MainLayoutTemplate>
    );
  }

  return (
    <MainLayoutTemplate>
      <div className="row g-4 bg-white border rounded shadow-sm p-3">
        <div className="col-12 col-md-5 text-center">
          <Imagen src={producto.imagenSrc} alt={producto.producto} className="img-fluid img-detalle" />
        </div>
        <div className="col-12 col-md-7">
          <span className="badge bg-secondary mb-2">{producto.categoria}</span>
          <Title level={1} className="h3 fw-bold">{producto.producto}</Title>
          <p className="text-muted">{producto.descripcion}</p>
          <ul className="list-unstyled">
            <li>Precio residencial: <strong>{formatearMoneda(producto.precioResidencial)}</strong></li>
            <li>Precio comercial: <strong>{formatearMoneda(producto.precioComercial)}</strong></li>
            <li>Unidad: {producto.unidad} · Código: {producto.codigo}</li>
            <li>Stock disponible: {producto.stockActual}</li>
          </ul>
          {agregado && <div className="alert alert-success py-2">Producto agregado al carrito.</div>}
          <div className="d-flex flex-wrap gap-2">
            <Boton
              variant="danger"
              disabled={producto.stockActual === 0}
              onClick={() => {
                agregarAlCarrito(producto);
                setAgregado(true);
              }}
            >
              + Agregar al carrito
            </Boton>
            {/* navigate(-1) vuelve a la página anterior, como el botón Atrás */}
            <Boton variant="outline-secondary" onClick={() => navigate(-1)}>Volver</Boton>
            {agregado && <Boton variant="success" onClick={() => navigate('/cliente')}>Ir a confirmar pedido</Boton>}
          </div>
        </div>
      </div>
    </MainLayoutTemplate>
  );
};

export default ProductoDetallePage;
