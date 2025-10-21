import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Navbar from "../../Shared/Navbar";

export default function CounterCreateTicket() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      mobile: "",
      nationality: "Bangladeshi",
    },
  });

  const [date, setDate] = useState(new Date());
  const [tickets, setTickets] = useState({
    child: 0,
    primary: 0,
    secondary: 0,
    foreignSAARC: 0,
    studentGroup1: 0,
    studentGroup2: 0,
  });

  const ticketPrices = {
    child: 0,
    primary: 0,
    secondary: 10,
    foreignSAARC: 500,
    studentGroup1: 1500,
    studentGroup2: 2000,
  };

  const increase = (type) => {
    setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrease = (type) => {
    setTickets((prev) =>
      prev[type] > 0 ? { ...prev, [type]: prev[type] - 1 } : prev
    );
  };

  const getTotal = () => {
    return Object.keys(tickets).reduce(
      (sum, key) => sum + tickets[key] * ticketPrices[key],
      0
    );
  };

  useEffect(() => {
    const syncOfflineTickets = async () => {
      const offlineTickets = JSON.parse(
        localStorage.getItem("offlineTickets") || "[]"
      );
      if (offlineTickets.length && navigator.onLine) {
        for (let t of offlineTickets) {
          try {
            await fetch("https://e-ticket-server-pi.vercel.app/tickets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(t),
            });
          } catch (err) {
            console.error("Offline ticket sync failed:", err);
          }
        }
        localStorage.removeItem("offlineTickets");
        alert(" Offline tickets synced successfully!");
      }
    };

    window.addEventListener("online", syncOfflineTickets);
    return () => window.removeEventListener("online", syncOfflineTickets);
  }, []);

  const onSubmit = async (data) => {
    const info = {
      nationality: data.nationality,
      date: date,
      status: "unused",
      ticketType: "counter",
      totalAmount: getTotal(),
    };

    if (navigator.onLine) {
      try {
        const res = await fetch(
          "https://e-ticket-server-pi.vercel.app/tickets",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
          }
        );
        const result = await res.json();

        if (result.insertedId) {
          alert(` Successfully booked online!\nTotal: ${getTotal()} টাকা`);
        }
      } catch (err) {
        alert("Error sending data. Storing offline instead.\n\n" + err.message);
        saveOffline(info);
      }
    } else {
      saveOffline(info);
    }

    reset();
    setTickets({
      child: 0,
      primary: 0,
      secondary: 0,
      foreignSAARC: 0,
      studentGroup1: 0,
      studentGroup2: 0,
    });
    setDate("");
  };

  const saveOffline = (ticketInfo) => {
    const offlineTickets = JSON.parse(
      localStorage.getItem("offlineTickets") || "[]"
    );
    offlineTickets.push(ticketInfo);
    localStorage.setItem("offlineTickets", JSON.stringify(offlineTickets));
    alert(` No internet. Ticket saved offline. Total: ${getTotal()} টাকা`);
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <label>জাতীয়তা:</label>
        <Controller
          control={control}
          name="nationality"
          render={({ field: { onChange, value } }) => (
            <select style={styles.input} value={value} onChange={onChange}>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="ForeignSAARC">Foreign SAARC</option>
              <option value="ForeignOther">Foreign Other</option>
            </select>
          )}
        />

        <label>দর্শন তারিখ ও সময়:</label>
        <input
          style={styles.input}
          type="date"
          placeholder={new Date()}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h3 style={styles.head2}>টিকিট সংখ্যা</h3>

        {[
          { key: "child", label: "শিশু (০-৫ বছর)" },
          { key: "primary", label: "অপ্রাপ্ত বয়স্ক (৬-১২ বছর)" },
          { key: "secondary", label: "প্রাপ্ত বয়স্ক (১২ বছরের ঊর্ধ্বে)" },
          { key: "foreignSAARC", label: "বিদেশী পর্যটক (SAARC)" },
          { key: "studentGroup1", label: "শিক্ষার্থী গ্রুপ (১-১০০ জন)" },
          { key: "studentGroup2", label: "শিক্ষার্থী গ্রুপ (১০১-২০০ জন)" },
        ].map((item) => (
          <div key={item.key} style={styles.ticketRow}>
            <span style={styles.ticketLabel}>{item.label}</span>
            <div style={styles.counter}>
              <button
                style={{ ...styles.counterButton, backgroundColor: "#ff6666" }}
                onClick={() => decrease(item.key)}
                type="button"
              >
                −
              </button>
              <span style={styles.ticketCount}>{tickets[item.key]}</span>
              <button
                style={{ ...styles.counterButton, backgroundColor: "#4CAF50" }}
                onClick={() => increase(item.key)}
                type="button"
              >
                +
              </button>
            </div>
            <span style={styles.ticketPrice}>
              {ticketPrices[item.key]} টাকা
            </span>
          </div>
        ))}

        <div style={styles.totalBox}>
          <strong style={styles.totalText}>মোট: {getTotal()} টাকা</strong>
        </div>

        <button style={styles.payBtn} onClick={handleSubmit(onSubmit)}>
          পেমেন্ট করুন
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "Noto Sans Bengali, sans-serif",
  },
  head2: { marginTop: "20px", fontSize: "20px", padding: "5px" },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  ticketRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "10px",
    margin: "8px 0",
  },
  ticketLabel: { flex: "1", fontSize: "15px", color: "#333" },
  counter: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "100px",
    justifyContent: "center",
  },
  counterButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
  ticketCount: {
    width: "30px",
    textAlign: "center",
    fontSize: "16px",
  },
  ticketPrice: { width: "80px", textAlign: "right", color: "#007bff" },
  totalBox: {
    background: "#e8f5e9",
    padding: "12px",
    borderRadius: "8px",
    marginTop: "15px",
    textAlign: "center",
  },
  totalText: { fontSize: "18px", color: "green" },
  payBtn: {
    background: "#008CBA",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    marginTop: "15px",
    width: "100%",
  },
};
