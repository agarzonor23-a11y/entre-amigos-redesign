import React, { useId } from "react";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    particleColor?: string;
    particleOffset?: number;
};

export const SparklesCore = (props: SparklesProps) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        particleDensity,
        particleColor,
        particleOffset,
    } = props;
    const [init, setInit] = useState(false);
    useEffect(() => {
        setInit(true);
    }, []);
    const controls = useAnimation();

    const particlesLoaded = async (container?: any) => {
        if (container) {
            controls.start({
                opacity: 1,
                transition: {
                    duration: 1,
                },
            });
        }
    };

    return (
        <motion.div animate={controls} className={cn("opacity-0", className)}>
            {init && (
                <Particles
                    id={id || "tsparticles"}
                    className={cn("h-full w-full")}
                    background={background || "transparent"}
                    minSize={minSize || 0.6}
                    maxSize={maxSize || 1.4}
                    particleDensity={particleDensity || 100}
                    particleColor={particleColor || "#FFFFFF"}
                    particleOffset={particleOffset || 0}
                />
            )}
        </motion.div>
    );
};

const Particles = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
    particleOffset,
}: {
    id: string;
    className: string;
    background: string;
    minSize: number;
    maxSize: number;
    particleDensity: number;
    particleColor: string;
    particleOffset: number;
}) => {
    const generateParticles = (density: number) => {
        const particles = [];
        for (let i = 0; i < density; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * (maxSize - minSize) + minSize;
            const duration = Math.random() * 20 + 10; // Slow movement
            const delay = Math.random() * 10;
            particles.push({ x, y, size, duration, delay, id: i });
        }
        return particles;
    };

    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        setParticles(generateParticles(particleDensity));
    }, [particleDensity, minSize, maxSize]);

    return (
        <div id={id} className={cn("absolute inset-0 overflow-hidden", className)} style={{ background }}>
            {particles.map((particle) => (
                <motion.span
                    key={particle.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        background: particleColor,
                        width: particle.size + "px",
                        height: particle.size + "px",
                        top: particle.y + "%",
                        left: particle.x + "%",
                    }}
                    animate={{
                        y: [0, -particleOffset, 0], // Parallax-ish vertical move
                        opacity: [0, 1, 0], // Twinkle effect
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
