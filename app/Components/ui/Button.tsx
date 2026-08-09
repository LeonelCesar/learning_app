'use client';

import type { ButtonProps } from "../button.types";

const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
  default:
    "bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:ring-gray-500",
} satisfies Record<string, string>;

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
} satisfies Record<string, string>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
    const isDisabled = props.disabled || loading;

  return (
    <button 
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-lg font-medium",
        "transition-colors duration-150",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
        {loading ? (
            <span
             aria-hidden="true"
             className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
    
        ) : (
            leftIcon && <span className="size-4">{leftIcon}</span>
        )}
        {children}
    </button>
  );
}
