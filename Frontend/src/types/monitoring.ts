export type MonitorType = "flight" | "hotel";

export interface MonitoringProfile {
  id: string;
  type: MonitorType;
  name: string;

  // flight fields
  origin?: string;
  destination?: string;
  depart_date?: string;   // YYYY-MM-DD
  return_date?: string;   // YYYY-MM-DD | undefined

  // hotel fields
  city?: string;
  checkin_date?: string;
  checkout_date?: string;

  // common
  currency: string;       // e.g. USD
  alert_drop_percent: number; // e.g. 8
  providers: string[];    // e.g. ["expedia", "makemytrip"]
  created_at: string;
}

export interface CreateMonitoringProfileRequest {
  type: MonitorType;
  name: string;
  origin?: string;
  destination?: string;
  depart_date?: string;
  return_date?: string;

  city?: string;
  checkin_date?: string;
  checkout_date?: string;

  currency: string;
  alert_drop_percent: number;
  providers: string[];
}