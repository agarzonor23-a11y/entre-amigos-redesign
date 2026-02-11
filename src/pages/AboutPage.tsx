import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Users, Building2, Smartphone, Shield,
  TrendingUp, Globe, Phone, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import heroAbout from "@/assets/hero-about.png";

const groupCompanies = [
  "Banco Caja Social",
  "Colmena Seguros",
  "Colmena Fiduciaria",
  "Colmena Inversora",
  "Gestora Urbana",
  "Deco Construcciones",
  "Servir",
];

const values = [
  {
    icon: Heart,
    title: "Espíritu humano",
    description: "Ponemos la tecnología al servicio de las personas, con cercanía y empatía.",
  },
  {
    icon: Users,
    title: "Inclusión financiera",
    description: "Brindamos atención especial a mercados populares, microempresarios y empleados informales.",
  },
  {
    icon: Shield,
    title: "Confianza",
    description: "Somos parte del Grupo Social, respaldados por más de 100 años de trayectoria.",
  },
  {
    icon: TrendingUp,
    title: "Innovación",
    description: "Créditos, productos y soluciones digitales fáciles y adecuadas a tus necesidades.",
  },
  {
    icon: Smartphone,
    title: "100% Digital",
    description: "Procesos simples, rápidos y accesibles desde tu celular.",
  },
  {
    icon: Globe,
    title: "Impacto social",
    description: "Aportamos al cumplimiento de la misión de Fundación Grupo Social.",
  },
];

const AboutPage = () => {
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

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="max-w-xl flex-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold mb-6 text-foreground">
                <Users className="w-4 h-4" /> Quiénes somos
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
                Somos una fintech de
                <br />
                <span className="text-gradient">crédito digital</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">
                Del mismo grupo del <strong className="text-foreground">Banco Caja Social</strong>, parte de <strong className="text-foreground">Fundación Grupo Social</strong>.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 max-w-md lg:max-w-lg"
            >
              <img
                src={heroAbout}
                alt="Equipo diverso representando inclusión financiera en Colombia"
                className="w-full h-auto rounded-3xl shadow-2xl shadow-primary/10 border border-border"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-8">
              Nuestro <span className="text-gradient">propósito</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Poner la tecnología e innovación, con espíritu humano, al servicio de todos nuestros amigos, para quienes tenemos créditos, productos, servicios y soluciones digitales, fáciles y adecuadas a sus necesidades.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Buscamos impulsar la <strong className="text-foreground">inclusión financiera en Colombia</strong>, brindando especial atención a los mercados populares, los microempresarios, empleados informales, y quienes inician su vida crediticia, aportando así al cumplimiento de la misión de <strong className="text-foreground">Fundación Grupo Social</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Lo que nos <span className="text-gradient">define</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl border border-border p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-extrabold text-card-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Otras empresas <span className="text-gradient">del grupo</span>
            </h2>
            <p className="text-muted-foreground text-lg">Hacemos parte de un ecosistema sólido con más de 100 años de historia.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {groupCompanies.map((company, i) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-4 rounded-2xl bg-card border border-border text-foreground font-bold text-sm hover:border-primary/30 transition-all"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-teal-dark to-primary">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6 tracking-tight">
              ¿Quieres conocer más?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Nuestro equipo está listo para acompañarte.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:6015141180">
                <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Phone className="w-5 h-5" />
                  601 514 1180
                </Button>
              </a>
              <a href="mailto:comunicaciones@entreamigos.co">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Mail className="w-5 h-5" />
                  comunicaciones@entreamigos.co
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

export default AboutPage;
