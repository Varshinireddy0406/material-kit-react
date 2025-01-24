import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import StudentsPage from './pages/Studentspage';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'students', element: <StudentsPage /> },
        { path: 'logout', element: <Navigate to="/login" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/students" replace /> },
  ]);
}
