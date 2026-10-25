// Reglas de validación: funciones puras.
// Las que terminan en "Formulario" devuelven un mensaje de error, o '' si el valor está bien.

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
  const dvIngresado = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalc = '0';
  if (dvEsperado === 11) dvCalc = '0';
  else if (dvEsperado === 10) dvCalc = 'K';
  else dvCalc = String(dvEsperado);

  return dvIngresado === dvCalc;
};

export const validarEmail = (email) => {
  if (!email) return false;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(String(email).trim());
};

export const validarDireccionDespacho = (direccion, minLongitud = 5) => {
  if (!direccion) return false;
  return validarRequerido(direccion) && String(direccion).trim().length >= minLongitud;
};

export const validarNombre = (nombre, minLongitud = 3) => {
  if (!nombre) return false;
  return String(nombre).trim().length >= minLongitud;
};

export const validarPassword = (password, minLongitud = 6) => {
  if (!password) return false;
  return String(password).length >= minLongitud;
};

// ---------- Validaciones para formularios (devuelven el mensaje) ----------

export const validarRutFormulario = (entrada) => {
  if (!validarRequerido(entrada)) return 'El RUT es obligatorio';
  return validarRut(String(entrada).trim()) ? '' : 'RUT no válido. Ejemplo: 12345678-9';
};

export const validarPasswordFormulario = (password) => {
  if (!validarRequerido(password)) return 'La contraseña es obligatoria';
  if (!validarPassword(password, 6)) return 'La contraseña debe tener al menos 6 caracteres';
  return '';
};

export const validarCampoObligatorio = (valor, nombreCampo = 'Este campo') => {
  return validarRequerido(valor) ? '' : `${nombreCampo} es obligatorio`;
};

export const validarNombreFormulario = (nombre, nombreCampo = 'El nombre') => {
  if (!validarRequerido(nombre)) return `${nombreCampo} es obligatorio`;
  if (!validarNombre(nombre, 3)) return `${nombreCampo} debe tener al menos 3 caracteres`;
  return '';
};

export const validarEmailFormulario = (email) => {
  if (!validarRequerido(email)) return 'El correo es obligatorio';
  return validarEmail(email) ? '' : 'Ingresa un correo válido. Ejemplo: nombre@correo.cl';
};

export const validarDireccionFormulario = (direccion) => {
  if (!validarRequerido(direccion)) return 'La dirección es obligatoria';
  return validarDireccionDespacho(direccion) ? '' : 'La dirección debe tener al menos 5 caracteres';
};

export const validarNumeroFormulario = (valor, minimo = 0, nombreCampo = 'El valor') => {
  if (!validarRequerido(valor)) return `${nombreCampo} es obligatorio`;
  const numero = Number(valor);
  if (Number.isNaN(numero)) return `${nombreCampo} debe ser un número`;
  if (numero < minimo) return `${nombreCampo} debe ser mayor o igual a ${minimo}`;
  return '';
};

export const validarConfirmacionClave = (clave, confirmacion) => {
  if (!validarRequerido(confirmacion)) return 'Confirma tu contraseña';
  return clave === confirmacion ? '' : 'Las contraseñas no coinciden';
};

// Devuelve true si el objeto de errores no tiene ningún mensaje.
export const sinErrores = (errores) => Object.values(errores).every((mensaje) => !mensaje);
