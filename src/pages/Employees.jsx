import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Employees/Header";
import EmployeeTable from "../components/Employees/EmployeeTable";
import { useEmployees } from "../hooks/useEmployees";
import { useSearchParams } from "react-router-dom";

// debounce custom hook
import useDebounce from "../hooks/useDebounce";

const Employees = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { employees, loading, error } = useEmployees();

  const handleViewEmployee = (id) => {
    navigate(`/employee/${id}`);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Get unique departments
  const departments = useMemo(() => {
    const deptSet = new Set();
    employees.forEach((emp) => {
      deptSet.add(emp.company?.department || "Not Assigned");
    });
    return Array.from(deptSet).sort();
  }, [employees]);

  //  Filtere employees (search + department)
  const filteredEmployees = useMemo(() => {
    let result = employees;

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim();
      result = result.filter((emp) => {
        const fullName =
          `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase();
        const email = (emp.email || "").toLowerCase();
        return fullName.includes(query) || email.includes(query);
      });
    }

    // Department filter
    if (department) {
      result = result.filter(
        (emp) => (emp.company?.department || "Not Assigned") === department,
      );
    }

    // sort asc or desc
    result.sort((a, b) => {
      const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
      const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return result;
  }, [employees, debouncedSearch, department, sortOrder]);

  // Clear filters handler
  const clearFilters = () => {
    setSearch("");
    setDepartment("");
  };

  const total = 10; // 10 emp per page

  // calculate
  const totalPages = Math.ceil(filteredEmployees.length / total);
  //   start
  const startIndex = (currentPage - 1) * total;

  const paginatedEmployee = filteredEmployees.slice(
    startIndex,
    startIndex + total,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <Header
        title="Admin Dashboard"
        showAddButton={true}
        onAddClick={() => navigate("/employee/add")}
      />

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4">Employee List</h2>

        {/* Search + Filter + Clear */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <button
            onClick={toggleSort}
            className="px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-2 whitespace-nowrap">
            Sort by Name
            <span className="text-blue-600 font-bold">
              {sortOrder === "asc" ? " A–Z" : "Z–A"}
            </span>
          </button>

          {(search || department) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition whitespace-nowrap">
              ✕ Clear Filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-3">
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>

        {/* Employee Table */}
        <EmployeeTable
          employees={paginatedEmployee}
          onViewEmployee={handleViewEmployee}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-1">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded border transition ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}>
                ← Prev
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                if (pageNum < 1 || pageNum > totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded border transition ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}>
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded border transition ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
