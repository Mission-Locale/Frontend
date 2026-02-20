import { selectThemes } from "@/styles/tokensTailwind";
import { Check } from "lucide-react";

export default function OptionList({
  options = [],
  value = undefined,
  selectTheme,
  onSelect,
}) {
  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <ul
      className={`
              absolute -top-5 z-50 w-full mt-2 rounded-lg bg-white shadow-lg border
              ${selectThemes[selectTheme].dropdown}
              max-h-60 overflow-auto
            `}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            aria-selected={isSelected}
            className={`
                    w-full px-4 py-2 text-left flex items-center justify-between
                    transition-colors duration-150 cursor-pointer
                    ${
                      isSelected
                        ? selectThemes[selectTheme].optionSelected
                        : selectThemes[selectTheme].option
                    }
                    first:rounded-t-lg last:rounded-b-lg
                  `}
          >
            <span>{option.label}</span>
            {isSelected && (
              <Check className={`w-5 h-5 ${selectThemes[selectTheme].check}`} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
