import { useNavigate } from "react-router-dom";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import sicLogo from "@/assets/sic-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-teal-dark py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <button onClick={handleNav("/")} className="flex items-center gap-2 mb-5 cursor-pointer">
              <img src={logoEntreamigos} alt="Entre Amigos" className="h-8 w-auto brightness-0 invert opacity-90" />
            </button>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Fintech de crédito digital. Impulsando la inclusión financiera en
              Colombia con tecnología y espíritu humano.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Empresa</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/quienes-somos" onClick={handleNav("/quienes-somos")} className="hover:text-secondary transition-colors">¿Quiénes somos?</a></li>
              <li><a href="/productos" onClick={handleNav("/productos")} className="hover:text-secondary transition-colors">Productos</a></li>
              <li><a href="/ayuda" onClick={handleNav("/ayuda")} className="hover:text-secondary transition-colors">Contacto</a></li>
              <li><a href="/como-pagar" onClick={handleNav("/como-pagar")} className="hover:text-secondary transition-colors">¿Cómo pagar?</a></li>
              <li><a href="/blog" onClick={handleNav("/blog")} className="hover:text-secondary transition-colors">Blog</a></li>
              <li><a href="/preguntas-frecuentes" onClick={handleNav("/preguntas-frecuentes")} className="hover:text-secondary transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/terminos-y-condiciones" onClick={handleNav("/terminos-y-condiciones")} className="hover:text-secondary transition-colors">Términos y condiciones</a></li>
              <li><a href="/proteccion-de-datos" onClick={handleNav("/proteccion-de-datos")} className="hover:text-secondary transition-colors">Tratamiento de datos personales</a></li>
              <li><a href="/tasas-precios-comisiones" onClick={handleNav("/tasas-precios-comisiones")} className="hover:text-secondary transition-colors">Tasas, precios y comisiones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-primary-foreground mb-5">Equipo</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="https://incursor.entreamigos.co/gestiona-tus-creditos" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Acceso empleados</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img src={sicLogo} alt="Superintendencia de Industria y Comercio" className="h-10 w-auto opacity-80" />
            <p className="text-sm text-primary-foreground/50 text-center md:text-left">
              ©2021 Entre Amigos SAS con número de identificación (NIT) 901.489.480-1 . All rights reserved.
            </p>
          </div>
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
