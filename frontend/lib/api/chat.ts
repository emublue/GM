import { getApiBaseUrl } from "@/lib/api/config";
import type { ChatRequest, ChatResponse } from "@/lib/types/api";

export async function postChatTurn(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${getApiBaseUrl()}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to post chat turn: ${response.status}`);
  }

  return (await response.json()) as ChatResponse;
}
