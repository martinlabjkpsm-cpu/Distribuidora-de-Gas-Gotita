import { describe, it, expect } from 'vitest';
import { validarRut, validarEmail, validarDireccionDespacho } from './validaciones';

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

});