"use client";

import Image from "next/image";
import { useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";
import type { ChatMessage, QuickActionUI } from "@/lib/types/mythos";
import chatBackdrop from "../img/florian-elie-shot01-scaled.jpg";
import { DividerLabel, MessageCard, Panel } from "../layout/mythos-primitives";

type MythosChatPanelProps = {
  messages: ChatMessage[];
  quickActions: QuickActionUI[];
  isSubmitting?: boolean;
  onSubmit: (payload: { playerInput: string; selectedAction?: string }) => void;
};

export function MythosChatPanel({
  messages,
  quickActions,
  isSubmitting = false,
  onSubmit,
}: MythosChatPanelProps) {
  const [playerInput, setPlayerInput] = useState("");
  const [selectedAction, setSelectedAction] = useState<string | undefined>();

  function submitChat() {
    const trimmedInput = playerInput.trim();
    if (!trimmedInput || isSubmitting) return;

    onSubmit({ playerInput: trimmedInput, selectedAction });
    setPlayerInput("");
    setSelectedAction(undefined);
  }

  return (
    <Panel
      title="Game Master"
      icon={Sparkles}
      className="relative flex h-[calc(100vh-144px)] min-h-0 flex-col overflow-hidden px-7 py-5"
    >
      <div className="relative z-10 min-h-0 flex-1 overflow-hidden">
        <div className="relative h-full min-h-0 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]">
            <Image
              src={chatBackdrop}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover opacity-[0.24] scale-[0.76]"
              style={{
                objectPosition: "center center",
                transform: "translateX(2%) scale(1.26)",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,17,0.62),rgba(10,11,17,0.42)_30%,rgba(10,11,17,0.68)_100%)]" />
          </div>

          <div className="mythos-chat-scroll relative z-10 h-full min-h-0 overflow-y-auto pr-2">
            <div className="space-y-6 pb-6 pt-2">
              {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-3 space-y-5 border-t border-amber-200/10 bg-[linear-gradient(180deg,rgba(12,12,18,0.58),rgba(12,12,18,0.86))] pt-5 backdrop-blur-[1px]">
        <DividerLabel />

        <div className="flex items-center gap-4">
          <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.025] text-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="text-xl">[]</div>
          </button>
          <div className="flex h-16 flex-1 items-center rounded-[20px] border border-violet-400/45 bg-[linear-gradient(180deg,rgba(26,24,40,0.88),rgba(18,18,29,0.94))] px-5 shadow-[0_0_0_1px_rgba(168,85,247,0.15),0_0_24px_rgba(139,92,246,0.16)]">
            <input
              value={playerInput}
              onChange={(event) => setPlayerInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitChat();
                }
              }}
              className="h-full flex-1 bg-transparent text-[18px] text-stone-200 outline-none placeholder:text-stone-500"
              placeholder="Tell the Game Master what you do next..."
              disabled={isSubmitting}
            />
            <button
              onClick={submitChat}
              disabled={isSubmitting || !playerInput.trim()}
              className="ml-4 flex h-11 w-16 items-center justify-center rounded-2xl border border-violet-300/28 bg-violet-400/18 text-violet-200 shadow-[0_0_18px_rgba(139,92,246,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                  ...
                </span>
              ) : (
                <SendHorizontal className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedAction(label)}
              type="button"
              disabled={isSubmitting}
              className={[
                "flex items-center gap-2 rounded-2xl border px-5 py-3 text-[17px] text-stone-200/92 transition hover:border-amber-300/15 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50",
                selectedAction === label
                  ? "border-violet-400/40 bg-violet-500/12"
                  : "border-white/8 bg-white/[0.02]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 text-stone-400" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
