import type { LucideIcon } from "lucide-react";
import {
  mythosIconFallbacks,
  mythosNavIconMap,
  mythosQuickActionIconMap,
  mythosWorldOverviewIconMap,
} from "@/lib/constants/mythos-icons";
import type {
  ApiNavItem,
  ApiQuickAction,
  ApiWorldOverviewStat,
  SessionScreenResponse,
} from "@/lib/types/api";
import type { NavItemUI, QuickActionUI, WorldOverviewStatUI } from "@/lib/types/mythos";

export interface SessionScreenUIModel extends Omit<SessionScreenResponse, "sidebar" | "chat"> {
  sidebar: {
    navItems: NavItemUI[];
    worldOverview: WorldOverviewStatUI[];
  };
  chat: {
    messages: SessionScreenResponse["chat"]["messages"];
    quickActions: QuickActionUI[];
  };
}

function withFallbackIcon(icon: LucideIcon | undefined, fallback: LucideIcon) {
  return icon ?? fallback;
}

export function mapApiNavItemsToUI(items: ApiNavItem[]): NavItemUI[] {
  return items.map((item) => ({
    ...item,
    icon: withFallbackIcon(mythosNavIconMap[item.key], mythosIconFallbacks.nav),
  }));
}

export function mapApiQuickActionsToUI(actions: ApiQuickAction[]): QuickActionUI[] {
  return actions.map((action) => ({
    ...action,
    icon: withFallbackIcon(
      mythosQuickActionIconMap[action.key],
      mythosIconFallbacks.quickAction,
    ),
  }));
}

export function mapApiWorldOverviewStatsToUI(stats: ApiWorldOverviewStat[]): WorldOverviewStatUI[] {
  return stats.map((stat) => ({
    ...stat,
    icon: withFallbackIcon(
      mythosWorldOverviewIconMap[stat.key],
      mythosIconFallbacks.worldOverview,
    ),
  }));
}

export function mapSessionScreenResponseToUI(screen: SessionScreenResponse): SessionScreenUIModel {
  return {
    ...screen,
    sidebar: {
      navItems: mapApiNavItemsToUI(screen.sidebar.navItems),
      worldOverview: mapApiWorldOverviewStatsToUI(screen.sidebar.worldOverview),
    },
    chat: {
      messages: screen.chat.messages,
      quickActions: mapApiQuickActionsToUI(screen.chat.quickActions),
    },
  };
}
