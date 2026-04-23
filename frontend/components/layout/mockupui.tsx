"use client";

import { useState } from "react";
import { postChatTurn } from "@/lib/api/chat";
import type { SessionScreenResponse } from "@/lib/types/api";
import type { ChatMessage } from "@/lib/types/mythos";
import type { SessionScreenUIModel } from "@/lib/mappers/mythos";
import { mapSessionScreenResponseToUI } from "@/lib/mappers/mythos";
import { MythosCharacterSheet } from "../cards/mythos-character-sheet";
import { MythosInfoPanels } from "../cards/mythos-info-panels";
import { MythosChatPanel } from "../chat/mythos-chat-panel";
import { MythosSidebar } from "../sidebar/mythos-sidebar";
import { MythosTopbar } from "../topbar/mythos-topbar";

type MythosGMUIMockupProps = {
  campaignId: string;
  screen: SessionScreenResponse;
};

function mergeChatMessages(existing: ChatMessage[], incoming: ChatMessage[]) {
  const knownIds = new Set(existing.map((message) => message.id));
  const appendedMessages = incoming.filter((message) => !knownIds.has(message.id));
  return [...existing, ...appendedMessages];
}

export default function MythosGMUIMockup({ campaignId, screen: initialScreen }: MythosGMUIMockupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screen, setScreen] = useState<SessionScreenUIModel>(() =>
    mapSessionScreenResponseToUI(initialScreen),
  );

  function handleChatSubmit({
    playerInput,
    selectedAction,
  }: {
    playerInput: string;
    selectedAction?: string;
  }) {
    if (isSubmitting) return;

    setIsSubmitting(true);

    void postChatTurn({
      campaignId,
      playerInput,
      selectedAction,
    })
      .then((response) => {
        const nextScreen = mapSessionScreenResponseToUI(response.screen);
        setScreen((currentScreen) => ({
          ...nextScreen,
          chat: {
            ...nextScreen.chat,
            messages: mergeChatMessages(currentScreen.chat.messages, nextScreen.chat.messages),
          },
        }));
      })
      .catch((error) => {
        console.error("Failed to submit chat turn", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_24%),linear-gradient(180deg,#06070d_0%,#05070d_100%)]">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative grid min-h-screen grid-cols-[224px_1fr]">
          <MythosSidebar
            navItems={screen.sidebar.navItems}
            worldOverviewStats={screen.sidebar.worldOverview}
          />

          <main className="grid min-h-screen grid-rows-[96px_1fr]">
            <MythosTopbar
              campaign={screen.topbar.campaign}
              player={screen.topbar.playerProfile}
              date={screen.topbar.dateDisplay}
            />

            <section className="space-y-6 px-6 py-6">
              <div className="flex min-h-0 items-stretch gap-6">
                <div className="min-w-0 flex-[1.55]">
                  <MythosChatPanel
                    messages={screen.chat.messages}
                    quickActions={screen.chat.quickActions}
                    isSubmitting={isSubmitting}
                    onSubmit={handleChatSubmit}
                  />
                </div>
                <MythosCharacterSheet character={screen.characterSheet} />
              </div>

              <MythosInfoPanels
                location={screen.infoPanels.location}
                journal={screen.infoPanels.journal}
                npc={screen.infoPanels.npcInFocus}
                events={screen.infoPanels.recentEvents}
                relationships={screen.infoPanels.relationships.nodes}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
