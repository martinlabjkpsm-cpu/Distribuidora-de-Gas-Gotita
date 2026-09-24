const Title = ({text, level = 1}) => {
    const Tag = 'h${level}';
    return <tag>{text}</tag>
}

export default Title;