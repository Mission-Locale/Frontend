/**
 * title : titre du champ (exemple : "Carte d'identité")
 * icon : composant d'icône de lucide-react à importer dans le parent
 * selectTheme : 'brandBlue' | 'brandPink' | 'brandGreen' | 'brandOrange' | 'brandPurple'
 */

// Exemple of usage of InputFileCard component :
//
// {inputs.map((input) => (
//   <InputFileCard
//     key={input.id}
//     id={input.id}
//     title={input.title}
//     selectTheme={input.selectTheme}
//     icon={input.icon}
//     file={files[input.id]}
//     onFileChange={(file) =>
//       setFiles((prev) => ({ ...prev, [input.id]: file }))
//     }
//   />
// ))}

import { useState, useRef } from "react";
import { textColor, lightBg } from "@/styles/tokensTailwind";
import { X, RotateCw, CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5Mo

export default function FileInputCard({
  id,
  title,
  selectTheme,
  icon: Icon,
  file,
  onFileChange,
  subtitle,
  multipleFiles = false,
}) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const isCharged = file !== null;

  function handleFileChange(e) {
    const selectedFile = e.target.files[0]
    setError(null);

    if (selectedFile) {
      // Vérifier le type de fichier
      if (selectedFile.type !== "application/pdf") {
        setError(`Format invalide. Seul le PDF est accepté`);
        fileInputRef.current.value = null;
        return;
      }

      // Vérifier la taille du fichier
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`Fichier trop volumineux`);
        fileInputRef.current.value = null;
        return;
      }

      onFileChange(selectedFile);
      fileInputRef.current.value = null;
    }
  }

  function deleteFile() {
    onFileChange(null);
    setError(null);
    fileInputRef.current.value = null;
  }

  return (
    <div
      className={`${
        isCharged && !multipleFiles
          ? " bg-bgSuccess border-success border-2"
          : error
          ? " bg-bgError border-error border-2"
          : " border-lightBorder bg-zinc-50 border"
      } flex items-center p-4 gap-4 rounded-lg w-100`}
    >
      <div
        className={`size-10 flex items-center justify-center rounded-md ${
          isCharged && !multipleFiles
            ? "bg-bgSuccessIcon"
            : error && !multipleFiles
            ? "bg-bgErrorIcon"
            : lightBg[selectTheme]
        }`}
      >
        {error ? (
          <CircleAlert className="text-red-500" />
        ) : (
          Icon && (
            <Icon
              className={
                isCharged && !multipleFiles
                  ? "text-success"
                  : error && !multipleFiles
                  ? "text-red-500"
                  : textColor[selectTheme]
              }
            />
          )
        )}
      </div>

      <div className="flex flex-col gap-1 w-50">
        <h4 className="font-medium text-black text-base">{title}</h4>

          <span
            className={`${
              isCharged && !multipleFiles
                ? "text-success"
                : error && !multipleFiles
                ? "text-error"
                : "text-slate-500"
            } truncate font-bold text-sm`}
          >
            {isCharged && !multipleFiles
              ? file?.name
              : error && !multipleFiles
              ? "Erreur de téléchargement"
              : subtitle}
          </span>

        <span
          className={`${
            isCharged && !multipleFiles ? "text-success" : error ? "text-error" : "text-slate-400"
          } font-normal text-xs`}
        >
          {error 
            ? error
            : isCharged
            ? multipleFiles 
              ? "Format: PDF • Max 5 Mo"
              : "Téléchargé avec succès"
            : "Format: PDF • Max 5 Mo"}
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
        {isCharged && !multipleFiles ? (
          <div className="flex gap-2">
            <label
              htmlFor={id}
              className="cursor-pointer bg-gray-200 p-2 rounded"
            >
              <RotateCw className="text-gray-500" />
            </label>

            <div
              className="cursor-pointer bg-red-200 p-2 rounded"
              onClick={deleteFile}
            >
              <X className="text-red-500" />
            </div>
          </div>
        ) : (
          <Button
            text={error ? "Réessayer" : "Parcourir"}
            color={error ? "error" : selectTheme}
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
