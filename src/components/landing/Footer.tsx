import { useNavigate } from "react-router-dom";
import { Phone, Mail, Shield } from "lucide-react";
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
        {/* Social icons */}
        <div className="flex gap-6 mb-14">
          <a href="https://www.facebook.com/entreamigosSAS" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://www.instagram.com/entreamigos_sas/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.youtube.com/@entreamigossas" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/entreamigos-sas/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-secondary transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Contacto */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-lg">Contacto</h4>
            <div className="space-y-6 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-foreground/40 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-primary-foreground/80">Línea telefónica de Servicio al Cliente</p>
                  <a href="tel:6015141180" className="hover:text-secondary transition-colors">6015141180</a>
                  <p className="mt-2 leading-relaxed">Horario de atención de lunes a viernes de 8:00 a.m. a 5:00 p.m. y sábados de 8:00 a.m. a 1:00 p.m.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-foreground/40 mt-0.5 shrink-0" />
                <div>
                  <p>Solicitudes, peticiones, quejas o reclamos</p>
                  <a href="mailto:comunicaciones@entreamigos.co" className="hover:text-secondary transition-colors underline">comunicaciones@entreamigos.co</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-foreground/40 mt-0.5 shrink-0" />
                <div>
                  <p>Línea de Transparencia</p>
                  <a href="tel:018000123424" className="hover:text-secondary transition-colors underline">018000-123424</a>
                  <p className="mt-1">fundaciongruposocial@lineadetransparencia.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-lg">Legal</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/tasas-precios-comisiones" onClick={handleNav("/tasas-precios-comisiones")} className="hover:text-secondary transition-colors">Tasas, precios y comisiones</a></li>
              <li><a href="/terminos-y-condiciones" onClick={handleNav("/terminos-y-condiciones")} className="hover:text-secondary transition-colors">Términos y Condiciones</a></li>
              <li><a href="/proteccion-de-datos" onClick={handleNav("/proteccion-de-datos")} className="hover:text-secondary transition-colors">Tratamiento de tus Datos Personales</a></li>
            </ul>

            <h4 className="font-bold text-primary-foreground mb-5 text-lg mt-10">Equipo de Trabajo</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="https://incursor.entreamigos.co/gestiona-tus-creditos" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Promotores</a></li>
            </ul>
          </div>

          {/* Gestión */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-lg">Gestión</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/simulador" onClick={handleNav("/simulador")} className="inline-flex items-center gap-2 bg-secondary text-foreground font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Simula tu crédito</a></li>
              <li><a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Paga tu crédito</a></li>
              <li><a href="https://colmenaseguros.jotform.com/231916017738964" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Formato de solicitud de indemnización</a></li>
              <li><a href="/preguntas-frecuentes" onClick={handleNav("/preguntas-frecuentes")} className="hover:text-secondary transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Infórmate */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-lg">Infórmate</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/60">
              <li><a href="/blog" onClick={handleNav("/blog")} className="hover:text-secondary transition-colors">Blog</a></li>
              <li><a href="/quienes-somos" onClick={handleNav("/quienes-somos")} className="hover:text-secondary transition-colors">¿Quiénes somos?</a></li>
              <li><a href="/productos" onClick={handleNav("/productos")} className="hover:text-secondary transition-colors">Productos</a></li>
              <li><a href="/como-pagar" onClick={handleNav("/como-pagar")} className="hover:text-secondary transition-colors">¿Cómo pagar?</a></li>
              <li><a href="/ayuda" onClick={handleNav("/ayuda")} className="hover:text-secondary transition-colors">Contacto</a></li>
            </ul>

            <div className="mt-10">
              <a href="https://www.sic.gov.co/" target="_blank" rel="noopener noreferrer">
                <img src={sicLogo} alt="Superintendencia de Industria y Comercio" className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-16 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            ©2021 Entre Amigos SAS con número de identificación (NIT) 901.489.480-1 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
