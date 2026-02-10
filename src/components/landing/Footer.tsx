const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Entre Amigos
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fintech de crédito digital. Impulsando la inclusión financiera en
              Colombia con tecnología y espíritu humano.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Productos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Microcrédito</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Productivo Plus</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Crédito Rotativo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">¿Quiénes somos?</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Preguntas frecuentes</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Contacto</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Términos y condiciones</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Política de privacidad</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Tratamiento de datos</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Entre Amigos. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
