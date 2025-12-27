import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// TypeScript: Define what props this component accepts
interface ProtectedRouteProps {
  children: ReactNode;      // The page we are trying to wrap (e.g., AdminDashboard)
  allowedRole: string;      // Who is allowed? "admin" or "owner"
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  // 1. Get the saved role from browser storage
  const currentUserRole = localStorage.getItem("userRole");

  // 2. Check if no one is logged in
  if (!currentUserRole) {
    return <Navigate to="/login" replace />;
  }

  // 3. Check if the logged-in user has the WRONG role (e.g., Owner trying to access Admin)
  if (currentUserRole !== allowedRole) {
    // Redirect them to their own correct page, or back to login
    return <Navigate to="/login" replace />; 
  }

  // 4. If all checks pass, show the secret page!
  return <>{children}</>;
};

export default ProtectedRoute;