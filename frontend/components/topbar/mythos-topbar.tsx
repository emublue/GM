import { Bell, CalendarDays, ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";
import type { Campaign, DateDisplay, PlayerProfile } from "@/lib/types/mythos";
import { PlayerAvatar } from "../layout/mythos-primitives";

type MythosTopbarProps = {
  campaign: Campaign;
  player: PlayerProfile;
  date: DateDisplay;
};

export function MythosTopbar({ campaign, player, date }: MythosTopbarProps) {
  return (
    <header className="relative z-20 grid grid-cols-[1.2fr_1fr_0.95fr] items-center border-b border-amber-200/12 bg-[linear-gradient(180deg,rgba(11,12,18,0.97),rgba(9,10,16,0.95))] px-8 shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/28 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.32),rgba(76,29,149,0.28)_45%,rgba(11,11,16,1)_70%)]">
          <ShieldAlert className="h-6 w-6 text-violet-200" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-[32px] font-medium leading-none text-stone-100">
            <span className="font-serif text-[34px]">{campaign.title}</span>
            <ChevronDown className="mt-1 h-4 w-4 text-stone-400" />
          </div>
          <div className="mt-1 text-[15px] text-stone-400">{campaign.subtitle}</div>
        </div>
      </div>

      <div className="justify-self-center border-x border-amber-200/10 px-8">
        <div className="flex items-center gap-3 whitespace-nowrap text-amber-100/95">
          <CalendarDays className="h-5 w-5 text-amber-300/85" />
          <span className="whitespace-nowrap font-serif text-[28px]">{date.fullDate}</span>
        </div>
        <div className="mt-1 flex items-center gap-3 whitespace-nowrap text-stone-300/80">
          <span className="text-[18px]">{date.phaseLabel}</span>
          <span>|</span>
          <span className="text-[18px]">{date.timeLabel}</span>
          <span className="text-[14px] uppercase tracking-[0.08em] text-stone-400/75">
            {date.iconLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        <div className="flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2.5 pr-4">
          <PlayerAvatar small />
          <div>
            <div className="font-serif text-[24px] leading-none text-stone-100">{player.name}</div>
            <div className="mt-1 flex items-center gap-2 text-[14px] text-stone-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              <span>{player.roleLabel}</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-stone-500" />
        </div>
        <button className="relative rounded-full border border-white/8 bg-white/[0.02] p-3 text-amber-100/90">
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(168,85,247,0.85)]"
            title={player.statusLabel}
          />
        </button>
        <button className="rounded-full border border-white/8 bg-white/[0.02] p-3 text-amber-100/90">
          <HelpCircle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
