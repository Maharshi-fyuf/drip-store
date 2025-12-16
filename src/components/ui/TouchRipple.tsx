"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Ripple {
    x: number;
    y: number;
    id: number;
}

export default function TouchRipple() {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent | TouchEvent) => {
            // Get coordinates
            let x, y;
            if ('touches' in e) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = (e as MouseEvent).clientX;
                y = (e as MouseEvent).clientY;
            }

            const newRipple = { x, y, id: Date.now() };
            setRipples((prev) => [...prev, newRipple]);

            // Cleanup ripple after animation
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 1000);
        };

        window.addEventListener("click", handleClick);
        // window.addEventListener("touchstart", handleClick); // Optional: can trigger double on some devices if both used

        return () => {
            window.removeEventListener("click", handleClick);
            // window.removeEventListener("touchstart", handleClick);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{ opacity: 0, scale: 4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute rounded-full border border-[#CCFF00] bg-[#CCFF00]/10"
                        style={{
                            left: ripple.x - 10,
                            top: ripple.y - 10,
                            width: 20,
                            height: 20,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
