import React from "react";
import { getStatusBadgeClass } from "../../utils/EmployeeHelpers";

const EmployeeRow = ({ employee, onView }) => {
  const { id, firstName, lastName, email, company, status } = employee;

  return (
    <tr className="hover:bg-blue-50/50 transition-colors duration-150 group">
      {/* ID - hide on small screens */}
      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-mono text-gray-500 hidden sm:table-cell">
        #{String(id).padStart(4, "0")}
      </td>
      {/* Name */}
      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium text-gray-800">
        {firstName} {lastName}
      </td>
      {/* Email - hide on extra small */}
      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600  xs:table-cell">
        <a
          href={`mailto:${email}`}
          className="hover:text-blue-600 hover:underline transition">
          {email}
        </a>
      </td>
      {/* Department */}
      <td className="px-2 md:px-4 py-2 md:py-3">
        <span className="inline-flex px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          {company?.department || "Unassigned"}
        </span>
      </td>
      {/* Designation - hide on small screens */}
      <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-gray-600 hidden md:table-cell">
        {company?.title || "N/A"}
      </td>
      {/* Status */}
      <td className="px-2 md:px-4 py-2 md:py-3">
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(status)}`}>
          {status}
        </span>
      </td>
      <td className="px-2 md:px-4 py-2 md:py-3">
        <button
          onClick={() => onView(id)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          View
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
