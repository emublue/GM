import type { SessionScreenResponse } from "../types/api";
import type {
  ActiveQuest,
  Campaign,
  ChatMessage,
  DateDisplay,
  MythosCharacter,
  MythosLocation,
  Npc,
  PlayerProfile,
  RelationshipNode,
  WorldEvent,
} from "../types/mythos";

export const campaign: Campaign = {
  id: "campaign-valemoor",
  title: "Shadows of Valemoor",
  subtitle: "Campaign",
};

export const player: PlayerProfile = {
  id: "player-aric",
  name: "Aric Valewalker",
  roleLabel: "Player",
  statusLabel: "Online",
};

export const currentDate: DateDisplay = {
  fullDate: "17th of Eldermoon, 1492 DR",
  phaseLabel: "Dusk",
  timeLabel: "7:42 PM",
  iconLabel: "Moonrise",
};

export const character: MythosCharacter = {
  id: "character-aric",
  name: "Aric Valewalker",
  level: 7,
  className: "Ranger",
  ancestry: "Half-Elf",
  background: "Outlander",
  alignment: "Chaotic Good",
  experience: 23900,
  passivePerception: 19,
  proficiencyBonus: 3,
  armorClass: 15,
  initiative: 3,
  speed: 35,
  hitPoints: {
    current: 58,
    maximum: 64,
  },
  hitDice: "7d10",
  deathSaves: {
    successes: 2,
    failures: 0,
  },
  tags: [
    { label: "Healthy", tone: "green" },
    { label: "Favored Enemy: Fiends", tone: "blue" },
    { label: "Fey Wanderer", tone: "amber" },
  ],
  abilityScores: [
    { abbr: "STR", score: 14, modifier: 2 },
    { abbr: "DEX", score: 17, modifier: 3 },
    { abbr: "CON", score: 15, modifier: 2 },
    { abbr: "INT", score: 12, modifier: 1 },
    { abbr: "WIS", score: 16, modifier: 3 },
    { abbr: "CHA", score: 10, modifier: 0 },
  ],
  savingThrows: ["Strength +5", "Dexterity +6", "Wisdom +6"],
  skillProficiencies: [
    "Acrobatics +6",
    "Animal Handling +6",
    "Insight +6",
    "Nature +4",
    "Perception +9",
    "Stealth +9",
    "Survival +9",
  ],
  attacks: [
    {
      id: "attack-longbow",
      name: "Moonthorn Longbow",
      bonus: "+8 to hit",
      effect: "1d8 + 4 piercing.",
    },
    {
      id: "attack-shortsword",
      name: "Shortsword",
      bonus: "+6 to hit",
      effect: "1d6 + 3 piercing.",
    },
    {
      id: "attack-spellcasting",
      name: "Spellcasting",
      bonus: "Spell Attack +6",
      effect: "Spell Save DC 14, 4 first-level slots.",
    },
  ],
  features: ["Hunter's Mark", "Darkvision", "Blessed"],
  languages: ["Common", "Elvish", "Sylvan"],
  senses: ["Darkvision 60 ft."],
  equipment: [
    "Moonthorn Longbow",
    "Shortsword",
    "Studded Leather",
    "Explorer's Pack",
    "Cloak of the Mistral",
  ],
};

export const messages: ChatMessage[] = [
  {
    id: "gm-1",
    role: "gm",
    time: "7:41 PM",
    lines: [
      "The wind carries the scent of smoke and wet earth as you crest the ridge.",
      "Below, Valemoor's spires pierce the dusk, wreathed in drifting ash.",
      "From the eastern quarter, a column of dark smoke coils into the sky.",
    ],
    emphasis: "The city is on edge.",
  },
  {
    id: "player-1",
    role: "player",
    time: "7:41 PM",
    lines: ["I urge my mount down the path and head toward the smoke."],
  },
  {
    id: "gm-2",
    role: "gm",
    time: "7:42 PM",
    lines: [
      "Hooves strike wet stone as you enter the eastern quarter.",
      "Citizens hurry past, faces tight with fear. Ahead, a warehouse burns,",
      "its timbers collapsing inward. A lone figure stands amid the chaos -",
      "silver hair, cloak singed at the edges - directing a few guards.",
    ],
    emphasis: "He glances up as you approach.",
    quote: "\"You've come.\"",
  },
  {
    id: "player-2",
    role: "player",
    time: "7:42 PM",
    lines: ["I dismount and approach him. \"Aereth, what happened here?\""],
  },
];

export const location: MythosLocation = {
  id: "location-valemoor-east",
  name: "Valemoor",
  region: "Eastern Quarter",
  description:
    "Smoke hangs over crowded streets while guards scramble around the burning warehouse.",
};

export const quest: ActiveQuest = {
  id: "quest-investigate-fire",
  title: "Investigate the Fire",
  description: "Uncover the cause of the warehouse blaze and who stands to gain from it.",
  currentStepCount: 2,
  totalStepCount: 4,
  steps: [
    { id: "step-reach-quarter", done: true, label: "Reach the Eastern Quarter" },
    { id: "step-speak-aereth", done: true, label: "Speak with Aereth" },
    { id: "step-examine-warehouse", done: false, label: "Examine the Burned Warehouse" },
    { id: "step-report-council", done: false, label: "Report Findings to the Council" },
  ],
};

export const npc: Npc = {
  id: "npc-aereth",
  name: "Aereth",
  title: "Captain of the Valemoor Guard",
  disposition: "ally",
  dispositionSegments: 3,
  tags: [
    { label: "Ally", tone: "green" },
    { label: "Trustworthy", tone: "blue" },
    { label: "Duty-Bound", tone: "violet" },
  ],
};

export const events: WorldEvent[] = [
  { id: "event-fire", time: "7h ago", text: "Warehouse fire reported in the Eastern Quarter." },
  { id: "event-concord", time: "12h ago", text: "The Iron Concord forbids unsanctioned magic." },
  { id: "event-caravan", time: "1d ago", text: "Caravan ambushed on the Old North Road." },
  { id: "event-aurora", time: "2d ago", text: "A strange green aurora shimmered over the river wall." },
];

export const relationships: RelationshipNode[] = [
  { id: "player", name: "Aric", subtitle: "You", disposition: "ally" },
  { id: "focus-npc", name: "Aereth", subtitle: "Ally", disposition: "ally" },
  {
    id: "council",
    name: "Council of Valemoor",
    subtitle: "Neutral",
    disposition: "neutral",
  },
  { id: "iron-concord", name: "Iron Concord", subtitle: "Wary", disposition: "wary" },
];

export const mockSessionScreenResponse: SessionScreenResponse = {
  topbar: {
    campaign,
    playerProfile: player,
    dateDisplay: currentDate,
  },
  sidebar: {
    navItems: [
      { key: "campaigns", label: "Campaigns", active: true },
      { key: "world", label: "World" },
      { key: "characters", label: "Characters" },
      { key: "locations", label: "Locations" },
      { key: "factions", label: "Factions" },
      { key: "quests", label: "Quests" },
      { key: "events", label: "Events" },
      { key: "inventory", label: "Inventory" },
      { key: "timeline", label: "Timeline" },
      { key: "settings", label: "Settings" },
    ],
    worldOverview: [
      {
        key: "faction-reputation",
        label: "Faction Reputation",
        value: "87",
        sublabel: "Honored",
        tone: "green",
      },
      {
        key: "world-tension",
        label: "World Tension",
        value: "64%",
        sublabel: "High",
        tone: "amber",
      },
      {
        key: "session-turn",
        label: "Session Turn",
        value: "128",
        sublabel: "/oo",
        tone: "violet",
      },
    ],
  },
  chat: {
    messages,
    quickActions: [
      { key: "attack", label: "Attack" },
      { key: "persuade", label: "Persuade" },
      { key: "investigate", label: "Investigate" },
      { key: "search", label: "Search" },
      { key: "more-actions", label: "More Actions" },
    ],
  },
  characterSheet: character,
  infoPanels: {
    activeQuest: quest,
    location,
    npcInFocus: npc,
    recentEvents: events,
    relationships: {
      nodes: relationships,
      edges: [],
    },
  },
};
