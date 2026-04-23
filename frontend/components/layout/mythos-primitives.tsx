import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import type { ChatMessage, NavItem, StatTone, TagTone, WorldOverviewStat } from "@/lib/types/mythos";

type SidebarItemProps = NavItem;

type PanelProps = {
  title: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type MessageCardProps = {
  message: ChatMessage;
};

type TagProps = {
  children: React.ReactNode;
  color?: TagTone;
};

export function SidebarItem({ icon: Icon, label, active = false }: SidebarItemProps) {
  return (
    <button
      className={[
        "group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all",
        active
          ? "border-violet-500/60 bg-violet-500/15 text-white shadow-[0_0_0_1px_rgba(168,85,247,0.2),0_0_28px_rgba(139,92,246,0.22)]"
          : "border-transparent text-zinc-200/90 hover:border-amber-300/15 hover:bg-white/[0.03] hover:text-white",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 items-center justify-center rounded-xl border transition-colors",
          active
            ? "border-violet-400/40 bg-violet-400/12 text-violet-200"
            : "border-white/8 bg-white/[0.02] text-amber-100/85 group-hover:text-amber-100",
        ].join(" ")}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="text-[14px] font-medium tracking-[0.01em]">{label}</span>
    </button>
  );
}

export function Panel({ title, icon: Icon, action, children, className = "" }: PanelProps) {
  return (
    <div
      className={[
        "rounded-[22px] border border-amber-300/20 bg-[linear-gradient(180deg,rgba(18,18,24,0.96),rgba(12,12,18,0.98))] p-5 shadow-[0_0_0_1px_rgba(255,211,143,0.03),inset_0_1px_0_rgba(255,255,255,0.02)]",
        className,
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-amber-200/95">
          {Icon ? <Icon className="h-4 w-4 text-amber-300/85" /> : null}
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-200/95">
            {title}
          </h3>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </div>
  );
}

export function GMOrb() {
  return (
    <div className="relative mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.45),rgba(77,28,117,0.22)_42%,rgba(10,10,16,0.8)_72%)] shadow-[0_0_28px_rgba(139,92,246,0.28)]">
      <div className="absolute inset-2 rounded-full border border-violet-300/15" />
      <Sparkles className="h-6 w-6 text-violet-200" />
    </div>
  );
}

export function PlayerAvatar({ small = false }: { small?: boolean }) {
  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-full border border-amber-300/30 bg-[radial-gradient(circle_at_35%_25%,rgba(110,110,130,0.55),rgba(34,34,44,0.96)_48%,rgba(10,10,14,1)_78%)] shadow-[0_0_22px_rgba(0,0,0,0.45)]",
        small ? "h-11 w-11" : "h-14 w-14",
      ].join(" ")}
    >
      <div className="absolute inset-[3px] rounded-full border border-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),transparent_34%)]" />
      <div className="absolute inset-x-[32%] top-[22%] h-[26%] rounded-full bg-zinc-300/80 blur-[1px]" />
      <div className="absolute inset-x-[22%] top-[42%] h-[40%] rounded-[999px] bg-zinc-800/90" />
      <div className="absolute left-[26%] top-[28%] h-[34%] w-[48%] rounded-full bg-zinc-950/90" />
    </div>
  );
}

export function MessageCard({ message }: MessageCardProps) {
  if (message.role === "gm") {
    return (
      <div className="flex gap-4">
        <GMOrb />
        <div className="max-w-[66%] rounded-[18px] border border-violet-300/16 bg-[linear-gradient(180deg,rgba(28,18,40,0.34),rgba(16,16,28,0.58))] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[1px]">
          <div className="space-y-1.5 text-[17px] leading-8 text-stone-200/92">
            {message.lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
            {message.emphasis ? (
              <p className="pt-2 italic text-violet-300/95">{message.emphasis}</p>
            ) : null}
            {message.quote ? <p className="pt-2 text-stone-100">{message.quote}</p> : null}
          </div>
          <div className="pt-4 text-sm text-stone-400/80">{message.time}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end justify-end gap-4 pl-24">
      <div className="max-w-[58%] rounded-[16px] border border-slate-400/14 bg-[linear-gradient(180deg,rgba(36,46,63,0.4),rgba(23,28,40,0.58))] px-5 py-4 text-[17px] leading-8 text-stone-100/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-[1px]">
        {message.lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        <div className="flex items-center justify-end gap-2 pt-3 text-sm text-stone-400/80">
          <span>{message.time}</span>
          <span className="text-slate-300/70">OK</span>
        </div>
      </div>
      <PlayerAvatar />
    </div>
  );
}

export function OverviewStat({ icon: Icon, label, value, tone, sublabel }: WorldOverviewStat) {
  const toneStyles: Record<StatTone, string> = {
    green: "text-emerald-300",
    blue: "text-sky-300",
    violet: "text-violet-300",
    amber: "text-amber-300",
    red: "text-red-300",
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-3">
      <div className="min-w-0 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-amber-200/90">
          <Icon className="h-4 w-4" />
        </div>
        <span className="min-w-0 text-[12px] leading-4 text-stone-200/88">{label}</span>
      </div>
      <div className="w-[72px] text-right">
        <div className={["text-[16px] font-semibold leading-none", toneStyles[tone]].join(" ")}>
          {value}
        </div>
        <div className="mt-1 text-[11px] text-stone-400/85">{sublabel}</div>
      </div>
    </div>
  );
}

export function Tag({ children, color = "violet" }: TagProps) {
  const styles: Record<TagTone, string> = {
    green: "border-emerald-400/18 bg-emerald-500/10 text-emerald-200",
    blue: "border-sky-400/18 bg-sky-500/10 text-sky-200",
    violet: "border-violet-400/18 bg-violet-500/10 text-violet-200",
    amber: "border-amber-400/18 bg-amber-500/10 text-amber-200",
  };

  return (
    <span
      className={[
        "rounded-full border px-3 py-1 text-[13px] font-medium",
        styles[color],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function DividerLabel() {
  return (
    <div className="relative py-2">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-700/70 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-transparent text-stone-500">
        <Sparkles className="h-4 w-4 text-violet-300/85" />
        <span className="bg-[#090b12] px-3 text-[15px]">The story continues...</span>
      </div>
    </div>
  );
}
