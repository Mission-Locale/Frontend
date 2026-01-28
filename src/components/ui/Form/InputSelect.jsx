/**
 *   options = [] // array de forme [{value: "apple", label: "Pomme"}]
 *   selectTheme  // regarder tokensTailwind.js pour regarder les themes dispo
 *   variant      // default, ghost, outline
 *   size         // sm, md, lg
 */

// TODO: Example for input select integration in form

// <SelectInput
//   label="Fruit"
//   options={[
//     { value: "apple", label: "Pomme" },
//     { value: "banana", label: "Banane" },
//   ]}
//   value={selected}
//   onChange={setSelected}
//   placeholder="Choisir..."
//   selectTheme="brandPurple"
//   variant="default"
//   size="md"
//   disabled={false}
//  />

import { selectThemes, sizes } from "@/styles/tokensTailwind";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import OptionList from "./OptionList";

export default function InputSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder,
  selectTheme,
  variant = "default",
  size = "md",
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const variants = {
    default: "bg-transparent border",
    ghost: "bg-transparent border-0 hover:bg-gray-100",
    outline: "bg-transparent border-2",
  };

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="text-start block w-full mb-2 font-bold text-slate-900">
          {label}
        </label>
      )}
      <div ref={selectRef} className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between rounded-md
            ${variants[variant]} ${sizes[size]} ${
              selectThemes[selectTheme].trigger
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <OptionList
            options={options}
            value={selectedOption}
            selectTheme={selectTheme}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
