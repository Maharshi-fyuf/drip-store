"use client";
import Link from 'next/link';
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, User } from "lucide-react";
import DripLogo from "@/components/DripLogo";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { toggleCart, itemCount } = useCartStore();
    const count = itemCount();
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <nav className="sticky top-0 z-30 w-full bg-[#050505]/80 backdrop-blur-md border-b border-neutral-800">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="scale-90 hover:scale-100 transition-transform duration-300">
                    <DripLogo />
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#CCFF00] to-blue-500 flex items-center justify-center text-black font-bold text-xs uppercase">
                                    {user.email?.[0]}
                                </div>
                                <span className="hidden sm:inline text-sm font-medium">Profile</span>
                            </Link>
                            <button onClick={handleLogout} className="text-xs text-neutral-500 hover:text-red-500 uppercase tracking-widest font-bold">
                                Exit
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm font-medium text-white hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all">
                            Login
                        </Link>
                    )}

                    <button
                        onClick={() => toggleCart(true)}
                        className="relative p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <ShoppingBag size={24} />
                        {count > 0 && (
                            <span className="absolute top-0 right-0 w-5 h-5 bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-neutral-950">
                                {count}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
