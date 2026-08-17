import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <aside className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0d1016] px-4 py-5 text-white">
            <div className="mb-8 px-3">
                <h1 className="text-xl font-semibold">NexenArc</h1>
            </div>

            <nav className="flex flex-col gap-1">
                <Link
                    to="/dashboard"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    Dashboard
                </Link>
                <Link
                    to="/new-investigation"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    New Investigation
                </Link>
                <Link
                    to="/active-investigation"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    Active Investigation
                </Link>
                <Link
                    to="/threat-intelligence"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    Threat Intelligence
                </Link>
                <Link
                    to="/ai-agents"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    AI Agents
                </Link>
                <Link
                    to="/settings"
                    className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                    Settings
                </Link>
            </nav>
        </aside>
    )
}
export default Sidebar