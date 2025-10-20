import React, { useContext } from "react";
import logo from "../../src/assets/register/icon.png";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <Link to={"/dashboard"}>
          <img src={logo} className="w-28" alt="" />
        </Link>
      </div>

      <div className="navbar-end">
        <a onClick={handleLogout} className="btn bg-red-600 text-white">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
