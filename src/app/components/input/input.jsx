import "./input.css";

export const Input = ({
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="input__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
