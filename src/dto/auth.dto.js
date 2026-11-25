// DTO de entrada: arman el cuerpo exacto que pide la API a partir de los datos del formulario.
// Solo pasan los campos del contrato; el rol NO se envía (lo asigna el servidor).

export function crearLoginRequestDto(formulario) {
  return {
    rut: formulario.rut.trim(),
    password: formulario.password,
  };
}

export function crearRegistroRequestDto(formulario) {
  const telefono = formulario.telefono?.trim();
  return {
    rut: formulario.rut.trim(),
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    telefono: telefono ? telefono : null,
    password: formulario.password,
  };
}

// DTO de salida: convierte la respuesta del login en la sesión que guarda el frontend.
// expiraEn = ahora + vigencia del token (la API la entrega en segundos).
export function crearSesionDesdeLogin(respuesta) {
  return {
    token: respuesta.accessToken,
    usuario: respuesta.usuario,
    expiraEn: Date.now() + respuesta.expiraEnSegundos * 1000,
  };
}