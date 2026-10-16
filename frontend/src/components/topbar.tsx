import { useNavigate } from "react-router-dom";
import { Sparkles, HelpCircle, ShieldCheck, LogOut } from "lucide-react";
import Button from "./button";

interface TopbarProps {
  title: string;
  subtitle: string;
  onOpenWalkthrough?: () => void;
}

export function Topbar({ title, subtitle, onOpenWalkthrough }: TopbarProps) {
  const navigate = useNavigate();

  // Retrieve current active user profile if saved during login
  let userName = "Morgan Vance";
  let userRole = "Analyst";
  let userInitials = "MV";

  try {
    const raw = localStorage.getItem("nexenarc_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.name) {
        userName = parsed.name;
        userInitials = parsed.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
      }
      if (parsed.role) {
        userRole = parsed.role.charAt(0).toUpperCase() + parsed.role.slice(1);
      }
    }
  } catch {
    // fallback to defaults
  }

  const handleSignOut = () => {
    localStorage.removeItem("nexenarc_user");
    navigate("/");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#5C5470]/40 bg-[#352F44] px-6 text-[#FAF0E6]">
      <div>
        <h2 className="text-base font-bold text-[#FAF0E6]">{title}</h2>
        <p className="text-xs text-[#B9B4C7]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {onOpenWalkthrough && (
          <button
            type="button"
            onClick={onOpenWalkthrough}
            className="flex items-center gap-1.5 rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/50 px-3 py-1.5 text-xs text-[#B9B4C7] hover:text-[#FAF0E6] hover:bg-[#5C5470]/30 transition cursor-pointer"
          >
            <HelpCircle size={14} />
            <span>Guide</span>
          </button>
        )}

        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate("/active-investigation")}
          className="text-xs"
        >
          <Sparkles size={13} className="text-[#FAF0E6]" />
          <span>Try a sample investigation</span>
        </Button>

        {/* User Status Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#5C5470]/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#5C5470]/60 text-xs font-semibold text-[#FAF0E6]">
            {userInitials}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-[#FAF0E6] leading-none">{userName}</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-[#B9B4C7]">
              <ShieldCheck size={11} className="text-[#34d399]" />
              <span>{userRole}</span>
            </div>
          </div>

          <button
            type="button"
            title="Sign out to Hero page"
            onClick={handleSignOut}
            className="ml-1 p-1.5 rounded-lg text-[#B9B4C7] hover:text-[#FAF0E6] hover:bg-[#5C5470]/30 transition cursor-pointer"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
