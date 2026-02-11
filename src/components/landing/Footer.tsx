const Footer = () => {
  return (
    <footer className="bg-teal-dark py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EA</span>
              </div>
              <span className="text-xl font-bold text-primary-foreground">
                Entre Amigos
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Fintech de crédito digital. Impulsando la inclusión financiera en
              Colombia con tecnología y espíritu humano.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Productos</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="hover:text-secondary cursor-pointer transition-colors">Microcrédito</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Productivo Plus</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Crédito Rotativo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="hover:text-secondary cursor-pointer transition-colors">¿Quiénes somos?</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Preguntas frecuentes</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li className="hover:text-secondary cursor-pointer transition-colors">Términos y condiciones</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Política de privacidad</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">Tratamiento de datos</li>
              <li><a href="/tasas-precios-comisiones" className="hover:text-secondary transition-colors">Tasas, precios y comisiones</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Entre Amigos. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-primary-foreground/40 text-sm">
            <span className="hover:text-secondary cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-secondary cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-secondary cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
