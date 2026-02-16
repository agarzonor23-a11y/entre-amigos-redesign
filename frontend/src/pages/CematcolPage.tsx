import heroCematcol from "@/assets/hero-cematcol.png";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Mail, CreditCard,
  Smartphone, Building2, RotateCw, HelpCircle, Phone,
  MessageCircle, Shield, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const features = [
  { text: "Diseñado para microempresarios o independientes." },
  { text: "Desde $1.000.000 hasta $5.000.000 de pesos colombianos." },
  { text: "Compras mínimas de $300.000 con plazo automático a 24 meses." },
  { text: "Montos flexibles de acuerdo a tus necesidades." },
  { text: "Edad: entre 22 y 65 años." },
  { text: "Sin cobro por consulta ni estudio de crédito." },
  { text: "Acceso a certificados y extractos fácilmente." },
  { text: "Mejora tu puntaje crediticio con buen comportamiento de pago." },
];

const requirements = [
  { icon: Mail, text: "Correo electrónico personal, con mínimo 4 meses de existencia." },
  { icon: CreditCard, text: "Tu documento de identidad original." },
  { icon: Smartphone, text: "Celular (Smartphone) con línea activa y WhatsApp personal." },
  { icon: Building2, text: "Cuenta bancaria a tu nombre y activa." },
];

const steps = [
  { num: "1", text: "Requiere el acompañamiento de un asesor." },
  { num: "2", text: "Solicita tu crédito y diligencia tu información financiera." },
  { num: "3", text: "Personaliza la oferta de crédito según el plazo y monto que necesites." },
  { num: "4", text: "Valida quién eres con un video y tu cédula." },
  { num: "5", text: "Firma digitalmente, fácil, rápido y 100% en línea." },
  { num: "6", text: "Responde una llamada de nuestros agentes para validar tu información." },
];

const faqs = [
  {
    q: "¿Qué es un crédito rotativo revolvente?",
    a: "Es una línea de crédito que puede ser utilizada de forma frecuente, siempre y cuando se reponga el saldo utilizado más los intereses y demás obligaciones correspondientes. Te permite acceder a tu saldo disponible hasta un límite establecido. Todas tus compras se financian automáticamente a 24 meses cada vez que las realices. Una vez pagues el saldo pendiente, tu saldo vuelve a estar disponible.",
  },
  {
    q: "¿Dónde me desembolsan el dinero del crédito?",
    a: "De acuerdo con la alianza, tu crédito será desembolsado en la cuenta de ahorros o corriente del aliado directamente.",
  },
  {
    q: "¿Cómo puedo pagar el crédito?",
    a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023.",
  },
  {
    q: "¿Puedo tener otro crédito al mismo tiempo?",
    a: "Sí, dependiendo de tu capacidad de endeudamiento.",
  },
  {
    q: "¿Puedo tener un monto más alto al aprobado?",
    a: "No, el monto aprobado corresponde al valor máximo que te podemos prestar de acuerdo con el estudio de crédito.",
  },
];

const CematcolPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </motion.button>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-sm font-semibold mb-6 text-foreground">
                <Users className="w-4 h-4" /> Aliado Cematcol
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
                Crédito rotativo ideal para
                <br />
                <span className="text-gradient">surtir tu ferretería</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
                Cematcol — Cementos y Materiales de Colombia. Accede a crédito rotativo para compra de materiales de construcción con condiciones diseñadas para tu negocio.
              </p>
              <p className="text-sm text-secondary font-medium mb-10">
                *Crédito rotativo revolvente para compras con aliados
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://incursor.entreamigos.co/nuevo-credito/CR/introduccion/CEMAT?promoterCode=CEMAT001" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30">
                    ¡Solicítalo ya!
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20información%20sobre%20Cematcol" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2">
                    <MessageCircle className="w-5 h-5" />
                    Hablar con María
                  </Button>
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20, stiffness: 100 }}
              className="flex-shrink-0 hidden md:block relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-secondary/20 blur-sm -z-10"
              />
              <motion.img
                src={heroCematcol}
                alt="Materiales de construcción Cematcol"
                className="w-[340px] lg:w-[400px] rounded-3xl shadow-2xl shadow-primary/15 border-2 border-border/50"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Características y <span className="text-gradient">beneficios</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-primary mb-3" />
                <p className="text-sm text-foreground font-medium">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">¿Qué necesitas?</h2>
            <p className="text-muted-foreground text-lg">Realizar la solicitud es muy fácil, solo debes tener:</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">{req.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              ¿Cómo hacer la <span className="text-gradient">solicitud</span>?
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-extrabold text-lg">{step.num}</span>
                </div>
                <p className="text-foreground font-bold pt-2.5">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="https://incursor.entreamigos.co/nuevo-credito/CR/introduccion/CEMAT?promoterCode=CEMAT001" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30">
                Solicitar crédito
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border border-border px-6 py-1 data-[state=open]:border-primary/30">
                  <AccordionTrigger className="text-left font-bold text-foreground hover:text-primary hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      {faq.q}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-8">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-primary via-teal-dark to-primary">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 tracking-tight">
              ¿Necesitas ayuda?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Nuestro equipo está listo para acompañarte en todo el proceso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:6015141180">
                <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Phone className="w-5 h-5" />
                  601 514 1180
                </Button>
              </a>
              <a href="mailto:comunicaciones@entreamigos.co">
                <Button variant="ghost" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20">
                  <Mail className="w-5 h-5" />
                  Escríbenos
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CematcolPage;
