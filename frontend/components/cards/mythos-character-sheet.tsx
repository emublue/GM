import { User } from "lucide-react";
import type { MythosCharacter } from "@/lib/types/mythos";
import { Panel, PlayerAvatar, Tag } from "../layout/mythos-primitives";

type MythosCharacterSheetProps = {
  character: MythosCharacter;
};

export function MythosCharacterSheet({ character }: MythosCharacterSheetProps) {
  const hpPercent = Math.round((character.hitPoints.current / character.hitPoints.maximum) * 100);

  return (
    <div className="w-[380px] shrink-0 transition-[width] duration-300 ease-out hover:w-[520px] focus-within:w-[520px]">
      <Panel
        title="Character Sheet"
        icon={User}
        className="h-[calc(100vh-144px)] overflow-hidden px-5 py-5"
      >
        <div className="mythos-chat-scroll h-full overflow-y-auto pr-1">
          <div className="grid gap-5">
            <div className="grid grid-cols-[96px_1fr] items-start gap-3">
              <div className="relative flex w-[96px] shrink-0 self-start flex-col items-center rounded-[22px] border border-amber-300/18 bg-[linear-gradient(180deg,rgba(75,75,88,0.18),rgba(18,18,25,0.94))] px-2.5 py-3">
                <PlayerAvatar />
                <div className="mt-3 text-center">
                  <div className="font-serif text-[16px] text-stone-100">Level {character.level}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-amber-200/75">
                    {character.className}
                  </div>
                  <div className="mt-1 text-[11px] text-stone-400/80">{character.ancestry}</div>
                </div>
                <div className="mt-3 w-full rounded-2xl border border-white/8 bg-white/[0.03] px-2 py-2.5 text-center">
                  <div className="text-[10px] uppercase tracking-[0.08em] text-stone-400/80">
                    Proficiency
                  </div>
                  <div className="mt-1 font-serif text-[22px] leading-none text-violet-200">
                    +{character.proficiencyBonus}
                  </div>
                </div>
              </div>

              <div className="min-w-0 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-serif text-[36px] leading-[0.95] text-stone-100">
                      {character.name}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-[13px] text-stone-300/82">
                      <span>Background: {character.background}</span>
                      <span>Alignment: {character.alignment}</span>
                      <span>XP: {character.experience.toLocaleString()}</span>
                      <span>Passive Perception: {character.passivePerception}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {character.tags.map((tag) => (
                        <Tag key={tag.label} color={tag.tone}>
                          {tag.label}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12px] text-stone-300/80">
                      Open Sheet
                    </button>
                    <button className="rounded-xl border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[12px] text-stone-400/80">
                      ...
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-[20px] border border-amber-300/18 bg-[linear-gradient(180deg,rgba(34,24,20,0.26),rgba(18,18,25,0.92))] px-2 py-3 text-center shadow-[0_0_0_1px_rgba(245,158,11,0.05)]">
                <div className="text-[12px] uppercase tracking-[0.18em] text-stone-400/80">AC</div>
                <div className="mt-2 font-serif text-[28px] leading-none text-stone-100">
                  {character.armorClass}
                </div>
              </div>
              <div className="rounded-[20px] border border-violet-300/16 bg-[linear-gradient(180deg,rgba(28,20,40,0.28),rgba(18,18,25,0.92))] px-2 py-3 text-center shadow-[0_0_0_1px_rgba(168,85,247,0.06)]">
                <div className="text-[12px] uppercase tracking-[0.18em] text-stone-400/80">Init</div>
                <div className="mt-2 font-serif text-[28px] leading-none text-stone-100">
                  {character.initiative}
                </div>
              </div>
              <div className="rounded-[20px] border border-sky-300/14 bg-[linear-gradient(180deg,rgba(18,28,40,0.26),rgba(18,18,25,0.92))] px-2 py-3 text-center shadow-[0_0_0_1px_rgba(56,189,248,0.05)]">
                <div className="text-[12px] uppercase tracking-[0.18em] text-stone-400/80">
                  Speed
                </div>
                <div className="mt-2 font-serif text-[28px] leading-none text-stone-100">
                  {character.speed}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div>
                <div className="mb-2 flex items-center justify-between text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                  <span>Hit Points</span>
                  <span>
                    {character.hitPoints.current} / {character.hitPoints.maximum}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#f97316,#fb7185)]"
                    style={{ width: `${hpPercent}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                  <div className="text-[12px] uppercase tracking-[0.16em] text-stone-400/80">
                    Hit Dice
                  </div>
                  <div className="mt-1 text-[16px] text-stone-100">{character.hitDice}</div>
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                  <div className="text-[12px] uppercase tracking-[0.16em] text-stone-400/80">
                    Death Saves
                  </div>
                  <div className="mt-1 text-[16px] text-stone-100">
                    Success {character.deathSaves.successes} / Fail {character.deathSaves.failures}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {character.abilityScores.map((ability) => (
                <div
                  key={ability.abbr}
                  className="rounded-[20px] border border-white/6 bg-white/[0.02] px-4 py-3 text-center"
                >
                  <div className="text-[12px] uppercase tracking-[0.2em] text-stone-400/80">
                    {ability.abbr}
                  </div>
                  <div className="mt-1.5 font-serif text-[30px] leading-none text-stone-100">
                    {ability.score}
                  </div>
                  <div className="mt-1.5 text-[14px] text-violet-200">
                    {ability.modifier >= 0 ? `+${ability.modifier}` : ability.modifier}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <div className="rounded-[20px] border border-violet-300/12 bg-[linear-gradient(180deg,rgba(30,20,42,0.22),rgba(16,16,22,0.92))] p-4">
                <div className="text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                  Saving Throws
                </div>
                <div className="mt-3 space-y-2 text-[15px] text-stone-200/88">
                  {character.savingThrows.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-violet-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-emerald-300/12 bg-[linear-gradient(180deg,rgba(16,34,28,0.2),rgba(16,16,22,0.92))] p-4">
                <div className="text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                  Skill Proficiencies
                </div>
                <div className="mt-3 grid grid-cols-1 gap-y-2 text-[14px] text-stone-200/88">
                  {character.skillProficiencies.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[20px] border border-amber-300/14 bg-white/[0.02] p-4">
                <div className="text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                  Attacks & Spellcasting
                </div>
                <div className="mt-3 space-y-2 text-[15px] leading-7 text-stone-200/88">
                  {character.attacks.map((attack) => (
                    <div key={attack.id}>
                      {attack.name}: {attack.bonus}, {attack.effect}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-4">
                <div className="text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                  Features & Effects
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {character.features.map((effect) => (
                    <Tag key={effect} color="violet">
                      {effect}
                    </Tag>
                  ))}
                </div>
                <div className="mt-4 text-[14px] leading-6 text-stone-300/84">
                  Languages: {character.languages.join(", ")}
                  <br />
                  Senses: {character.senses.join(", ")}
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-amber-300/14 bg-white/[0.02] p-4">
              <div className="text-[13px] uppercase tracking-[0.16em] text-stone-400/80">
                Equipment
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {character.equipment.map((item) => (
                  <Tag key={item} color="amber">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
