type ButtonProps = {
    children: React.ReactNode
}

function Button({ children }: ButtonProps) {
    return (
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            {children}
        </button>
    )
}

export default Button
