import FileInputCard from "../ui/form/InputFileCard";
import { STEPS } from "@/utils/userForm";
import { textColor } from "@/styles/tokensTailwind";
import { useState } from "react";
import { X, RotateCw } from "lucide-react";

export default function ContentStep3(currentStep) {
  const { inputs } = STEPS[currentStep.currentStep - 1] || {};

  const [files, setFiles] = useState({
    idCard: null,
    passeport: null,
    transport: null,
    domicile: null,
    other: [], // Tableau pour gérer plusieurs fichiers
  });

  console.log(files);
  
  const handleOtherFileChange = (newFile) => {
    if (newFile) {
      setFiles((prev) => ({
        ...prev,
        other: [...prev.other, { id: Date.now(), file: newFile }],
      }));
    }
  };

  const handleOtherFileDelete = (fileId) => {
    setFiles((prev) => ({
      ...prev,
      other: prev.other.filter((item) => item.id !== fileId),
    }));
  };

  return (
    <div className="h-full grid grid-cols-2 gap-4 items-center justify-center">
      {inputs.map((input, index) => {
        const isFirstOfGroup =
          index === 0 || inputs[index - 1].group !== input.group;

        return (
          <div key={index} className="flex flex-col gap-2">
            {isFirstOfGroup ? (
              <div className="flex items-center gap-2">
                {input.iconGroup && (
                  <input.iconGroup
                    className={textColor[input.branding]}
                    size={20}
                  />
                )}
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
              onFileChange={(file) => {
                if (input.id === "other") {
                  handleOtherFileChange(file);
                } else {
                  setFiles((prev) => ({ ...prev, [input.id]: file }));
                }
              }}
              multipleFiles={input.multipleFiles || false}
            />
          </div>
        );
      })}
      {files.other && files.other.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="invisible text-lg">''</h4>
          <div className="border-lightBorder bg-zinc-50 border flex flex-col items-center p-4 gap-4 rounded-lg w-100 h-[101.33px] overflow-y-auto">
            {files.other.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 w-full"
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-slate-700 truncate font-bold text-sm">
                    {item.file?.name}
                  </span>
                </div>
                <div
                  className="cursor-pointer bg-red-200 p-2 rounded hover:bg-red-300 transition-colors"
                  onClick={() => handleOtherFileDelete(item.id)}
                >
                  <X className="text-red-500" size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
