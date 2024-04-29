import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoginContext } from "../../App";

function ProtectedRoute() {
  const [loggedIn] = useContext(LoginContext);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
