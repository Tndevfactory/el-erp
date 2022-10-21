import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

const GuestPath = () => {
  const auth = true;

  const location = useLocation();

  return !auth ? (
    <Outlet />
  ) : (
    <Navigate to="home" state={{ from: location }} replace />
  );
};

export default GuestPath;
