import Button from "@/components/ui//Button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { deleteWorkshop, getWorkshops } from "@/utils/api";
import { toast } from "react-toastify";
import WorkshopTable from "@/components/table/WorkshopTable";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 5;

export default function WorkshopListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // La recherche réellement appliquée
  const [workshops, setWorkshops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // States pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWorkshops, setTotalWorkshops] = useState(0);
  const totalPages = Math.ceil(totalWorkshops / ITEMS_PER_PAGE);

  const loadWorkshops = useCallback(
    async (page = currentPage, search = activeSearch) => {
      setIsLoading(true);
      try {
        const data = await getWorkshops({
          page,
          limit: ITEMS_PER_PAGE,
          name: search != "" ? search : undefined,
        });
        setWorkshops(data.workshops || []);
        setTotalWorkshops(data.total || 0);
      } catch (error) {
        console.error("Erreur lors du chargement des ateliers:", error);
        toast.error("Impossible de charger la liste des ateliers");
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, activeSearch],
  );

  useEffect(
    () => loadWorkshops(currentPage, activeSearch),
    [loadWorkshops, currentPage, activeSearch],
  );

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

  // DELETE
  const handleDelete = async (workshop) => {
    try {
      await deleteWorkshop(workshop.workshop_id);
      closeDeleteModal();
      // Si on est sur la dernière page et qu'il ne reste qu'un seul atelier on retourne à la page précédente
      const newTotal = totalWorkshops - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else {
        await loadWorkshops(currentPage, searchValue);
      }

      toast.success("L'atelier a été supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error(
        "Une erreur est survenue lors de la suppression de l'atelier.",
      );
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
    <div className="col-span-full row-span-full border-2 border-gray-300 rounded-2xl px-6 py-4">
      <h2 className="font-bold text-2xl mb-1">Liste des ateliers</h2>
      <p className="font-base text-sm text-gray-600 mb-12">
        Créer et éditer les ateliers sur cette page.
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">Chargement des ateliers...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">
              Liste de tous les ateliers
              <span className="font-semibold text-lg ml-5 text-gray-600">
                {totalWorkshops}
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
                text="Créer un atelier"
                color="brandBlue"
                size="md"
                variant="full"
                radiusSize="sm"
                width="full"
                onClick={() => navigate("/dashboard/admin/workshops/add")}
                logo={<Plus size={20} />}
              />
            </div>
          </div>
          <WorkshopTable workshops={workshops} onDelete={handleDelete} />

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
  );
}
