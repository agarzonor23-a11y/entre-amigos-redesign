import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["Productos", "¿Cómo funciona?", "Quiénes somos", "Ayuda"];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">
          Entre Amigos
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Iniciar sesión
          </Button>
          <Button size="sm" className="rounded-lg">
            Solicitar crédito
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
            >
              {link}
            </a>
          ))}
          <Button size="sm" className="w-full rounded-lg mt-2">
            Solicitar crédito
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
