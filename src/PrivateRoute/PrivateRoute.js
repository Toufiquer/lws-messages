import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/uesAuth";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
