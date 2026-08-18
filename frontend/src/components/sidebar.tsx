import { Link } from "react-router-dom"

const navigationItems = [
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
    },
    {
        label: "AI Agents",
        path: "/ai-agents"
    },
    {
        label: "Settings",
        path: "/settings"
    }
]

function Sidebar() {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0d1016] px-4 py-5 text-white">
            <div className="mb-8 px-3">
                <h1 className="text-xl font-semibold">NexenARC</h1>
            </div>

            <nav className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
export default Sidebar