"use client";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer() {
    const { isOpen, toggleCart, items, updateQuantity, removeFromCart, totalPrice } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => toggleCart(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 p-6 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-blue-500" /> Your Cart
                            </h2>
                            <button onClick={() => toggleCart(false)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
                                <X className="text-neutral-400" />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-neutral-500">
                                <ShoppingBag size={48} className="mb-4 opacity-20" />
                                <p>Your bag is empty.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                                        <div className="w-20 h-20 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                            {/* In a real app, use Next/Image here */}
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg opacity-80" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-white line-clamp-1">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <p className="text-blue-400 font-mono text-sm mb-3">${item.price}</p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 bg-neutral-900 rounded-full p-1 border border-neutral-800">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-neutral-800 rounded-full text-white">
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-white text-sm font-mono w-6 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-neutral-800 rounded-full text-white">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {items.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold text-white">
                                    <span>Total</span>
                                    <span>${totalPrice().toFixed(2)}</span>
                                </div>
                                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/30">
                                    Checkout Now
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
