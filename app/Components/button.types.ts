import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLAllCollection> { 
    variant?: ButtonVariant; 
    size?: ButtonSize; 
    loading?: boolean; 
    fullWidth?: boolean; 
    leftIcon?: ReactNode; 
    rightIcon?: ReactNode; 
}
