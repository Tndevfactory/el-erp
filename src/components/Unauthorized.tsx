import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  Link,
} from "react-router-dom";

function Unauthorized() {
  const location = useLocation();
  return (
    <div>
      <h1>Not authorized to access this area </h1>
      {/* <Navigate to="/" state={{ from: location }} replace /> */}
      <Link to="/">
        <a>Home</a>
      </Link>{" "}
    </div>
  );
}

export default Unauthorized;
