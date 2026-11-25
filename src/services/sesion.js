// Sesión del usuario en el navegador.
// Se guarda en sessionStorage.
//  - Se borra sola al cerrar la pestaña, a diferencia de localStorage.
//  - Riesgoso ya que se puede acceder desde JS
//  -token limitado a una duracion de maximo 30 minutos.

const CLAVE = 'gotita_sesion';

// Guarda { token, usuario, expiraEn } donde expiraEn es la hora (ms) en que vence el token.
export function guardarSesion(sesion) {
  sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
}

// Devuelve la sesión si existe y no ha vencido; si venció la borra y devuelve null.
export function leerSesion() {
  try {
    const texto = sessionStorage.getItem(CLAVE);
    if (!texto) return null;
    const sesion = JSON.parse(texto);
    if (!sesion?.token || !sesion?.expiraEn || Date.now() >= sesion.expiraEn) {
      borrarSesion();
      return null;
    }
    return sesion;
  } catch {
    borrarSesion();
    return null;
  }
}

export function borrarSesion() {
  sessionStorage.removeItem(CLAVE);
}

export function obtenerToken() {
  return leerSesion()?.token ?? null;
}