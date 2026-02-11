import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Debo tener Cámara de Comercio para aplicar?",
    a: "¡No es necesario! Solo necesitas tu documento de identificación original.",
  },
  {
    q: "¿Quiénes pueden aplicar a un crédito?",
    a: "Microempresarios mayores de 22 y menores de 65 años, localizados en Colombia.",
  },
  {
    q: "¿Qué documentos necesito?",
    a: "¡Solamente debes tener a la mano tu documento original de identificación!",
  },
  {
    q: "¿Puedo dar de abono a mi crédito?",
    a: "Sí, puedes realizar abonos en cualquier momento sin penalización.",
  },
  {
    q: "¿Cobran por la solicitud o el desembolso?",
    a: "No. En Entre Amigos no te cobramos ni por la solicitud ni por el desembolso de tus créditos.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-sm font-semibold text-foreground mb-6">
              ❓ Preguntas frecuentes
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
              ¿Tienes dudas?
              <br />
              <span className="text-gradient">Te ayudamos</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Resolvemos las preguntas más comunes de nuestros amigos. Si
              necesitas más ayuda, habla con María por WhatsApp.
            </p>

            <a
              href="https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20una%20atenci%C3%B3n%20personalizada."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-teal-light to-pink-light rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl" aria-hidden="true">💬</span>
              <div>
                <p className="font-bold text-foreground">
                  Habla con María
                </p>
                <p className="text-sm text-muted-foreground">
                  Nuestra asesora virtual por WhatsApp
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-2xl px-6 data-[state=open]:bg-teal-light/50 data-[state=open]:border-primary/20 transition-colors"
                >
                  <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
