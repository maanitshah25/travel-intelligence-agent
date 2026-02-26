import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import { createProfile } from "../api/monitoring";
import type { CreateMonitoringProfileRequest, MonitorType } from "../types/monitoring";

export default function NewMonitor() {
  const nav = useNavigate();
  const [type, setType] = useState<MonitorType>("flight");

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("SFO");
  const [destination, setDestination] = useState("JFK");
  const [departDate, setDepartDate] = useState("2026-03-20");
  const [returnDate, setReturnDate] = useState("");

  const [city, setCity] = useState("New York");
  const [checkinDate, setCheckinDate] = useState("2026-03-20");
  const [checkoutDate, setCheckoutDate] = useState("2026-03-24");

  const [currency, setCurrency] = useState("USD");
  const [alertDropPercent, setAlertDropPercent] = useState(8);
  const [providers, setProviders] = useState("expedia,makemytrip");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: CreateMonitoringProfileRequest = {
      type,
      name,
      currency,
      alert_drop_percent: Number(alertDropPercent),
      providers: providers.split(",").map(s => s.trim()).filter(Boolean),
      ...(type === "flight"
        ? { origin, destination, depart_date: departDate, return_date: returnDate || undefined }
        : { city, checkin_date: checkinDate, checkout_date: checkoutDate }),
    };

    await createProfile(payload);
    nav("/");
  }

  return (
    <Layout>
      <h3>Create Monitoring Profile</h3>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value as MonitorType)}>
            <option value="flight">Flight</option>
            <option value="hotel">Hotel</option>
          </select>
        </label>

        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., SFO→JFK price watcher" required />
        </label>

        {type === "flight" ? (
          <>
            <label>Origin <input value={origin} onChange={(e) => setOrigin(e.target.value)} /></label>
            <label>Destination <input value={destination} onChange={(e) => setDestination(e.target.value)} /></label>
            <label>Depart date <input value={departDate} onChange={(e) => setDepartDate(e.target.value)} /></label>
            <label>Return date (optional) <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /></label>
          </>
        ) : (
          <>
            <label>City <input value={city} onChange={(e) => setCity(e.target.value)} /></label>
            <label>Check-in <input value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} /></label>
            <label>Check-out <input value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} /></label>
          </>
        )}

        <label>
          Currency
          <input value={currency} onChange={(e) => setCurrency(e.target.value)} />
        </label>

        <label>
          Alert drop percent
          <input type="number" value={alertDropPercent} onChange={(e) => setAlertDropPercent(Number(e.target.value))} />
        </label>

        <label>
          Providers (comma-separated)
          <input value={providers} onChange={(e) => setProviders(e.target.value)} />
        </label>

        <button type="submit">Create</button>
      </form>
    </Layout>
  );
}