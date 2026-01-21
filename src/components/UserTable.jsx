import { Pencil, Trash2, UserRound, X } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import InputText from "./ui/Form/InputText";
import InputDate from "./ui/Form/InputDate";
import Button from "./ui/Button";
import FileUpload from "./ui/Form/FileUpload";
import dateFormater from "@/utils/dateFormater";

export default function UserTable({
  users,
  onEdit,
  onDelete,
  isCreateModalOpen,
  isEditModalOpen,
  isDeleteModalOpen,
  closeCreateModal,
  closeEditModal,
  closeDeleteModal,
  handleCreate,
  handleUpdate,
  handleDelete,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  selectedUser,
  isSaving,
}) {
  // Gestion des images de profil en erreur
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (index) => {
    setFailedImages((prev) => new Set([...prev, index]));
  };

  // Gestion des changements dans le form
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // RENDU DU FORM
  const renderForm = () => (
    <div className="flex flex-col min-w-[300px] sm:min-w-[400px]">
      <InputText
        label="Nom"
        placeholder="Dupont"
        value={formData.last_name}
        onChange={handleInputChange("last_name")}
        error={formErrors.last_name}
        required
        selectTheme="brandBlue"
      />
      <InputText
        label="Prénom"
        placeholder="Jean"
        value={formData.first_name}
        onChange={handleInputChange("first_name")}
        error={formErrors.first_name}
        required
        selectTheme="brandBlue"
      />
      <InputDate
        label="Date de naissance"
        placeholder="Sélectionner une date"
        value={formData.birth_date}
        onChange={(date) => {
          setFormData((prev) => ({ ...prev, birth_date: date }));
          if (formErrors.birth_date) {
            setFormErrors((prev) => ({ ...prev, birth_date: undefined }));
          }
        }}
        error={formErrors.birth_date}
        required
        selectTheme="brandBlue"
      />
      <InputText
        label="Email"
        type="email"
        placeholder="jean.dupont@email.com"
        value={formData.email}
        onChange={handleInputChange("email")}
        error={formErrors.email}
        required
        selectTheme="brandBlue"
      />
      <InputText
        label="Téléphone"
        type="tel"
        placeholder="06 12 34 56 78"
        value={formData.phone}
        onChange={handleInputChange("phone")}
        error={formErrors.phone}
        required
        selectTheme="brandBlue"
      />
      <FileUpload
        file={formData.profile_picture_path}
        onChange={(file) =>
          setFormData((prev) => ({
            ...prev,
            profile_picture_path: file,
          }))
        }
      />
    </div>
  );

  return (
    <div className="w-full">
      {/* Tableau */}
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
              {users?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users?.map((user, index) => (
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Profil Col */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user && !failedImages.has(index) ? (
                          <img
                            src={user}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            onError={() => handleImageError(index)}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">
                            <UserRound color="gray" size={20} />
                          </div>
                        )}

                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm capitalize">
                            {user.first_name} {user.last_name}
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
                      {user.advisor.assigned_job_seekers.length ?? 0}
                    </td>

                    {/* Date Col */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {dateFormater(user.createdAt)}
                    </td>

                    {/* Actions Col */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(user, index)}
                          className="p-2 bg-brandOrange hover:bg-orange-500 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
                          title="Modifier"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(user, index)}
                          className="p-2 bg-brandPurple hover:bg-pink-900 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de création */}
      {isCreateModalOpen && (
        <Modal
          modalKey="create-user-modal"
          onOutOfBoundClick={closeCreateModal}
        >
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Ajouter un utilisateur
              </h3>
              <button
                onClick={closeCreateModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Formulaire */}
            {renderForm()}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                text="Annuler"
                color="gray"
                size="md"
                variant="outline"
                radiusSize="md"
                onClick={closeCreateModal}
                disabled={isSaving}
              />
              <Button
                text={isSaving ? "Création..." : "Créer"}
                color="brandBlue"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleCreate}
                disabled={isSaving}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Modal d'édition */}
      {isEditModalOpen && (
        <Modal modalKey="edit-user-modal" onOutOfBoundClick={closeEditModal}>
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Modifier l'utilisateur
              </h3>
              <button
                onClick={closeEditModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Formulaire */}
            {renderForm()}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                text="Annuler"
                color="gray"
                size="md"
                variant="outline"
                radiusSize="md"
                onClick={closeEditModal}
                disabled={isSaving}
              />
              <Button
                text={isSaving ? "Mise à jour..." : "Mettre à jour"}
                color="brandOrange"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleUpdate}
                disabled={isSaving}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <Modal
          modalKey="delete-user-modal"
          onOutOfBoundClick={closeDeleteModal}
        >
          <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[400px]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Confirmer la suppression
              </h3>
              <button
                onClick={closeDeleteModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Contenu */}
            <div className="py-4">
              <p className="text-gray-600">
                Êtes-vous sûr de vouloir supprimer le conseiller{" "}
                <span className="font-bold text-gray-900 capitalize">
                  {selectedUser &&
                  `${selectedUser.first_name} ${selectedUser.last_name}`}
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
                onClick={closeDeleteModal}
                disabled={isSaving}
              />
              <Button
                text={isSaving ? "Suppression..." : "Supprimer"}
                color="brandPurple"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleDelete}
                disabled={isSaving}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};