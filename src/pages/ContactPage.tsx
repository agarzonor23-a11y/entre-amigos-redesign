import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              📞 Estamos para ti
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
              ¡Contáctanos <span className="text-gradient">🙂</span>!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Si tienes preguntas o necesitas alguna información, no dudes en escribirnos.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Escríbenos</h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Antes de diligenciar este formulario te invitamos a leer nuestra{" "}
              <a href="https://www.entreamigos.co/politica-datos-personales" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Política de Tratamiento de Datos
              </a>
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Nombres *</label>
                  <Input placeholder="Tu nombre" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Apellidos *</label>
                  <Input placeholder="Tu apellido" className="rounded-xl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Número de celular *</label>
                  <Input placeholder="300 000 0000" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Correo electrónico *</label>
                  <Input type="email" placeholder="tu@correo.com" className="rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Mensaje *</label>
                <Textarea placeholder="¿En qué podemos ayudarte?" className="rounded-xl min-h-[120px]" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="datos" />
                  <label htmlFor="datos" className="text-sm text-muted-foreground">Autorizo el tratamiento de mis datos personales *</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="mayor" />
                  <label htmlFor="mayor" className="text-sm text-muted-foreground">Soy mayor de edad *</label>
                </div>
              </div>
              <Button className="rounded-full px-8 bg-primary hover:bg-teal-dark shadow-lg shadow-primary/25">
                Enviar mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* WhatsApp */}
            <div className="bg-teal-light rounded-3xl p-8 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">¡Habla con María!</h3>
                  <p className="text-muted-foreground text-sm mb-4">Nuestro chatbot las 24 horas para ti.</p>
                  <a
                    href="https://app.entreamigos.co/3Cxy3ZR"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-background rounded-3xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Llámanos</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Lunes a viernes 8:00 a.m. a 5:00 p.m. · Sábados 8:00 a.m. a 1:00 p.m.</span>
                  </div>
                  <a href="tel:6015141180" className="text-lg font-bold text-primary hover:underline">
                    601 514 1180
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-background rounded-3xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-light flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Solicitudes, peticiones, quejas o reclamos</h3>
                  <a href="mailto:comunicaciones@entreamigos.co" className="text-primary hover:underline text-sm">
                    comunicaciones@entreamigos.co
                  </a>
                </div>
              </div>
            </div>

            {/* Transparency Line */}
            <div className="bg-background rounded-3xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-light flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Línea de Transparencia</h3>
                  <a href="tel:018000123424" className="text-lg font-bold text-primary hover:underline block">
                    018000-123424
                  </a>
                  <a href="mailto:fundaciongruposocial@lineadetransparencia.com" className="text-primary hover:underline text-sm">
                    fundaciongruposocial@lineadetransparencia.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
