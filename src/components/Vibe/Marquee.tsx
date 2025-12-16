"use client";
import { motion } from "framer-motion";

export default function Marquee() {
    return (
        <div className="bg-[#CCFF00] text-black overflow-hidden py-1 border-b border-[#CCFF00]">
            <motion.div
                className="whitespace-nowrap flex gap-8 font-black uppercase tracking-widest text-xs"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            >
                {/* Duplicated content for seamless loop */}
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
                <span>Kcww DROPS EVERY FRIDAY • WORLDWIDE SHIPPING • SECURE THE DRIP •</span>
            </motion.div>
        </div>
    );
}
