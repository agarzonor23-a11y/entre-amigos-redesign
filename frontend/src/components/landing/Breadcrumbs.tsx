import { ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        <li>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
            aria-label="Ir al inicio"
          >
            <Home className="w-3.5 h-3.5" />
            Inicio
          </button>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
            {item.href ? (
              <button
                onClick={() => navigate(item.href!)}
                className="hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-foreground font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;