"use client";
import Link from 'next/link';
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, User } from "lucide-react";
import DripLogo from "@/components/DripLogo";

export default function Navbar() {
    const { toggleCart, itemCount } = useCartStore();
    const count = itemCount();

    return (
        <nav className="sticky top-0 z-30 w-full bg-[#050505]/80 backdrop-blur-md border-b border-neutral-800">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="scale-90 hover:scale-100 transition-transform duration-300">
                    <DripLogo />
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/profile" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
                        <User size={20} />
                        <span className="hidden sm:inline text-sm font-medium">Profile</span>
                    </Link>

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
