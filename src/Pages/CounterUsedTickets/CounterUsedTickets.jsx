import React, { useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";

const CounterUsedTickets = () => {
  const [counterTicket, setCounterTicket] = useState(0);
  const [ticket, setTicket] = useState([]);
  useEffect(() => {
    fetch("https://e-ticket-server-pi.vercel.app/totalCounter/used")
      .then((res) => res.json())
      .then((data) => setCounterTicket(data));

    fetch("https://e-ticket-server-pi.vercel.app/tickets")
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, []);
  const modify = ticket.filter(
    (aTicket) => aTicket.ticketType === "counter" && aTicket.status === "used"
  );
  console.log(modify);
  return (
    <div>
      <Navbar></Navbar>
      <h2 className="my-10 text-3xl text-center">
        Used Tickets {counterTicket}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>

                <th>Nationality</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {modify.map((aFilter) => (
                <tr key={aFilter._id}>
                  <th>{aFilter._id}</th>

                  <td>{aFilter.nationality}</td>
                  <td>{aFilter.date}</td>
                  <td>{aFilter.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounterUsedTickets;
