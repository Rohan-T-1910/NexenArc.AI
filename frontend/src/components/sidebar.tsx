import { NavLink } from "react-router-dom"

const navigationSections = [
    {
        title: "Workspace",
        items: [
            {
                label: "Dashboard",
                path: "/dashboard"
            },
            {
                label: "New Investigation",
                path: "/new-investigation"
            },
            {
                label: "Active Investigation",
                path: "/active-investigation"
            },
            {
                label: "Threat Intelligence",
                path: "/threat-intelligence"
            }
        ]
    },
    {
        title: "Operations",
        items: [
            {
                label: "AI Agents",
                path: "/ai-agents"
            },
            {
                label: "Settings",
                path: "/settings"
            },
            {
                label: "Reports",
                path: "/reports"
            },
            {
                label: "History",
                path: "/history"
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

            <nav className="flex flex-col gap-1">
                {navigationSections.map((section) => (
                    <div key={section.title}>
                        <p className="mb=2 pb-4 pt-3 px-3 text-xs font-medium text-gray-500">{section.title}</p>

                        <div className="flex flex-col gap-1">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={
                                        ({ isActive }) =>
                                            isActive 
                                                ? "rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white"
                                                : "rounded-lg px-3 py-2 text-sm trext-gray-300 hover:bg-white/5 hover:text-white"
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
export default Sidebar