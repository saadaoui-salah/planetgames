export const Input = ({
  label,
  type,
  required = true,
  minLength = 8,
  onChange,
  value,
}) => {
  return (
    <div className="block">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
        {label}
      </label>
      <input
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e)}
        value={value}
        className="appearance-none focus:border-indigo-400 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={label}
      />
    </div>
  );
};

export const SelectInput = ({
  label,
  item = "wilaya",
  onChange,
  className,
  values,
  value = 0,
  key = "id",
}) => {
  return (
    <div className={`${className} relative inline-block w-[200px]`}>
      <label
        className="block text-md text-gray-700 font-bold mb-2"
        htmlFor="select"
      >
        {label}
      </label>
      <select
        defaultValue={value}
        value={value}
        onChange={(e) => onChange(e)}
        id="select"
        className="bg-transparent border w-full border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        {values.map((value, i) => (
          <option key={i} value={value[key]}>
            {value[item]}
          </option>
        ))}
      </select>
    </div>
  );
};
