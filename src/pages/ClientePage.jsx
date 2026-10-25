import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayoutTemplate } from '../components/Templates/MainLayoutTemplate';
import { Boton } from '../components/Atoms';
import { CatalogoGas } from '../components/Organisms/CatalogoGas';
import { CarritoCompras } from '../components/Organisms/CarritoCompras';
import { FormularioPedido } from '../components/Organisms/FormularioPedido';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProductos } from '../context/ProductosContext';
import { pedidoService } from '../services/pedidoService';
import { precioSegunCliente, calcularTotal } from '../utils/precios';
import { useTituloPagina } from '../hooks/useTituloPagina';
import { zonasDespacho } from '../data/contenido';

// Página: portal del cliente = catálogo + carrito + confirmación del pedido (checkout).
export const ClientePage = () => {
  useTituloPagina('Portal cliente');
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { productos, categorias, descontarStock } = useProductos();
  const { carrito, agregarAlCarrito, disminuirCantidad, eliminarDelCarrito, limpiarCarrito } = useCart();

  const [tipoTarifa, setTipoTarifa] = useState('RESIDENCIAL');
  const [categoria, setCategoria] = useState('TODAS');

  const productosVisibles =
    categoria === 'TODAS' ? productos : productos.filter((p) => p.categoria === categoria);

  // Se llama solo cuando FormularioPedido validó todos los campos.
  const confirmarPedido = (datosDespacho) => {
    try {
      const items = carrito.map((item) => ({
        codigo: item.codigo,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: precioSegunCliente(item, tipoTarifa),
      }));

      const nuevoPedido = pedidoService.crearPedido({
        clienteRut: usuario?.rut,
        clienteNombre: `${datosDespacho.nombre} ${datosDespacho.apellidos}`.trim(),
        clienteEmail: datosDespacho.email,
        direccion: datosDespacho.direccion,
        zona: datosDespacho.zona,
        indicaciones: datosDespacho.indicaciones,
        metodoPago: datosDespacho.metodoPago,
        tipoTarifa,
        items,
        total: calcularTotal(carrito, tipoTarifa),
      });

      descontarStock(items);
      limpiarCarrito();
      navigate(`/pedido/${nuevoPedido.id}`); // pantalla de pedido exitoso
    } catch {
      navigate('/pedido/error'); // pantalla de pedido no realizado
    }
  };

  return (
    <MainLayoutTemplate tituloHeader="Portal cliente">
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="small fw-bold">Categoría:</span>
            {['TODAS', ...categorias].map((cat) => (
              <Boton
                key={cat}
                variant={categoria === cat ? 'dark' : 'outline-dark'}
                className="btn-sm"
                onClick={() => setCategoria(cat)}
              >
                {cat === 'TODAS' ? 'Todas' : cat}
              </Boton>
            ))}
          </div>

          <CatalogoGas
            productos={productosVisibles}
            tipoTarifa={tipoTarifa}
            onAgregar={agregarAlCarrito}
            onVerDetalle={(p) => navigate(`/producto/${p.codigo}`)}
          />
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border bg-white p-3">
            <CarritoCompras
              items={carrito}
              tipoTarifa={tipoTarifa}
              onCambiarTarifa={setTipoTarifa}
              onSumar={agregarAlCarrito}
              onRestar={disminuirCantidad}
              onEliminar={eliminarDelCarrito}
              onVaciar={limpiarCarrito}
            />

            {/* key: si cambia el usuario, el formulario se vuelve a completar con sus datos */}
            <FormularioPedido
              key={usuario?.rut || 'anonimo'}
              datosIniciales={usuario || {}}
              zonas={zonasDespacho}
              deshabilitado={carrito.length === 0}
              onEnviar={confirmarPedido}
            />
          </div>
        </div>
      </div>
    </MainLayoutTemplate>
  );
};

export default ClientePage;
