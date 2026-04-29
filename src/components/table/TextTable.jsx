export default function TextTable({ label, lines }) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/80 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                {label}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {lines.map((line) => (
              <tr
                key={line}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4 font-bold text-gray-900 text-sm capitalize">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
