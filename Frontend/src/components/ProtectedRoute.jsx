import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  return children;
};

export default ProtectedRoute;
