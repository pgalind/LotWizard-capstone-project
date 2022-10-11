export default function FormInput({
  label,
  type,
  name,
  onChange,
  onBlur,
  isError = false,
  error,
}) {
  return (
    <div className="mr-4 pb-2">
      <span className="block m-2">
        <label htmlFor={name}>{label}</label>
      </span>

      <input
        className="py-1 px-2 bg-slate-100 rounded-md"
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span
        className={`block text-sm ${isError ? 'text-red-600' : 'text-black'}`}
      >
        {error}
      </span>
    </div>
  );
}
