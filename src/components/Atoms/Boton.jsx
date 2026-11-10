// Átomo: botón reutilizable (mismo patrón de la Guía 12: function Boton(props)).
// Recibe por props el texto, la variante de Bootstrap y qué hacer al hacer clic.
// Así el mismo Boton sirve para "Agregar", "Editar", "Eliminar" o "Enviar" en cualquier pantalla.
//
// Props:
//   texto          contenido del botón (si no viene, usa lo que va entre <Boton>...</Boton>)
//   variante       primary | danger | outline-danger | ... (por defecto "primary")
//   tamano         "sm" o "lg" (agrega btn-sm / btn-lg)
//   anchoCompleto  true para ocupar todo el ancho (w-100)
//   type           "button" (por defecto) o "submit" dentro de un formulario
//   disabled, onClick, className, ariaLabel
function Boton(props) {
  const variante = props.variante || 'primary';
  const clases = [
    'btn',
    `btn-${variante}`,
    props.tamano ? `btn-${props.tamano}` : '',
    props.anchoCompleto ? 'w-100' : '',
    props.className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={props.type || 'button'}
      className={clases}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props.ariaLabel}
    >
      {props.texto ?? props.children}
    </button>
  );
}

export { Boton };
export default Boton;
