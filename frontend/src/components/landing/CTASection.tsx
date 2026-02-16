import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlliesModal from "./AlliesModal";

const CTASection = () => {
  const [showAllies, setShowAllies] = useState(false);
  return (
    <>
    <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-primary via-teal-dark to-primary">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-primary-foreground/5 rounded-full blur-[100px]" />

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full border-2 border-primary-foreground/10 animate-float" />
      <div className="absolute bottom-20 left-20 w-14 h-14 rounded-2xl border-2 border-secondary/30 animate-float-slow" />
      <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-secondary/20 animate-float" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Empieza ahora
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 tracking-tight leading-tight">
            ¿Listo para impulsar
            <br />
            <span className="text-secondary">tu negocio?</span>
          </h2>
          <p className="text-primary-foreground/70 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Únete a miles de microempresarios que ya confían en Entre Amigos.
            Sin papeleos, sin cobros ocultos.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setShowAllies(true)}
              className="text-base px-10 py-7 rounded-full gap-2 font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-2xl hover:scale-[1.03] transition-all"
            >
              Solicita tu crédito ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default CTASection;
