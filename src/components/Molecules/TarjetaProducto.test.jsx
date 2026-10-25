import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TarjetaProducto } from './TarjetaProducto';

describe('Pruebas en el componente <TarjetaProducto />', () => {

  const productoPrueba = {
    id: 'gas-11',
    nombre: 'Cilindro Gas 11 kg',
    precioResidencial: 15500,
    precioComercial: 14000,
    imagenSrc: '/img/cilindro-11.jpg',
    categoria: 'Cilindros de Gas',
    stockActual: 10,
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

  // Mock: vi.fn() es una función falsa que registra cuántas veces y con qué la llamaron.
  it('avisa al padre (onAgregar) al hacer clic en "+ Agregar"', async () => {
    const onAgregar = vi.fn();
    render(<TarjetaProducto producto={productoPrueba} onAgregar={onAgregar} />);

    await userEvent.click(screen.getByRole('button', { name: /agregar/i }));

    expect(onAgregar).toHaveBeenCalledTimes(1);
  });

  it('muestra "Ver detalle" solo si recibe onVerDetalle y lo llama al hacer clic', async () => {
    const onVerDetalle = vi.fn();
    const { rerender } = render(<TarjetaProducto producto={productoPrueba} />);
    expect(screen.queryByRole('button', { name: /ver detalle/i })).not.toBeInTheDocument();

    rerender(<TarjetaProducto producto={productoPrueba} onVerDetalle={onVerDetalle} />);
    await userEvent.click(screen.getByRole('button', { name: /ver detalle/i }));

    expect(onVerDetalle).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón y avisa cuando no hay stock', () => {
    render(<TarjetaProducto producto={{ ...productoPrueba, stockActual: 0 }} onAgregar={vi.fn()} />);

    expect(screen.getByRole('button', { name: /agregar/i })).toBeDisabled();
    expect(screen.getByRole('alert')).toHaveTextContent('Sin stock');
  });

});
