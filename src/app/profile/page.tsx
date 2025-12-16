"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, User, Star, Package, Clock, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 perspective-1000">
            <div className="relative w-full max-w-md h-[600px] perspective-1000 group">

                {/* Card Container with Flip Animation */}
                <motion.div
                    className="w-full h-full relative preserve-3d transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* FRONT OF CARD (VIP PASS) */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden border border-neutral-800 bg-[#0a0a0a] shadow-[0_0_50px_-12px_rgba(204,255,0,0.3)]"
                        onClick={() => setIsFlipped(true)}
                    >
                        {/* Holographic Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/10 via-transparent to-[#2957FF]/10 z-10 pointer-events-none mix-blend-overlay" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none" />

                        <div className="relative z-20 h-full flex flex-col p-8 justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <h2 className="text-4xl font-black italic text-[#ccff00] tracking-tighter">VIP</h2>
                                    <span className="text-neutral-500 font-mono text-xs tracking-[0.2em] uppercase">ACCESS GRANTED</span>
                                </div>
                                <QrCode size={48} className="text-white" />
                            </div>

                            <div className="text-center space-y-4 my-8">
                                <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-r from-[#ccff00] to-[#2957FF]">
                                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                            <User size={48} className="text-neutral-400" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-1">Alex Cyber</h1>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] text-xs font-bold uppercase tracking-wider">
                                        <ShieldCheck size={12} /> Tier: Legend
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-neutral-400 text-sm uppercase tracking-widest font-mono border-b border-neutral-900 pb-2">
                                    <span>Member ID</span>
                                    <span className="text-white">#8839-FLX</span>
                                </div>
                                <div className="flex justify-between text-neutral-400 text-sm uppercase tracking-widest font-mono border-b border-neutral-900 pb-2">
                                    <span>Valid Thru</span>
                                    <span className="text-white">12/30</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-400 hover:text-white text-xs uppercase tracking-widest transition-colors mt-4">
                                Tap to Flip
                            </button>
                        </div>
                    </div>

                    {/* BACK OF CARD (HISTORY) */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden border border-neutral-800 bg-[#0a0a0a] shadow-[0_0_50px_-12px_rgba(41,87,255,0.3)]"
                        style={{ transform: "rotateY(180deg)" }}
                        onClick={() => setIsFlipped(false)}
                    >
                        <div className="relative z-20 h-full flex flex-col p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Clock className="text-[#2957FF]" /> History
                                </h2>
                                <button className="text-xs text-neutral-500 hover:text-white uppercase tracking-wider">Close</button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-neutral-950/50 rounded-xl border border-neutral-900 hover:border-[#2957FF]/40 transition-colors group">
                                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center shrink-0">
                                            <Package size={20} className="text-neutral-600 group-hover:text-[#2957FF] transition-colors" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h4 className="text-white font-medium text-sm">Neon Mech 60</h4>
                                                <span className="text-[#ccff00] text-xs font-mono">₹14,999</span>
                                            </div>
                                            <p className="text-neutral-600 text-xs">Delivered • Dec {10 + i}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-neutral-900">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-neutral-500 text-xs uppercase tracking-wider">Total Spent</span>
                                    <span className="text-2xl font-bold text-white">₹1,42,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <p className="fixed bottom-8 text-neutral-600 text-xs uppercase tracking-[0.3em] opacity-50">
                DRIP // MEMBERSHIP
            </p>
        </div>
    );
}
