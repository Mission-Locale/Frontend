import { useState } from "react";
import InputRadio from "../ui/form/InputRadio";

const civiliteOptions = [
  { label: "Monsieur", value: "monsieur" },
  { label: "Madame", value: "madame" },
];

export default function ContentStep1() {

  const [civilite, setCivilite] = useState(null);

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex flex-col items-center justify-center">
      {civiliteOptions.map((option) => (
        <InputRadio
          key={option.value}
          name="civilite"
          label={option.label}
          value={option.value}
          isSelected={civilite === option.value}
          onChange={setCivilite}
          selectTheme="brandBlue"
        />
      ))}
    </div>
  );
}
