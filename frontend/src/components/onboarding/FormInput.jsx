export default function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  helper,
  mask,
  ...props
}) {
  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Aplicar máscara si existe
    if (mask === 'nit') {
      inputValue = inputValue.replace(/\D/g, '');
      if (inputValue.length > 9) inputValue = inputValue.slice(0, 9);
      if (inputValue.length >= 3) inputValue = inputValue.slice(0, 3) + '.' + inputValue.slice(3);
      if (inputValue.length >= 7) inputValue = inputValue.slice(0, 7) + '.' + inputValue.slice(7);
      if (inputValue.length >= 11) inputValue = inputValue.slice(0, 11) + '-' + inputValue.slice(11);
    }

    onChange?.(inputValue);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
    </div>
  );
}
