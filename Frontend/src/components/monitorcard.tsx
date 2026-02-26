import type { MonitoringProfile } from "../types/monitoring";

export default function MonitorCard({
  profile,
  onRun,
}: {
  profile: MonitoringProfile;
  onRun: (id: string) => void;
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>{profile.name}</div>
          <div style={{ opacity: 0.8 }}>
            {profile.type === "flight"
              ? `${profile.origin} → ${profile.destination} (${profile.depart_date}${profile.return_date ? ` to ${profile.return_date}` : ""})`
              : `${profile.city} (${profile.checkin_date} to ${profile.checkout_date})`}
          </div>
          <div style={{ opacity: 0.7, fontSize: 13, marginTop: 6 }}>
            Providers: {profile.providers.join(", ")} · Alert drop: {profile.alert_drop_percent}% · Currency: {profile.currency}
          </div>
        </div>
        <button onClick={() => onRun(profile.id)} style={{ height: 36 }}>
          Run now
        </button>
      </div>
    </div>
  );
}