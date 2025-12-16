"use client";
import { useProductStore } from "@/store/useProductStore";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchSidebar() {
    const { query, setQuery, minPrice, maxPrice, setPriceRange, sortBy, setSortBy } = useProductStore();
    const [localQuery, setLocalQuery] = useState(query);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(localQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [localQuery, setQuery]);

    return (
        <div className="w-full md:w-72 bg-neutral-900/50 backdrop-blur-xl p-6 rounded-2xl border border-neutral-800 h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
                <SlidersHorizontal size={20} className="text-blue-500" />
                Advanced Filter
            </div>

            <div className="space-y-8">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input
                        type="text"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>

                {/* Sort */}
                <div>
                    <h4 className="text-xs font-bold text-neutral-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <ArrowUpDown size={14} /> Sort By
                    </h4>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'rating')}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Price Range</h4>
                        <span className="text-blue-400 font-mono text-xs">₹{minPrice} - ₹{maxPrice}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => setPriceRange(0, parseInt(e.target.value))}
                        className="w-full accent-blue-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-600 mt-2 font-mono">
                        <span>₹0</span>
                        <span>₹1L+</span>
                    </div>
                </div>

                {/* Categories (Static for now, could be dynamic) */}
                <div>
                    <h4 className="text-xs font-bold text-neutral-500 mb-3 uppercase tracking-wider">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {['Electronics', 'Fashion', 'Gaming', 'Home', 'Beauty'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setLocalQuery(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${localQuery.includes(cat) ? 'bg-blue-600 text-white border-blue-500' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
