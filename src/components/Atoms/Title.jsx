// Átomo: título h1...h6 según props.level.
function Title(props) {
  const nivel = props.level || 1;
  const Tag = `h${nivel}`;
  const clases = `title title-h${nivel} ${props.className || ''}`.trim();

  return <Tag className={clases}>{props.texto ?? props.children}</Tag>;
}

export { Title };
export default Title;
