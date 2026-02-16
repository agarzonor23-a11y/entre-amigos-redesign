import { motion } from "framer-motion";
import {
  ShieldCheck, Clock, UserX, FileSearch, BadgeCheck, BanknoteIcon,
} from "lucide-react";

const items = [
  {
    icon: BanknoteIcon,
    title: "Sin cargos ocultos",
    description: "No cobramos por consulta en centrales de riesgo, estudio de crédito ni desembolso.",
  },
  {
    icon: UserX,
    title: "Sin codeudor",
    description: "Tu solicitud es personal, no necesitas que alguien más responda por ti.",
  },
  {
    icon: Clock,
    title: "Respuesta en minutos",
    description: "Solicita tu crédito 100% digital y recibe respuesta rápida desde tu celular.",
  },
  {
    icon: ShieldCheck,
    title: "Datos protegidos",
    description: "Tu información está segura. Cumplimos con la Ley de Protección de Datos.",
  },
  {
    icon: FileSearch,
    title: "Sin letra menuda",
    description: "Condiciones claras desde el inicio. Conoce tu tasa, cuota y plazo antes de firmar.",
  },
  {
    icon: BadgeCheck,
    title: "Respaldados por Grupo Social",
    description: "Más de 100 años de trayectoria del mismo grupo del Banco Caja Social.",
  },
];

const TransparencySection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold mb-6 text-foreground">
            <ShieldCheck className="w-4 h-4" /> Transparencia total
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
            Aquí <span className="text-gradient">no hay sorpresas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Creemos que la confianza se construye con claridad. Por eso te contamos todo desde el principio.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-card rounded-3xl border border-border p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-extrabold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
