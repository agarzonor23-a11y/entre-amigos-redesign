import { useRef } from "react";
import compensarHero from "@/assets/hero-compensar-new.png";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Mail, Phone, MessageCircle,
  CreditCard, Users, Smartphone, Building2, CheckCircle2,
  HelpCircle, Shield, Heart, Briefcase, Home, GraduationCap,
  Lightbulb, Umbrella, TrendingUp, Video, PenTool, PhoneCall,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

/*
  Compensar brand: Orange #F37021 → HSL(24, 90%, 54%) | Navy #003B5C → HSL(199, 100%, 18%)
  Entre Amigos:    Teal #045062 → HSL(195, 93%, 20%) | Pink #FF8783 → HSL(1, 100%, 76%)
  Blend: use Compensar orange as accent, keep Entre Amigos teal as base, warm pink tones
*/

/* ─── Credit Products ─── */
const creditProducts = [
  {
    id: "microcredito",
    title: "Microcrédito",
    tagline: "Para independientes que necesitan resolver sin complicarse",
    subtitle: "Cuando surge una urgencia, una decisión o un gasto inesperado, tener una opción clara y acompañada hace la diferencia.",
    features: [
      "Pensado para personas con ingresos independientes",
      "Ideal para resolver urgencias, pagos importantes o planes personales",
      "Montos desde $300.000 hasta $15.000.000",
    ],
    link: "https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/COM?promoterCode=COM002",
    accent: "compensar-orange",
    icon: Briefcase,
  },
  {
    id: "impulsacredito",
    title: "Impulsacrédito",
    tagline: "Un crédito que acompaña a tu familia cuando más lo necesitas",
    subtitle: "Pensado para trabajadoras del servicio doméstico afiliadas a Compensar que quieren respaldo en momentos importantes.",
    features: [
      "Proceso sencillo y fácil de entender",
      "Ideal para educación, bienestar familiar o imprevistos",
      "Acceso digital con apoyo de un asesor si lo necesitas",
      "Diseñado para quienes priorizan a su familia",
      "Hasta $4.980.000",
    ],
    link: "https://incursor.entreamigos.co/nuevo-credito/BM/introduccion/COM?promoterCode=COM002",
    accent: "compensar-warm",
    icon: Heart,
  },
  {
    id: "productivo-plus",
    title: "Productivo Plus",
    tagline: "Una opción de crédito para decisiones que requieren respaldo",
    subtitle: "Diseñado para independientes con mayor trayectoria que necesitan apoyo para avanzar en proyectos personales o profesionales.",
    features: [
      "Pensado para personas con mayor nivel de ingresos",
      "Ideal para proyectos, inversiones personales o crecimiento",
      "Proceso digital con información clara",
      "Hasta $20.000.000",
    ],
    link: "https://incursor.entreamigos.co/nuevo-credito/CM/introduccion/COM?promoterCode=COM002",
    accent: "primary",
    icon: TrendingUp,
  },
];

/* ─── Segments ─── */
const segments = [
  {
    id: "independientes-grandes",
    label: "Independientes (grandes)",
    icon: Briefcase,
    useCases: "Estudio, viajes, organización financiera, imprevistos familiares",
    cards: [
      {
        icon: GraduationCap,
        title: "Plan personal",
        text: "No todo en la vida es trabajo. Estudiar, viajar o cumplir un plan personal también cuenta. Si eres afiliado a Compensar, conoce la opción de crédito de Entre Amigos pensada para tu momento de vida.",
      },
      {
        icon: Shield,
        title: "Orden y tranquilidad",
        text: "A veces no es una urgencia, es querer estar tranquilo. La alianza Compensar + Entre Amigos te acompaña cuando necesitas organizar un gasto importante o tomar una decisión con calma.",
      },
      {
        icon: Home,
        title: "Familia",
        text: "Cuando surge algo importante para tu familia, contar con una opción clara hace la diferencia. Si eres independiente afiliado a Compensar, esta alternativa de crédito puede ayudarte.",
      },
    ],
  },
  {
    id: "independientes-pequenos",
    label: "Independientes (pequeños)",
    icon: Lightbulb,
    useCases: "Imprevistos, estabilidad del hogar, gastos personales, respiro financiero",
    cards: [
      {
        icon: Umbrella,
        title: "Respiro",
        text: "No siempre es para crecer, a veces es para respirar. Si aparece un gasto importante, la alianza Compensar + Entre Amigos te ofrece una opción de crédito pensada para independientes.",
      },
      {
        icon: Sparkles,
        title: "Imprevistos",
        text: "La vida no avisa. Cuando aparece un gasto inesperado, es clave tener una alternativa clara y acompañada. Conoce la opción de crédito de Compensar con Entre Amigos.",
      },
      {
        icon: Home,
        title: "Decisiones cotidianas",
        text: "Arreglar algo en casa, cubrir un gasto familiar o ponerse al día también es avanzar. Compensar + Entre Amigos crearon esta opción de crédito pensada para tu realidad como independiente.",
      },
    ],
  },
  {
    id: "servicio-domestico",
    label: "Servicio doméstico",
    icon: Heart,
    useCases: "Educación de los hijos, bienestar del hogar, apoyo familiar",
    cards: [
      {
        icon: GraduationCap,
        title: "Hijos",
        text: "Los sueños de tus hijos también importan. Si estás afiliada a Compensar, conoce esta opción de crédito pensada para acompañarte en decisiones importantes para tu familia.",
      },
      {
        icon: Home,
        title: "Hogar",
        text: "Cuando algo del hogar necesita atención, contar con apoyo hace la diferencia. La alianza Compensar + Entre Amigos está pensada para esos momentos.",
      },
      {
        icon: Shield,
        title: "Tranquilidad",
        text: "Estar tranquila también es una prioridad. Esta opción de crédito te acompaña cuando necesitas resolver un gasto importante con claridad y apoyo gracias a Compensar + Entre Amigos.",
      },
    ],
  },
];

/* ─── Steps ─── */
const steps = [
  { text: "Solicita tu crédito y diligencia tu información financiera.", sub: "Empieza a resolver lo que hoy te preocupa", icon: CreditCard },
  { text: "Personaliza la oferta de crédito según el plazo y monto que necesites.", sub: "Tú eliges lo que mejor se ajuste a tu realidad", icon: Lightbulb },
  { text: "Valida quién eres con un video y tu cédula.", sub: "Sin filas ni papeles, con video desde tu celular", icon: Video },
  { text: "Firma digitalmente, fácil, rápido y 100% en línea.", sub: "Todo desde donde estés", icon: PenTool },
  { text: "Responde una llamada de nuestros agentes para validar tu información.", sub: "Te acompañamos hasta el final", icon: PhoneCall },
];

/* ─── Requirements ─── */
const requirements = [
  { icon: Mail, text: "Correo electrónico personal, con mínimo 4 meses de existencia." },
  { icon: CreditCard, text: "Tener tu documento de identidad a la mano." },
  { icon: Smartphone, text: "Celular (Smartphone) con línea activa y WhatsApp personal." },
  { icon: Building2, text: "Cuenta bancaria a tu nombre y activa." },
];

/* ─── FAQs ─── */
const faqs = [
  { q: "¿Dónde me desembolsan el dinero del crédito?", a: "De acuerdo con la alianza, tu crédito será desembolsado en la cuenta de ahorros o corriente del aliado directamente." },
  { q: "¿Cómo puedo pagar el crédito?", a: "Puedes realizar tus pagos por internet, en sucursales del Banco Caja Social con el código de convenio 15900833, o por medio de Efecty con el código de convenio 113023." },
  { q: "¿Puedo tener otro crédito al mismo tiempo?", a: "Sí, dependiendo de tu capacidad de endeudamiento." },
  { q: "¿Puedo tener un monto más alto al aprobado?", a: "No, el monto aprobado corresponde al valor máximo que te podemos prestar de acuerdo con el estudio de crédito." },
];

/* Compensar Orange: #F37021 → hsl(24, 90%, 54%) */
const compensarOrange = "hsl(24, 90%, 54%)";
const compensarOrangeLighter = "hsl(24, 90%, 96%)";

const CompensarPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Compensar orange glow + Entre Amigos teal */}
          <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full blur-[140px]" style={{ background: `${compensarOrange}20` }} />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: `${compensarOrange}08` }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6">
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
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-1 max-w-2xl">
              {/* Co-branded badge */}
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-foreground border"
                style={{ background: compensarOrangeLighter, borderColor: `${compensarOrange}30` }}
              >
                <Users className="w-4 h-4" style={{ color: compensarOrange }} /> Aliado Compensar
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
                Una opción de crédito
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})` }}
                >
                  pensada para ti
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
                Una opción de crédito pensada para ayudarte a resolver urgencias, avanzar decisiones importantes y tener respaldo cuando lo necesitas.
              </p>
              <p className="text-sm font-medium mb-10" style={{ color: compensarOrange }}>
                *Solo para los afiliados a la Caja de Compensación Compensar
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#creditos">
                  <Button
                    size="lg"
                    className="rounded-full px-8 py-7 font-bold gap-2 text-base shadow-xl text-white"
                    style={{ background: `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})`, boxShadow: `0 10px 30px -5px ${compensarOrange}40` }}
                  >
                    Conoce nuestros créditos
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20una%20atenci%C3%B3n%20personalizada." target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2">
                    <MessageCircle className="w-5 h-5" />
                    Hablar con María
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20, stiffness: 100 }}
              className="flex-shrink-0 hidden md:block relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl blur-sm -z-10"
                style={{ background: `${compensarOrange}25` }}
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/15 blur-sm -z-10"
              />

              <motion.img
                src={compensarHero}
                alt="Trabajadora del servicio doméstico sonriente"
                className="w-[340px] lg:w-[400px] rounded-3xl shadow-2xl border-2 border-border/50"
                style={{ boxShadow: `0 25px 50px -12px ${compensarOrange}20` }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── SEGMENTS (Occasions) ─── */}
      <section className="py-24 relative overflow-hidden" style={{ background: compensarOrangeLighter }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Encuentra{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})` }}
              >
                tu momento
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cada persona tiene una razón diferente. Escoge la que más se parece a la tuya.
            </p>
          </motion.div>

          <Tabs defaultValue="independientes-grandes" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              {segments.map((seg) => (
                <TabsTrigger
                  key={seg.id}
                  value={seg.id}
                  className="gap-2 px-5 py-3 rounded-full border border-border bg-background data-[state=active]:text-white data-[state=active]:border-transparent font-bold transition-all"
                  style={{ "--tw-active-bg": compensarOrange } as React.CSSProperties}
                  data-compensar-tab
                >
                  <seg.icon className="w-4 h-4" />
                  {seg.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {segments.map((seg) => (
              <TabsContent key={seg.id} value={seg.id}>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: `${compensarOrange}15`, color: compensarOrange }}
                  >
                    Ocasiones de uso: {seg.useCases}
                  </span>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {seg.cards.map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-card rounded-3xl border border-border p-7 hover:shadow-xl transition-all duration-300 group"
                      style={{ ["--hover-border" as string]: `${compensarOrange}40` }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                        style={{ background: `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})` }}
                      >
                        <card.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-extrabold text-card-foreground mb-3">{card.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm mb-5">{card.text}</p>
                      <Button variant="ghost" className="p-0 h-auto font-bold gap-2 group-hover:gap-3 transition-all" style={{ color: compensarOrange }}>
                        Conócela aquí <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ─── CREDIT PRODUCTS ─── */}
      <section id="creditos" className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] -z-10" style={{ background: `${compensarOrange}10` }} />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Escoge el crédito{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${compensarOrange}, hsl(24, 80%, 65%))` }}
              >
                según tus necesidades
              </span>{" "}
              🙂
            </h2>
            <p className="text-muted-foreground text-lg">y tu ocupación</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {creditProducts.map((product, i) => {
              const gradients: Record<string, string> = {
                "compensar-orange": `linear-gradient(135deg, ${compensarOrange}, hsl(var(--primary)))`,
                "compensar-warm": `linear-gradient(135deg, ${compensarOrange}, hsl(24, 80%, 42%))`,
                "primary": `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})`,
              };
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-card rounded-3xl border border-border p-1 hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="p-7 flex flex-col h-full">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: gradients[product.accent] }}
                    >
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-card-foreground mb-2">{product.title}</h3>
                    <p className="font-bold text-sm mb-2" style={{ color: compensarOrange }}>{product.tagline}</p>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.subtitle}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: compensarOrange }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a href={product.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full rounded-xl font-bold gap-2 py-6 text-base text-white"
                        style={{ background: `linear-gradient(135deg, hsl(var(--primary)), ${compensarOrange})` }}
                      >
                        Solicitalo aquí
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10">
            *Recuerda que no cobramos por consulta en centrales de riesgo, estudios de crédito ni desembolso. Tasa diferencial disponible.
          </p>
        </div>
      </section>

      {/* ─── REQUIREMENTS ─── */}
      <section className="py-24" style={{ background: compensarOrangeLighter }}>
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
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${compensarOrange}15` }}
                >
                  <req.icon className="w-7 h-7" style={{ color: compensarOrange }} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{req.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(199, 100%, 18%) 50%, ${compensarOrange} 100%)` }}
      >
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full blur-[80px]" style={{ background: `${compensarOrange}15` }} />

        <div className="container mx-auto px-6 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-tight"
          >
            ¿Cómo hacer la solicitud?
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold" style={{ color: compensarOrange }}>Paso {i + 1}</span>
                  </div>
                  <p className="text-lg font-bold leading-relaxed">{step.text}</p>
                  <p className="text-sm text-white/60 mt-1">{step.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: `${compensarOrange}15` }}
            >
              <HelpCircle className="w-8 h-8" style={{ color: compensarOrange }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Preguntas Frecuentes</h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-2xl px-6 data-[state=open]:shadow-lg transition-all"
                style={{ borderColor: undefined }}
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

      {/* ─── CONTACT ─── */}
      <section className="py-16" style={{ background: compensarOrangeLighter }}>
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="text-2xl font-extrabold text-foreground mb-8 text-center">Contacto</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="tel:6015141180" className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-bold text-card-foreground text-sm">Servicio al Cliente</p>
                <p className="text-muted-foreground text-sm">601 514 1180</p>
                <p className="text-xs text-muted-foreground mt-1">Lun-Vie 8am-5pm · Sáb 8am-1pm</p>
              </div>
            </a>
            <a href="mailto:comunicaciones@entreamigos.co" className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
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
