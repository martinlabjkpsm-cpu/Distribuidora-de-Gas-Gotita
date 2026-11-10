// Átomo: imagen. Si el archivo no carga, le agrega la clase "img-error".
function Imagen(props) {
  return (
    <img
      src={props.src}
      alt={props.alt || 'Imagen del producto'}
      className={props.className}
      style={props.style}
      onError={(e) => e.target.classList.add('img-error')}
    />
  );
}

export { Imagen };
export default Imagen;
