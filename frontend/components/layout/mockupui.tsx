import {
  campaign,
  character,
  currentDate,
  events,
  location,
  messages,
  navItems,
  npc,
  player,
  quickActions,
  quest,
  relationships,
  worldOverviewStats,
} from "@/lib/mock/mythos";
import { MythosCharacterSheet } from "../cards/mythos-character-sheet";
import { MythosInfoPanels } from "../cards/mythos-info-panels";
import { MythosChatPanel } from "../chat/mythos-chat-panel";
import { MythosSidebar } from "../sidebar/mythos-sidebar";
import { MythosTopbar } from "../topbar/mythos-topbar";

//MOCKUP!!!
export default function MythosGMUIMockup() {
  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(88,28,135,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_24%),linear-gradient(180deg,#06070d_0%,#05070d_100%)]">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative grid min-h-screen grid-cols-[224px_1fr]">
          <MythosSidebar navItems={navItems} worldOverviewStats={worldOverviewStats} />

          <main className="grid min-h-screen grid-rows-[96px_1fr]">
            <MythosTopbar campaign={campaign} player={player} date={currentDate} />

            <section className="space-y-6 px-6 py-6">
              <div className="flex min-h-0 items-stretch gap-6">
                <div className="min-w-0 flex-[1.55]">
                  <MythosChatPanel messages={messages} quickActions={quickActions} />
                </div>
                <MythosCharacterSheet character={character} />
              </div>

              <MythosInfoPanels
                location={location}
                quest={quest}
                npc={npc}
                events={events}
                relationships={relationships}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
