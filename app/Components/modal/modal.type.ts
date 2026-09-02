import type { ReactNode } from 'react'; 

export interface ModalProps { 
    isOpen: boolean; 
    title: string;
    description?: string; 
    onClose: () => void;
    children: ReactNode; 
    footer?: ReactNode; 
    closeOnOverlayClick?: boolean;  
}