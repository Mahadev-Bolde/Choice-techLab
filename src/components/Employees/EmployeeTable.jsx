import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({ employees, onViewEmployee }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
        <div className="text-4xl mb-2">📭</div>
        <p className="text-lg font-medium">No employees found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              {/* ID - hide on very small screens */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                ID
              </th>
              {/* Name - always visible */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              {/* Email - always visible */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider hidden xs:table-cell">
                Email
              </th>
              {/* Department - always visible */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </th>
              {/* Designation - hide on smaller screens */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Designation
              </th>
              {/* Status - always visible */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              {/* Action - always visible */}
              <th className="px-2 md:px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <EmployeeRow
                key={emp.id}
                employee={emp}
                onView={onViewEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
