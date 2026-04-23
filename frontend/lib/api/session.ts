import type { SessionScreenResponse } from "@/lib/types/api";
import { getApiBaseUrl } from "@/lib/api/config";

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
