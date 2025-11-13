import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
