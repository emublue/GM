from app.schemas.session import SessionScreenResponseSchema
from app.schemas.shared import (
    AbilityScoreSchema,
    ActiveQuestSchema,
    AttackEntrySchema,
    CampaignSchema,
    CharacterTagSchema,
    DateDisplaySchema,
    GMChatMessageSchema,
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
)
from app.schemas.session import (
    ChatPanelDataSchema,
    InfoPanelsDataSchema,
    RelationshipGraphDataSchema,
    SidebarDataSchema,
    TopbarDataSchema,
)


def build_session_screen_response(campaign_id: str) -> SessionScreenResponseSchema | None:
    if campaign_id != "shadows-of-valemoor":
        return None

    return SessionScreenResponseSchema(
        topbar=TopbarDataSchema(
            campaign=CampaignSchema(
                id="shadows-of-valemoor",
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
                    id="msg-1",
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
                    id="msg-2",
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
        characterSheet=MythosCharacterSchema(
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
        ),
        infoPanels=InfoPanelsDataSchema(
            activeQuest=ActiveQuestSchema(
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
            ),
            location=MythosLocationSchema(
                id="loc-valemoor-east",
                name="Valemoor",
                region="Eastern Quarter",
                description="Smoke hangs over crowded streets while guards scramble around the burning warehouse.",
            ),
            npcInFocus=NpcSchema(
                id="npc-aereth",
                name="Aereth",
                title="Captain of the Valemoor Guard",
                disposition="ally",
                dispositionSegments=3,
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
