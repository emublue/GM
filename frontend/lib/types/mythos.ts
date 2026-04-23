import type { LucideIcon } from "lucide-react";

export type TagTone = "green" | "blue" | "violet" | "amber";
export type StatTone = "green" | "blue" | "violet" | "amber" | "red";
export type RelationshipDisposition = "ally" | "neutral" | "wary";
export type NavItemKey =
  | "campaigns"
  | "world"
  | "characters"
  | "locations"
  | "factions"
  | "quests"
  | "events"
  | "inventory"
  | "timeline"
  | "settings";
export type QuickActionKey =
  | "attack"
  | "persuade"
  | "investigate"
  | "search"
  | "more-actions";
export type WorldOverviewStatKey =
  | "faction-reputation"
  | "world-tension"
  | "session-turn";

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  roleLabel: string;
  statusLabel: string;
}

export interface DateDisplay {
  fullDate: string;
  phaseLabel: string;
  timeLabel: string;
  iconLabel: string;
}

export interface AbilityScore {
  abbr: string;
  score: number;
  modifier: number;
}

export interface CharacterTag {
  label: string;
  tone: TagTone;
}

export interface AttackEntry {
  id: string;
  name: string;
  bonus: string;
  effect: string;
}

export interface MythosCharacter {
  id: string;
  name: string;
  level: number;
  className: string;
  ancestry: string;
  background: string;
  alignment: string;
  experience: number;
  passivePerception: number;
  proficiencyBonus: number;
  armorClass: number;
  initiative: number;
  speed: number;
  hitPoints: {
    current: number;
    maximum: number;
  };
  hitDice: string;
  deathSaves: {
    successes: number;
    failures: number;
  };
  tags: CharacterTag[];
  abilityScores: AbilityScore[];
  savingThrows: string[];
  skillProficiencies: string[];
  attacks: AttackEntry[];
  features: string[];
  languages: string[];
  senses: string[];
  equipment: string[];
}

export interface ChatMessageBase {
  id: string;
  time: string;
  lines: string[];
}

export interface GMChatMessage extends ChatMessageBase {
  role: "gm";
  emphasis?: string;
  quote?: string;
}

export interface PlayerChatMessage extends ChatMessageBase {
  role: "player";
}

export type ChatMessage = GMChatMessage | PlayerChatMessage;

export interface QuestStep {
  id: string;
  label: string;
  done: boolean;
}

export interface ActiveQuest {
  id: string;
  title: string;
  description: string;
  currentStepCount: number;
  totalStepCount: number;
  steps: QuestStep[];
}

export interface StoryQuest extends ActiveQuest {}

export interface MythosLocation {
  id: string;
  name: string;
  region: string;
  description: string;
}

export interface Npc {
  id: string;
  name: string;
  title: string;
  disposition: RelationshipDisposition;
  dispositionSegments: number;
  summary: string;
  lastNotableInteraction?: string | null;
  tags: CharacterTag[];
}

export interface WorldEvent {
  id: string;
  time: string;
  text: string;
}

export interface JournalEntry {
  id: string;
  text: string;
}

export interface RelationshipNode {
  id: string;
  name: string;
  subtitle: string;
  disposition: RelationshipDisposition;
}

export interface RelationshipEdge {
  id: string;
  fromId: string;
  toId: string;
  label: string;
  disposition: RelationshipDisposition;
}


export interface NavItemUI {
  key: NavItemKey;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export interface QuickActionUI {
  key: QuickActionKey;
  label: string;
  icon: LucideIcon;
}

export interface WorldOverviewStatUI {
  key: WorldOverviewStatKey;
  icon: LucideIcon;
  label: string;
  value: string;
  sublabel: string;
  tone: StatTone;
}
