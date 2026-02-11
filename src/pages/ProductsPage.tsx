import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Store, TrendingUp, RotateCw, Heart,
  CheckCircle2, Clock, Users, CreditCard, Shield, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const products = [
  {
    id: "microcredito",
    icon: Store,
    title: "Microcrédito",
    tagline: "Que la meta de tu negocio no se frene por falta de plata",
    description: "Diseñado para microempresarios o independientes que tienen su propio negocio. Solicítalo y crece como deseas.",
    features: [
      "Desde $300.000 hasta $30.000.000",
      "Plazo de 2 a 36 meses según tu perfil",
      "Edad: entre 23 y 63 años",
      "Solicitud 100% digital en minutos",
      "Sin cobro por consulta ni estudio de crédito",
      "Montos y plazos flexibles",
      "Acceso a certificados y extractos fácilmente",
      "Solo para ciudadanos colombianos",
    ],
    gradient: "from-primary to-teal-dark",
    highlight: "Popular",
    link: "https://incursor.entreamigos.co/solicita-tu-credito?utm_product_type=microcredito",
  },
  {
    id: "productivo-plus",
    icon: TrendingUp,
    title: "Productivo Plus",
    tagline: "Creer en tu trabajo y en el de tu equipo hace la diferencia",
    description: "Diseñado para empresarios persona natural que quieren invertir en su negocio. Con Productivo Plus haz que tu empresa crezca.",
    features: [
      "Desde $2.000.000 en adelante",
      "Plazo de 2 a 36 meses según tu perfil",
      "Edad: entre 23 y 63 años",
      "Solicitud 100% digital en minutos",
      "Sin cobro por consulta ni estudio de crédito",
      "Montos y plazos flexibles",
      "Acceso a certificados y extractos fácilmente",
      "Solo para ciudadanos colombianos",
    ],
    gradient: "from-primary to-teal-dark",
    highlight: "Empresarios",
    link: "https://incursor.entreamigos.co/solicita-tu-credito?utm_product_type=creditocomercial",
  },
  {
    id: "rotativo",
    icon: RotateCw,
    title: "Crédito Rotativo",
    tagline: "Disponible para gestionar tu negocio",
    description: "Ideal para pago de proveedores y compra de insumos. Disponibilidad de dinero cuando lo necesites, paga solo lo que uses.",
    features: [
      "Desde $1.000.000 hasta $5.000.000",
      "Compras desde $300.000 con plazo automático a 24 meses",
      "Para compras con aliados (Argos, Marpico, Cematcol)",
      "Edad: entre 22 y 65 años",
      "Sin cobro por consulta ni estudio de crédito",
      "Montos flexibles según tus necesidades",
      "Acceso a certificados y extractos fácilmente",
    ],
    gradient: "from-primary to-teal-dark",
    highlight: "Rotativo",
    link: "https://incursor.entreamigos.co/solicita-tu-credito?utm_product_type=creditorotativo",
  },
  {
    id: "impulsacredito",
    icon: Heart,
    title: "Impulsacrédito",
    tagline: "Crédito digital para empleados que quieran cumplir sus sueños",
    description: "Pensado para empleados que quieran iniciar su vida crediticia. Un crédito que acompaña a tu familia cuando más lo necesitas.",
    features: [
      "Desde $300.000 hasta $4.980.000",
      "Plazo de 2 a 36 meses según tu perfil",
      "Edad: entre 23 y 63 años",
      "Solicitud 100% digital en minutos",
      "Mejora tu puntaje crediticio con buen comportamiento de pago",
      "Sin cobro por consulta ni estudio de crédito",
      "Acceso a certificados y extractos fácilmente",
      "Solo para ciudadanos colombianos",
    ],
    gradient: "from-secondary to-pink",
    highlight: "Empleados",
    link: "https://incursor.entreamigos.co/solicita-tu-credito?utm_product_type=impulsacredito",
  },
];

const steps = [
  { num: "1", text: "Solicita tu crédito y diligencia tu información financiera.", icon: CreditCard },
  { num: "2", text: "Personaliza la oferta según el plazo y monto que necesites.", icon: Shield },
  { num: "3", text: "Valida quién eres con un video y tu cédula.", icon: Smartphone },
  { num: "4", text: "Firma digitalmente, fácil, rápido y 100% en línea.", icon: CheckCircle2 },
  { num: "5", text: "Responde una llamada para validar tu información.", icon: Users },
];

const ProductsPage = () => {
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

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold mb-6 text-foreground">
              💡 Nuestros productos
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
              Conquista tus metas con
              <br />
              <span className="text-gradient">el crédito ideal</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Una opción de crédito pensada para ayudarte a resolver urgencias, avanzar decisiones importantes y tener respaldo cuando lo necesitas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl border border-border p-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group"
              >
                <div className="p-7 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <product.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    {product.highlight && (
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {product.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-extrabold text-card-foreground mb-2">{product.title}</h3>
                  <p className="text-primary font-bold text-sm mb-2">{product.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-xl font-bold gap-2 py-6 text-base">
                      Solicitar crédito
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
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
              ¿Cómo <span className="text-gradient">solicitar</span> tu crédito?
            </h2>
            <p className="text-muted-foreground text-lg">Realizar la solicitud es muy fácil</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-extrabold text-lg">{step.num}</span>
                </div>
                <div>
                  <p className="text-foreground font-bold">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-10">
            *No cobramos por consulta en centrales de riesgo, estudios de crédito ni desembolso.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
