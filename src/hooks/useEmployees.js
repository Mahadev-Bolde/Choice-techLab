import { useState, useEffect } from "react";
import { fetchEmployees } from "../services/employeeApi";
import { getStatus } from "../utils/EmployeeHelpers";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        //  Check localStorage first
        const stored = localStorage.getItem("employees");
        if (stored) {
          const parsed = JSON.parse(stored);
          setEmployees(parsed);
          setLoading(false);
          return;
        }

        //  If no localStorage, fetch from API
        const data = await fetchEmployees();
        const users = data.users || data;
        const withStatus = users.map((user) => ({
          ...user,
          status: getStatus(user),
        }));
        setEmployees(withStatus);
        localStorage.setItem("employees", JSON.stringify(withStatus));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  //  Add a refresh function
  const refreshEmployees = () => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  };

  return { employees, loading, error, refreshEmployees };
};
