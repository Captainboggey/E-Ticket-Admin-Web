import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  //   const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logOut();
  };

  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }
  if (user) {
    return children;
  }

  if (!user) {
    return <NavLink to={"/login"} state={{ from: location }} replace></NavLink>;
  }
};

export default PrivateRoute;
