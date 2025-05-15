
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';







const ProtectedRoute = ({ children }:any) => {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
