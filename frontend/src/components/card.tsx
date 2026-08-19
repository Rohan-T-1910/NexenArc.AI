type CardProps = {
    children: React.ReactNode
}

function Card({ children }: CardProps) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0d1016] p-5">
            {children}
        </div>
    )
}

export default Card