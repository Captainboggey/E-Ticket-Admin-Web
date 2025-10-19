import React, { useEffect, useState } from "react";
import { IoTicket } from "react-icons/io5";
import { Link } from "react-router-dom";
const SuperDashboard = () => {
  const [counterTicket, setCounterTicket] = useState(0);
  const [onlineTicket, setOnlineTicket] = useState(0);
  const [newTicket, setNewTicket] = useState(0);
  const [usedTicket, setUsedTicket] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  useEffect(() => {
    fetch("https://e-ticket-server-pi.vercel.app/totalTickets")
      .then((res) => res.json())
      .then((data) => setTotalTicket(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalCounter")
      .then((res) => res.json())
      .then((data) => setCounterTicket(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalUsedTickets")
      .then((res) => res.json())
      .then((data) => setUsedTicket(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalUnUsedTickets")
      .then((res) => res.json())
      .then((data) => setNewTicket(data));
    fetch("https://e-ticket-server-pi.vercel.app/totalOnlineTickets")
      .then((res) => res.json())
      .then((data) => setOnlineTicket(data));
  }, []);
  return (
    <div className="my-10 mx-5 grid md:grid-cols-4 gap-4">
      <div className="card bg-green-500 text-primary-content w-96">
        <div className="card-body">
          <Link to={'/counterTickets'}>
            <h2 className="card-title text-2xl flex justify-between">
              Counter Ticket {counterTicket}
              <IoTicket></IoTicket>
            </h2>
          </Link>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-orange-500 text-primary-content w-96">
        <div className="card-body">
          <Link to={'/onlineTickets'}><h2 className="card-title text-2xl flex justify-between">
            Online Ticket {onlineTicket}
            <IoTicket></IoTicket>
          </h2></Link>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-red-500 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-between text-2xl">
            New Ticket {newTicket} <IoTicket></IoTicket>
          </h2>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-pink-500 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-between text-2xl">
            Used Ticket {usedTicket}
            <IoTicket></IoTicket>
          </h2>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-between text-2xl">
            Total Ticket {totalTicket} <IoTicket></IoTicket>
          </h2>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default SuperDashboard;
