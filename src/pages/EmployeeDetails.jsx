import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeesById } from "../services/employeeApi";

const EmployeeDetails = () => {
  // get id from parameter
  let { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        // fetch employee by id

        // First check localStorage
        const storedEmployees =
          JSON.parse(localStorage.getItem("employees")) || [];

        const localEmployee = storedEmployees.find(
          (emp) => emp.id === Number(id),
        );

        if (localEmployee) {
          setEmployee(localEmployee);
        } else {
          const data = await fetchEmployeesById(id);
          setEmployee(data);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            ← Back to Listing
          </button>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">👀</div>
          <h2 className="text-xl font-bold text-gray-800">
            Employee not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            ← Back to Listing
          </button>
        </div>
      </div>
    );
  }

  const { firstName, lastName, email, phone, address, company } = employee;

  // Format address
  const formattedAddress = address
    ? `${address.address || ""}, ${address.city || ""}, ${address.state || ""} ${address.postalCode || ""}`.trim()
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium">
          ← Back to Employees
        </button>

        {/* Employee Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with Name, Email, Status */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {firstName} {lastName}
                </h1>
                <p className="text-blue-100 mt-1">{email}</p>
              </div>
              {/* Status badge (we'll add this next) */}
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-blue-600">
                {employee.status || "Active"}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </label>
                  <p className="text-gray-800 mt-1">{phone || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </label>
                  <p className="text-gray-800 mt-1">{email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </label>
                  <p className="text-gray-800 mt-1">{formattedAddress}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </label>
                  <p className="text-gray-800 mt-1">{company?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </label>
                  <p className="text-gray-800 mt-1">
                    {company?.department || "Unassigned"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </label>
                  <p className="text-gray-800 mt-1">
                    {company?.title || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Employee ID */}
            <div className="pt-4 border-t border-gray-100">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </label>
              <p className="text-gray-800 mt-1 font-mono">
                #{String(employee.id).padStart(4, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
