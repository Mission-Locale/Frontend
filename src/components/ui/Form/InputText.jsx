import { ring } from "../../../styles/tokensTailwind";

export default function InputText({
  label,
  placeholder,
  selectTheme,
  onChange,
  value,
  required,
  error,
  disabled,
  type,
  ...props
}) {

  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

  return (
    <div className="w-full mb-4">

      {label && (
        <label
          htmlFor={inputId}
          className="text-start block w-full mb-2 font-bold text-slate-900"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 
          ${ring[selectTheme]}          
          ${
            error
              ? "outline-solid outline-red-500 border-none mb-2"
              : "border-gray-300"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-red-500 text-sm mb-4 text-start block w-full ml-4"
        >
          {error}
        </p>
      )}
    </div>
  );
}
