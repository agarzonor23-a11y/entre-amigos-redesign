import { motion } from "framer-motion";
import { CreditCard, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";

const steps = [
  {
    number: 1,
    title: 'Ingresa a mipagoamigo.com',
    description: 'Selecciona "Recibos y Facturas".',
  },
  {
    number: 2,
    title: 'Busca "Entre Amigos"',
    description: 'En el buscador escribe "Entre Amigos" y selecciona la opción.',
  },
  {
    number: 3,
    title: 'Selecciona "Pagar"',
    description: 'Haz clic en el botón Pagar para continuar.',
  },
  {
    number: 4,
    title: 'Ingresa tus datos',
    description: 'Ingresa tus datos personales y los de tu crédito.',
  },
];

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: "¿Cómo pagar?" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              💳 Paga tu crédito
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              ¿Cómo pagar <span className="text-gradient">tu crédito</span>?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sigue estos sencillos pasos para pagar tu crédito a través de Mi Pago Amigo.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 max-w-3xl">
        {/* Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/10 border border-secondary/20 rounded-3xl p-6 mb-12 text-center"
        >
          <p className="text-foreground font-medium">
            ⚠️ Si se te presenta un error en la plataforma de pagos, sigue estos pasos para pagar por medios digitales.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 items-start bg-background border border-border rounded-3xl p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25">
                {step.number}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 space-y-4"
        >
          <a href="https://www.mipagoamigo.com/MPA_WebSite/ServicePayments" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="rounded-full px-10 py-7 font-bold gap-2 text-base shadow-xl shadow-primary/30">
              <CreditCard className="w-5 h-5" /> Pagar en Mi Pago Amigo
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
          <div>
            <a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-10 py-7 font-bold gap-2 text-base mt-3">
                Pagar por otro medio <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;
