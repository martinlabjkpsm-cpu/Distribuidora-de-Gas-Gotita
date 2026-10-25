import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormularioRegistro } from './FormularioRegistro';

describe('<FormularioRegistro /> (validación hecha en React)', () => {
  it('muestra los errores junto a cada campo y NO avisa a la página si está vacío', async () => {
    const onEnviar = vi.fn();
    render(<FormularioRegistro onEnviar={onEnviar} />);

    await userEvent.click(screen.getByRole('button', { name: /crear mi cuenta/i }));

    expect(screen.getByText('El RUT es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    expect(screen.getByLabelText('RUT')).toHaveClass('is-invalid');
    expect(onEnviar).not.toHaveBeenCalled();
  });

  it('avisa con onEnviar y los datos limpios cuando todo es válido', async () => {
    const onEnviar = vi.fn();
    render(<FormularioRegistro onEnviar={onEnviar} />);

    await userEvent.type(screen.getByLabelText('RUT'), '12.345.678-5');
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Juan Pérez');
    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'juan@correo.cl');
    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave123');
    await userEvent.type(screen.getByLabelText('Repite la contraseña'), 'clave123');
    await userEvent.click(screen.getByRole('button', { name: /crear mi cuenta/i }));

    expect(onEnviar).toHaveBeenCalledTimes(1);
    expect(onEnviar).toHaveBeenCalledWith({
      rut: '12.345.678-5',
      nombre: 'Juan Pérez',
      email: 'juan@correo.cl',
      password: 'clave123',
    });
  });

  it('avisa cuando las contraseñas no coinciden', async () => {
    render(<FormularioRegistro onEnviar={vi.fn()} />);

    await userEvent.type(screen.getByLabelText('Contraseña'), 'clave123');
    await userEvent.type(screen.getByLabelText('Repite la contraseña'), 'otraClave');
    await userEvent.click(screen.getByRole('button', { name: /crear mi cuenta/i }));

    expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
  });
});
