import {
    LayoutDashboard,
    Search,
    Shield,
    Radar,
    Bot,
    FileText,
    History,
    Settings,
} from "lucide-react"
import NavItem from "./nav_item"

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
                label: "Threat Intelligence",
                path: "/threat-intelligence",
                icon: Radar,
            }
        ]
    },
    {
        title: "Operations",
        items: [
            {
                label: "AI Agents",
                path: "/ai-agents",
                icon: Bot
            },
            {
                label: "Reports",
                path: "/reports",
                icon: FileText,
            },
            {
                label: "History",
                path: "/history",
                icon: History
            },
            {
                label: "Settings",
                path: "/settings",
                icon: Settings,
            }
        ]
    }
    
]

function Sidebar() {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0d1016] px-4 py-5 text-white">
            <div className="mb-8 px-3">
                <h1 className="text-xl font-semibold">NexenARC</h1>
            </div>

            <nav className="flex flex-col gap-6">
                {navigationSections.map((section) => (
                    <div key={section.title}>
                        <p className="mb=2 pb-4 pt-3 px-3 text-xs font-medium text-gray-500">{section.title}</p>

                        <div className="flex flex-col gap-1">
                            {section.items.map((item) => (
                                <NavItem
                                    key={item.path}
                                    label={item.label}
                                    icon={item.icon}
                                    path={item.path}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
export default Sidebar