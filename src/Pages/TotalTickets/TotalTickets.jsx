import React, { useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TotalTickets = () => {
  const [counterTicket, setCounterTicket] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("https://e-ticket-server-pi.vercel.app/totalTickets")
      .then((res) => res.json())
      .then((data) => setCounterTicket(data));

    fetch("https://e-ticket-server-pi.vercel.app/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setFilteredTickets(data);
      });
  }, []);

  // ✅ Filter function (by ID and date)
  const handleFilter = () => {
    let filtered = ticket;

    if (searchId.trim() !== "") {
      filtered = filtered.filter((t) =>
        t._id.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter((t) => {
        const ticketDate = new Date(t.date);
        return ticketDate >= from && ticketDate <= to;
      });
    }

    setFilteredTickets(filtered);
  };

  // ✅ Reset filters
  const handleReset = () => {
    setSearchId("");
    setFromDate("");
    setToDate("");
    setFilteredTickets(ticket);
  };

  // ✅ Generate and download PDF
  const handlePrintPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFontSize(18);
    doc.text("E-Ticket Summary Report", 40, 40);

    doc.setFontSize(12);
    doc.text(`Total New Tickets: ${filteredTickets.length}`, 40, 60);
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 40, 80);

    const tableColumn = ["ID", "Nationality", "Date", "Amount"];
    const tableRows = filteredTickets.map((item) => [
      item._id,
      item.nationality,
      item.date,
      item.totalAmount,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fillColor: [33, 150, 243], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 70,
        doc.internal.pageSize.getHeight() - 30
      );
    }

    doc.save("E-Ticket_Report.pdf");
  };

  return (
    <div>
      <Navbar />

      <h2 className="my-10 text-3xl text-center font-semibold">
        Total New Tickets {counterTicket}
      </h2>

      {/* 🔍 Search + Filter Section */}
      <div className="flex flex-wrap justify-center items-end gap-4 mb-8 px-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Search by Ticket ID
          </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="input rounded-lg border-2 p-2 input-bordered w-64"
            placeholder="Enter Ticket ID..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">From Date</label>
          <input
            type="date"
            placeholder="Start Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="input input-bordered rounded-lg border-2 p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm  font-medium mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="input rounded-lg border-2 p-2 input-bordered"
          />
        </div>

        <button
          onClick={handleFilter}
          className="btn btn-primary bg-green-500 text-white h-fit px-6 py-2 rounded-lg "
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="btn btn-primary bg-green-500 text-white h-fit px-6 py-2 border rounded-lg"
        >
          Reset
        </button>

        <button
          onClick={handlePrintPDF}
          className="btn btn-success bg-green-500 h-fit px-6 py-2 text-white"
        >
          Print PDF
        </button>
      </div>

      {/* 🧾 Tickets Table */}
      <div className="overflow-x-auto px-5">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nationality</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((t) => (
                <tr key={t._id}>
                  <td>{t._id}</td>
                  <td>{t.nationality}</td>
                  <td>{t.date}</td>
                  <td>{t.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalTickets;
