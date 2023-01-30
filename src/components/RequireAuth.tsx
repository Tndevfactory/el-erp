import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const auth = true;
  const role = ["admin"];
  const location = useLocation();

   // appel backend pour avoir un retour concernant les droits d'acces


  return localStorage.getItem("token")? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
};

export default RequireAuth;
