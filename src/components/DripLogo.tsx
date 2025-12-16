"use client";
import { motion } from "framer-motion";

export default function DripLogo() {
    return (
        <div className="relative group cursor-pointer selection:bg-none">
            {/* SVG Filter Definition */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Styled Text */}
            <div
                className="text-4xl font-black italic tracking-tighter flex items-end"
                style={{ filter: "url(#goo)" }}
            >
                <span className="text-white mr-1">DR</span>

                {/* The Dripping 'I' */}
                <div className="relative flex flex-col items-center mx-0.5">
                    <span className="text-[#CCFF00] z-10 relative">I</span>
                    <motion.div
                        className="absolute top-2 w-1.5 h-3 bg-[#CCFF00] rounded-full"
                        animate={{
                            y: [0, 15, 0],
                            opacity: [0, 1, 0],
                            scaleY: [1, 1.5, 0.5, 1]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.6, 1]
                        }}
                    />
                </div>

                <span className="text-white">P</span>
            </div>
        </div>
    );
}
