import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { pedidoService } from './pedidoService';

const datosPedido = {
  clienteRut: '44444444-4',
  clienteNombre: 'Carlos Mendoza',
  direccion: 'Av. Brasil 456, Chillán',
  items: [{ codigo: 'CL002', nombre: 'Cilindro GLP 11 kg', cantidad: 2, precioUnitario: 12000 }],
  total: 24000,
};

describe('pedidoService (flujo del pedido de gas)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // afterEach: después de cada caso se restauran los espías (mocks) para no afectar al siguiente.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('crea el pedido en estado PENDIENTE y sin repartidor', () => {
    const pedido = pedidoService.crearPedido(datosPedido);
    expect(pedido.id).toBe('PED-1001');
    expect(pedido.estado).toBe('PENDIENTE');
    expect(pedido.repartidorNombre).toBeNull();
    expect(pedido.productoResumen).toBe('2x Cilindro GLP 11 kg');
  });

  it('lanza un error si el pedido no tiene productos', () => {
    expect(() => pedidoService.crearPedido({ ...datosPedido, items: [] })).toThrow('no tiene productos');
  });

  it('la operadora asigna un repartidor y el repartidor lo entrega', () => {
    const pedido = pedidoService.crearPedido(datosPedido);
    pedidoService.asignarRepartidor(pedido.id, '33333333-3', 'Juan Pérez');
    pedidoService.cambiarEstado(pedido.id, 'EN CAMINO');
    pedidoService.cambiarEstado(pedido.id, 'ENTREGADO');

    const actualizado = pedidoService.obtenerPedido(pedido.id);
    expect(actualizado.repartidorNombre).toBe('Juan Pérez');
    expect(actualizado.estado).toBe('ENTREGADO');
  });

  it('lista solo los pedidos del cliente indicado (historial)', () => {
    pedidoService.crearPedido(datosPedido);
    pedidoService.crearPedido({ ...datosPedido, clienteRut: '11111111-1' });
    expect(pedidoService.listarPorCliente('44444444-4')).toHaveLength(1);
  });

  it('guarda el pedido en localStorage (mock con spyOn)', () => {
    // vi.spyOn reemplaza setItem por un espía que registra cómo lo llamaron.
    const espia = vi.spyOn(Storage.prototype, 'setItem');
    pedidoService.crearPedido(datosPedido);
    expect(espia).toHaveBeenCalledTimes(1);
    expect(espia).toHaveBeenCalledWith('gas_el_volcan_pedidos', expect.stringContaining('PED-1001'));
  });
});
