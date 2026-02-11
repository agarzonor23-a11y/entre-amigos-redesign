import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Clock, Banknote, Sparkles, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AlliesModal from "./AlliesModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showAllies, setShowAllies] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
    <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-blob"
        />
        <motion.div
          style={{ y: y2, animationDelay: "2s" }}
          className="absolute top-40 -left-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] animate-blob"
        />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] animate-blob" style={{ animationDelay: "4s" }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              Fintech de crédito digital 🇨🇴
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] mb-6 tracking-tight">
              Crédito para
              <br />
              <span className="text-gradient">tu negocio</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed">
              Accede a créditos digitales diseñados para microempresarios en Colombia.{" "}
              <span className="font-semibold text-foreground">Sin cobros por solicitud ni desembolso.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Button
                size="lg"
                onClick={() => setShowAllies(true)}
                className="text-base px-8 py-7 rounded-full gap-2 font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-[1.02]"
              >
                Solicita tu crédito
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => { navigate("/simulador"); window.scrollTo(0, 0); }}
                className="text-base px-8 py-7 rounded-full font-bold border-2 hover:bg-primary/5 gap-2"
              >
                <Calculator className="w-5 h-5" />
                Simula tu crédito
              </Button>
            </div>

            <div className="flex flex-wrap gap-8">
              {[
                { icon: Shield, label: "100% seguro" },
                { icon: Clock, label: "Rápido y fácil" },
                { icon: Banknote, label: "Sin cobros ocultos" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Credit card visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card with gradient border */}
              <motion.div style={{ y: y2 }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/50 to-secondary rounded-[28px] blur-xl opacity-20" />
                <div className="relative bg-card border border-border rounded-[28px] p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center">
                        <Banknote className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-card-foreground">Tu crédito aprobado</p>
                        <p className="text-sm text-muted-foreground">Microcrédito digital</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-5 bg-teal-light rounded-2xl">
                      <span className="text-muted-foreground text-sm font-medium">Monto aprobado</span>
                      <span className="text-3xl font-extrabold text-primary">$5.000.000</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-pink-light rounded-2xl">
                        <span className="text-muted-foreground text-xs font-medium">Plazo</span>
                        <p className="font-bold text-foreground mt-1">12 meses</p>
                      </div>
                      <div className="p-4 bg-teal-light rounded-2xl">
                        <span className="text-muted-foreground text-xs font-medium">Cuota mensual</span>
                        <p className="font-bold text-foreground mt-1">$487.500</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Progreso de solicitud</span>
                        <span className="font-bold text-primary">75%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute -bottom-8 -left-8 bg-card border border-border rounded-2xl p-4 shadow-xl animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-card-foreground">$0 cobros</p>
                    <p className="text-xs text-muted-foreground">Por solicitud</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-xl animate-float-slow"
              >
                <p className="text-sm font-bold">✓ Aprobado</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
    </>
  );
};

export default HeroSection;
