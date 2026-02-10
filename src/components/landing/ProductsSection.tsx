import { motion } from "framer-motion";
import { ArrowRight, Store, TrendingUp, RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    icon: Store,
    title: "Microcrédito",
    description: "Ideal para microempresarios e independientes que tienen su propio negocio.",
    features: ["Sin Cámara de Comercio", "Solo con tu cédula", "Respuesta rápida"],
    highlight: "Popular",
  },
  {
    icon: TrendingUp,
    title: "Productivo Plus",
    description: "Para empresarios con experiencia que quieren hacer crecer su negocio.",
    features: ["Montos más altos", "Plazos flexibles", "Tasas competitivas"],
    highlight: "Nuevo",
  },
  {
    icon: RotateCw,
    title: "Crédito Rotativo",
    description: "Disponibilidad de dinero cuando lo necesites, paga solo lo que uses.",
    features: ["Disponibilidad inmediata", "Uso flexible", "Renovación automática"],
    highlight: null,
  },
];

const ProductsSection = () => {
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
            Nuestros productos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Conquista tus metas con el crédito ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tenemos opciones diseñadas para cada etapa de tu negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg rounded-2xl overflow-hidden group">
                <CardContent className="p-8">
                  {product.highlight && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                      {product.highlight}
                    </span>
                  )}

                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <product.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button variant="ghost" className="p-0 h-auto text-primary font-semibold gap-2 group-hover:gap-3 transition-all">
                    Quiero ver más
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
