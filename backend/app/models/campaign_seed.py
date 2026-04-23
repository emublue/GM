from app.schemas.session import (
    ChatPanelDataSchema,
    InfoPanelsDataSchema,
    RelationshipGraphDataSchema,
    SessionScreenResponseSchema,
    SidebarDataSchema,
    TopbarDataSchema,
)
from app.schemas.shared import (
    AbilityScoreSchema,
    ActiveQuestSchema,
    AttackEntrySchema,
    CampaignSchema,
    CharacterTagSchema,
    DateDisplaySchema,
    GMChatMessageSchema,
    JournalEntrySchema,
    MythosCharacterSchema,
    MythosLocationSchema,
    NavItemSchema,
    NpcSchema,
    PlayerChatMessageSchema,
    PlayerProfileSchema,
    QuestStepSchema,
    QuickActionSchema,
    RelationshipEdgeSchema,
    RelationshipNodeSchema,
    WorldEventSchema,
    WorldOverviewStatSchema,
    NpcMemorySchema,
)

INITIAL_CAMPAIGN_ID = "shadows-of-valemoor"


def build_seed_quests() -> list[ActiveQuestSchema]:
    return [
        ActiveQuestSchema(
            id="quest-fire",
            title="Investigate the Fire",
            description="Uncover the cause of the warehouse blaze and who stands to gain from it.",
            currentStepCount=2,
            totalStepCount=4,
            steps=[
                QuestStepSchema(id="step-1", label="Reach the Eastern Quarter", done=True),
                QuestStepSchema(id="step-2", label="Speak with Aereth", done=True),
                QuestStepSchema(id="step-3", label="Examine the Burned Warehouse", done=False),
                QuestStepSchema(id="step-4", label="Report Findings to the Council", done=False),
            ],
        )
    ]


def build_seed_journal_entries() -> list[JournalEntrySchema]:
    return [
        JournalEntrySchema(
            id="journal-1",
            text="Smoke over Valemoor's Eastern Quarter has everyone on edge, and rumors say the warehouse fire was no accident.",
        ),
        JournalEntrySchema(
            id="journal-2",
            text="Aereth may know more than he is willing to say in public. I should find a quieter moment to press him.",
        ),
        JournalEntrySchema(
            id="journal-3",
            text="The Iron Concord's recent ban on unsanctioned magic keeps coming up in tavern gossip and guarded whispers.",
        ),
    ]


def build_seed_character_sheet() -> MythosCharacterSchema:
    return MythosCharacterSchema(
        id="char-aric",
        name="Aric Valewalker",
        level=7,
        className="Ranger",
        ancestry="Half-Elf",
        background="Outlander",
        alignment="Chaotic Good",
        experience=23900,
        passivePerception=19,
        proficiencyBonus=3,
        armorClass=15,
        initiative=3,
        speed=35,
        hitPoints={"current": 58, "maximum": 64},
        hitDice="7d10",
        deathSaves={"successes": 2, "failures": 0},
        tags=[
            CharacterTagSchema(label="Healthy", tone="green"),
            CharacterTagSchema(label="Favored Enemy: Fiends", tone="blue"),
            CharacterTagSchema(label="Fey Wanderer", tone="amber"),
        ],
        abilityScores=[
            AbilityScoreSchema(abbr="STR", score=14, modifier=2),
            AbilityScoreSchema(abbr="DEX", score=17, modifier=3),
            AbilityScoreSchema(abbr="CON", score=15, modifier=2),
            AbilityScoreSchema(abbr="INT", score=12, modifier=1),
            AbilityScoreSchema(abbr="WIS", score=16, modifier=3),
            AbilityScoreSchema(abbr="CHA", score=10, modifier=0),
        ],
        savingThrows=["Strength +5", "Dexterity +6", "Wisdom +6"],
        skillProficiencies=[
            "Acrobatics +6",
            "Animal Handling +6",
            "Insight +6",
            "Nature +4",
            "Perception +9",
            "Stealth +9",
            "Survival +9",
        ],
        attacks=[
            AttackEntrySchema(
                id="atk-1",
                name="Moonthorn Longbow",
                bonus="+8 to hit",
                effect="1d8 + 4 piercing",
            ),
            AttackEntrySchema(
                id="atk-2",
                name="Shortsword",
                bonus="+6 to hit",
                effect="1d6 + 3 piercing",
            ),
        ],
        features=["Hunter's Mark", "Darkvision", "Blessed"],
        languages=["Common", "Elvish", "Sylvan"],
        senses=["Darkvision 60 ft."],
        equipment=[
            "Moonthorn Longbow",
            "Shortsword",
            "Studded Leather",
            "Explorer's Pack",
            "Cloak of the Mistral",
        ],
    )


def build_seed_npc_memories() -> list[NpcMemorySchema]:
    return [
        NpcMemorySchema(
            npcId="npc-aereth",
            name="Aereth",
            title="Captain of the Valemoor Guard",
            currentDisposition="ally",
            summary="A disciplined guard captain trying to contain panic in the Eastern Quarter while keeping politically dangerous details close to the chest.",
            tags=["Ally", "Trustworthy", "Duty-Bound"],
            lastNotableInteraction="Aric pressed Aereth for answers near the burning warehouse while the guard struggled to hold the crowd back.",
        )
    ]


def build_seed_session_screen() -> SessionScreenResponseSchema:
    return SessionScreenResponseSchema(
        topbar=TopbarDataSchema(
            campaign=CampaignSchema(
                id=INITIAL_CAMPAIGN_ID,
                title="Shadows of Valemoor",
                subtitle="Campaign",
            ),
            playerProfile=PlayerProfileSchema(
                id="player-aric",
                name="Aric Valewalker",
                roleLabel="Player",
                statusLabel="Online",
            ),
            dateDisplay=DateDisplaySchema(
                fullDate="17th of Eldermoon, 1492 DR",
                phaseLabel="Dusk",
                timeLabel="7:42 PM",
                iconLabel="moon",
            ),
        ),
        sidebar=SidebarDataSchema(
            navItems=[
                NavItemSchema(key="campaigns", label="Campaigns", active=True),
                NavItemSchema(key="world", label="World", active=False),
                NavItemSchema(key="characters", label="Characters", active=False),
                NavItemSchema(key="locations", label="Locations", active=False),
                NavItemSchema(key="factions", label="Factions", active=False),
                NavItemSchema(key="quests", label="Quests", active=False),
                NavItemSchema(key="events", label="Events", active=False),
                NavItemSchema(key="inventory", label="Inventory", active=False),
                NavItemSchema(key="timeline", label="Timeline", active=False),
                NavItemSchema(key="settings", label="Settings", active=False),
            ],
            worldOverview=[
                WorldOverviewStatSchema(
                    key="faction-reputation",
                    label="Faction Reputation",
                    value="87",
                    sublabel="Honored",
                    tone="green",
                ),
                WorldOverviewStatSchema(
                    key="world-tension",
                    label="World Tension",
                    value="67%",
                    sublabel="High",
                    tone="amber",
                ),
                WorldOverviewStatSchema(
                    key="session-turn",
                    label="Session Turn",
                    value="128",
                    sublabel="/oo",
                    tone="violet",
                ),
            ],
        ),
        chat=ChatPanelDataSchema(
            messages=[
                GMChatMessageSchema(
                    id="msg-seed-gm-1",
                    role="gm",
                    time="7:41 PM",
                    lines=[
                        "The wind carries the scent of smoke and wet earth as you crest the ridge.",
                        "Below, Valemoor's spires pierce the dusk, wreathed in drifting ash.",
                        "From the eastern quarter, a column of dark smoke coils into the sky.",
                    ],
                    emphasis="The city is on edge.",
                ),
                PlayerChatMessageSchema(
                    id="msg-seed-player-1",
                    role="player",
                    time="7:41 PM",
                    lines=["I urge my mount down the path and head toward the smoke."],
                ),
            ],
            quickActions=[
                QuickActionSchema(key="attack", label="Attack"),
                QuickActionSchema(key="persuade", label="Persuade"),
                QuickActionSchema(key="investigate", label="Investigate"),
                QuickActionSchema(key="search", label="Search"),
                QuickActionSchema(key="more-actions", label="More Actions"),
            ],
        ),
        characterSheet=build_seed_character_sheet(),
        infoPanels=InfoPanelsDataSchema(
            location=MythosLocationSchema(
                id="loc-valemoor-east",
                name="Valemoor",
                region="Eastern Quarter",
                description="Smoke hangs over crowded streets while guards scramble around the burning warehouse.",
            ),
            journal=build_seed_journal_entries(),
            npcInFocus=NpcSchema(
                id="npc-aereth",
                name="Aereth",
                title="Captain of the Valemoor Guard",
                disposition="ally",
                dispositionSegments=3,
                summary="A disciplined guard captain keeping one eye on the blaze and the other on who might be listening.",
                lastNotableInteraction="Aric challenged him for answers as the warehouse burned behind them.",
                tags=[
                    CharacterTagSchema(label="Ally", tone="green"),
                    CharacterTagSchema(label="Trustworthy", tone="blue"),
                    CharacterTagSchema(label="Duty-Bound", tone="violet"),
                ],
            ),
            recentEvents=[
                WorldEventSchema(
                    id="evt-1",
                    time="7h ago",
                    text="Warehouse fire reported in the Eastern Quarter.",
                ),
                WorldEventSchema(
                    id="evt-2",
                    time="12h ago",
                    text="The Iron Concord forbids unsanctioned magic.",
                ),
                WorldEventSchema(
                    id="evt-3",
                    time="1d ago",
                    text="Caravan ambushed on the Old North Road.",
                ),
            ],
            relationships=RelationshipGraphDataSchema(
                nodes=[
                    RelationshipNodeSchema(
                        id="node-aric",
                        name="Aric",
                        subtitle="You",
                        disposition="ally",
                    ),
                    RelationshipNodeSchema(
                        id="node-aereth",
                        name="Aereth",
                        subtitle="Ally",
                        disposition="ally",
                    ),
                    RelationshipNodeSchema(
                        id="node-council",
                        name="Council of Valemoor",
                        subtitle="Neutral",
                        disposition="neutral",
                    ),
                ],
                edges=[
                    RelationshipEdgeSchema(
                        id="edge-1",
                        fromId="node-aric",
                        toId="node-aereth",
                        label="Trust",
                        disposition="ally",
                    )
                ],
            ),
        ),
    )
