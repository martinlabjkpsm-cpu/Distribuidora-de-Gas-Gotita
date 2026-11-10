// Átomo: enlace real (<a href>) que NO conoce el router.
// Al hacer clic cancela la recarga (preventDefault) y avisa con props.onNavegar(ruta).
// Quien crea "navigate" es la plantilla o la página, y lo pasa por props.
function LinkNav(props) {
  const destino = props.to || '/';

  function manejarClic(e) {
    e.preventDefault();
    if (props.onClick) props.onClick(e);
    if (props.onNavegar) props.onNavegar(destino);
  }

  return (
    <a href={destino} onClick={manejarClic} className={props.className}>
      {props.texto ?? props.children}
    </a>
  );
}

export { LinkNav };
export default LinkNav;
