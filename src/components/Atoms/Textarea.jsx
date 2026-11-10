// Átomo: área de texto controlada.
function Textarea(props) {
  return (
    <textarea
      id={props.id}
      name={props.name || props.id}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder || ''}
      rows={props.rows || 3}
      required={props.required || false}
      className={props.className || 'form-control'}
    />
  );
}

export { Textarea };
export default Textarea;
