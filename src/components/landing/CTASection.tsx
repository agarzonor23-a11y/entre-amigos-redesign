import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
            Únete a miles de microempresarios que ya confían en Entre Amigos para
            hacer crecer sus sueños. Sin papeleos, sin cobros ocultos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 py-6 rounded-xl gap-2 font-semibold"
            >
              Solicita tu crédito ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 rounded-xl font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Habla con un asesor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
