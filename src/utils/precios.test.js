import { describe, it, expect } from 'vitest';
import { precioSegunCliente, calcularTotal, esStockCritico } from './precios';

const cilindro11 = { precioResidencial: 12000, precioComercial: 11000, stockActual: 200 };
const detector = { precioResidencial: 19990, precioComercial: 17000, stockActual: 8 };

describe('precioSegunCliente', () => {
  it('devuelve el precio residencial para un cliente residencial', () => {
    expect(precioSegunCliente(cilindro11, 'RESIDENCIAL')).toBe(12000);
  });

  it('devuelve el precio comercial para un cliente comercial', () => {
    expect(precioSegunCliente(cilindro11, 'COMERCIAL')).toBe(11000);
  });

  it('devuelve 0 si no recibe producto', () => {
    expect(precioSegunCliente(null, 'RESIDENCIAL')).toBe(0);
  });
});

describe('calcularTotal', () => {
  it('suma precio por cantidad de cada ítem según la tarifa', () => {
    const items = [
      { ...cilindro11, cantidad: 2 }, // 2 x 12.000
      { ...detector, cantidad: 1 }, // 1 x 19.990
    ];
    expect(calcularTotal(items, 'RESIDENCIAL')).toBe(43990);
    expect(calcularTotal(items, 'COMERCIAL')).toBe(39000);
  });

  it('devuelve 0 si el carrito está vacío', () => {
    expect(calcularTotal([], 'RESIDENCIAL')).toBe(0);
  });
});

describe('esStockCritico', () => {
  it('marca como crítico un producto con poco stock', () => {
    expect(esStockCritico(detector)).toBe(true);
    expect(esStockCritico(cilindro11)).toBe(false);
  });
});
