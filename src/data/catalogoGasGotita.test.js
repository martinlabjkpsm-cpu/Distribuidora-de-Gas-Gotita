import { describe, it, expect } from 'vitest';
import { categorias, catalogoGasElVolcan } from './catalogoGasGotita';

describe('Pruebas en los datos del Catálogo (catalogoGasElVolcan.js)', () => {


  it('debe exportar exactamente 4 categorías principales', () => {
    expect(categorias).toHaveLength(4);
    expect(categorias).toContain('Cilindros de Gas');
    expect(categorias).toContain('Accesorios');
  });


  it('el objeto del catálogo debe contener productos y zonas de despacho', () => {
    expect(catalogoGasElVolcan).toHaveProperty('productosYTarifas');
    expect(catalogoGasElVolcan).toHaveProperty('zonasDeDespacho');
    

    expect(catalogoGasElVolcan.productosYTarifas.length).toBeGreaterThan(0);
  });


  it('los productos deben mantener la estructura correcta (código, producto y stock)', () => {
    const primerProducto = catalogoGasElVolcan.productosYTarifas[0];
    

    expect(primerProducto.codigo).toBe('CL001');
    expect(primerProducto).toHaveProperty('producto', 'Cilindro GLP 5 kg');
    expect(primerProducto).toHaveProperty('stockActual');
  });


  it('el precio residencial del cilindro de 5kg debe ser 5000', () => {
    const cilindro5kg = catalogoGasElVolcan.productosYTarifas[0];
    

    expect(cilindro5kg.precioResidencial).toBe(5000); 
  });

});