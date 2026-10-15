import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}

export function NavItem({ label, path, icon: Icon }: NavItemProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition cursor-pointer ${
          isActive
            ? "bg-[#5C5470]/60 text-[#FAF0E6] shadow-[0_2px_8px_rgba(34,30,43,0.3)] font-semibold"
            : "text-[#B9B4C7] hover:bg-[#5C5470]/30 hover:text-[#FAF0E6]"
        }`
      }
    >
      <Icon size={17} />
      <span>{label}</span>
    </NavLink>
  );
}

export default NavItem;
