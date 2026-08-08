import type { InputHTMLAttributes, ReactNode } from "react";
export type InputSize = "sm" | "md" | "lg" | "xl";
export type InputVariant = "default" | "success" | "error";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  starIcon?: ReactNode;
  endIcon?: ReactNode;
  inputSize?: InputSize;
  variant?: InputVariant;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  fullWidth?: boolean;
}
