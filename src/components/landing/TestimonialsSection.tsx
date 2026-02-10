import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "María Rodríguez",
    role: "Dueña de tienda — Bogotá",
    text: "Gracias a Entre Amigos pude ampliar mi negocio. El proceso fue muy fácil y sin tantos papeles como en los bancos.",
    rating: 5,
  },
  {
    name: "Carlos Martínez",
    role: "Emprendedor — Medellín",
    text: "Lo mejor es que no cobran por la solicitud. En menos de un día ya tenía respuesta y el dinero en mi cuenta.",
    rating: 5,
  },
  {
    name: "Ana Lucía Pérez",
    role: "Independiente — Cali",
    text: "El crédito rotativo es perfecto para mi negocio. Solo uso lo que necesito y pago lo justo. Muy recomendados.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Lo que dicen nuestros amigos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full rounded-2xl border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{t.text}"
                  </p>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-card-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
