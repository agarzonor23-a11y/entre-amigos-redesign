import { motion } from "framer-motion";
import { HelpCircle, CreditCard, Users, Wallet, Clock, Shield, FileText, Phone } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqSections = [
  {
    title: "Sobre tu crédito",
    icon: CreditCard,
    faqs: [
      { q: "¿Debo tener Cámara de Comercio de mi negocio para aplicar a un crédito Entre Amigos?", a: "¡No es necesario!" },
      { q: "¿Quiénes pueden aplicar a un crédito con Entre Amigos?", a: "Microempresarios mayores de 22 y menores de 65 años, localizados en Colombia." },
      { q: "¿Qué documentos necesito para la solicitud de un crédito?", a: "¡Solamente debes tener a la mano tu documento original de identificación!" },
      { q: "¿Puedo dar la cuenta bancaria de un familiar/amigo para recibir el crédito?", a: "No, únicamente realizaremos la entrega del dinero a una cuenta que esté a tu nombre." },
      { q: "¿Quién del negocio puede aplicar en la plataforma?", a: "¡Para realizar una solicitud de crédito a través de Entre Amigos debes ser el propietario del negocio!" },
      { q: "¿Qué información me van a solicitar en el proceso de aplicación?", a: "Te solicitamos tus datos básicos y realizaremos validaciones sobre tu documento de identidad, siempre y cuando aceptes el tratamiento de los datos personales." },
    ],
  },
  {
    title: "Productos y condiciones",
    icon: Wallet,
    faqs: [
      { q: "¿Qué productos de financiación ofrece Entre Amigos?", a: "Somos una entidad que ofrece créditos para los microempresarios." },
      { q: "¿Para qué puedo usar los productos de financiación?", a: "Puedes realizar una solicitud de microcrédito para capital de trabajo o para ampliar y expandir tu negocio." },
      { q: "¿Qué tasas de interés maneja Entre Amigos?", a: "La tasa de interés de tu solicitud puede cambiar de acuerdo con tu nivel de endeudamiento, tu experiencia financiera y tus hábitos de pago." },
      { q: "¿Cuáles son los montos y plazos que ofrece Entre Amigos?", a: "Te prestamos desde $300.000 hasta $32.500.000 con plazos entre 1 y 36 meses. *Sujeto al tipo de producto que solicites." },
    ],
  },
  {
    title: "Pagos y tiempos",
    icon: Clock,
    faqs: [
      { q: "¿Cuánto tiempo toma la aprobación y desembolso del crédito?", a: "Realizamos la aprobación de tu solicitud de microcrédito en menos de 10 minutos y te entregamos el dinero en un máximo de 24 horas hábiles." },
      { q: "¿Cómo puedo pagar mi crédito?", a: "Puedes pagar tu crédito presencialmente a través de corresponsales bancarios o a las oficinas del Banco Caja Social con el código de convenio 15900833 y en los puntos Efecty con el número de convenio 113023 o virtualmente en www.mipagoamigo.co." },
      { q: "¿Qué pasa si no puedo cumplir con una cuota en la fecha designada?", a: "Si no puedes realizar el pago de cuotas oportunamente, llámanos al 316 834 7300 opción 3, donde juntos buscaremos una solución para evitar que se generen intereses de mora y gastos de cobranza." },
      { q: "¿Tengo penalización si hago abonos o pago anticipadamente mi crédito?", a: "No tendrás ningún tipo de penalización o sobrecostos por abonar o cancelar anticipadamente la obligación. Si deseas cancelar la totalidad del crédito comunícate con nosotros para darte los datos exactos." },
    ],
  },
  {
    title: "Tu cuenta y seguros",
    icon: Shield,
    faqs: [
      { q: "¿Qué puedo hacer desde Mi crédito?", a: "Desde Mi crédito puedes solicitar nuevos productos, generar certificados, descargar tus extractos, pagar tus créditos y mucho más." },
      { q: "¿Cuáles son las condiciones del seguro de vida que obtengo con mi crédito?", a: "El seguro de vida que obtienes al momento de tener un crédito con Entre Amigos es gestionado directamente con Colmena Seguros." },
      { q: "¿Cuál es la diferencia entre la factura y el extracto?", a: "La factura es un documento informativo que se reporta ante la DIAN y refleja los costos asociados a tu crédito que tienen IVA. El extracto contiene información detallada de lo que pagas en tu cuota y te lo enviamos cinco días antes del vencimiento." },
      { q: "¿Qué es Entre Amigos?", a: "Somos Entre Amigos S.A.S. una fintech de crédito digital con número de identificación (NIT) 901.489.480-1." },
    ],
  },
  {
    title: "Fondo Nacional de Garantías (FNG)",
    icon: FileText,
    faqs: [
      { q: "¿Qué es el FNG?", a: "Es una entidad del Gobierno que facilita la aprobación de créditos para independientes, micro, pequeñas, medianas y grandes empresas, a través de garantías. A partir de febrero de 2024, Entre Amigos integra la activación del Fondo Nacional de Garantías para la línea de microcréditos." },
      { q: "¿Por qué necesito la garantía?", a: "Porque te facilita el acceso a este crédito. Por eso, no te pedimos codeudores ni requisitos complejos. El monto del desembolso será menor debido a la comisión que implica el respaldo del FNG, pero tendrás un descuento en la tasa de interés." },
      { q: "¿De qué manera se paga la comisión de la garantía?", a: "Entre Amigos descontamos del valor total del desembolso del crédito la cuota que corresponde a la garantía. De esta manera no te preocupas por realizar el pago de la misma." },
      { q: "¿Si pago mi crédito antes del plazo pactado, obtengo algún reintegro de la comisión?", a: "¡Claro que sí! En este caso, Entre Amigos te notificará para informarte que tienes derecho a recibir el dinero de la garantía de los meses no aplicados en el plazo definido inicialmente." },
      { q: "¿El valor de la comisión va de acuerdo con el monto del crédito?", a: "¡Así es! Dependiendo del plazo que selecciones, se realizará un ajuste proporcional de la comisión tomando como base el 3,50% anual anticipado + IVA." },
      { q: "¿Si el FNG habilita la garantía al crédito, obtengo algún descuento?", a: "¡Eso es lo mejor de todo! Entre Amigos le damos un descuento de tasa del 0,5%." },
      { q: "¿Recibiré facturación por esa garantía?", a: "¡Síííí! Entre Amigos se encargará de compartir a tu correo electrónico la factura correspondiente de la garantía adquirida con FNG." },
      { q: "¿La garantía del FNG genera deducible en la declaración de renta?", a: "¡Así es! La comisión que se paga por la garantía se clasifica como un gasto financiero, es decir, se puede contemplar para ser relacionada en la declaración de renta." },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: "Preguntas Frecuentes" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              <HelpCircle className="w-4 h-4" /> Resuelve tus dudas
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
              Preguntas <span className="text-gradient">Frecuentes</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre nuestros créditos, pagos y productos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-16">
          {faqSections.map((section, sIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sIdx * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground">{section.title}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {section.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${sIdx}-${i}`}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">¿No encontraste lo que buscabas?</h3>
          <p className="text-muted-foreground mb-1">
            Escríbenos a{" "}
            <a href="mailto:comunicaciones@entreamigos.co" className="text-primary hover:underline font-medium">
              comunicaciones@entreamigos.co
            </a>
          </p>
          <p className="text-muted-foreground">
            o llámanos al{" "}
            <a href="tel:6015141180" className="text-primary hover:underline font-medium">
              601 514 1180
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
