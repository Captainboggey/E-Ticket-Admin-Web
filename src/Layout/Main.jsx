import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeader =
    location.pathname.includes("/register") ||
    location.pathname.includes("/login");
  return (
    <div>
      {noHeader || <Navbar></Navbar>}
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
