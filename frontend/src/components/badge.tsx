type BadgeProps = {
    children: React.ReactNode
    variant?: "critical" | "high" | "medium" | "low" | "success"
}

function Badge({ children, variant = "medium"}: BadgeProps) {
    const variantStyles = {
        critical: "bg-red-500/10 border-red-500/20 text-red-400",
        high: "bg-orange-500/10 border-orange-500/20 text-orange-400",
        medium: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        low: "bg-gray-500/10 border-gray-500/20 text-gray-400",
        success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    }

    return (
        <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${variantStyles[variant]}`}>
            {children}
        </span>
    )
}
export default Badge