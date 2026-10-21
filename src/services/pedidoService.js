const PEDIDOS_STORAGE_KEY = 'gas_el_volcan_pedidos';

export const pedidoService = {
  getPedidos: () => {
    const pedidosGuardados = localStorage.getItem(PEDIDOS_STORAGE_KEY);
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  },

  crearPedido: (datosPedido) => {
    const pedidosActuales = pedidoService.getPedidos();
    
    const nuevoPedido = {
      id: `PED-${Date.now().toString().slice(-4)}`,
      clienteNombre: datosPedido.clienteNombre || 'Cliente Registrado',
      direccion: datosPedido.direccion,
      indicaciones: datosPedido.indicaciones || '',
      tipoTarifa: datosPedido.tipoTarifa || 'RESIDENCIAL',
      items: datosPedido.items || [],
      productoResumen: (datosPedido.items || [])
        .map((i) => `${i.cantidad}x ${i.nombre}`)
        .join(', '),
      total: datosPedido.total || 0,
      metodoPago: datosPedido.metodoPago || 'EFECTIVO',
      estado: 'PENDIENTE', // El estado inicial siempre es PENDIENTE
      repartidorRut: null,
      repartidorNombre: 'Sin Asignar',
      fecha: new Date().toISOString()
    };

    const listaActualizada = [nuevoPedido, ...pedidosActuales];
    localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(listaActualizada));
    return nuevoPedido;
  },

  // La Operadora SOLO asigna o reasigna el repartidor
  asignarRepartidor: (pedidoId, repartidorRut, repartidorNombre) => {
    const pedidosActuales = pedidoService.getPedidos();
    const listaActualizada = pedidosActuales.map((ped) => {
      if (ped.id === pedidoId) {
        return {
          ...ped,
          repartidorRut,
          repartidorNombre
        };
      }
      return ped;
    });

    localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(listaActualizada));
    return listaActualizada;
  },

  // El Repartidor usará esta función para actualizar el estado
  cambiarEstado: (pedidoId, nuevoEstado) => {
    const pedidosActuales = pedidoService.getPedidos();
    const listaActualizada = pedidosActuales.map((ped) => {
      if (ped.id === pedidoId) {
        return { ...ped, estado: nuevoEstado };
      }
      return ped;
    });

    localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(listaActualizada));
    return listaActualizada;
  }
};

export default pedidoService;