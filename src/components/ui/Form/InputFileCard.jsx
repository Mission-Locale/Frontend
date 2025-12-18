import { useState, useRef } from "react";
import { textColor, lightBg } from "@/styles/tokensTailwind";
import { IdCard, X, RotateCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FileInputCard({ id, title, description, selectTheme }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const isCharged = file !== null;

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

    function deleteFile() {
      setFile(null);
      fileInputRef.current.value = null;
    }

  return (
    <div
      className={`${
        isCharged
          ? " bg-bgSuccess border-success border-2"
          : " border-lightBorder bg-zinc-50 border"
      } flex items-center p-4 gap-4 rounded-lg w-100`}
    >
      <div
        className={`size-10 flex items-center justify-center rounded-md ${
          isCharged ? "bg-bgSuccessIcon" : lightBg[selectTheme]
        }`}
      >
        <IdCard
          className={isCharged ? "text-success" : textColor[selectTheme]}
        />
      </div>

      <div className="flex flex-col gap-1 w-50">
        <h4 className="font-medium text-black text-base">{title}</h4>

        <span
          className={`${
            isCharged ? "text-success" : "text-slate-500"
          } truncate font-bold text-sm`}
        >
          {isCharged ? file.name : description}
        </span>
        <span
          className={`${
            isCharged ? "text-success" : "text-slate-400"
          } font-normal text-xs`}
        >
          {isCharged ? "Téléchargé avec succès" : "Format: PDF • Max 5 Mo"}
        </span>
      </div>

      <div>
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {isCharged ? (
          <div className="flex gap-2">

            <label htmlFor={id} className="cursor-pointer bg-gray-200 p-2 rounded">
              <RotateCw className="text-gray-500"/>
            </label>

            <div className="cursor-pointer bg-red-200 p-2 rounded" onClick={deleteFile}>
              <X className="text-red-500"/>
            </div>

          </div>
        ) : (
          <Button
            text="Parcourir"
            color={selectTheme}
            size="md"
            variant="full"
            radiusSize="md"
            onClick={() => fileInputRef.current.click()}
          />
        )}
      </div>
    </div>
  );
}
