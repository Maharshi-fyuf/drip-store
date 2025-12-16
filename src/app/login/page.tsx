"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Mail, Smartphone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
    const [mode, setMode] = useState<'phone' | 'email'>('phone');
    const [step, setStep] = useState<'input' | 'otp'>('input');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [identifier, setIdentifier] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Spotlight Effect logic
    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: ev.clientX - rect.left,
                y: ev.clientY - rect.top,
            });
        };

        const card = cardRef.current;
        card?.addEventListener('mousemove', updateMousePosition);
        return () => card?.removeEventListener('mousemove', updateMousePosition);
    }, []);

    // Cooldown Timer logic
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleGetAccess = () => {
        if (!identifier) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('otp');
            setCooldown(30);
            if (rememberMe) {
                localStorage.setItem('drip_user', identifier);
            }
        }, 1500);
    };

    const handleVerify = () => {
        setLoading(true);
        setTimeout(() => {
            router.push('/profile');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#CCFF00]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#2957FF]/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Spotlight Card */}
            <div
                ref={cardRef}
                className="relative w-full max-w-md bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl group"
            >
                {/* The Spotlight Overlay */}
                <div
                    className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(204, 255, 0, 0.06), transparent 40%)`
                    }}
                />

                {/* Content */}
                <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black italic text-white tracking-tight mb-2">SECURE <span className="text-[#CCFF00]">ACCESS</span></h1>
                        <p className="text-neutral-500 text-sm">Enter the portal to claim your drip.</p>
                    </div>

                    <div className="flex bg-black/50 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => { setMode('phone'); setStep('input'); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'phone' ? 'bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <Smartphone size={16} /> Phone
                        </button>
                        <button
                            onClick={() => { setMode('email'); setStep('input'); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'email' ? 'bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            <Mail size={16} /> Email
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'input' ? (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                                        {mode === 'phone' ? 'Mobile Number' : 'Email Address'}
                                    </label>
                                    <input
                                        type={mode === 'phone' ? 'tel' : 'email'}
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder={mode === 'phone' ? '+91 98765 43210' : 'hypebeast@drip.com'}
                                        className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-mono"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div
                                        onClick={() => setRememberMe(!rememberMe)}
                                        className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${rememberMe ? 'bg-[#CCFF00] border-[#CCFF00]' : 'border-neutral-700 bg-black/50'}`}
                                    >
                                        {rememberMe && <CheckCircle2 size={12} className="text-black" />}
                                    </div>
                                    <span className="text-sm text-neutral-400 select-none">Remember this device</span>
                                </div>

                                <button
                                    onClick={handleGetAccess}
                                    disabled={!identifier || loading}
                                    className="w-full py-4 bg-[#CCFF00] hover:bg-[#b3e600] disabled:opacity-50 disabled:hover:bg-[#CCFF00] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-[#CCFF00]/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={18} /></>}
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 text-center">
                                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                                        Enter Verification Code
                                    </label>
                                    <div className="flex gap-3 justify-center">
                                        {[1, 2, 3, 4].map((i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-12 h-16 bg-black/50 border border-neutral-800 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-2">
                                        Sent to {identifier}
                                    </p>
                                </div>

                                <button
                                    onClick={handleVerify}
                                    disabled={loading}
                                    className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Verify & Enter"}
                                </button>

                                <div className="text-center">
                                    <button
                                        disabled={cooldown > 0}
                                        onClick={handleGetAccess}
                                        className="text-xs text-neutral-500 hover:text-[#CCFF00] disabled:text-neutral-700 disabled:hover:text-neutral-700 transition-colors uppercase tracking-wider font-bold"
                                    >
                                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <p className="fixed bottom-8 text-neutral-600 text-xs font-mono uppercase tracking-[0.3em] opacity-30">
                ENCRYPTED CONNECTION // V.4.0.2
            </p>
        </div>
    )
}
