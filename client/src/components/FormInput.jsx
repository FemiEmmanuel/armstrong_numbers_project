const FormInput = ({ type, name, value, onChange, placeholder, required }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6F61]"
  />
);

export default FormInput;
