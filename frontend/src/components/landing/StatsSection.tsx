import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "10K+", label: "Créditos desembolsados", color: "from-primary to-teal-dark" },
  { value: "$0", label: "Cobros por solicitud", color: "from-secondary to-pink" },
  { value: "24h", label: "Respuesta promedio", color: "from-primary to-teal-dark" },
  { value: "98%", label: "Clientes satisfechos", color: "from-secondary to-pink" },
];

const StatsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-light/50 to-background -z-10" />

      <motion.div style={{ y }} className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              className="text-center p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl transition-shadow"
            >
              <p className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
