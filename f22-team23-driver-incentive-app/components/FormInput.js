export default function FormInput({
  label,
  type,
  name,
  placeholder,
  onChange,
  onBlur,
  isError = false,
  error,
}) {
  return (
    <div className="pb-10">
      <span className="block mb-5">{label};</span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      <span
        className={`block mt-5 text-sm ${
          isError ? 'text-red-600' : 'text-black'
        }`}
      >
        {error}
      </span>
    </div>
  );
}
