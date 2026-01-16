import Button from "@/components/ui//Button";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import UserTable from "@/components/UserTable";
import { getUsersFilteredByRole } from "@/utils/api";
import { toast } from "react-toastify";
import { validateModalAdvisor } from "@/utils/validations";

// État initial pour un nouvel utilisateur
const initialUserForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  birth_date: "",
  avatar: null,
};

export default function AdvisorList() {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States pour les modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State du formulaire (création/édition)
  const [formData, setFormData] = useState(initialUserForm);
  const [formErrors, setFormErrors] = useState({});

  // State de user sélectionné pour édition/suppression
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const loadAdvisors = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getUsersFilteredByRole("ADVISOR");
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors du chargement des conseillers:", error);
      toast.error("Impossible de charger la liste des conseillers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdvisors()
  }, [loadAdvisors]);

  // Validation du form
  const validateForm = useCallback(() => {
    const errors = validateModalAdvisor(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Reset du formulaire
  const resetForm = () => {
    setFormData(initialUserForm);
    setFormErrors({});
    setSelectedUser(null);
    setSelectedUserIndex(null);
  };

  // CREATE
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

    setIsSaving(true);
    try {
      // TODO: Implémenter l'appel API POST pour créer l'utilisateur
      // const response = await createAdvisor(formData);
      // const newUser = response.data;

      // Simulation de la création (à remplacer par la réponse API)
      const newUser = {
        ...formData,
        user_id: Date.now(),
        jobSeeker: [],
        createdAt: new Date().toISOString(),
      };

      setUsers((prev) => [...prev, newUser]);
      closeCreateModal();
      toast.success("Le conseiller a été créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast.error("Une erreur est survenue lors de la création du conseiller.");
    } finally {
      setIsSaving(false);
    }
  };

  // UPDATE
  const openEditModal = (user, index) => {
    setSelectedUser(user);
    setSelectedUserIndex(index);
    setFormData({
      last_name: user.last_name || "",
      first_name: user.first_name || "",
      email: user.email || "",
      phone: user.phone || "",
      birth_date: user.birth_date ? new Date(user.birth_date) : "",
      avatar: user.avatar || null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    console.log("handleUpdate appelé");
    console.log("formData:", formData);
    console.log("selectedUser:", selectedUser);
    console.log("selectedUserIndex:", selectedUserIndex);
    
    if (!validateForm()) {
      console.log("Validation échouée", formErrors);
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implémenter l'appel API PUT/PATCH pour mettre à jour l'utilisateur
      // const response = await updateAdvisor(selectedUser.user_id, formData);
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
      toast.success("Le conseiller a été modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Une erreur est survenue lors de la modification du conseiller.");
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE
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
    setIsSaving(true);
    try {
      // TODO: Implémenter l'appel API DELETE pour supprimer l'utilisateur
      // await deleteAdvisor(selectedUser.user_id);

      setUsers((prev) =>
        prev.filter((_, index) => index !== selectedUserIndex)
      );

      closeDeleteModal();
      toast.success("Le conseiller a été supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Une erreur est survenue lors de la suppression du conseiller.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <>
      <div className="col-span-full row-span-full border-2 border-gray-300 rounded-2xl px-6 py-4">
        <h2 className="font-bold text-2xl mb-1">
          Tableau de bord - Conseillers
        </h2>
        <p className="font-base text-sm text-gray-600 mb-12">
          Créer et éditer les conseillers sur cette page.
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-gray-600">Chargement des conseillers...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">
                Liste de tous les conseillers
                <span className="font-semibold text-lg ml-5 text-gray-600">{users?.length}</span>
              </h3>

              <div className="flex gap-2">
                <div className="flex items-center bg-white border border-lightBorder rounded-md px-2 gap-2 w-full focus-within:ring-2 focus-within:ring-brandBlue">
                  <label htmlFor="search">
                    <Search size={20} color="gray" />
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="p-1 outline-none w-full"
                    value={searchValue}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  text="Ajouter"
                  color="brandBlue"
                  size="md"
                  variant="full"
                  radiusSize="sm"
                  width="full"
                  onClick={openCreateModal}
                  logo={<Plus size={20} />}
                />
              </div>
            </div>
            <UserTable
              users={users}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              isCreateModalOpen={isCreateModalOpen}
              isEditModalOpen={isEditModalOpen}
              isDeleteModalOpen={isDeleteModalOpen}
              closeCreateModal={closeCreateModal}
              closeEditModal={closeEditModal}
              closeDeleteModal={closeDeleteModal}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              selectedUser={selectedUser}
              isSaving={isSaving}
            />
          </>
        )}
      </div>
    </>
  );
}
