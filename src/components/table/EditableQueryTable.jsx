import { useState } from "react";
import QueryInput from "@/components/ui/Form/QueryInput";
import { Minus, Plus } from "lucide-react";

export default function EditableQueryTable({
  label,
  lines,
  fetchKey,
  fetchfunction,
  optionMapper,
  onCreate = undefined,
  onAdd,
  onDelete,
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-700">
                {label}
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {lines.map((line) => (
              <tr
                key={line}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-4 py-2 font-bold text-gray-900 text-sm capitalize">
                  {line}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={onDelete}
                    className="bg-brandPurple hover:bg-red-800 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
                    title="Supprimer"
                  >
                    <Minus size={18} />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-4 py-2">
                {!isAdding ? (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="bg-brandGreen hover:bg-lime-500 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
                    title="Ajouter"
                  >
                    <Plus size={18} />
                  </button>
                ) : (
                  <div className="flex flex-row gap-1">
                    <QueryInput
                      placeholder="NOM Prénom"
                      selectTheme="brandBlue"
                      fetchKey={fetchKey}
                      fetchfunction={fetchfunction}
                      optionMapper={optionMapper}
                      onSelection={(value) => {
                        onAdd(value);
                        setIsAdding(false);
                      }}
                      onCreate={onCreate}
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
