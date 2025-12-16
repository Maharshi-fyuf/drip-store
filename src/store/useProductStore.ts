import { create } from 'zustand';
import { Product, PRODUCTS } from '@/data/mockProducts';

interface ProductState {
    query: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
    filteredProducts: Product[];
    setQuery: (q: string) => void;
    setPriceRange: (min: number, max: number) => void;
    setMinRating: (r: number) => void;
    setSortBy: (s: 'price-asc' | 'price-desc' | 'rating' | 'newest') => void;
    applyFilters: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
    query: "",
    minPrice: 0,
    maxPrice: 500000,
    minRating: 0,
    sortBy: 'newest',
    filteredProducts: PRODUCTS,

    setQuery: (q) => {
        set({ query: q });
        get().applyFilters();
    },
    setPriceRange: (min, max) => {
        set({ minPrice: min, maxPrice: max });
        get().applyFilters();
    },
    setMinRating: (r) => {
        set({ minRating: r });
        get().applyFilters();
    },
    setSortBy: (s) => {
        set({ sortBy: s });
        get().applyFilters();
    },

    applyFilters: () => {
        const { query, minPrice, maxPrice, minRating, sortBy } = get();

        const result = PRODUCTS.filter(p => {
            const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase());
            const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
            const matchesRating = p.rating >= minRating;
            return matchesQuery && matchesPrice && matchesRating;
        });

        // Sort
        if (sortBy === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }
        // 'newest' implied as default order or id desc

        set({ filteredProducts: result });
    }
}));
