import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María Rodríguez",
    role: "Dueña de tienda — Bogotá",
    text: "Gracias a Entre Amigos pude ampliar mi negocio. El proceso fue muy fácil y sin tantos papeles como en los bancos.",
    rating: 5,
    accent: "bg-teal-light",
  },
  {
    name: "Carlos Martínez",
    role: "Emprendedor — Medellín",
    text: "Lo mejor es que no cobran por la solicitud. En menos de un día ya tenía respuesta y el dinero en mi cuenta.",
    rating: 5,
    accent: "bg-pink-light",
  },
  {
    name: "Ana Lucía Pérez",
    role: "Independiente — Cali",
    text: "El crédito rotativo es perfecto para mi negocio. Solo uso lo que necesito y pago lo justo. Muy recomendados.",
    rating: 5,
    accent: "bg-teal-light",
  },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-6">
            ❤️ Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
            Lo que dicen nuestros{" "}
            <span className="text-gradient">amigos</span>
          </h2>
        </motion.div>

        <motion.div style={{ y }} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-full rounded-3xl border border-border bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden group">
                <div className={`h-2 w-full ${t.accent}`} />
                <div className="p-8">
                  <Quote className="w-10 h-10 text-primary/15 mb-5" />

                  <p className="text-foreground font-medium leading-relaxed mb-8 text-lg">
                    "{t.text}"
                  </p>

                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
