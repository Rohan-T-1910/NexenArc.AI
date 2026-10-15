import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#B9B4C7]/40";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[#FAF0E6] text-[#221E2B] hover:bg-[#FAF0E6]/90 shadow-[0_2px_12px_rgba(250,240,230,0.12)] font-semibold",
    secondary:
      "bg-[#352F44] text-[#FAF0E6] border border-[#5C5470]/70 hover:bg-[#5C5470]/40 hover:border-[#B9B4C7]/50",
    outline:
      "bg-transparent text-[#B9B4C7] border border-[#5C5470]/60 hover:text-[#FAF0E6] hover:border-[#B9B4C7]/60",
    ghost: "bg-transparent text-[#B9B4C7] hover:bg-[#352F44] hover:text-[#FAF0E6]",
    danger: "bg-[#fb7185]/20 text-[#fb7185] border border-[#fb7185]/40 hover:bg-[#fb7185]/30",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}

export default Button;
