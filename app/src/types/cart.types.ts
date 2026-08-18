export interface Product { 
    id: string;
    name: string;
    price: number; 
    imageUrl?: string;
}

export interface CartItem extends Product { 
    quantity: number;
}