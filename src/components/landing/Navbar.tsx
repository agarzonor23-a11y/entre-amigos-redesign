import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import AlliesModal from "./AlliesModal";

interface NavbarProps {
  onSolicitar?: () => void;
}

const Navbar = ({ onSolicitar }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAllies, setShowAllies] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Productos", href: "/productos" },
    { label: "¿Cómo funciona?", href: "/como-funciona" },
    { label: "Quiénes somos", href: "/quienes-somos" },
    { label: "Ayuda", href: "/ayuda" },
  ];

  const handleSolicitar = () => {
    if (onSolicitar) {
      onSolicitar();
    } else {
      setShowAllies(true);
    }
  };

  return (
    <>
      <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-18 flex items-center justify-between py-4">
          <button onClick={() => navigate("/")} className="flex items-center cursor-pointer">
            <img src={logoEntreamigos} alt="Entre Amigos" className="h-9 md:h-10 w-auto" />
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/")) {
                      e.preventDefault();
                      navigate(link.href);
                    }
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://incursor.entreamigos.co/account" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="font-medium">
                Iniciar sesión
              </Button>
            </a>
            <Button
              size="sm"
              className="rounded-full px-6 bg-primary hover:bg-teal-dark shadow-lg shadow-primary/25"
              onClick={handleSolicitar}
            >
              Solicitar crédito
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-5 space-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("/")) {
                    e.preventDefault();
                    setOpen(false);
                    navigate(link.href);
                  }
                }}
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a href="https://incursor.entreamigos.co/account" target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-muted-foreground hover:text-primary">
              Iniciar sesión
            </a>
            <Button
              size="sm"
              className="w-full rounded-full bg-primary shadow-lg shadow-primary/25"
              onClick={() => { setOpen(false); handleSolicitar(); }}
            >
              Solicitar crédito
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
