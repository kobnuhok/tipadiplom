import "./select.css";

export const Select = ({ name, value, onChange }) => {
  const handleChange = (event) => {
    onChange({ target: { name, value: event.target.value } }); // Вызываем функцию обратного вызова onChange с новым значением
  };
  return (
    <div className="select">
      <label htmlFor={name} className="select__label">
        Материал:
      </label>
      <select
        name={name}
        className="select__input"
        value={value}
        onChange={handleChange}
      >
        <option value="cheap">Дешевый</option>
        <option value="optimal">Оптимальный</option>
        <option value="expensive">Дорогой</option>
      </select>
    </div>
  );
};
