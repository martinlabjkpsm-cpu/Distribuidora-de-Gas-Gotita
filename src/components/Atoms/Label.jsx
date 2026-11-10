// Átomo: etiqueta de un campo de formulario.
function Label(props) {
  return (
    <label htmlFor={props.htmlFor} className={`form-label ${props.className || ''}`.trim()}>
      {props.texto ?? props.children}
    </label>
  );
}

export { Label };
export default Label;
