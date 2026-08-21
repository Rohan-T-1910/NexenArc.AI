type ButtonProps = {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "danger"
}

function Button({ children, variant = "primary" }: ButtonProps) {
    const baseStyles = "rounded-lg px-4 py-2 text-sm font-medium transition-colors"

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-500",
        secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
        danger: "bg-red-600 text-white hover:bg-red-500" 
    }
    return (
        <button className={`${baseStyles} ${variantStyles[variant]}`}>
            {children}
        </button>
    )
}

export default Button
