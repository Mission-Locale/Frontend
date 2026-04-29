import Button from "@/components/ui//Button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import UserTable from "@/components/table/UserTable";
import {
  getUsersFilteredByRole,
  registerUser,
  deleteUser,
  updateUser,
} from "@/utils/api";
import { toast } from "react-toastify";
import { validateModalAdvisor } from "@/utils/validations";

const PASSWORD_SECRET = import.meta.env.VITE_PASSWORD_SECRET;

// État initial pour un nouvel utilisateur
const initialUserForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  birth_date: "",
  // TODO : Gérer le profile picture dans le back
  profile_picture_path: null,
};

const ITEMS_PER_PAGE = 5;

export default function AdvisorListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // La recherche réellement appliquée
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

  // States pour les modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State du formulaire
  const [formData, setFormData] = useState(initialUserForm);
  const [formErrors, setFormErrors] = useState({});

  // State de user sélectionné pour édition/suppression
  const [selectedUser, setSelectedUser] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  const loadAdvisors = useCallback(
    async (page = currentPage, search = activeSearch) => {
      setIsLoading(true);
      try {
        const data = await getUsersFilteredByRole("ADVISOR", {
          page,
          limit: ITEMS_PER_PAGE,
          name: search,
        });
        setUsers(data.users || []);
        setTotalUsers(data.total || 0);
      } catch (error) {
        console.error("Erreur lors du chargement des conseillers:", error);
        toast.error("Impossible de charger la liste des conseillers");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, activeSearch],
  );

  useEffect(() => {
    loadAdvisors(currentPage, activeSearch);
  }, [loadAdvisors, currentPage, activeSearch]);

  useEffect(() => {
    if (searchValue === "" && activeSearch !== "") {
      setCurrentPage(1);
      setActiveSearch("");
      return;
    }

    if (searchValue.length > 0 && searchValue.length < 3) {
      return;
    }

    const timeoutId = setTimeout(() => {
      if (searchValue.length >= 3 && searchValue !== activeSearch) {
        setCurrentPage(1);
        setActiveSearch(searchValue);
      }
    }, 500);

    // cleanup
    return () => clearTimeout(timeoutId);
  }, [searchValue, activeSearch]);

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
    if (!validateForm()) {
      return;
    }
    setIsSaving(true);
    try {
      const dataToSend = {
        ...formData,
        profile_picture_path: null, // TODO : Gérer le profile picture dans le back
        roleType: "ADVISOR",
        password: PASSWORD_SECRET,
        confirm_password: PASSWORD_SECRET,
      };
      await registerUser(dataToSend);
      await loadAdvisors();
      closeCreateModal();
      toast.success("Le conseiller a été créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      if (error.code === "P2002") {
        setFormErrors({ email: "Cet email est déjà utilisé" });
        return;
      }
      toast.error("Une erreur est survenue lors de la création du conseiller.");
    } finally {
      setIsSaving(false);
    }
  };

  // UPDATE
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      last_name: user.last_name || "",
      first_name: user.first_name || "",
      email: user.email || "",
      phone: user.phone || "",
      birth_date: user.birth_date ? new Date(user.birth_date) : "",
      // TODO : Gérer le profile picture dans le back
      profile_picture_path: user.profile_picture_path || null,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      console.log("Validation échouée", formErrors);
      return;
    }

    setIsSaving(true);
    try {
      await updateUser(selectedUser.user_id, formData);
      await loadAdvisors();
      closeEditModal();
      toast.success("Le conseiller a été modifié avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      if (error.code === "P2002") {
        setFormErrors({ email: "Cet email est déjà utilisé" });
        return;
      }
      toast.error(
        "Une erreur est survenue lors de la modification du conseiller.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await deleteUser(selectedUser.user_id);
      closeDeleteModal();
      // Si on est sur la dernière page et qu'il ne reste qu'un seul utilisateur on retourne à la page précédente
      const newTotal = totalUsers - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else {
        await loadAdvisors(currentPage, searchValue);
      }

      toast.success("Le conseiller a été supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error(
        "Une erreur est survenue lors de la suppression du conseiller.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                <span className="font-semibold text-lg ml-5 text-gray-600">
                  {totalUsers}
                </span>
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
                    placeholder="Rechercher par nom..."
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Page {currentPage} sur {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    text="Précédent"
                    color="brandBlue"
                    size="md"
                    variant="outline"
                    radiusSize="sm"
                    width="full"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    logo={<ChevronLeft size={20} />}
                  />
                  <Button
                    text="Suivant"
                    color="brandBlue"
                    size="md"
                    variant={currentPage === totalPages ? "outline" : "full"}
                    radiusSize="sm"
                    width="full"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    logo={<ChevronRight size={20} />}
                    logoBeforeText={false}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
