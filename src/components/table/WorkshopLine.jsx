import dateFormater, { formatEvent } from "@/utils/dateFormater";
import { isBefore } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function WorkshopLine({ workshop, onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const recurrences = workshop.recurrences.toSorted();
  const lastRecurrenceIndex = recurrences.findLastIndex((recurrence) =>
    isBefore(recurrence.startTime, new Date()),
  );

  const lastRecurrence =
    lastRecurrenceIndex >= 0 ? recurrences[lastRecurrenceIndex] : null;
  const nextRecurrence =
    lastRecurrenceIndex >= 0 && lastRecurrenceIndex < recurrences.length - 1
      ? recurrences[lastRecurrenceIndex + 1]
      : null;

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      {/* Title Col */}
      <td className="px-6 py-4 font-bold text-gray-900 text-sm capitalize">
        {workshop.title}
      </td>

      {/* Last Occurence Col */}
      {(lastRecurrence && (
        <td className="px-6 py-4 text-sm text-gray-700">
          {formatEvent(lastRecurrence.startTime)}
        </td>
      )) || <td className="px-6 py-4 text-sm text-gray-700/50">Aucun</td>}

      {/* Next Occurence Col */}
      {(nextRecurrence && (
        <td className="px-6 py-4 text-sm text-gray-700">
          {formatEvent(nextRecurrence.startTime)}
        </td>
      )) || <td className="px-6 py-4 text-sm text-gray-700/50">Aucun</td>}

      {/* Date Col */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {dateFormater(workshop.createdAt)}
      </td>

      {/* Actions Col */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() =>
              navigate(
                "/dashboard/admin/workshops/edit/" + workshop.workshop_id,
              )
            }
            className="p-2 bg-brandOrange hover:bg-orange-500 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
            title="Modifier"
            disabled={isDeleting}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2 bg-brandPurple hover:bg-pink-900 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
            title="Supprimer"
            disabled={isDeleting}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>

      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <Modal
          modalKey="delete-workshop-modal"
          onOutOfBoundClick={() => setIsDeleteModalOpen(false)}
        >
          <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[400px]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Confirmer la suppression
              </h3>
              <button
                onClick={setIsDeleteModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Contenu */}
            <div className="py-4">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer l'atelier{" "}
                <span className="font-bold text-gray-900 capitalize">
                  {workshop.title}
                </span>{" "}
                ?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Cette action est irréversible.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                text="Annuler"
                color="gray"
                size="md"
                variant="outline"
                radiusSize="md"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
              />
              <Button
                text={isDeleting ? "Suppression..." : "Supprimer"}
                color="brandPurple"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={async () => {
                  setIsDeleting(true);
                  setIsDeleteModalOpen(false);
                  await onDelete();
                  setIsDeleting(false);
                }}
                disabled={isDeleting}
              />
            </div>
          </div>
        </Modal>
      )}
    </tr>
  );
}
