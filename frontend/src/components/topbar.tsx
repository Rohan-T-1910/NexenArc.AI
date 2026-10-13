type TopbarProps = {
    title: string
    subtitle: string
}


function Topbar({ title, subtitle }: TopbarProps) {
    return (
        <header className="flex h-16 items-center border-b border-white/10 bg-[#0d1016] px-6">
            <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
        </header>
    )
}
export default Topbar