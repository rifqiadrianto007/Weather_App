import { motion } from "framer-motion";
import { useMemo } from "react";

function generateParticles(count) {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 1.5,
        size: Math.random() * 2 + 1,
    }));
}

export default function WeatherParticles({ type }) {
    const particles = useMemo(() => {
        if (!type) return [];
        return type === "snow"
            ? generateParticles(40)
            : generateParticles(60);
    }, [type]);

    if (!type) return null;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
            {particles.map((p) => (
                <motion.span
                    key={p.id}
                    className={
                        type === "snow"
                            ? "absolute -top-2.5 bg-white rounded-full opacity-80"
                            : "absolute -top-2.5 bg-white/60"
                    }
                    style={{
                        left: `${p.left}%`,
                        width: type === "snow" ? p.size : "2px",
                        height: type === "snow" ? p.size : "14px",
                    }}
                    animate={{
                        y: ["0%", "120%"],
                        x: type === "snow" ? [0, 10, -10] : [0, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}