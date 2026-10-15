import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className = "", elevated = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#5C5470]/40 bg-[#352F44] p-5 text-[#FAF0E6] transition ${
        elevated ? "shadow-[0_8px_24px_rgba(34,30,43,0.45)]" : "shadow-sm"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
