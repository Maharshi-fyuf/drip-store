import { create } from 'zustand';
import { Product } from '@/data/mockProducts';
import { persist } from 'zustand/middleware';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    wishlist: number[]; // Store Product IDs
    isOpen: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, change: number) => void;
    toggleCart: (isOpen?: boolean) => void;
    totalPrice: () => number;
    itemCount: () => number;
    toggleWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            wishlist: [],
            isOpen: false,

            addToCart: (product) => {
                set((state) => {
                    const existing = state.items.find(item => item.id === product.id);
                    if (existing) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                            isOpen: true
                        };
                    }
                    return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
                });
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },

            updateQuantity: (productId, change) => {
                set((state) => ({
                    items: state.items.map(item => {
                        if (item.id === productId) {
                            const newQuantity = Math.max(0, item.quantity + change);
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    }).filter(item => item.quantity > 0)
                }));
            },

            toggleCart: (isOpen) => set((state) => ({ isOpen: isOpen ?? !state.isOpen })),

            totalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            itemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },

            toggleWishlist: (productId) => {
                set((state) => {
                    const exists = state.wishlist.includes(productId);
                    return {
                        wishlist: exists
                            ? state.wishlist.filter(id => id !== productId)
                            : [...state.wishlist, productId]
                    };
                });
            },

            isInWishlist: (productId) => {
                return get().wishlist.includes(productId);
            }
        }),
        {
            name: 'drip-storage',
            partialize: (state) => ({ items: state.items, wishlist: state.wishlist }), // Persist cart and wishlist
        }
    )
);
