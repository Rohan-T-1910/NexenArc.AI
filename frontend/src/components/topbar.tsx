function Topbar() {
    return (
        <header className="flex h-16 items-center border-b border-white/10 bg-[#0d1016] px-6">
            <div className="text-sm font-semibold">
                <h2>Security Operations Dashboard</h2>
                <p className="text-xs text-gray-500">Real-time posture across agents, artifacts and incidents</p>
            </div>
        </header>
    )
}
export default Topbar