// Convierte un error de Axios en un mensaje para mostrar en pantalla (sin alert()).
// Distingue respuesta con error, tiempo agotado y sin respuesta.
export function obtenerMensajeError(error) {
  if (error.response) {
    //  la API respondió con 400, 401, 403, 404, 409...
    const datos = error.response.data;
    if (datos && typeof datos.mensaje === 'string') {
      const campos = datos.campos ? Object.values(datos.campos).join(' ') : '';
      return campos ? `${datos.mensaje}: ${campos}` : datos.mensaje;
    }
    return `La API respondió con un error (${error.response.status}).`;
  }
  if (error.code === 'ECONNABORTED') {
    //  se agotó el tiempo (timeout de 10 s).
    return 'La API tardó demasiado. Inténtalo de nuevo.';
  }
  // no hubo respuesta (backend apagado, red caída o CORS).
  return 'No fue posible contactar la API. Revisa tu conexión.';
}

// Errores por campo que devuelve la API en un 400 
export function obtenerErroresDeCampos(error) {
  return error.response?.data?.campos ?? {};
}