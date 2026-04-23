import type { SessionScreenResponse } from "@/lib/types/api";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl() {
  return process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export async function fetchSessionScreen(campaignId: string): Promise<SessionScreenResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/ui/session/${encodeURIComponent(campaignId)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch session screen for ${campaignId}: ${response.status}`);
  }

  return (await response.json()) as SessionScreenResponse;
}
