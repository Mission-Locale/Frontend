import FileInputCard from "../ui/form/InputFileCard";
import { STEPS } from "@/utils/userForm";
import { textColor } from "@/styles/tokensTailwind";
import { useState } from "react";

export default function ContentStep3( currentStep ) {

  const { inputs } = STEPS[currentStep.currentStep - 1] || {}
  
  const [files, setFiles] = useState({
    idCard: null,
    passeport: null,
    transport: null,
    domicile: null,
    other: null, // TODO : gerer plusieurs fichiers pour cette catégorie
  });

  return (
    <div className="h-full grid grid-cols-2 gap-4 items-center justify-center">
      {inputs.map((input, index) => {
        const isFirstOfGroup =
          index === 0 || inputs[index - 1].group !== input.group;

        return (
          <div key={index} className="flex flex-col gap-2">
            {isFirstOfGroup ? (
              <div className="flex items-center gap-2">
                {input.iconGroup && <input.iconGroup className={textColor[input.branding]} size={20} />}
                <h4 className="font-medium text-lg">{input.group}</h4>
              </div>
            ) : (
              <h4 className="invisible text-lg">{input.group}</h4>
            )}
            <FileInputCard
              id={input.id}
              title={input.title}
              subtitle={input.subtitle}
              selectTheme={input.branding}
              icon={input.icon}
              file={files[input.id]}
              onFileChange={(file) =>
                setFiles((prev) => ({ ...prev, [input.id]: file }))
              }
            />
          </div>
        );
      })}
    </div>
  );
}
