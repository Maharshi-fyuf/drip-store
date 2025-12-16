"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/mockProducts";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/format";
import { Star, ShoppingCart, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);
    const product = PRODUCTS.find(p => p.id === id);
    const { addToCart } = useCartStore();
    const [related, setRelated] = useState<Product[]>([]);

    useEffect(() => {
        if (product) {
            const others = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
            setRelated(others.sort(() => 0.5 - Math.random()).slice(0, 4));
        }
    }, [product]);

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center text-white">Product not found.</div>
    );

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`SECURED THE DRIP: ${product.name}`);
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Sticky Left: Image */}
                    <div className="relative lg:sticky lg:top-32 h-fit">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl shadow-[#CCFF00]/5 border border-white/5 relative group"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    </div>

                    {/* Scrollable Right: Details */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full border border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-[#CCFF00]">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-white text-xs font-bold">{product.rating} / 5.0</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black italic text-white tracking-tight mb-4">{product.name}</h1>
                            <p className="text-5xl font-mono text-[#CCFF00] font-bold">{formatCurrency(product.price)}</p>
                        </div>

                        <div className="prose prose-invert prose-lg text-neutral-400 leading-relaxed">
                            <p>{product.description}</p>
                            <p>Premium grade materials sourced from the cyber-void. Engineered for maximum durability and aesthetic dominance.</p>
                        </div>

                        <div className="flex flex-col gap-4 p-6 bg-neutral-900/30 border border-white/5 rounded-2xl backdrop-blur-sm">
                            <div className="flex gap-4 text-sm text-neutral-400">
                                <div className="flex items-center gap-2"><Truck size={16} /> Free Shipping</div>
                                <div className="flex items-center gap-2"><RefreshCcw size={16} /> 30-Day Returns</div>
                                <div className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Checkout</div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full py-5 bg-[#CCFF00] hover:bg-[#b0dd00] text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_30px_-10px_rgba(204,255,0,0.5)] active:scale-95 flex items-center justify-center gap-3 text-lg"
                            >
                                <ShoppingCart size={24} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Items (Horizontal Scroll) */}
                <div className="mt-32">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-[#2957FF] rounded-full"></span>
                        YOU MIGHT ALSO LIKE
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {related.map((item) => (
                            <Link href={`/product/${item.id}`} key={item.id} className="group">
                                <div className="bg-neutral-900 rounded-xl overflow-hidden aspect-[4/5] mb-4 relative hover:-translate-y-2 transition-transform">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                        <p className="text-white font-bold leading-tight">{item.name}</p>
                                        <p className="text-[#CCFF00] font-mono text-sm">{formatCurrency(item.price)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
