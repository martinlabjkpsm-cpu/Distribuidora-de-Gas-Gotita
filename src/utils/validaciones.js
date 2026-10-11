export const validarRequerido = (valor) => {
  if (valor === undefined || valor === null) return false;
  return String(valor).trim().length > 0;
};

export const limpiarRut = (rut) => {
  if (!rut) return '';
  return String(rut).replace(/[^0-9kK]/g, '');
};

export const validarRut = (rut) => {
  if (!rut) return false;
  const rutLimpio = limpiarRut(rut);
  if (rutLimpio.length < 8 || rutLimpio.length > 9) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalculado = '';

  if (dvEsperado === 11) dvCalculado = '0';
  else if (dvEsperado === 10) dvCalculado = 'K';
  else dvCalculado = String(dvEsperado);

  return dv === dvCalculado;
};

export const validarEmail = (email) => {
  if (!email) return false;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(String(email).trim());
};

export default {
  validarRequerido,
  limpiarRut,
  validarRut,
  validarEmail
};