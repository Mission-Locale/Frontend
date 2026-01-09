import FileInputCard from "../ui/form/InputFileCard";
import { STEPS } from "@/utils/userRegister";
import { textColor } from "@/styles/tokensTailwind";
import { X, RotateCw } from "lucide-react";
import { useFormStore } from "@/stores/useFormStore";

export default function ContentStep3(currentStep) {
  const { inputs } = STEPS[currentStep.currentStep - 1] || {};
  const { addDocument, removeDocument, getUploadedDocs, addOtherDocument, removeOtherDocument } = useFormStore();

  function handleOtherFileChange(id, newFile) {
    if (newFile) {
      addOtherDocument(id, newFile);
    }
  };

  const handleOtherFileDelete = (fileId) => {
    // supprime du store aussi
    removeOtherDocument(fileId);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-center justify-center">
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
              <h4 className="hidden xl:block xl:invisible text-lg">
                {input.group}
              </h4>
            )}
            <FileInputCard
              id={input.id}
              title={input.title}
              subtitle={input.subtitle}
              selectTheme={input.branding}
              icon={input.icon}
              file={getUploadedDocs()[input.id]}
              onFileChange={(file) => {
                if (input.id === "other") {
                  handleOtherFileChange(`other_${Date.now()}`,file);
                } else {
                  // remove dans store si null
                  if (file === null && getUploadedDocs()[input.id]) {
                    removeDocument(input.id);
                  } else {
                    addDocument(input.id, file);
                  }
                }
              }}
              multipleFiles={input.multipleFiles || false}
            />
          </div>
        );
      })}
      {getUploadedDocs().other && Object.keys(getUploadedDocs().other).length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="hidden xl:block xl:invisible text-lg">''</h4>
          <div className="border-lightBorder bg-zinc-50 border flex flex-col items-center p-4 gap-4 rounded-lg sm:w-100 h-[101.33px] overflow-y-auto">
            {Object.entries(getUploadedDocs().other).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 w-full"
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-slate-700 truncate font-bold text-sm">
                    {value.file?.name}
                  </span>
                </div>
                <div
                  className="cursor-pointer bg-red-200 p-2 rounded hover:bg-red-300 transition-colors"
                  onClick={() => handleOtherFileDelete(key)}
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
