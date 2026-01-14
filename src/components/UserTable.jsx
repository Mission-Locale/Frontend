import { Pencil, Trash2, UserRound, X } from "lucide-react";
import { useState, useCallback, forwardRef, useImperativeHandle } from "react";
import Modal from "./Modal";
import InputText from "./ui/Form/InputText";
import InputDate from "./ui/Form/InputDate";
import Button from "./ui/Button";
import { validateModalAdvisor } from "../utils/validations";

// État initial pour un nouvel utilisateur
const initialUserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
};

const UserTable = forwardRef(({ users: initialUsers }, ref) => {
  // ==================== ÉTATS ====================
  const [users, setUsers] = useState(initialUsers);
  const [failedImages, setFailedImages] = useState(new Set());
  
  // États pour les modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // État du formulaire (création/édition)
  const [formData, setFormData] = useState(initialUserForm);
  const [formErrors, setFormErrors] = useState({});
  
  // Utilisateur sélectionné pour édition/suppression
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  
  // État de chargement
  const [isLoading, setIsLoading] = useState(false);

  // GESTION DES IMAGES
  const handleImageError = (index) => {
    setFailedImages((prev) => new Set([...prev, index]));
  };

  // VALIDATION DU FORM
  const validateForm = useCallback(() => {
    const errors = validateModalAdvisor(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // GESTION DU FORM
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

  const resetForm = () => {
    setFormData(initialUserForm);
    setFormErrors({});
    setSelectedUser(null);
    setSelectedUserIndex(null);
  };

  // ==================== CREATE ====================
  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implémenter l'appel API POST pour créer l'utilisateur
      // const response = await api.post('/users', formData);
      // const newUser = response.data;

      // Simulation de la création (à remplacer par la réponse API)
      const newUser = {
        ...formData,
        id: Date.now(), // L'ID sera généré par le backend
        assignedCount: 0,
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      setUsers((prev) => [...prev, newUser]);
      closeCreateModal();
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      // TODO: Gérer les erreurs de l'API (afficher un toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== READ ====================
  // La lecture est gérée par l'affichage du tableau
  // TODO: Implémenter l'appel API GET pour récupérer les utilisateurs
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await api.get('/users');
  //     setUsers(response.data);
  //   };
  //   fetchUsers();
  // }, []);

  // ==================== UPDATE ====================
  const openEditModal = (user, index) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setFormData({
      lastName: user.lastName || "",
      firstName: user.firstName || "",
      email: user.email || "",
      phone: user.phone || "",
      birthDate: user.birthDate || "",
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implémenter l'appel API PUT/PATCH pour mettre à jour l'utilisateur
      // const response = await api.put(`/users/${selectedUser.id}`, formData);
      // const updatedUser = response.data;

      // Simulation de la mise à jour (à remplacer par la réponse API)
      const updatedUser = {
        ...selectedUser,
        ...formData,
      };

      setUsers((prev) =>
        prev.map((user, index) =>
          index === selectedUserIndex ? updatedUser : user
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // TODO: Gérer les erreurs de l'API
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== DELETE ====================
  const openDeleteModal = (user, index) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setSelectedUserIndex(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // TODO: Implémenter l'appel API DELETE pour supprimer l'utilisateur
      // await api.delete(`/users/${selectedUser.id}`);

      setUsers((prev) => prev.filter((_, index) => index !== selectedUserIndex));
      
      // Nettoyer les images en erreur si nécessaire
      setFailedImages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedUserIndex);
        return newSet;
      });
      
      closeDeleteModal();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      // TODO: Gérer les erreurs de l'API
    } finally {
      setIsLoading(false);
    }
  };

  // ==================== EXPOSITION DES MÉTHODES AU PARENT ====================
  useImperativeHandle(ref, () => ({
    openCreateModal,
  }));

  // ==================== RENDU DU FORMULAIRE ====================
  const renderForm = () => (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[400px]">
      <InputText
        label="Nom"
        placeholder="Dupont"
        value={formData.lastName}
        onChange={handleInputChange("lastName")}
        error={formErrors.lastName}
        required
        selectTheme="brandBlue"
      />
      <InputText
        label="Prénom"
        placeholder="Jean"
        value={formData.firstName}
        onChange={handleInputChange("firstName")}
        error={formErrors.firstName}
        required
        selectTheme="brandBlue"
      />
        <InputDate
          label="Date de naissance"
          placeholder="Sélectionner une date"
          value={formData.birthDate}
          onChange={(date) => {
            setFormData((prev) => ({ ...prev, birthDate: date }));
            if (formErrors.birthDate) {
              setFormErrors((prev) => ({ ...prev, birthDate: undefined }));
            }
          }}
          error={formErrors.birthDate}
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user.id || index}
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
                        <button
                          onClick={() => openEditModal(user, index)}
                          className="p-2 bg-brandOrange hover:bg-orange-500 text-white rounded-full transition-shadow shadow-sm cursor-pointer"
                          title="Modifier"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user, index)}
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
        <Modal modalKey="create-user-modal" onOutOfBoundClick={closeCreateModal}>
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
                disabled={isLoading}
              />
              <Button
                text={isLoading ? "Création..." : "Créer"}
                color="brandOrange"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleCreate}
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <Button
                text={isLoading ? "Mise à jour..." : "Mettre à jour"}
                color="brandOrange"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleUpdate}
                disabled={isLoading}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de suppression */}
      {isDeleteModalOpen && (
        <Modal modalKey="delete-user-modal" onOutOfBoundClick={closeDeleteModal}>
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
                Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
                <span className="font-bold text-gray-900">
                  {selectedUser?.name}
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
                disabled={isLoading}
              />
              <Button
                text={isLoading ? "Suppression..." : "Supprimer"}
                color="brandPurple"
                size="md"
                variant="full"
                radiusSize="md"
                onClick={handleDelete}
                disabled={isLoading}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
});

UserTable.displayName = "UserTable";

export default UserTable;
