import type { Employee } from '../types.js';

type EmployeeTableProps = {
  employees: Employee[];
};

const COLUMNS = ['First Name', 'Last Name', 'Role', 'Country', 'Department'];

export function EmployeeTable({ employees }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <p className="text-gray-500 text-sm p-4">No employees found.</p>
    );
  }

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
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b border-gray-100 even:bg-gray-50/50 hover:bg-gray-100/60">
              <td className="px-5 py-3">{emp.firstName}</td>
              <td className="px-5 py-3">{emp.lastName}</td>
              <td className="px-5 py-3">{emp.role}</td>
              <td className="px-5 py-3">{emp.country}</td>
              <td className="px-5 py-3">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
