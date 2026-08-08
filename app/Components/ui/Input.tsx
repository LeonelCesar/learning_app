import { forwardRef, useId } from "react";
import { cn } from "../../src/utils/cn";
import type {
  InputProps,
  InputSize,
  InputVariant,
} from "../../Components/ui/Input.types";

const inputSizeStyles: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-3.5 text-sm",
  lg: "h-12 px-4 text-base",
  xl: "",
};

const inputVariantStyles: Record<InputVariant, string> = {
  default: [
    "border-slate-300",
    "focus:border-blue-500",
    "focus:ring-blue-500/20",
  ].join(" "),

  success: [
    "border-emerald-500",
    "focus:border-emerald-500",
    "focus:ring-emerald-500/20",
  ].join(" "),

  error: [
    "border-red-500",
    "focus:border-red-500",
    "focus:ring-red-500/20",
  ].join(" "),
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      helperText,
      errorMessage,
      starIcon,
      endIcon,
      inputSize = "md",
      variant = "default",
      containerClassName,
      labelClassName,
      inputClassName,
      fullWidth = true,
      disabled,
      required,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...inputProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? name ?? `input-${generatedId}`;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorMessageId = errorMessage ? `${inputId}-error` : undefined;
    const resolvedVariant: InputVariant = errorMessage ? "error" : variant;

    const describedBy = [ariaDescribedBy, helperTextId, errorMessageId]
      .filter(Boolean)
      .join(" ");

    const hasStartIcon = Boolean(starIcon);
    const hasEndIcon = Boolean(endIcon);

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth && "w-full",
          containerClassName,
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-slate-700",
              disabled && "cursor-not-allowed text-slate-400",
              labelClassName,
            )}
          >
            {label}

            {required && (
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {starIcon && (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-3 top-1/2",
                "-translate-y-1/2 text-slate-400",
                "[&>svg]:size-4",
              )}
            >
              {starIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={errorMessage ? true : ariaInvalid}
            aria-describedby={describedBy || undefined}
            className={cn(
              "block rounded-lg border bg-white",
              "text-slate-900 outline-none",
              "placeholder:text-slate-400",
              "transition-colors duration-150",
              "focus:ring-4",
              "disabled:cursor-not-allowed",
              "disabled:bg-slate-100",
              "disabled:text-slate-500",
              "disabled:opacity-80",
              inputSizeStyles[inputSize],
              inputVariantStyles[resolvedVariant],
              hasStartIcon && "pl-10",
              hasEndIcon && "pr-10",
              fullWidth && "w-full",
              inputClassName,
            )}
            {...inputProps}
          />

          {endIcon && (
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-3 top-1/2",
                "-translate-y-1/2 text-slate-400",
                "[&>svg]:size-4",
              )}
            >
              {endIcon}
            </span>
          )}
        </div>

        {errorMessage ? (
          <p id={errorMessageId} role="alert" className="text-sm text-red-600">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={helperTextId} className="text-sm text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
