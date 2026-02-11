import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Mail, CreditCard,
  Smartphone, Building2, HelpCircle, Phone, MessageCircle, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface CreditProduct {
  title: string;
  description: string;
  amount: string;
  link: string;
}

interface AllyPageProps {
  allyName: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  note?: string;
  products: CreditProduct[];
  features: string[];
  requirements?: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
  solicitudLink: string;
  whatsappLink?: string;
}

const defaultRequirements = [
  "Correo electrónico personal, con mínimo 4 meses de existencia.",
  "Tu documento de identidad original.",
  "Celular (Smartphone) con línea activa y WhatsApp personal.",
];

const reqIcons = [Mail, CreditCard, Smartphone, Building2];

const AllyPageTemplate = ({
  allyName, tagline, description, heroImage, heroImageAlt, note,
  products, features, requirements, steps, faqs, solicitudLink, whatsappLink,
}: AllyPageProps) => {
  const navigate = useNavigate();
  const reqs = requirements || defaultRequirements;

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
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex-1 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-sm font-semibold mb-6 text-foreground">
                <Users className="w-4 h-4" /> Aliado {allyName}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-[1.1]">
                {tagline}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4">{description}</p>
              {note && <p className="text-sm text-secondary font-medium mb-10">{note}</p>}
              <div className="flex flex-wrap gap-4">
                {solicitudLink.startsWith("/") ? (
                  <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30" onClick={() => navigate(solicitudLink)}>
                    ¡Solicítalo ya!
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                ) : (
                  <a href={solicitudLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30">
                      ¡Solicítalo ya!
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2">
                      <MessageCircle className="w-5 h-5" />
                      Hablar con María
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20, stiffness: 100 }}
              className="flex-shrink-0 md:block relative"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-secondary/20 blur-sm -z-10"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/15 blur-sm -z-10"
              />
              <motion.img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] mx-auto rounded-3xl shadow-2xl shadow-primary/15 border-2 border-border/50"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Opciones de <span className="text-gradient">crédito</span>
              </h2>
              <p className="text-muted-foreground text-lg">Escoge la que más se ajuste a ti</p>
            </motion.div>
            <div className={`grid gap-8 max-w-5xl mx-auto ${products.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {products.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-3xl border border-border p-1 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group"
                >
                  <div className="p-7 flex flex-col h-full">
                    <h3 className="text-2xl font-extrabold text-card-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{p.description}</p>
                    <p className="text-primary font-bold text-sm mb-6">{p.amount}</p>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full rounded-xl font-bold gap-2 py-6 text-base">
                        Solicítalo aquí <ArrowRight className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
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
                <p className="text-sm text-foreground font-medium">{f}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">¿Qué necesitas?</h2>
            <p className="text-muted-foreground text-lg">Solo debes tener:</p>
          </motion.div>
          <div className={`grid sm:grid-cols-2 lg:grid-cols-${Math.min(reqs.length, 4)} gap-6 max-w-4xl mx-auto`}>
            {reqs.map((req, i) => {
              const Icon = reqIcons[i % reqIcons.length];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium">{req}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              ¿Cómo hacer la <span className="text-gradient">solicitud</span>?
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-extrabold text-lg">{i + 1}</span>
                </div>
                <p className="text-foreground font-bold pt-2.5">{step}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            {solicitudLink.startsWith("/") ? (
              <Button size="lg" className="rounded-full px-10 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30" onClick={() => navigate(solicitudLink)}>
                Solicitar crédito <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <a href={solicitudLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full px-10 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30">
                  Solicitar crédito <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-24 bg-muted/30">
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
      )}

      {/* Contact */}
      <section className="py-20 bg-gradient-to-br from-primary via-teal-dark to-primary">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">¿Necesitas ayuda?</h2>
            <p className="text-primary-foreground/70 text-lg mb-8">Nuestro equipo está listo para acompañarte.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:6015141180">
                <Button size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Phone className="w-5 h-5" /> 601 514 1180
                </Button>
              </a>
              <a href="mailto:comunicaciones@entreamigos.co">
                <Button variant="outline" size="lg" className="rounded-full px-8 py-7 font-bold gap-2 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Mail className="w-5 h-5" /> Escríbenos
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

export default AllyPageTemplate;
