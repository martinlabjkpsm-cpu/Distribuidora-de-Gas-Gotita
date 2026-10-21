import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TarjetaProducto } from './TarjetaProducto';

describe('Pruebas en el componente <TarjetaProducto />', () => {
  
  const productoPrueba = {
    id: 'gas-11',
    nombre: 'Cilindro Gas 11 kg',
    precioResidencial: 15500,
    precioComercial: 14000,
    imagenSrc: '/img/cilindro-11.jpg',
    categoria: 'Cilindros de Gas'
  };

  // PRUEBA 1: Renderizado básico de textos
  it('debe mostrar el nombre del producto y el precio con formato CLP', () => {
    render(<TarjetaProducto producto={productoPrueba} />);
    
    // Verifica que el nombre esté en el documento
    expect(screen.getByText('Cilindro Gas 11 kg')).toBeInTheDocument();
    
    // Verifica el precio renderizado con tipoTarifa por defecto (RESIDENCIAL)
    expect(screen.getByText('$15.500 CLP')).toBeInTheDocument();
  });

  // PRUEBA 2: Atributos de la imagen
  it('debe renderizar la imagen con los atributos src y alt correctos', () => {
    render(<TarjetaProducto producto={productoPrueba} />);
    
    // Busca la imagen por su rol
    const imagen = screen.getByRole('img');
    
    // Verifica los atributos en el componente <Imagen />
    expect(imagen).toHaveAttribute('src', '/img/cilindro-11.jpg');
    expect(imagen).toHaveAttribute('alt', 'Cilindro Gas 11 kg');
  });

  // PRUEBA 3: Condicional del precio (cuando no hay precio)
  it('debe mostrar "$0 CLP" si el precio no viene o es cero', () => {
    const productoSinPrecio = { ...productoPrueba, precioResidencial: null };
    render(<TarjetaProducto producto={productoSinPrecio} />);
    
    expect(screen.getByText('$0 CLP')).toBeInTheDocument();
  });

});