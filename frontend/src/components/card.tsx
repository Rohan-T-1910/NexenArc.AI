type CardProps = {
    children: React.ReactNode
    className?: string
}

function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`rounded-3xl border border-white/10 bg-[#0d1016] p-5 ${className}`}>
            {children}
        </div>
    )
}

export default Card