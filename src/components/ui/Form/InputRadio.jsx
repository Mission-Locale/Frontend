import { bg, border } from "../../../styles/tokensTailwind";

export default function InputRadio({
  name,
  label,
  value,
  isSelected,
  onChange,
  selectTheme,
  className,
}) {
  return (
      <label
        className={`
        relative flex gap-4 items-center justify-between 
        w-full px-4 py-2 border rounded-md cursor-pointer transition-all duration-200
        ${
          isSelected
            ? `${border[selectTheme]} ${bg[selectTheme]}/20`
            : "border-gray-300 bg-white hover:border-gray-400"
        }
        ${className}
      `}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          className="sr-only"
        />

        <span
          className={`font-medium ${
            isSelected ? "text-slate-900" : "text-gray-700"
          }`}
        >
          {label}
        </span>

        <div
          className={`
          w-6 h-6 rounded-full border transition-all duration-200
          ${
            isSelected
              ? `bg-white border-[7px] ${border[selectTheme]}`
              : "bg-transparent border-2 border-gray-300"
          }
        `}
        ></div>
      </label>
  );
}
