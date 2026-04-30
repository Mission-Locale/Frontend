import { ring } from "@/styles/tokensTailwind";

export default function InputTextArea({
  label = undefined,
  onChange,
  value,
  placeholder = label,
  selectTheme = "brandBlue",
  error = undefined,
  required = false,
  disabled = false,
  ...props
}) {
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

  return (
    <div className="size-full mb-3 flex flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="text-start block w-full mb-2 font-bold text-slate-900"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        className={`border bg-lightBg rounded-md p-3 size-full focus:outline-none focus:ring-2 placeholder:text-sm sm:placeholder:text-base resize-none
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
          className="text-red-500 text-sm text-start block w-full"
        >
          {error}
        </p>
      )}
    </div>
  );
}
