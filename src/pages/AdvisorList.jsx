import Button from "@/components/ui//Button";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import UserTable from "@/components/UserTable";

const users = [
  {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    assignedCount: 15,
    createdAt: "2023-01-15",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Marie Curie",
    email: "marie.curie@example.com",
    phone: "06 87 65 43 21",
    assignedCount: 20,
    createdAt: "2023-02-20",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

export default function AdvisorList() {
  const [value, setValue] = useState("");
  const userTableRef = useRef(null);

  function handleAddAdvisor() {
    // Ouvre la modal de création du UserTable
    if (userTableRef.current) {
      userTableRef.current.openCreateModal();
    }
  }

  function handleChange(event) {
    setValue(event.target.value);
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

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            Liste de tous les conseillers
            <span className="font-semibold text-lg ml-5 text-gray-600">{users.length}</span>
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
                value={value}
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
              onClick={handleAddAdvisor}
              logo={<Plus size={20} />}
            />
          </div>
        </div>
      <UserTable
        ref={userTableRef}
        users={users}
      />
      </div>
    </>
  );
}
