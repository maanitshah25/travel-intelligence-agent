import { api } from "./client";
import type { MonitoringProfile, CreateMonitoringProfileRequest } from "../types/monitoring";

export async function listProfiles(): Promise<MonitoringProfile[]> {
  const res = await api.get("/monitoring/profiles");
  return res.data;
}

export async function createProfile(payload: CreateMonitoringProfileRequest): Promise<MonitoringProfile> {
  const res = await api.post("/monitoring/profiles", payload);
  return res.data;
}

export async function runProfileNow(profileId: string): Promise<{ job_id: string }> {
  const res = await api.post(`/monitoring/profiles/${profileId}/run`);
  return res.data;
}