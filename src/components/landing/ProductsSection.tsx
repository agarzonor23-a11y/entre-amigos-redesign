import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Store, TrendingUp, RotateCw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const products = [
  {
    icon: Store,
    title: "Microcrédito",
    description: "Ideal para microempresarios e independientes que tienen su propio negocio.",
    features: ["Sin Cámara de Comercio", "Solo con tu cédula", "Respuesta rápida"],
    highlight: "Popular",
    gradient: "from-primary to-teal-dark",
    bgAccent: "bg-teal-light",
  },
  {
    icon: TrendingUp,
    title: "Productivo Plus",
    description: "Para empresarios con experiencia que quieren hacer crecer su negocio.",
    features: ["Montos más altos", "Plazos flexibles", "Tasas competitivas"],
    highlight: "Nuevo",
    gradient: "from-secondary to-pink",
    bgAccent: "bg-pink-light",
  },
  {
    icon: RotateCw,
    title: "Crédito Rotativo",
    description: "Disponibilidad de dinero cuando lo necesites, paga solo lo que uses.",
    features: ["Disponibilidad inmediata", "Uso flexible", "Renovación automática"],
    highlight: "Flexible",
    gradient: "from-primary to-teal-dark",
    bgAccent: "bg-teal-light",
  },
  {
    icon: Heart,
    title: "Impulsacrédito",
    description: "Crédito digital para empleados que quieran cumplir sus sueños e iniciar su vida crediticia.",
    features: ["Desde $300.000", "Mejora tu puntaje", "100% digital"],
    highlight: "Empleados",
    gradient: "from-secondary to-pink",
    bgAccent: "bg-pink-light",
  },
];

const ProductsSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-semibold mb-6">
            💡 Nuestros productos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
            Conquista tus metas con
            <br />
            <span className="text-gradient">el crédito ideal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tenemos opciones diseñadas para cada etapa de tu negocio.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="h-full rounded-3xl border border-border bg-card p-1 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                <div className="p-7 pb-8">
                  {product.highlight && (
                    <span className={`inline-block px-3 py-1 rounded-full ${product.bgAccent} text-xs font-bold mb-5 text-foreground`}>
                      {product.highlight}
                    </span>
                  )}

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-7 group-hover:scale-110 transition-transform duration-300`}>
                    <product.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-card-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-7 leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.gradient}`} />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="p-0 h-auto text-primary font-bold gap-2 group-hover:gap-4 transition-all text-base" onClick={() => navigate("/productos")}>
                    Quiero ver más
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
