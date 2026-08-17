type MetricCardProps = {
    title: string
    value: string | number
    description: string
}

function MetricCard({
    title,
    value,
    description,
}: MetricCardProps) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0d1016] p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
                { title }
            </p>

            <p className="mt-3 text-3xl font-semibold">
                { value }
            </p>

            <p className="mt-2 text-xs text-gray-500">
                { description }
            </p>
        </div>
    )
}

export default MetricCard