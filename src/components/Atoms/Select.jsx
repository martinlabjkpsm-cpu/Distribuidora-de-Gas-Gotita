// Átomo: lista desplegable. Recibe las opciones por props como [{ value, label }].
function Select(props) {
  const opciones = props.options || [];

  return (
    <select
      id={props.id}
      name={props.name || props.id}
      value={props.value}
      onChange={props.onChange}
      required={props.required || false}
      className={props.className || 'form-select'}
    >
      {opciones.length > 0
        ? opciones.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        : props.children}
    </select>
  );
}

export { Select };
export default Select;
