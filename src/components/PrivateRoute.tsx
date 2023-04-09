import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus();
  //   console.log("we are " + loggedIn, loading);
  if (loading) return <h1>Loading...</h1>;

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
