const COLUMNS = ['First Name', 'Last Name', 'Role', 'Country', 'Department'];

export function EmployeeTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
          <tr>
            {COLUMNS.map((col) => (
              <th key={col} className="px-5 py-3">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="animate-pulse">
          {Array.from({ length: 5 }, (_, i) => (
            <tr key={i} className="border-b border-gray-100">
              {COLUMNS.map((col) => (
                <td key={col} className="px-5 py-3">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
