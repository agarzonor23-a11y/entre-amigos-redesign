import { motion } from "framer-motion";

export const StarDoodle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 5, -5, 0]
        }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        <path d="M12 22V22" strokeWidth="2" /> {/* Extra dot for doodle feel */}
    </motion.svg>
);

export const SparkleDoodle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.3, 0.9],
            rotate: [0, 15, 0]
        }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
    </motion.svg>
);

export const BurstDoodle = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.4, 0.5]
        }}
        viewport={{ once: false }}
        transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 3V5m0 14v2M5 12H3m18 0h-2M18.36 5.64l-1.41 1.41M7.05 16.95l-1.41 1.41M18.36 18.36l-1.41-1.41M7.05 7.05l-1.41-1.41" />
    </motion.svg>
);
