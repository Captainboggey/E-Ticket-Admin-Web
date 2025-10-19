import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { AuthContext } from "../Providers/AuthProvider";
import Register from "../Pages/Register/Register";

const Main = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const noHeader =
    location.pathname.includes("/register") ||
    location.pathname.includes("/login");
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
