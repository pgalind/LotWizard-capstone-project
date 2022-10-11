export default function FormInput({ label, type, name, onChange, onBlur, value }) {
  return (
    <div className="flex mr-4 pb-2">
      <span className="block m-2">
        <label htmlFor={name}>{label}</label>
      </span>

      <input
        className="py-1 px-2 bg-slate-100 rounded-md"
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
