import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    status: "Active",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Get existing employees from localStorage
    const stored = localStorage.getItem("employees");
    const existingEmployees = stored ? JSON.parse(stored) : [];

    // Create new employee
    const maxId = existingEmployees.reduce(
      (max, emp) => (emp.id > max ? emp.id : max),
      0,
    );
    const newEmployee = {
      id: maxId + 1,
      firstName: formData.fullName.split(" ")[0] || "",
      lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
      email: formData.email,
      company: {
        department: formData.department,
        title: formData.designation,
        name: "Local Company",
      },
      status: formData.status,
      phone: "",
      address: { address: "", city: "", state: "", postalCode: "" },
    };

    // Save to localStorage
    const updatedEmployees = [newEmployee, ...existingEmployees];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Navigate back to listing
    navigate("/employees");
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}>
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>

          {/* Designation */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.designation ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition">
              Add Employee
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
