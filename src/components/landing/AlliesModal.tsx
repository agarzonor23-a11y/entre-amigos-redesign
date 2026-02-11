import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Ally {
  name: string;
  slug: string;
  description: string;
  color: string; // subtle accent border/bg on hover
}

const allies: Ally[] = [
  { name: "Compensar", slug: "compensar", description: "Caja de Compensación", color: "rgba(0, 160, 75, 0.13)" },        // verde Compensar
  { name: "Cematcol", slug: "cematcol", description: "Cementos y Materiales de Colombia", color: "rgba(0, 61, 121, 0.13)" }, // azul oscuro Cematcol
  { name: "Facturatech", slug: "facturatech", description: "Facturación electrónica", color: "rgba(0, 174, 239, 0.13)" },    // azul cielo Facturatech
  { name: "Tredi", slug: "tredi", description: "Soluciones financieras", color: "rgba(38, 50, 56, 0.13)" },                  // gris oscuro Tredi
  { name: "Supernórdico", slug: "supernordico", description: "Supermercados", color: "rgba(218, 41, 28, 0.13)" },             // rojo Supernórdico
  { name: "Bemovil", slug: "bemovil", description: "Plataforma de pagos", color: "rgba(255, 102, 0, 0.13)" },                // naranja Bemovil
  { name: "Homecenter", slug: "homecenter", description: "Sodimac Corona", color: "rgba(255, 103, 31, 0.13)" },               // naranja Homecenter
  { name: "AutoMundial", slug: "automundial", description: "Somos más que llantas", color: "rgba(204, 0, 0, 0.13)" },         // rojo AutoMundial
  { name: "Farmatízate", slug: "farmatizate", description: "Club del Droguista", color: "rgba(0, 133, 66, 0.13)" },           // verde Farmatízate
];

interface AlliesModalProps {
  open: boolean;
  onClose: () => void;
}

const AlliesModal = ({ open, onClose }: AlliesModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[80vh] bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 pb-4 flex items-start justify-between border-b border-border">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-card-foreground tracking-tight">
                  Nuestros Aliados 🤝
                </h2>
                <p className="text-muted-foreground mt-2 text-sm md:text-base">
                  Selecciona un aliado para conocer los créditos disponibles.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Allies grid */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allies.map((ally, i) => (
                  <motion.button
                    key={ally.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      onClose();
                      navigate(`/aliado/${ally.slug}`);
                    }}
                    style={{ borderLeftWidth: 3, borderLeftColor: ally.color.replace('0.12', '0.5'), backgroundColor: ally.color }}
                    className="group text-left rounded-2xl border border-border bg-background p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-card-foreground text-lg group-hover:text-primary transition-colors">
                        {ally.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground">{ally.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlliesModal;
