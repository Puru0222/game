import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { email } = useSelector((state) => state.auth);
  if (email !== "purusho1428@gmail.com") {
    return <Navigate to="/dashboard/join" />;
  }
  return children;
};

export default AdminRoute;
