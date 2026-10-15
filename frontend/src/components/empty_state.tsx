import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Button from "./button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryAction?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#5C5470]/60 bg-[#352F44]/50 p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5C5470]/40 text-[#FAF0E6] mb-4">
        <Icon size={26} />
      </div>
      <h3 className="text-base font-semibold text-[#FAF0E6]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[#B9B4C7]">{description}</p>

      {(actionLabel || secondaryAction) && (
        <div className="mt-5 flex items-center gap-3">
          {actionLabel && onAction && (
            <Button size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
