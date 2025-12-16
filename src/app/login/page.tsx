"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Mail, Smartphone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

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

    const handleAuth = async () => {
        if (!email || !password) return;
        setLoading(true);
        setError(null);

        try {
            if (mode === 'signin') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/profile');
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                toast.success('Check your email for the confirmation link!');
            }
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            }
        });
        if (error) toast.error(error.message);
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
                            onClick={() => setMode('signin')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'signin' ? 'bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'signup' ? 'bg-[#CCFF00] text-black shadow-lg shadow-[#CCFF00]/20' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="hypebeast@drip.com"
                                        className="w-full bg-black/50 border border-neutral-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-black/50 border border-neutral-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] transition-all font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs text-center font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleAuth}
                            disabled={!email || !password || loading}
                            className="w-full py-4 bg-[#CCFF00] hover:bg-[#b3e600] disabled:opacity-50 disabled:hover:bg-[#CCFF00] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-[#CCFF00]/20 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (mode === 'signin' ? "ENTER THE VOID" : "JOIN THE CULT")} <ArrowRight size={18} />
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-neutral-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#111] px-2 text-neutral-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
            </div>

            <p className="fixed bottom-8 text-neutral-600 text-xs font-mono uppercase tracking-[0.3em] opacity-30">
                ENCRYPTED CONNECTION // V.4.0.2
            </p>
        </div>
    )
}
