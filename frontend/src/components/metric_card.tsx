import type { ReactNode } from "react";

type MetricCardProps = {
    title: string
    value: string | number
    description: string
    footer?: string
    icon?: ReactNode
    variant?: "blue" | "red" | "green" | "yellow"
}

function MetricCard({
    title,
    value,
    description,
    footer,
    icon,
    variant = "blue"
}: MetricCardProps) {
    const iconStyles = {
        blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        red: "border-red-500/30 bg-red-500/10 text-red-400",
        green: "border-green-500/30 bg-green-500/10 text-green-400",
        yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
    }
    return (
        <div className="rounded-3xl border border-white/10 bg-[#0d1016] p-5">
            <div className="flex items-start justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {title}
                </p>

                {icon && (
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${iconStyles[variant]}`}>
                        {icon}
                    </div>
                )}
            </div>

            <div className="mt-2">
                <p className="text-3xl font-semibold text-white">
                    {value}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                    ↗ {description}
                </p>
            </div>

            {footer && (
                <>
                    <div className="my-4 border-t border-white/10"/>
                    <p className="text-sm text-gray-500">
                        {footer}
                    </p>
                </>
            )}
        </div>
    )
}

export default MetricCard