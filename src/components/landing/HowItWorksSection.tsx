import { motion } from "framer-motion";
import { FileText, Search, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Solicita",
    description: "Completa tu solicitud en línea solo con tu cédula. Sin papeleos.",
  },
  {
    icon: Search,
    step: "02",
    title: "Evaluamos",
    description: "Analizamos tu perfil de forma rápida con tecnología inteligente.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Aprobamos",
    description: "Recibe respuesta en menos de 24 horas con condiciones claras.",
  },
  {
    icon: Banknote,
    step: "04",
    title: "Desembolsamos",
    description: "El dinero llega a tu cuenta sin cobros adicionales.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Proceso simple
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            En 4 simples pasos accedes a tu crédito digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
