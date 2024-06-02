import "./select.css";

export const Select = ({ name, value, val, label, options, onChange }) => {
  const handleChange = (event) => {
    onChange({ target: { name, value: event.target.value } }); // Вызываем функцию обратного вызова onChange с новым значением
  };

  return (
    <div className="select">
      <label htmlFor={name} className="select__label">
        {label}:
      </label>
      <select
        name={name}
        className="select__input"
        value={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} data-val={val} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
