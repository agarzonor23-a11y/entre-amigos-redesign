import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Search, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Solicita",
    description: "Completa tu solicitud en línea solo con tu cédula. Sin papeleos.",
    color: "from-primary to-teal-dark",
  },
  {
    icon: Search,
    step: "02",
    title: "Evaluamos",
    description: "Analizamos tu perfil de forma rápida con tecnología inteligente.",
    color: "from-secondary to-pink",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Aprobamos",
    description: "Recibe respuesta en menos de 24 horas con condiciones claras.",
    color: "from-primary to-teal-dark",
  },
  {
    icon: Banknote,
    step: "04",
    title: "Desembolsamos",
    description: "El dinero llega a tu cuenta sin cobros adicionales.",
    color: "from-secondary to-pink",
  },
];

const HowItWorksSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-28 relative overflow-hidden bg-teal-dark">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold mb-6">
            🚀 Proceso simple
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-5 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg">
            En 4 simples pasos accedes a tu crédito digital.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary-foreground/30 to-transparent" />
              )}

              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-3xl p-8 text-center hover:bg-primary-foreground/10 transition-all duration-300 group-hover:-translate-y-2">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform relative`}>
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-foreground text-teal-dark text-xs font-extrabold flex items-center justify-center shadow-lg">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-primary-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
