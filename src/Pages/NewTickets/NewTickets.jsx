import React, { useEffect, useState } from "react";
import Navbar from "../../Shared/Navbar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NewTickets = () => {
  const [unusedTicketCount, setUnusedTicketCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("https://e-ticket-server-pi.vercel.app/totalUnUsedTickets")
      .then((res) => res.json())
      .then((data) => setUnusedTicketCount(data));

    fetch("https://e-ticket-server-pi.vercel.app/tickets")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((t) => t.status === "unused");
        setTickets(filtered);
        setFilteredTickets(filtered);
      });
  }, []);

  // ✅ Filter function
  const handleFilter = () => {
    let filtered = tickets;

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
    setFilteredTickets(tickets);
  };

  // ✅ Generate PDF report
  const handlePrintPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFontSize(18);
    doc.text("New (Unused) Ticket Report", 40, 40);

    doc.setFontSize(12);
    doc.text(`Total Unused Tickets: ${filteredTickets.length}`, 40, 60);
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
      headStyles: { fillColor: [76, 175, 80], textColor: 255 },
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

    doc.save("Unused_Ticket_Report.pdf");
  };

  return (
    <div>
      <Navbar />
      <h2 className="my-10 text-3xl text-center font-semibold">
        Total New Tickets {unusedTicketCount}
      </h2>

      {/* 🔍 Search and Filter Controls */}
      <div className="flex flex-wrap justify-center items-end gap-4 mb-8 px-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Search by Ticket ID
          </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="input input-bordered w-64"
            placeholder="Enter Ticket ID..."
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="input input-bordered"
          />
        </div>

        <button
          onClick={handleFilter}
          className="btn btn-primary h-fit px-6 py-2 text-white"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="btn btn-ghost h-fit px-6 py-2 border"
        >
          Reset
        </button>

        <button
          onClick={handlePrintPDF}
          className="btn btn-success h-fit px-6 py-2 text-white"
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
                <td colSpan="4" className="py-4 text-gray-500">
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

export default NewTickets;
