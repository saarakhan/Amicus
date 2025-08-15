import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = UseAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
