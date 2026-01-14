import { Pencil, Trash2, UserRound } from "lucide-react";
import { useState } from "react";

export default function UserTable({ users }) {
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (index) => {
    setFailedImages((prev) => new Set([...prev, index]));
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Nom
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Téléphone
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Nombre de demandeurs assignés
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Date de création
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                {/* Profil Col */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar && !failedImages.has(index) ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                        <UserRound color="gray" size={20} />
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 text-sm">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Phone Col */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.phone}
                </td>

                {/* Count Col */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.assignedCount}
                </td>

                {/* Date Col */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.createdAt}
                </td>

                {/* Actions Col */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 bg-brandOrange hover:bg-orange-500 text-white rounded-full transition-shadow shadow-sm cursor-pointer">
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 bg-brandPurple hover:bg-pink-900 text-white rounded-full transition-shadow shadow-sm cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
