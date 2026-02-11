import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Phone, FileText, CreditCard, Users, Smartphone, Building2, CheckCircle2, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const creditProducts = [
  {
    title: "Microcrédito",
    description: "Para microempresarios o independientes",
    features: ["Montos desde $300.000", "Ingresos mayores a $1.300.000 mensualmente"],
    link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/COM?promoterCode=COM002",
    gradient: "from-primary to-teal-dark",
  },
  {
    title: "Impulsacrédito",
    description: "Para empleados que deseen un crédito de bajo monto",
    features: ["Montos desde $300.000 hasta $4.980.000"],
    link: "https://incursor.entreamigos.co/nuevo-credito/BM/introduccion/COM?promoterCode=COM002",
    gradient: "from-secondary to-pink",
  },
  {
    title: "Productivo Plus",
    description: "Para empresarios que quieren invertir en su negocio",
    features: ["Montos desde $2.000.000", "Ventas mayores a $83.280.000 al mes"],
    link: "https://incursor.entreamigos.co/nuevo-credito/CM/introduccion/COM?promoterCode=COM002",
    gradient: "from-primary to-teal-dark",
  },
];

const requirements = [
  { icon: Mail, text: "Correo electrónico personal, con mínimo 4 meses de existencia." },
  { icon: CreditCard, text: "Tener tu documento de identidad a la mano." },
  { icon: Smartphone, text: "Celular (Smartphone) con línea activa y WhatsApp personal." },
  { icon: Building2, text: "Cuenta bancaria a tu nombre y activa." },
];

const steps = [
  "Solicita tu crédito y diligencia tu información financiera.",
  "Personaliza la oferta de crédito según el plazo y monto que necesites.",
  "Valida quién eres con un video y tu cédula.",
  "Firma digitalmente, fácil, rápido y 100% en línea.",
  "Responde una llamada de nuestros agentes para validar tu información.",
];

const faqs = [
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

const CompensarPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-sm font-semibold mb-6 text-foreground">
              <Users className="w-4 h-4" /> Aliado
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
              Compensar
            </h1>
            <p className="text-lg text-primary font-bold mb-4">Créditos rápidos y ágiles</p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Entre Amigos y Compensar tienen un crédito digital para independientes y trabajadores de servicio doméstico; para impulsarlos a cumplir sueños, invertir en su negocio, estudiar, viajar, remodelar su vivienda o para lo que quieran.
            </p>
            <p className="text-sm text-secondary mt-4 font-medium">
              *Solo para los afiliados a la Caja de Compensación Compensar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Credit Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              Escoge el crédito <span className="text-gradient">según tus necesidades</span> 🙂
            </h2>
            <p className="text-muted-foreground text-lg">y tu ocupación</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {creditProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-3xl border border-border p-7 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5`}>
                  <CreditCard className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-extrabold text-card-foreground mb-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 flex-1">{product.description}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-xl font-bold gap-2">
                    Solicitalo aquí
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <ul className="mt-5 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            *Recuerda que no cobramos por consulta en centrales de riesgo, estudios de crédito ni desembolso.
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              ¿Qué necesitas?
            </h2>
            <p className="text-muted-foreground text-lg">Realizar la solicitud es muy fácil, solo debes tener:</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-teal-light border border-primary/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{req.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-teal-dark text-primary-foreground">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-14 tracking-tight"
          >
            ¿Cómo hacer la solicitud?
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center shrink-0">
                  <span className="text-xl font-extrabold">{i + 1}</span>
                </div>
                <p className="text-lg leading-relaxed pt-2 text-primary-foreground/80">{step}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20una%20atenci%C3%B3n%20personalizada."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="rounded-full font-bold gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <MessageCircle className="w-4 h-4" />
                Si necesitas acompañamiento, habla con un asesor
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-2xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left font-bold text-card-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="text-2xl font-extrabold text-foreground mb-8 text-center">Contacto</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="tel:6015141180"
              className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-bold text-card-foreground text-sm">Servicio al Cliente</p>
                <p className="text-muted-foreground text-sm">601 514 1180</p>
                <p className="text-xs text-muted-foreground mt-1">Lun-Vie 8am-5pm · Sáb 8am-1pm</p>
              </div>
            </a>
            <a
              href="mailto:comunicaciones@entreamigos.co"
              className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-bold text-card-foreground text-sm">Solicitudes y PQR</p>
                <p className="text-muted-foreground text-sm">comunicaciones@entreamigos.co</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompensarPage;
