import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import SuperDashboard from "./SuperDashboard";
import Navbar from "../../Shared/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    fetch(`https://e-ticket-server-pi.vercel.app/userName/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setLoggedUser(data?.role));
  }, [user?.email]);
  console.log(loggedUser);
  return (
    <div>
      <Navbar></Navbar>
      {loggedUser === "superAdmin" && <SuperDashboard></SuperDashboard>}
    </div>
  );
};

export default Dashboard;
