import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy loading for load files when needed.
const Login = lazy(() => import("./pages/Login"));
const Employees = lazy(() => import("./pages/Employees"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const NotFound = lazy(() => import("./components/NotFound"));
const EmployeeDetails = lazy(() => import("./pages/EmployeeDetails"));
const AddEmployee = lazy(() => import("./pages/AddEmployee"));
const Loader = lazy(() => import("./components/Loader"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </div>
  );
};

export default App;
