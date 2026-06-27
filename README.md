# Choice TechLab Employee Dashboard

A React + Vite admin dashboard for managing employee records with authentication, search, filtering, sorting, pagination, and local persistence.

## Overview

This project is a small but complete employee management application built with React. It allows an admin to log in, view a list of employees, search and filter data, open employee details, and add new employees locally.

## Key Features

- Admin login with demo credentials
- Protected routes for authenticated users only
- Employee listing with:
  - Search by name or email
  - Department filtering
  - Sorting by name in ascending or descending order
  - Pagination
- Employee detail view
- Add employee form with validation
- Local storage support for persistence
- Remote data loading from DummyJSON
- Debounced search for smoother filtering performance

## Tech Stack

- React 19
- Vite
- React Router DOM v7
- Tailwind CSS v4
- ESLint

## Project Structure

```text
src/
  App.jsx                # App routing and lazy-loaded pages
  main.jsx               # Application entry point
  components/
    Loader.jsx
    NotFound.jsx
    ProtectedRoute.jsx
    Employees/
      EmployeeRow.jsx
      EmployeeTable.jsx
      Header.jsx
  hooks/
    useDebounce.js        # Custom debounce hook
    useEmployees.js       # Employee data loading logic
  pages/
    AddEmployee.jsx      # Form to add a new employee
    EmployeeDetails.jsx  # Employee profile page
    Employees.jsx        # Dashboard page with filters and pagination
    Login.jsx            # Admin login page
  services/
    employeeApi.js       # API helper functions
  utils/
    EmployeeHelpers.js   # Helper functions for status and UI formatting
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Authentication

Use the following demo credentials:

- Email: `admin@test.com`
- Password: `Admin@123`

After a successful login, the app stores `isAuthenticated=true` in `localStorage` and grants access to the protected routes.

## Application Routes

- `/` — Login page
- `/employees` — Employee dashboard (protected)
- `/employee/:id` — Employee detail page (protected)
- `/employee/add` — Add employee form (protected)
- `*` — Not found page

## Data Flow

- The app first checks `localStorage` for existing employee data.
- If no employees are stored, it fetches data from the DummyJSON API.
- The fetched employees are processed and prepared for display using the helper utilities.
- New employees added through the form are stored back in `localStorage` so they remain available on refresh.

## Performance Optimization

- Search input uses a debounce hook to reduce unnecessary re-renders and filtering operations.
- Expensive derived values such as department options and filtered results are memoized with `useMemo`.
- Routes are lazy-loaded to improve the initial load experience.

## Troubleshooting

- If employee data does not load, check your network connection to `https://dummyjson.com/users`.
- If login fails, verify that the demo credentials above are entered exactly.
- To reset the app, clear the site data for this app in your browser and refresh the page.
