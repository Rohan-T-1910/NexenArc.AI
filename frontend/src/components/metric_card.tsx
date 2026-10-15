import type { ReactNode } from "react";

export type MetricVariant = "linen" | "rose" | "amber" | "emerald" | "slate";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  footer?: string;
  icon?: ReactNode;
  variant?: MetricVariant;
}

export function MetricCard({
  title,
  value,
  description,
  footer,
  icon,
  variant = "linen",
}: MetricCardProps) {
  const iconStyles: Record<MetricVariant, string> = {
    linen: "border-[#FAF0E6]/30 bg-[#FAF0E6]/10 text-[#FAF0E6]",
    rose: "border-[#fb7185]/30 bg-[#fb7185]/10 text-[#fb7185]",
    amber: "border-[#fb923c]/30 bg-[#fb923c]/10 text-[#fb923c]",
    emerald: "border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]",
    slate: "border-[#B9B4C7]/30 bg-[#B9B4C7]/10 text-[#B9B4C7]",
  };

  return (
    <div className="rounded-2xl border border-[#5C5470]/50 bg-[#352F44] p-5 shadow-sm transition hover:border-[#B9B4C7]/40">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#B9B4C7]">{title}</p>

        {icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconStyles[variant]}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-3xl font-bold tracking-tight text-[#FAF0E6]">{value}</p>
        <p className="mt-1 text-xs font-medium text-[#B9B4C7]">{description}</p>
      </div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-[#5C5470]/40">
          <p className="text-xs text-[#B9B4C7]">{footer}</p>
        </div>
      )}
    </div>
  );
}

export default MetricCard;
