import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CarritoCompras } from './CarritoCompras';

const items = [
  { codigo: 'CL002', nombre: 'Cilindro GLP 11 kg', precioResidencial: 12000, precioComercial: 11000, cantidad: 2 },
];

// Funciones falsas para todas las acciones que el carrito avisa al padre.
const acciones = () => ({
  onCambiarTarifa: vi.fn(),
  onSumar: vi.fn(),
  onRestar: vi.fn(),
  onEliminar: vi.fn(),
  onVaciar: vi.fn(),
});

describe('<CarritoCompras />', () => {
  it('muestra el total con el precio de la tarifa elegida', () => {
    const { rerender } = render(<CarritoCompras items={items} tipoTarifa="RESIDENCIAL" {...acciones()} />);
    expect(screen.getByText('$24.000 CLP', { selector: 'span' })).toBeInTheDocument();

    // Al cambiar la prop tipoTarifa, el total se recalcula con el precio comercial.
    rerender(<CarritoCompras items={items} tipoTarifa="COMERCIAL" {...acciones()} />);
    expect(screen.getByText('$22.000 CLP', { selector: 'span' })).toBeInTheDocument();
  });

  it('avisa al padre al sumar, restar y cambiar la tarifa', async () => {
    const mocks = acciones();
    render(<CarritoCompras items={items} tipoTarifa="RESIDENCIAL" {...mocks} />);

    await userEvent.click(screen.getByRole('button', { name: '+' }));
    await userEvent.click(screen.getByRole('button', { name: '-' }));
    await userEvent.click(screen.getByRole('button', { name: 'Comercial' }));

    expect(mocks.onSumar).toHaveBeenCalledWith(items[0]);
    expect(mocks.onRestar).toHaveBeenCalledWith('CL002');
    expect(mocks.onCambiarTarifa).toHaveBeenCalledWith('COMERCIAL');
  });

  it('muestra un aviso cuando el carrito está vacío', () => {
    render(<CarritoCompras items={[]} {...acciones()} />);
    expect(screen.getByText(/no has agregado productos/i)).toBeInTheDocument();
  });
});
