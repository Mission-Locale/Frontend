import React, { useState, useRef } from "react";
import { UploadCloud, FolderOpen, CircleX  } from "lucide-react";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5Mo

export default function FileUpload({ file, onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Déclenche l'explorateur de fichiers au clic sur le bouton
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(null);

    if (selectedFile) {
      // Vérifier le type de fichier
      if (
        selectedFile.type !== "image/jpeg" &&
        selectedFile.type !== "image/png" &&
        selectedFile.type !== "image/jpg"
      ) {
        setError(
          `Format invalide. Seules les images JPEG, PNG et JPG sont acceptées`
        );
        onChange(null);
        fileInputRef.current.value = null;
        return;
      }

      // Vérifier la taille du fichier
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(`Fichier trop volumineux`);
        onChange(null);
        fileInputRef.current.value = null;
        return;
      }

      onChange(selectedFile);
      fileInputRef.current.value = null;
    }
  };

  // Gestion du Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Vérifier le type de fichier
      if (
        droppedFile.type !== "image/jpeg" &&
        droppedFile.type !== "image/png" &&
        droppedFile.type !== "image/jpg"
      ) {
        setError(
          `Seules les images JPEG, PNG et JPG sont acceptées`
        );
        onChange(null);
        return;
      }

      // Vérifier la taille du fichier
      if (droppedFile.size > MAX_FILE_SIZE) {
        setError(`Fichier trop volumineux`);
        onChange(null);
        return;
      }

      onChange(droppedFile);
    }
  };

  return (
    <div className="w-full">

      {/* Affichage conditionnel des messages d'erreur ou de succès */}
      {(error || file) && (
        <div className="mb-3">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start gap-2">
              <CircleX color="red"/>
              <span>{error}</span>
            </div>
          )}
          {file && (
            <div className="max-w-[400px] mx-auto p-2 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 flex justify-between items-center">
              <span className="truncate">
                Fichier sélectionné :{" "}
                <span className="font-bold truncate">{file.name}</span>
              </span>
              <button
                onClick={() => onChange(null)}
                className="text-green-900 font-bold ml-2"
              >
                x
              </button>
            </div>
          )}
        </div>
      )}

      {!file && (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
            relative flex flex-col items-center justify-center w-full h-48 
            border-2 border-dashed rounded-xl transition-all duration-200
            ${
              error
                ? "border-red-300 bg-red-50/50 hover:bg-red-50"
                : isDragging
                ? "border-blue-500 bg-blue-100"
                : "border-blue-200 bg-blue-50/50 hover:bg-blue-50"
            }
          `}
          >
            {/* Input caché */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />

            {/* Contenu visuel */}
            <div className="flex flex-col items-center text-center p-6">
              <UploadCloud
                className={`w-10 h-10 mb-3 ${
                  isDragging ? "text-blue-600" : "text-gray-600"
                }`}
                strokeWidth={1.5}
              />

              <p className="text-gray-700 font-medium mb-4">
                Choisissez une photo en cliquant <br />
                ou en la glissant ici
              </p>

              <button
                type="button"
                onClick={handleButtonClick}
                className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                Parcourir
                <FolderOpen size={16} />
              </button>
            </div>
          </div>
          <span className="block mt-2 text-xs text-gray-500 text-center">Formats acceptés : JPG, JPEG, PNG (max 5Mo)</span>
        </>
      )}
    </div>
  );
}
