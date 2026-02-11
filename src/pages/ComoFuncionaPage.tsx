import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileText, UserCheck, Sliders, Video, PenTool, PhoneCall,
  CreditCard, Clock, Shield, Banknote, AlertCircle, CheckCircle2,
  ArrowRight, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import AlliesModal from "@/components/landing/AlliesModal";

const steps = [
  {
    icon: FileText,
    title: "Solicita tu crédito",
    description: "Diligencia tu información financiera de forma 100% digital. Solo necesitas tu cédula, un celular con WhatsApp y un correo electrónico personal con mínimo 4 meses de existencia.",
  },
  {
    icon: Sliders,
    title: "Personaliza tu oferta",
    description: "Elige el plazo y monto que mejor se adapte a tus necesidades. Puedes ajustar las condiciones según tu capacidad de pago.",
  },
  {
    icon: Video,
    title: "Valida tu identidad",
    description: "Graba un corto video selfie y toma foto de tu cédula para verificar quién eres. Es rápido, seguro y protege tu identidad.",
  },
  {
    icon: PenTool,
    title: "Firma digitalmente",
    description: "Firma tu contrato de forma digital, fácil, rápido y 100% en línea. No necesitas ir a ninguna oficina ni imprimir documentos.",
  },
  {
    icon: PhoneCall,
    title: "Confirma por llamada",
    description: "Responde una breve llamada telefónica donde validaremos tu información. Este paso es para tu seguridad.",
  },
  {
    icon: CheckCircle2,
    title: "¡Crédito aprobado!",
    description: "Una vez aprobado, el dinero se desembolsa según el aliado que elegiste: directamente en la tienda del aliado o en tu cuenta.",
  },
];

const requirements = [
  { icon: UserCheck, text: "Ser ciudadano colombiano con cédula vigente." },
  { icon: Clock, text: "Tener entre 22 y 65 años de edad (varía según aliado)." },
  { icon: Banknote, text: "Ser microempresario, independiente o empleado." },
  { icon: FileText, text: "Correo electrónico personal con mínimo 4 meses de existencia." },
  { icon: Shield, text: "Celular (Smartphone) con línea activa y WhatsApp personal." },
  { icon: CreditCard, text: "Tu documento de identidad original." },
];

const benefits = [
  "Solicitud 100% digital, desde tu celular o computador.",
  "Sin cobros por consulta ni estudio de crédito.",
  "Montos desde $300.000 hasta $35.000.000 según aliado y perfil.",
  "Plazos de 1 a 36 meses según tu capacidad de pago.",
  "Acceso a certificados y extractos fácilmente.",
  "Montos y plazos flexibles adaptados a tu negocio.",
];

const paymentMethods = [
  { method: "Por internet", detail: "Paga desde tu banco o app bancaria." },
  { method: "Banco Caja Social", detail: "Código de convenio 15900833 en cualquier sucursal." },
  { method: "Efecty", detail: "Código de convenio 113023 en cualquier punto Efecty." },
];

const faqs = [
  { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento y tu historial crediticio." },
  { q: "¿La tasa incluye seguros y fianza?", a: "No. La tasa de interés no incluye seguros ni fianza FNG. Estos valores se suman a tu cuota mensual. Tenlo en cuenta al solicitar tu crédito." },
  { q: "¿Dónde me desembolsan el dinero?", a: "Depende del aliado. En algunos casos se desembolsa directamente en la tienda del aliado para que compres lo que necesites, y en otros puede ser a tu cuenta bancaria." },
  { q: "¿Qué pasa si no me aprueban el crédito?", a: "No te preocupes, la consulta es gratuita y no afecta tu historial crediticio. Puedes intentar nuevamente más adelante." },
  { q: "¿Necesito un codeudor o fiador?", a: "En la mayoría de los casos no. Sin embargo, algunos créditos pueden requerir fianza con el Fondo Nacional de Garantías (FNG)." },
];

const ComoFuncionaPage = () => {
  const [showAllies, setShowAllies] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Breadcrumbs items={[{ label: "¿Cómo funciona?" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/20">
              <HelpCircle className="w-4 h-4" />
              Instructivo
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 tracking-tight">
              ¿Cómo solicitar{" "}
              <span className="text-gradient">tu crédito?</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Te explicamos paso a paso todo lo que necesitas saber para solicitar tu crédito con Entre Amigos. Es fácil, rápido y 100% digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-12"
          >
            Paso a paso
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-4"
          >
            ¿Qué necesitas?
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Ten a la mano estos documentos y requisitos antes de iniciar tu solicitud.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 bg-card border border-border rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-xl bg-secondary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <req.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-card-foreground font-medium">{req.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10"
          >
            Beneficios de tu crédito
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-card border border-border rounded-2xl p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm text-card-foreground font-medium">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-4"
          >
            ¿Cómo pagar tu crédito?
          </motion.h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Tienes varias opciones para realizar tus pagos de forma fácil.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {paymentMethods.map((pm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-3xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-card-foreground mb-2">{pm.method}</h3>
                <p className="text-sm text-muted-foreground">{pm.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10"
          >
            Ten en cuenta
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-secondary/20 border border-secondary/30 rounded-2xl p-5">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">Seguros y fianza</p>
                <p className="text-sm text-muted-foreground mt-1">La tasa de interés no incluye seguros ni fianza FNG. Estos valores se suman a tu cuota mensual.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-secondary/20 border border-secondary/30 rounded-2xl p-5">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">Disponibilidad por aliado</p>
                <p className="text-sm text-muted-foreground mt-1">Algunos aliados requieren acompañamiento de un asesor o solo están disponibles en ciudades con cobertura de promotores.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">$0 cobros por solicitud</p>
                <p className="text-sm text-muted-foreground mt-1">No te cobramos por consultar tu crédito ni por el estudio crediticio. Es totalmente gratis.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-2xl p-5">
              <Banknote className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">Desembolso según aliado</p>
                <p className="text-sm text-muted-foreground mt-1">El dinero se desembolsa directamente en el aliado o en tu cuenta, según el tipo de crédito que solicites.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10"
          >
            Preguntas frecuentes
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-bold text-card-foreground pr-4">{faq.q}</span>
                  <span className={`text-primary transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted-foreground mb-8">
            Elige tu aliado y solicita tu crédito en minutos. Es fácil, rápido y sin papeleos.
          </p>
          <Button
            size="lg"
            onClick={() => setShowAllies(true)}
            className="text-base px-10 py-7 rounded-full gap-2 font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:scale-[1.02]"
          >
            Solicitar crédito
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoFuncionaPage;
