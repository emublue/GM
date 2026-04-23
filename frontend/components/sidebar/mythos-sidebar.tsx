import type { NavItem, WorldOverviewStat } from "@/lib/types/mythos";
import sidebarBackdrop from "../img/25545.jpg";
import { OverviewStat, SidebarItem } from "../layout/mythos-primitives";

type MythosSidebarProps = {
  navItems: NavItem[];
  worldOverviewStats: WorldOverviewStat[];
};

export function MythosSidebar({ navItems, worldOverviewStats }: MythosSidebarProps) {
  return (
    <aside className="relative flex flex-col overflow-hidden border-r border-amber-200/12 bg-[linear-gradient(180deg,rgba(7,8,15,0.95),rgba(7,9,16,0.98))] px-3 py-5 shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.48]"
        style={{
          backgroundImage: `url(${sidebarBackdrop.src})`,
          backgroundPosition: "88% 22%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "280%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,15,0.48),rgba(5,7,13,0.64)_45%,rgba(5,7,13,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_right_28%,rgba(255,214,170,0.14),transparent_18%),linear-gradient(90deg,rgba(8,9,15,0.16),rgba(8,9,15,0.3)_28%,rgba(8,9,15,0.54)_100%)]" />

      <div className="relative z-10 mb-6 flex items-center gap-3 px-3 pt-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/30 bg-[radial-gradient(circle_at_50%_35%,rgba(196,181,253,0.35),rgba(139,92,246,0.16)_42%,rgba(17,17,27,0.92)_72%)] shadow-[0_0_30px_rgba(139,92,246,0.2)]">
          <div className="h-5 w-5 rotate-45 rounded-[4px] border border-violet-200/50 bg-violet-300/25" />
        </div>
        <div className="font-serif text-[26px] tracking-[0.01em] text-amber-100">Mythos</div>
      </div>

      <div className="relative z-10 space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      <div className="relative z-10 mt-4 overflow-hidden rounded-[24px] border border-amber-300/18 bg-[linear-gradient(180deg,rgba(18,18,24,0.82),rgba(11,11,18,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(76,29,149,0.14),transparent_42%)]" />
        <div className="mb-4 whitespace-nowrap text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/78">
          . World Overview .
        </div>
        <div className="space-y-3">
          {worldOverviewStats.map((stat) => (
            <OverviewStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </aside>
  );
}
