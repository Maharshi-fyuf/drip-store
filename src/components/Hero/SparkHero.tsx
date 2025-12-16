"use client";
import { motion } from "framer-motion";
import { ShoppingBag, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function SparkHero() {
    const [mounted, setMounted] = useState(false);
    // Store random values in state to match server/client
    const [sparks, setSparks] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
        const s = [...Array(20)].map((_, i) => ({
            id: i,
            // Randomize only on client
            x: Math.random() * (window.innerWidth),
            y: Math.random() * 600,
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: Math.random() * 10 + 10,
        }));
        setSparks(s);
    }, []);

    if (!mounted) {
        // Return a static placeholder or null during SSR to avoid mismatch
        return <div className="h-[600px] w-full bg-neutral-950" />;
    }

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-neutral-950 flex items-center justify-center p-4">
            {/* Background Sparks/Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {sparks.map((spark) => (
                    <motion.div
                        key={spark.id}
                        className="absolute rounded-full bg-blue-500/20 blur-2xl"
                        initial={{
                            x: spark.x,
                            y: spark.y,
                            scale: 0.5,
                        }}
                        animate={{
                            x: [spark.x, Math.random() * 1000, Math.random() * -200],
                            y: [spark.y, Math.random() * 600, Math.random() * -100],
                            scale: [0.5, 1.2, 0.5],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: spark.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            width: spark.width,
                            height: spark.height,
                            left: `${spark.left}%`,
                            top: `${spark.top}%`,
                        }}
                    />
                ))}
            </div>

            {/* Featured Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 p-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl shadow-blue-900/40"
            >
                <div className="bg-neutral-900 rounded-[22px] p-8 md:p-12 text-center max-w-lg relative overflow-hidden">
                    {/* Inner Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />

                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="mx-auto w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50"
                    >
                        <Zap className="text-white w-10 h-10 fill-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Flux<span className="text-blue-400">Mart</span>
                    </h1>
                    <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                        Experience the next generation of e-commerce. <br />
                        <span className="text-blue-200">Speed. Security. Spark.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag size={20} /> Shop Now
                        </button>
                        <button className="px-8 py-3 ring-1 ring-neutral-700 text-neutral-300 font-medium rounded-full hover:bg-neutral-800 transition-colors">
                            View Collection
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
