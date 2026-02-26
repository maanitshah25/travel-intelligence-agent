import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MonitorCard from "../components/monitorcard";
import { listProfiles, runProfileNow } from "../api/monitoring";
import type { MonitoringProfile } from "../types/monitoring";

export default function Dashboard() {
  const [profiles, setProfiles] = useState<MonitoringProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const data = await listProfiles();
      setProfiles(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onRun(id: string) {
    setMsg(null);
    const { job_id } = await runProfileNow(id);
    setMsg(`Triggered job: ${job_id}`);
  }

  return (
    <Layout>
      <h3>Monitoring Profiles</h3>
      {msg && <div style={{ padding: 12, background: "#f5f5f5", borderRadius: 8 }}>{msg}</div>}
      {loading ? (
        <p>Loading…</p>
      ) : profiles.length === 0 ? (
        <p>No profiles yet. Create one in “New Monitor”.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {profiles.map((p) => (
            <MonitorCard key={p.id} profile={p} onRun={onRun} />
          ))}
        </div>
      )}
    </Layout>
  );
}