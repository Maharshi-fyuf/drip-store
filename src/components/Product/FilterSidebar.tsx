"use client";
import { SlidersHorizontal } from "lucide-react";

export default function FilterSidebar() {
    return (
        <div className="w-full md:w-64 bg-neutral-900 p-6 rounded-2xl border border-neutral-800 h-fit">
            <div className="flex items-center gap-2 mb-6 text-white font-bold">
                <SlidersHorizontal size={20} className="text-blue-500" /> Filters
            </div>

            <div className="space-y-6">
                {/* Category */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">Category</h4>
                    <div className="space-y-2">
                        {['Electronics', 'Apparel', 'Accessories', 'Gaming'].map(cat => (
                            <label key={cat} className="flex items-center gap-3 text-neutral-300 hover:text-white cursor-pointer group">
                                <div className="w-4 h-4 border border-neutral-600 rounded group-hover:border-blue-500 flex items-center justify-center">
                                    {/* Checkbox state logic here */}
                                </div>
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">Price</h4>
                    <input type="range" className="w-full accent-blue-500 bg-neutral-800 h-2 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2">
                        <span>$0</span>
                        <span>$1000+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
