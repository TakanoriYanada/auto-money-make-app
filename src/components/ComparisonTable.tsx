interface ComparisonTableRow {
  label: string;
  valueA: string;
  valueB: string;
  highlight?: "a" | "b" | "none";
}

interface ComparisonTableProps {
  nameA: string;
  nameB: string;
  rows: ComparisonTableRow[];
  className?: string;
}

export default function ComparisonTable({
  nameA,
  nameB,
  rows,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={`overflow-x-auto -mx-4 sm:mx-0 ${className}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border border-gray-200 sm:rounded-xl">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900 sm:px-6"
                >
                  項目
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-center text-sm font-semibold text-gray-900 sm:px-6 bg-green-50"
                >
                  {nameA}
                </th>
                <th
                  scope="col"
                  className="py-3.5 px-4 text-center text-sm font-semibold text-gray-900 sm:px-6 bg-blue-50"
                >
                  {nameB}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3.5 px-4 text-sm font-medium text-gray-700 sm:px-6 whitespace-nowrap">
                    {row.label}
                  </td>
                  <td
                    className={`py-3.5 px-4 text-sm text-center sm:px-6 ${
                      row.highlight === "a"
                        ? "bg-green-100 font-semibold text-green-900"
                        : "text-gray-600"
                    }`}
                  >
                    {row.valueA}
                  </td>
                  <td
                    className={`py-3.5 px-4 text-sm text-center sm:px-6 ${
                      row.highlight === "b"
                        ? "bg-blue-100 font-semibold text-blue-900"
                        : "text-gray-600"
                    }`}
                  >
                    {row.valueB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
