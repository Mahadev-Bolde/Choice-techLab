import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated" === "true")) {
      navigate("/employees");
    }
  }, [navigate]);

  function handleInputChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (serverError) setServerError("");
  }

  function validate() {
    const newErrors = {};
    // email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter valid email address";
    }

    // password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setServerError("");

    setTimeout(() => {
      if (
        formData.email == "admin@test.com" &&
        formData.password == "Admin@123"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/employees");
      } else {
        setServerError("Invalid email or password. Please try again.");
        setFormData({ ...formData, password: "" });
      }
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 mt-1">Sign in to access the dashboard</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              type="email"
              placeholder="Enter Email.."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              type="password"
              placeholder="Enter Password.."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""} `}>
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
