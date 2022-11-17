export default function FormInput({
  label,
  type,
  name,
  onChange,
  onBlur,
  value,
  error,
}) {
  return (
    <>
      <div className="w-[350px] flex flex-col">
        <div className="flex items-center relative">
          <span className="block m-2">
            <label htmlFor={name}>{label}</label>
          </span>
          <div>
            <input
              className="py-1 px-2 bg-slate-100 rounded-md absolute top-1 right-1"
              type={type}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={error}
            />
          </div>
        </div>
        <p
          className={`break-words ml-2 text-sm ${
            error ? 'text-red-600' : 'text-black'
          }`}
        >
          {error}
        </p>
      </div>
    </>
  );
}
