import type { ReactNode } from "react";

export type BadgeVariant = "critical" | "high" | "medium" | "low" | "safe" | "subtle";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  showDot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "subtle",
  size = "md",
  showDot = false,
  className = "",
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
    critical: {
      container: "bg-[#fb7185]/15 border-[#fb7185]/30 text-[#fb7185]",
      dot: "bg-[#fb7185] shadow-[0_0_6px_#fb7185]",
    },
    high: {
      container: "bg-[#fb923c]/15 border-[#fb923c]/30 text-[#fb923c]",
      dot: "bg-[#fb923c] shadow-[0_0_6px_#fb923c]",
    },
    medium: {
      container: "bg-[#facc15]/15 border-[#facc15]/30 text-[#facc15]",
      dot: "bg-[#facc15] shadow-[0_0_6px_#facc15]",
    },
    low: {
      container: "bg-[#b9b4c7]/15 border-[#b9b4c7]/30 text-[#b9b4c7]",
      dot: "bg-[#b9b4c7] shadow-[0_0_6px_#b9b4c7]",
    },
    safe: {
      container: "bg-[#34d399]/15 border-[#34d399]/30 text-[#34d399]",
      dot: "bg-[#34d399] shadow-[0_0_6px_#34d399]",
    },
    subtle: {
      container: "bg-[#5c5470]/30 border-[#5c5470]/50 text-[#b9b4c7]",
      dot: "bg-[#b9b4c7]",
    },
  };

  const sizeStyles = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  const current = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeStyles} ${current.container} ${className}`}
    >
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} />}
      {children}
    </span>
  );
}

export default Badge;
