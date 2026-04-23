import type {
  ActiveQuest,
  Campaign,
  ChatMessage,
  DateDisplay,
  MythosCharacter,
  MythosLocation,
  NavItemKey,
  Npc,
  PlayerProfile,
  QuickActionKey,
  RelationshipEdge,
  RelationshipNode,
  WorldOverviewStatKey,
  WorldEvent,
  StatTone,
} from "./mythos";

export interface ApiNavItem {
  key: NavItemKey;
  label: string;
  active?: boolean;
}

export interface ApiQuickAction {
  key: QuickActionKey;
  label: string;
}

export interface ApiWorldOverviewStat {
  key: WorldOverviewStatKey;
  label: string;
  value: string;
  sublabel: string;
  tone: StatTone;
}

export interface TopbarData {
  campaign: Campaign;
  playerProfile: PlayerProfile;
  dateDisplay: DateDisplay;
}

export interface SidebarData {
  navItems: ApiNavItem[];
  worldOverview: ApiWorldOverviewStat[];
}

export interface ChatPanelData {
  messages: ChatMessage[];
  quickActions: ApiQuickAction[];
}

export interface RelationshipGraphData {
  nodes: RelationshipNode[];
  edges: RelationshipEdge[];
}

export interface InfoPanelsData {
  activeQuest: ActiveQuest;
  location: MythosLocation;
  npcInFocus: Npc;
  recentEvents: WorldEvent[];
  relationships: RelationshipGraphData;
}

export interface SessionScreenResponse {
  topbar: TopbarData;
  sidebar: SidebarData;
  chat: ChatPanelData;
  characterSheet: MythosCharacter;
  infoPanels: InfoPanelsData;
}

export interface ChatRequest {
  campaignId: string;
  playerInput: string;
  selectedAction?: string;
}

export interface ChatResponse {
  screen: SessionScreenResponse;
}
