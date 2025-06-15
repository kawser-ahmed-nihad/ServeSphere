import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); 
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
