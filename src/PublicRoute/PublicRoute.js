import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/uesAuth";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/inbox"></Navigate>;
};

export default PublicRoute;
