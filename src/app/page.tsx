"use client";
import SparkHero from "@/components/Hero/SparkHero";
import ProductFeed from "@/components/Product/ProductFeed";
import SearchSidebar from "@/components/Product/SearchSidebar";
import PaymentForm from "@/components/Checkout/PaymentForm";
import { User, Package, Filter, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-black pb-20 selection:bg-[#CCFF00]/30 selection:text-black">
      <SparkHero />

      <div className="container mx-auto px-4 py-12" id="products">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6 sticky top-24 z-20">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-3 bg-[#CCFF00] text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20"
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
            {showFilters ? "Close Filters" : "Filter Drops"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Sidebar Area */}
          <AnimatePresence>
            {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
              <motion.aside
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`space-y-8 md:w-72 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}
              >
                <SearchSidebar />

                {/* Mock Profile Tiny Dashboard */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg hidden md:block">
                  <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                    <User size={20} className="text-[#CCFF00]" /> Profile
                  </h3>
                  <div className="text-sm text-neutral-400 space-y-3">
                    <p>Welcome, <span className="text-white font-semibold">Alex_Cyber</span></p>
                    <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-2 mb-1 text-white text-xs uppercase tracking-wider font-semibold">
                        <Package size={12} className="text-[#CCFF00]" /> Recent Order
                      </div>
                      <p className="font-medium text-white mb-1 group-hover:text-[#CCFF00] transition-colors">Neon Mech 60</p>
                      <span className="text-emerald-400 text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Delivered</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Feed */}
          <section className="flex-1">
            <div className="mb-8 flex justify-between items-end border-b border-neutral-800 pb-4">
              <h2 className="text-3xl font-bold text-white">Latest Drops</h2>
              <span className="text-neutral-500 font-mono text-sm">v.2.0.4 // LIVE</span>
            </div>
            <ProductFeed />
          </section>
        </div>

        {/* Checkout Demo Section */}
        <section className="mt-24 border-t border-neutral-800 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Secure Checkout</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              AES-256 Encrypted. Zero-Knowledge Proof Architecture.
              <br />
              <span className="text-xs text-neutral-600 uppercase tracking-widest mt-2 block">Powered by DRIP PAY</span>
            </p>
          </div>
          <PaymentForm />
        </section>
      </div>
    </main>
  );
}
