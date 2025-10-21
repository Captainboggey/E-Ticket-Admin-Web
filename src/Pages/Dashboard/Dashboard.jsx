import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import SuperDashboard from "./SuperDashboard";
import Navbar from "../../Shared/Navbar";
import CounterDashboard from "./CounterDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    fetch(`https://e-ticket-server-pi.vercel.app/userName/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setLoggedUser(data?.role));
  }, [user?.email]);
 
  return (
    <div>
      <Navbar></Navbar>
      {(loggedUser === "superAdmin" && <SuperDashboard></SuperDashboard>) ||
        (loggedUser === "counter" && <CounterDashboard></CounterDashboard>)}
    </div>
  );
};

export default Dashboard;
