import React, { useEffect, useState } from "react";
import { IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
const CounterDashboard = () => {
  const [counterTicket, setCounterTicket] = useState(0);
  const [counterUsedTicket, setCounterUsedTicket] = useState(0);
  const [newTicket, setNewTicket] = useState(0);
  const [usedTicket, setUsedTicket] = useState(0);
  const [counterUnUsed, setCounterUnUsed] = useState(0);
  useEffect(() => {
    fetch("https://e-ticket-server-pi.vercel.app/totalCounter/unUsed")
      .then((res) => res.json())
      .then((data) => setCounterUnUsed(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalCounter/used")
      .then((res) => res.json())
      .then((data) => setCounterUsedTicket(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalCounter")
      .then((res) => res.json())
      .then((data) => setCounterTicket(data));
  }, []);
  return (
    <div className="my-10 mx-5 grid justify-center md:grid-cols-4  gap-4">
      <div className="card bg-green-500 text-primary-content w-96">
        <div className="card-body">
          <Link to={"/counterNewTickets"}>
            <h2 className="card-title text-2xl flex justify-between">
              নতুন টিকিট {counterUnUsed}
              <IoTicket></IoTicket>
            </h2>
          </Link>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-orange-500 text-primary-content w-96">
        <div className="card-body">
          <Link to={"/onlineTickets"}>
            <h2 className="card-title text-2xl flex justify-between">
              ব্যবহৃত টিকিট {counterUsedTicket}
              <IoTicket></IoTicket>
            </h2>
          </Link>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-red-500 text-primary-content w-96">
        <div className="card-body">
          <Link to={"/newTickets"}>
            <h2 className="card-title flex justify-between text-2xl">
              মোট টিকিট {counterTicket} <IoTicket></IoTicket>
            </h2>
          </Link>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default CounterDashboard;
