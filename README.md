# Choice TechLab Employee Dashboard

A React + Vite admin dashboard for managing employees. The app includes authentication, employee listing with search/filter/sort, employee detail view, and a form to add new employees locally.

## Key Features

- Admin login with hard-coded credentials
- Protected dashboard routes using client-side auth
- Employee list with:
  - Search by name or email
  - Department filter
  - Sort by name ascending/descending
  - Pagination
- View detailed employee profile
- Add new employee form
- Local caching in `localStorage`
- Remote employee fetch from `https://dummyjson.com/users`

## Tech Stack

- React 19
- Vite
- React Router DOM v7
- Tailwind CSS v4
- ESLint

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open the local URL shown in the terminal to view the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Authentication

The login page accepts the following admin credentials:

- Email: `admin@test.com`
- Password: `Admin@123`

Successful login stores `isAuthenticated=true` in `localStorage` and grants access to protected routes.

## App Routes

- `/` - Login page
- `/employees` - Employee dashboard (protected)
- `/employee/:id` - Employee detail page (protected)
- `/employee/add` - Add employee form (protected)
- `*` - Not found page

## Data Flow

- `src/hooks/useEmployees.js` loads employee data from `localStorage` first.
- If no stored employees exist, it fetches from the remote API via `src/services/employeeApi.js`.
- Fetched users are augmented with a computed status using `src/utils/EmployeeHelpers.js`.
- New employees created via `AddEmployee.jsx` are saved to `localStorage`.
- The details page loads fresh employee data from the remote API by ID.

## Project Structure

- `src/main.jsx` - React entry point with `BrowserRouter`
- `src/App.jsx` - Route definitions and protected route wrappers
- `src/pages/Login.jsx` - Login form and validation
- `src/pages/Employees.jsx` - Employee list, filters, sorting, pagination
- `src/pages/EmployeeDetails.jsx` - Employee profile page
- `src/pages/AddEmployee.jsx` - New employee form
- `src/components/ProtectedRoute.jsx` - Client-side route guard
- `src/components/Employees/Header.jsx` - Dashboard header with add/logout actions
- `src/components/Employees/EmployeeTable.jsx` - Table layout for employee rows
- `src/components/Employees/EmployeeRow.jsx` - Single employee row with view button
- `src/hooks/useEmployees.js` - Data loading and local cache management
- `src/services/employeeApi.js` - API helper functions
- `src/utils/EmployeeHelpers.js` - Status generation and badge styling helpers

## Troubleshooting

- If employee data does not load, check network access to `https://dummyjson.com/users`.
- If login fails, confirm you are using the admin credentials above.
- To reset the app, clear `localStorage` for the site in your browser.
