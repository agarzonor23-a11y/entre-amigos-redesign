import { motion, AnimatePresence } from "framer-motion";
import { X, Store, TrendingUp, RotateCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type CreditType = "Microcrédito" | "Productivo Plus" | "Rotativo";

interface Ally {
  name: string;
  creditTypes: CreditType[];
  description: string;
}

const allies: Ally[] = [
  {
    name: "Cematcol",
    creditTypes: ["Microcrédito"],
    description: "Cementos y Materiales de Colombia",
  },
  {
    name: "Facturatech",
    creditTypes: ["Microcrédito", "Productivo Plus"],
    description: "Facturación electrónica",
  },
  {
    name: "Tredi",
    creditTypes: ["Microcrédito", "Rotativo"],
    description: "Soluciones financieras",
  },
  {
    name: "Supernórdico",
    creditTypes: ["Microcrédito"],
    description: "Supermercados",
  },
  {
    name: "Compensar",
    creditTypes: ["Microcrédito", "Productivo Plus", "Rotativo"],
    description: "Caja de Compensación",
  },
  {
    name: "Bemovil",
    creditTypes: ["Microcrédito"],
    description: "Plataforma de pagos",
  },
  {
    name: "Homecenter",
    creditTypes: ["Productivo Plus", "Rotativo"],
    description: "Sodimac Corona",
  },
  {
    name: "AutoMundial",
    creditTypes: ["Microcrédito", "Productivo Plus"],
    description: "Somos más que llantas",
  },
  {
    name: "Farmatízate",
    creditTypes: ["Microcrédito"],
    description: "Club del Droguista",
  },
];

const creditTypeConfig: Record<CreditType, { icon: typeof Store; color: string; bg: string }> = {
  Microcrédito: { icon: Store, color: "text-primary", bg: "bg-primary/10" },
  "Productivo Plus": { icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/20" },
  Rotativo: { icon: RotateCw, color: "text-primary", bg: "bg-teal-light" },
};

interface AlliesModalProps {
  open: boolean;
  onClose: () => void;
}

const AlliesModal = ({ open, onClose }: AlliesModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-4xl md:max-h-[85vh] bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-4 flex items-start justify-between border-b border-border">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground tracking-tight">
                  Solicita tu crédito 🤝
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                  Escoge el aliado y tipo de crédito que mejor se ajuste a tus necesidades.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Legend */}
            <div className="px-6 md:px-8 py-4 flex flex-wrap gap-4 border-b border-border bg-muted/30">
              {(Object.entries(creditTypeConfig) as [CreditType, typeof creditTypeConfig[CreditType]][]).map(
                ([type, config]) => (
                  <div key={type} className="flex items-center gap-2 text-sm">
                    <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center`}>
                      <config.icon className={`w-3.5 h-3.5 ${config.color}`} />
                    </div>
                    <span className="font-medium text-muted-foreground">{type}</span>
                  </div>
                )
              )}
            </div>

            {/* Allies grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allies.map((ally, i) => (
                  <motion.div
                    key={ally.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl border border-border bg-background p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-card-foreground text-lg">{ally.name}</h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{ally.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ally.creditTypes.map((type) => {
                        const config = creditTypeConfig[type];
                        return (
                          <span
                            key={type}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} text-xs font-semibold ${config.color}`}
                          >
                            <config.icon className="w-3 h-3" />
                            {type}
                          </span>
                        );
                      })}
                    </div>
                    <Button
                      size="sm"
                      className="w-full rounded-xl font-bold text-sm"
                    >
                      Solicitar aquí
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlliesModal;
