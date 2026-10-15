import {
  LayoutDashboard,
  Search,
  Shield,
  Radar,
  Users,
  FileText,
  History,
  Settings,
  HelpCircle,
} from "lucide-react";
import NavItem from "./nav_item";
import ArcLogo from "./arc_logo";

interface SidebarProps {
  onOpenWalkthrough?: () => void;
}

const navigationSections = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "New Investigation",
        path: "/new-investigation",
        icon: Search,
      },
      {
        label: "Active Investigation",
        path: "/active-investigation",
        icon: Shield,
      },
      {
        label: "Threat Lookup",
        path: "/threat-intelligence",
        icon: Radar,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Your AI Team",
        path: "/ai-agents",
        icon: Users,
      },
      {
        label: "Reports",
        path: "/reports",
        icon: FileText,
      },
      {
        label: "History",
        path: "/history",
        icon: History,
      },
      {
        label: "Settings",
        path: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function Sidebar({ onOpenWalkthrough }: SidebarProps) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-[#5C5470]/40 bg-[#352F44] px-4 py-5 text-[#FAF0E6]">
      {/* Brand Header */}
      <div className="mb-6 flex items-center gap-3 px-3">
        <ArcLogo size={30} />
        <div>
          <h1 className="text-base font-bold tracking-tight text-[#FAF0E6]">NexenArc</h1>
          <p className="text-[10px] uppercase tracking-wider text-[#B9B4C7]">
            Investigation Platform
          </p>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex flex-1 flex-col gap-6">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#B9B4C7]/60">
              {section.title}
            </p>

            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavItem key={item.path} label={item.label} icon={item.icon} path={item.path} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / Walkthrough trigger */}
      {onOpenWalkthrough && (
        <div className="mt-auto pt-4 border-t border-[#5C5470]/40">
          <button
            type="button"
            onClick={onOpenWalkthrough}
            className="flex w-full items-center gap-2.5 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 px-3 py-2.5 text-xs text-[#B9B4C7] hover:bg-[#5C5470]/30 hover:text-[#FAF0E6] transition cursor-pointer"
          >
            <HelpCircle size={15} />
            <span>How it works</span>
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
