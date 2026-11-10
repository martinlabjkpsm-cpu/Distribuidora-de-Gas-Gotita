import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Etiqueta } from './Etiqueta';

describe('<Etiqueta /> (estado del pedido)', () => {
  it('pinta de amarillo un pedido PENDIENTE', () => {
    render(<Etiqueta estado="PENDIENTE" />);
    expect(screen.getByText('PENDIENTE')).toHaveClass('badge', 'bg-warning');
  });

  it('pinta de verde un pedido ENTREGADO', () => {
    render(<Etiqueta estado="ENTREGADO" texto="Entregado" />);
    expect(screen.getByText('Entregado')).toHaveClass('bg-success');
  });
});
