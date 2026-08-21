import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type NavItemProps = {
    label: string
    path: string
    icon: LucideIcon
}

function NavItem({ label, path, icon: Icon}: NavItemProps) {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => 
                isActive
                    ?"flex items-center gap-3 rounded-lg bg-[#20242c] px-3 py-2 text-sm font-medium text-white outline-none"
                    :"flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none hover:bg-white/5 hover:text-white"
            }
        >
            <Icon size={18}/>
            <span>{label}</span>
        </NavLink>
    )
}
export default NavItem