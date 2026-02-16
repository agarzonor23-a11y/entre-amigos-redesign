import { motion } from "framer-motion";
import { FileText, ExternalLink, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";

const documents = [
  {
    category: "Políticas de privacidad",
    items: [
      { name: "Aviso de privacidad", url: "https://www.entreamigos.co/aviso-de-privacidad" },
      { name: "Autorización clientes", url: "https://www.entreamigos.co/autorizacin-de-tratamiento-de-datos-personales-entre-amigos" },
      { name: "Política de tratamiento de datos personales", url: "https://www.entreamigos.co/politica-datos-personales" },
      { name: "Entidades que hacen parte de la organización", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/66da1a41023dbc3dabf65198_Documento%20Entidades%20que%20hacen%20parte%20de%20la%20Organizacion.pdf" },
    ],
  },
  {
    category: "Documentos legales al solicitar un crédito",
    items: [
      { name: "Contrato de microcrédito", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/654e2e0bc6129fd928ed5b11_EA2%20-%20%20Contrato%20microcre%CC%81dito.pdf" },
      { name: "Contrato de impulsacrédito", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/654e2df96ba2e78661bb98dc_EA2%20-%20Contrato%20de%20cre%CC%81dito%20bajo%20monto.pdf" },
      { name: "Contrato de crédito productivo plus", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/654e2dfef614533a54de81c5_EA2%20-%20Contrato%20de%20cre%CC%81dito%20comercial.pdf" },
      { name: "Contrato de crédito rotativo", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/654e2e046e338adffc5f0898_EA2%20-%20Contrato%20cre%CC%81dito%20rotativo.pdf" },
      { name: "Pagaré de crédito", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/654033089397d9c2d895adb9_EA%20-%20Pagare%CC%81.pdf" },
      { name: "Carta de instrucciones", url: "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/6540330829702bc0df49e986_EA%20-%20Carta%20De%20Instrucciones.pdf" },
    ],
  },
];

const DataProtectionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <Breadcrumbs items={[{ label: "Protección de datos" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              🔒 Protección de datos
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              En Entre Amigos <span className="text-gradient">cuidamos tus datos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce todo sobre el manejo de tus datos personales aquí.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {documents.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: si * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{section.category}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {section.items.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-background border border-border rounded-2xl p-5 hover:border-primary/30 hover:bg-teal-light/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      Ver documento <ExternalLink className="w-3 h-3" />
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-teal-light rounded-3xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Entre Amigos S.A.S.</h2>
          <p className="text-muted-foreground text-sm mb-6">NIT 901.489.480-1</p>
          <p className="text-foreground font-medium mb-4">Los canales designados de contacto son:</p>
          <div className="space-y-4">
            <a href="mailto:comunicaciones@entreamigos.co" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5 text-primary" />
              comunicaciones@entreamigos.co
            </a>
            <a href="tel:6015141180" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary" />
              6015141180 — Lunes a viernes 8:00 a.m. a 5:00 p.m. · Sábados 8:00 a.m. a 1:00 p.m.
            </a>
            <a href="https://app.entreamigos.co/3Cxy3ZR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default DataProtectionPage;
