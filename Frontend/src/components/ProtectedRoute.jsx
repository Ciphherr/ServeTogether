import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-screen">
        <BeatLoader color="#04BD64" size={15} />
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/authentication" replace />;
  }

  return children;
};

export default ProtectedRoute;
