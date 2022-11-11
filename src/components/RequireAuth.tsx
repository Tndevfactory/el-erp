import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const auth = true;
  const role = ["admin"];
  const location = useLocation();

   // appel backend pour avoir un retour concernant les droits d'acces


  return auth ? (
    role.find((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
