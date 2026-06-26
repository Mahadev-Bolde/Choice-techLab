import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />}></Route>

        {/* Admin Dashboard(All Employees) */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }></Route>

        {/* Employee with perticular id */}
        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }></Route>

        {/* add employee form */}
        <Route
          path="/employee/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }></Route>

        {/* if any route not matches show this not found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
