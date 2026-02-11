import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const blogPosts = [
  {
    title: "Microcrédito sí o no. ¿Estás listo para decirle sí a tus metas?",
    excerpt:
      "Es un tipo de préstamo para empresarios, independientes y personas naturales con negocio, con un monto límite establecido por la ley.",
    image:
      "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/65367ac8cdd5bf2e66b33805_micro-small.jpg",
    link: "https://www.entreamigos.co/microcredito-si-o-no",
    tag: "Educación financiera",
  },
  {
    title: "Impulsacrédito, el nuevo producto digital Entre Amigos",
    excerpt:
      "Es la nueva oferta que Entre Amigos tiene para ti. Un crédito ideal para el pago de recibos, mejorar el flujo de caja e imprevistos.",
    image:
      "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/65367ac8fd9e8ea42ec90255_impulsa-small.jpg",
    link: "https://www.entreamigos.co/lmpulsacredito-el-nuevo-producto-digital",
    tag: "Productos",
  },
  {
    title: "PSE: ¿Qué es y cómo usarlo?",
    excerpt:
      "Con el avance de la tecnología se crean nuevas oportunidades financieras digitales, que le permiten a los usuarios tener más control.",
    image:
      "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/657074d14d9587b077559e29_Blog-psemini.jpg",
    link: "https://www.entreamigos.co/pse-que-es-y-como-usarlo",
    tag: "Guías",
  },
  {
    title: "Créditos digitales: ¿cómo saber si son seguros?",
    excerpt:
      "Las herramientas digitales facilitan el acceso a créditos. Sin embargo, es muy importante saber identificar las plataformas confiables.",
    image:
      "https://cdn.prod.website-files.com/649301ad3054cda1d6959775/65d772ea5666f1b482c8cacb_Creditos%20digitales-mini.jpg",
    link: "https://www.entreamigos.co/creditos-digitales-como-saber-si-son-seguros",
    tag: "Seguridad",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              <BookOpen className="w-4 h-4" /> Infórmate
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
              Nuestro <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Consejos, guías y novedades para impulsar tu negocio y tomar las mejores decisiones financieras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-border bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                    {post.tag}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Leer más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
