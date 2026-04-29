import WorkshopLine from "./WorkshopLine";

export default function WorkshopTable({ workshops, onDelete }) {
  const now = new Date();

  return (
    <div className="w-full">
      {/* Tableau */}
      <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Titre de l'atelier
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Dernière occurrence
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Prochaine occurrence
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Date de création
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {workshops.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Aucun atelier trouvé
                  </td>
                </tr>
              ) : (
                workshops.map((workshop) => (
                  <WorkshopLine
                    workshop={workshop}
                    onDelete={() => onDelete(workshop)}
                    key={workshop.workshop_id}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
