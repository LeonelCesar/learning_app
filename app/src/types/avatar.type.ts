import type { 
    HTMLAttributes,
    ReactNode,
} from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> { 
    name: string; 
    src: string; 
    alt: string; 
    size?: AvatarSize; 
    status: AvatarStatus;
    fallback?: ReactNode; 
    showStatus?: boolean;
}