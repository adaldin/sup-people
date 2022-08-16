import { useAuth } from "../context/AuthContext.js";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading</p>;
  if (!user)
    return (
      <Navigate to="/profile" replace>
        ProtectedRoute
      </Navigate>
    );

  return <>{children}</>;
}
export default ProtectedRoute;
