import { BookOpenText, Compass, MapPin, Sparkles, User } from "lucide-react";
import type {
  JournalEntry,
  MythosLocation,
  Npc,
  RelationshipNode,
  WorldEvent,
} from "@/lib/types/mythos";
import { Panel, PlayerAvatar, Tag } from "../layout/mythos-primitives";

type RecentWorldEventsPanelProps = {
  events: WorldEvent[];
};

type RelationshipSnapshotPanelProps = {
  relationships: RelationshipNode[];
};

type CurrentLocationPanelProps = {
  location: MythosLocation;
};

type JournalPanelProps = {
  journal: JournalEntry[];
};

type NpcInFocusPanelProps = {
  npc: Npc;
};

type MythosInfoPanelsProps = {
  location: MythosLocation;
  journal: JournalEntry[];
  npc: Npc;
  events: WorldEvent[];
  relationships: RelationshipNode[];
};

function dispositionTone(disposition: RelationshipNode["disposition"]) {
  if (disposition === "ally") return "text-emerald-300";
  if (disposition === "wary") return "text-red-300";
  return "text-stone-400";
}

export function RecentWorldEventsPanel({ events }: RecentWorldEventsPanelProps) {
  return (
    <Panel
      title="Recent World Events"
      icon={Sparkles}
      action={<button className="text-sm text-violet-300/90">View All</button>}
      className="self-start"
    >
      <div className="space-y-3 text-[15px] leading-7">
        {events.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-[62px_1fr] gap-3 text-stone-200/88"
          >
            <span className="text-stone-400/82">{event.time}</span>
            <span>{event.text}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function RelationshipSnapshotPanel({ relationships }: RelationshipSnapshotPanelProps) {
  const [player, focusNpc, leftFaction, rightFaction] = relationships;

  return (
    <Panel title="Relationship Snapshot" icon={Compass} className="self-start">
      <div className="relative overflow-hidden rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <PlayerAvatar small />
            <div className="text-center">
              <div className="font-serif text-[26px] text-stone-100">{player?.name}</div>
              <div className="text-[13px] text-stone-400">{player?.subtitle}</div>
            </div>
          </div>

          <div className="relative flex items-center justify-center px-2">
            <div className="absolute top-0 text-[14px] text-emerald-300">Trust</div>
            <div className="h-px w-24 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-full border border-amber-300/28 bg-[linear-gradient(180deg,rgba(82,82,92,0.3),rgba(26,26,30,0.95))]" />
            <div className="text-center">
              <div className="font-serif text-[26px] text-stone-100">{focusNpc?.name}</div>
              <div className="text-[13px] text-stone-400">{focusNpc?.subtitle}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_70px_1fr] items-center gap-2 text-[14px]">
          <div />
          <div className="relative h-12">
            <div className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-stone-700/70" />
          </div>
          <div />
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <div className="flex items-center justify-end gap-3">
            <div className="text-right">
              <div className="font-serif text-[22px] text-stone-100">{leftFaction?.name}</div>
              <div className={["text-[13px]", dispositionTone(leftFaction?.disposition ?? "neutral")].join(" ")}>
                {leftFaction?.subtitle}
              </div>
            </div>
            <div className="h-10 w-10 rounded-2xl border border-amber-300/20 bg-amber-500/10" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl border border-red-300/20 bg-red-500/10" />
            <div>
              <div className="font-serif text-[22px] text-stone-100">{rightFaction?.name}</div>
              <div className={["text-[13px]", dispositionTone(rightFaction?.disposition ?? "wary")].join(" ")}>
                {rightFaction?.subtitle}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-5 text-[13px] text-stone-300/80">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />Ally
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />Neutral
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />Wary/Hostile
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function CurrentLocationPanel({ location }: CurrentLocationPanelProps) {
  return (
    <Panel
      title="Current Location"
      icon={MapPin}
      action={<button className="text-sm text-violet-300/90">View Map</button>}
      className="self-start"
    >
      <div className="space-y-4">
        <div className="h-24 rounded-2xl border border-amber-300/20 bg-[linear-gradient(180deg,rgba(73,73,82,0.18),rgba(20,20,27,0.85)),radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.1),transparent_35%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" />
        <div>
          <div className="font-serif text-[28px] leading-none text-stone-100">{location.name}</div>
          <div className="mt-1 text-[15px] text-stone-300/78">{location.region}</div>
          <p className="mt-3 text-[14px] leading-6 text-stone-300/82">{location.description}</p>
        </div>
      </div>
    </Panel>
  );
}

export function JournalPanel({ journal }: JournalPanelProps) {
  return (
    <Panel title="Journal" icon={BookOpenText} className="self-start">
      <div className="space-y-3">
        {journal.map((entry) => (
          <div
            key={entry.id}
            className="rounded-[18px] border border-violet-300/14 bg-violet-500/[0.04] px-4 py-3 text-[14px] leading-6 text-stone-200/86"
          >
            {entry.text}
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function NpcInFocusPanel({ npc }: NpcInFocusPanelProps) {
  const dispositionLabel =
    npc.disposition === "ally" ? "Friendly" : npc.disposition === "neutral" ? "Neutral" : "Wary";
  const dispositionColor =
    npc.disposition === "ally"
      ? "text-emerald-300"
      : npc.disposition === "neutral"
        ? "text-amber-300"
        : "text-red-300";

  return (
    <Panel title="NPC in Focus" icon={User}>
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 rounded-2xl border border-amber-300/20 bg-[linear-gradient(180deg,rgba(72,72,84,0.22),rgba(23,23,30,0.88))]" />
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[32px] leading-none text-stone-100">{npc.name}</div>
          <div className="mt-1 text-[16px] text-stone-300/78">{npc.title}</div>
          <p className="mt-3 text-[14px] leading-6 text-stone-300/80">{npc.summary}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[14px] text-stone-300/78">Disposition</span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: npc.dispositionSegments }).map((_, index) => (
                <span key={index} className="h-2.5 w-8 rounded-full bg-emerald-400/80" />
              ))}
            </div>
            <span className={["text-[14px]", dispositionColor].join(" ")}>{dispositionLabel}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {npc.tags.map((tag) => (
              <Tag key={tag.label} color={tag.tone}>
                {tag.label}
              </Tag>
            ))}
          </div>

          {npc.lastNotableInteraction ? (
            <div className="mt-4 rounded-[16px] border border-white/6 bg-white/[0.03] px-3 py-2 text-[13px] leading-5 text-stone-300/78">
              <span className="text-stone-400/72">Last notable interaction:</span>{" "}
              {npc.lastNotableInteraction}
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

export function MythosInfoPanels({
  location,
  journal,
  npc,
  events,
  relationships,
}: MythosInfoPanelsProps) {
  return (
    <div className="grid items-start grid-cols-[1.1fr_1fr_1fr] gap-4">
      <div className="space-y-4">
        <RecentWorldEventsPanel events={events} />
        <NpcInFocusPanel npc={npc} />
      </div>

      <RelationshipSnapshotPanel relationships={relationships} />

      <div className="space-y-4">
        <CurrentLocationPanel location={location} />
        <JournalPanel journal={journal} />
      </div>
    </div>
  );
}
