// Átomo: caja de texto controlada (recibe value por props y avisa con onChange).
function Input(props) {
  return (
    <input
      id={props.id}
      name={props.name || props.id}
      type={props.type || 'text'}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder || ''}
      required={props.required || false}
      disabled={props.disabled || false}
      min={props.min}
      max={props.max}
      className={props.className || 'form-control'}
    />
  );
}

export { Input };
export default Input;
