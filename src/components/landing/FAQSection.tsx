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
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Preguntas frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              ¿Tienes dudas? Te ayudamos
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Resolvemos las preguntas más comunes de nuestros amigos. Si
              necesitas más ayuda, habla con María por WhatsApp.
            </p>

            <div className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-5 py-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Habla con María
                </p>
                <p className="text-xs text-muted-foreground">
                  Nuestra asesora virtual por WhatsApp
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border/50 rounded-xl px-6 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
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
