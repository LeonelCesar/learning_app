"use client";

import { useMemo, useState } from "react";

import type {
  AvatarProps,
  AvatarSize,
  AvatarStatus,
} from "../../src/types/avatar.type";

const sizeStyles: Record<AvatarSize, string> = {
  xs: "size-7 text-xs",
  sm: "size-9 text-sm",
  md: "size-11 text-sm",
  lg: "size-14 text-base",
  xl: "size-20 text-xl",
};

const statusSizeStyles: Record<AvatarSize, string> = {
  xs: "size-2",
  sm: "size-2.5",
  md: "size-3",
  lg: "size-3.5",
  xl: "size-4",
};

const statusStyles: Record<AvatarStatus, string> = { 
    online: "bg-green-500",
    offline: "bg-slate-400",
    busy: "bg-red-500",
    away: "bg-amber-400",
};

function getInitials(name: string): string { 
    return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}; 


export function Avatar({
  name,
  src,
  alt,
  size = "md",
  status = "offline",
  fallback,
  showStatus = false,
  className = "",
  ...props
}: AvatarProps) {
  const [hasImageError, setHasImageError] =
    useState(false);

  const initials = useMemo(
    () => getInitials(name),
    [name],
  );

  const shouldShowImage =
    Boolean(src) && !hasImageError;

  return (
    <div
      className={[
        "relative inline-flex shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div
        className={[
          "flex items-center justify-center",
          "overflow-hidden rounded-full",
          "bg-slate-200 font-semibold text-slate-700",
          "ring-1 ring-slate-200",
          sizeStyles[size],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt ?? name}
            onError={() =>
              setHasImageError(true)
            }
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-label={name}>
            {fallback ?? initials}
          </span>
        )}
      </div>

      {showStatus && (
        <span
          aria-label={`Status: ${status}`}
          className={[
            "absolute bottom-0 right-0",
            "rounded-full border-2 border-white",
            statusStyles[status],
            statusSizeStyles[size],
          ].join(" ")}
        />
      )}
    </div>
  );
}
