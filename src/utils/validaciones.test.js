import { describe, it, expect } from 'vitest';
import {
  validarRut,
  validarEmail,
  validarDireccionDespacho,
  validarRutFormulario,
  validarEmailFormulario,
  validarNumeroFormulario,
  validarConfirmacionClave,
  sinErrores,
} from './validaciones';

describe('Pruebas en las funciones de validación (validaciones.js)', () => {

  // PRUEBA 8
  it('debe validar correctamente la estructura y dígito verificador de un RUT chileno', () => {
    // RUT válido de prueba (12.345.678-5)
    expect(validarRut('12.345.678-5')).toBe(true);

    // RUT con dígito verificador incorrecto
    expect(validarRut('12.345.678-9')).toBe(false);
  });

  // PRUEBA 9
  it('debe validar el formato correcto de un correo electrónico', () => {
    expect(validarEmail('cliente@gasgotita.cl')).toBe(true);
    expect(validarEmail('correo-sin-arroba.com')).toBe(false);
  });

  // PRUEBA 10
  it('debe verificar que la dirección de despacho tenga al menos 5 caracteres', () => {
    // Dirección válida en Chillán
    expect(validarDireccionDespacho('Av. Brasil 456')).toBe(true);

    // Dirección demasiado corta (menos de 5 caracteres)
    expect(validarDireccionDespacho('Av')).toBe(false);
  });

  // PRUEBA 11
  it('debe validar el campo del formulario exigiendo RUT obligatorio y válido', () => {
    // Válido (devuelve string vacío)
    expect(validarRutFormulario('12.345.678-5')).toBe('');

    // Campo vacío
    expect(validarRutFormulario('')).toBe('El RUT es obligatorio');

    // RUT inválido
    expect(validarRutFormulario('12345678-9')).toBe('RUT no válido. Ejemplo: 12345678-9');
  });

  it('devuelve un mensaje propio cuando el correo del formulario está vacío o mal escrito', () => {
    expect(validarEmailFormulario('')).toBe('El correo es obligatorio');
    expect(validarEmailFormulario('juan@')).toContain('correo válido');
    expect(validarEmailFormulario('juan@correo.cl')).toBe('');
  });

  it('rechaza números negativos o texto en los campos numéricos', () => {
    expect(validarNumeroFormulario('-5', 0, 'El stock')).toBe('El stock debe ser mayor o igual a 0');
    expect(validarNumeroFormulario('abc', 0, 'El stock')).toBe('El stock debe ser un número');
    expect(validarNumeroFormulario('10', 0, 'El stock')).toBe('');
  });

  it('detecta cuando la confirmación de la contraseña no coincide', () => {
    expect(validarConfirmacionClave('clave123', 'clave124')).toBe('Las contraseñas no coinciden');
    expect(validarConfirmacionClave('clave123', 'clave123')).toBe('');
  });

  it('sinErrores indica si un formulario quedó sin mensajes de error', () => {
    expect(sinErrores({ rut: '', correo: '' })).toBe(true);
    expect(sinErrores({ rut: 'RUT no válido', correo: '' })).toBe(false);
  });
});
