"use client";
import { useEffect, useState, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Loader2, Heart } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { toast } from "sonner";
import Link from "next/link";
import { Product } from "@/data/mockProducts";

export default function ProductFeed() {
    const { filteredProducts, applyFilters } = useProductStore();
    const { addToCart, toggleWishlist, wishlist } = useCartStore();

    // Pagination State
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const PAGE_SIZE = 12;
    const observerTarget = useRef(null);

    // Initial Filter Apply
    useEffect(() => {
        applyFilters();
    }, []);

    // Reset pagination when filters change
    useEffect(() => {
        setPage(1);
        setDisplayedProducts(filteredProducts.slice(0, PAGE_SIZE));
    }, [filteredProducts]);

    // Load More Logic
    const loadMore = async () => {
        if (loading || displayedProducts.length >= filteredProducts.length) return;
        setLoading(true);

        // Simulating smooth "waterfall" delay just for feel
        await new Promise(resolve => setTimeout(resolve, 600));

        const nextPage = page + 1;
        const newItems = filteredProducts.slice(0, nextPage * PAGE_SIZE);

        setDisplayedProducts(newItems);
        setPage(nextPage);
        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [loading, displayedProducts, filteredProducts]);

    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        addToCart(product);
        toast.success(`SECURED THE DRIP: ${product.name}`);
    };

    const handleWishlist = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        toggleWishlist(id);
    };

    return (
        <div className="space-y-12">
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {displayedProducts.map((product, index) => (
                        <Link href={`/product/${product.id}`} key={product.id}>
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: (index % PAGE_SIZE) * 0.05 }}
                                className="group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-600 transition-all hover:-translate-y-1 shadow-lg hover:shadow-blue-900/10 flex flex-col h-full relative"
                            >
                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => handleWishlist(product.id, e)}
                                    className="absolute top-3 right-3 z-10 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black transition-colors group/heart"
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-all duration-300 ${wishlist.includes(product.id) ? 'fill-[#CCFF00] text-[#CCFF00] scale-110' : 'group-hover/heart:scale-110'}`}
                                    />
                                </button>

                                <div className="h-64 bg-neutral-800 relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                                        {product.category}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white text-md leading-tight line-clamp-1">{product.name}</h3>
                                        <span className="text-blue-400 font-mono font-bold">{formatCurrency(product.price)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs text-neutral-400 font-medium">{product.rating}</span>
                                    </div>
                                    <p className="text-neutral-500 text-xs line-clamp-2 mb-4 flex-1 leading-relaxed">
                                        {product.description}
                                    </p>

                                    <button
                                        onClick={(e) => handleAddToCart(product, e)}
                                        className="mt-auto w-full py-3 bg-neutral-800 hover:bg-white hover:text-black text-white rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-bold active:scale-95"
                                    >
                                        <ShoppingCart size={16} /> Add to Cart
                                    </button>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Loading / Sentinel */}
            <div ref={observerTarget} className="h-24 flex items-center justify-center w-full">
                {displayedProducts.length < filteredProducts.length ? (
                    <div className="flex flex-col items-center gap-2 text-neutral-500">
                        <Loader2 className="animate-spin text-blue-500" />
                        <span className="text-xs animate-pulse font-mono">LOADING ASSETS...</span>
                    </div>
                ) : (
                    <p className="text-neutral-700 text-xs font-mono uppercase tracking-widest">End of Feed</p>
                )}
            </div>
        </div>
    )
}
