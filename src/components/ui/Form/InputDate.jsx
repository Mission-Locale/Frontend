import { useState, useRef, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/lib/calendar";
import { fr } from "react-day-picker/locale";
import {
  textColor,
  selectThemes,
  sizes,
  border,
} from "@/styles/tokensTailwind";
import dateFormater from "@/utils/dateFormater";

export default function InputDate({
  label,
  placeholder = "Sélectionner une date",
  selectTheme,
  value,
  onChange,
  size = "md",
  disabled = false,
  required = false,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const date = value ? (value instanceof Date ? value : new Date(value)) : undefined;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const now = new Date();

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="text-start block w-full mb-2 font-bold text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div ref={selectRef} className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between rounded-md
            border ${sizes[size]} ${error ? `outline-red-500 outline-solid ${selectThemes[selectTheme].trigger}` : selectThemes[selectTheme].trigger}
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span className={value ? "text-gray-900 text-sm sm:text-base" : "text-gray-500 text-sm sm:text-base"}>
            {value ? dateFormater(value) : placeholder}
          </span>
          <CalendarDays className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
        </button>

        {isOpen && (
          <div
            className={`absolute z-50 mt-2 rounded-md shadow-lg bg-white border-2 ${border[selectTheme]} p-2`}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(newDate) => {
                onChange?.(newDate);
                setIsOpen(false);
              }}
              disabled={{ after: now }}
              locale={fr}
              classNames={{
                today: ``,
                chevron: `${textColor[selectTheme]}`,
              }}
              defaultMonth={
                value
                  ? new Date(value.getFullYear(), value.getMonth())
                  : new Date(now.getFullYear(), now.getMonth())
              }
              startMonth={new Date(now.getFullYear() - 70, 0)}
              endMonth={new Date(now.getFullYear(), now.getMonth())}
            />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1 text-start block w-full">
          {error}
        </p>
      )}
    </div>
  );
}
