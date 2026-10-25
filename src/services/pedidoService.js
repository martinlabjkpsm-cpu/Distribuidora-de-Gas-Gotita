// pedidoService: CRUD de los pedidos de gas, guardados en localStorage.
// Flujo del caso: el cliente crea el pedido (PENDIENTE) -> la operadora asigna un
// repartidor -> el repartidor lo marca EN CAMINO -> y luego ENTREGADO.
const PEDIDOS_STORAGE_KEY = 'gas_el_volcan_pedidos';

const guardar = (lista) => localStorage.setItem(PEDIDOS_STORAGE_KEY, JSON.stringify(lista));

// Genera un id que no se repite: PED-1001, PED-1002...
const siguienteId = (lista) => {
  const numeros = lista.map((p) => Number(String(p.id).replace('PED-', '')) || 1000);
  return `PED-${Math.max(1000, ...numeros) + 1}`;
};

export const pedidoService = {
  // READ: todos los pedidos (los más nuevos primero)
  getPedidos: () => {
    const pedidosGuardados = localStorage.getItem(PEDIDOS_STORAGE_KEY);
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  },

  // READ: un pedido por su id
  obtenerPedido: (pedidoId) => {
    return pedidoService.getPedidos().find((p) => p.id === pedidoId) ?? null;
  },

  // READ: historial de pedidos de un cliente
  listarPorCliente: (clienteRut) => {
    return pedidoService.getPedidos().filter((p) => p.clienteRut === clienteRut);
  },

  // CREATE: el cliente confirma su pedido
  crearPedido: (datosPedido) => {
    const items = datosPedido.items || [];
    if (items.length === 0) throw new Error('El pedido no tiene productos');
    if (!datosPedido.direccion) throw new Error('El pedido no tiene dirección de despacho');

    const pedidosActuales = pedidoService.getPedidos();

    const nuevoPedido = {
      id: siguienteId(pedidosActuales),
      clienteRut: datosPedido.clienteRut || null,
      clienteNombre: datosPedido.clienteNombre || 'Cliente Registrado',
      clienteEmail: datosPedido.clienteEmail || '',
      direccion: datosPedido.direccion,
      zona: datosPedido.zona || '',
      indicaciones: datosPedido.indicaciones || '',
      tipoTarifa: datosPedido.tipoTarifa || 'RESIDENCIAL',
      items,
      productoResumen: items.map((i) => `${i.cantidad}x ${i.nombre}`).join(', '),
      total: datosPedido.total || 0,
      metodoPago: datosPedido.metodoPago || 'EFECTIVO',
      estado: 'PENDIENTE', // El estado inicial siempre es PENDIENTE
      repartidorRut: null,
      repartidorNombre: null, // null = todavía sin repartidor
      fecha: new Date().toISOString(),
    };

    guardar([nuevoPedido, ...pedidosActuales]);
    return nuevoPedido;
  },

  // UPDATE: la operadora asigna o reasigna el repartidor
  asignarRepartidor: (pedidoId, repartidorRut, repartidorNombre) => {
    const listaActualizada = pedidoService.getPedidos().map((ped) =>
      ped.id === pedidoId ? { ...ped, repartidorRut, repartidorNombre } : ped
    );
    guardar(listaActualizada);
    return listaActualizada;
  },

  // UPDATE: el repartidor cambia el estado (EN CAMINO / ENTREGADO)
  cambiarEstado: (pedidoId, nuevoEstado) => {
    const listaActualizada = pedidoService.getPedidos().map((ped) =>
      ped.id === pedidoId ? { ...ped, estado: nuevoEstado } : ped
    );
    guardar(listaActualizada);
    return listaActualizada;
  },

  // DELETE: elimina un pedido (solo administración)
  eliminarPedido: (pedidoId) => {
    const listaActualizada = pedidoService.getPedidos().filter((p) => p.id !== pedidoId);
    guardar(listaActualizada);
    return listaActualizada;
  },
};

export default pedidoService;
