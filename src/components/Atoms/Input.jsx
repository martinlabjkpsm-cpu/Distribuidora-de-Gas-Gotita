export const Input = ({
    id,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    min,
    max,
    className = 'form-control',
}) => {
    return (
        <input
            id={id}
            name={name || id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            className={className}
        />
    );
};
