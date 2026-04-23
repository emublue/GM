import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  Compass,
  Flame,
  Globe,
  Hourglass,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Package,
  ScrollText,
  Search,
  Settings,
  Shield,
  Sword,
  User,
} from "lucide-react";
import type { NavItemKey, QuickActionKey, WorldOverviewStatKey } from "@/lib/types/mythos";

export const mythosNavIconMap: Record<NavItemKey, LucideIcon> = {
  campaigns: BookOpen,
  world: Globe,
  characters: User,
  locations: MapPin,
  factions: Shield,
  quests: ScrollText,
  events: CalendarDays,
  inventory: Package,
  timeline: Hourglass,
  settings: Settings,
};

export const mythosQuickActionIconMap: Record<QuickActionKey, LucideIcon> = {
  attack: Sword,
  persuade: MessageCircle,
  investigate: Search,
  search: Compass,
  "more-actions": MoreHorizontal,
};

export const mythosWorldOverviewIconMap: Record<WorldOverviewStatKey, LucideIcon> = {
  "faction-reputation": Shield,
  "world-tension": Flame,
  "session-turn": Clock3,
};

export const mythosIconFallbacks = {
  nav: Compass,
  quickAction: MoreHorizontal,
  worldOverview: Clock3,
} as const;
