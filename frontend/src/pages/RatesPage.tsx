import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import { Search, Info, Percent, Shield, FileText, Briefcase, CreditCard, ChevronRight, Table2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RatesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ALL_RATES = [
    // --- MICROCRÉDITO (Complex Tables) ---
    {
      category: "micro",
      title: "Microcrédito (Popular: Hasta 6 SMMLV)",
      description: "Tasas según perfil de riesgo para montos bajos.",
      type: "table",
      headers: ["Concepto", "AAA", "AA", "A", "BAA", "BBB"],
      rows: [
        { label: "Efectiva Anual (E.A.)", values: ["46,00%", "47,00%", "48,00%", "56,00%", "57,00%"] },
        { label: "Nominal Mensual (N.M.)", values: ["3,20%", "3,26%", "3,32%", "3,78%", "3,83%"] },
      ]
    },
    {
      category: "micro",
      title: "Microcrédito (Rural: 6-25 SMMLV)",
      description: "Tasas preferenciales para sector rural.",
      type: "table",
      headers: ["Concepto", "Todos los Perfiles"],
      rows: [
        { label: "Efectiva Anual (E.A.)", values: ["28,00%"] },
        { label: "Nominal Mensual (N.M.)", values: ["2,08%"] },
      ]
    },
    {
      category: "micro",
      title: "Microcrédito (Urbano: 6-25 SMMLV)",
      description: "Tasas para sector urbano productivo.",
      type: "table",
      headers: ["Concepto", "AAA", "AA", "A", "BAA", "BBB"],
      rows: [
        { label: "Efectiva Anual (E.A.)", values: ["45,00%", "45,50%", "46,50%", "51,50%", "53,00%"] },
        { label: "Nominal Mensual (N.M.)", values: ["3,14%", "3,17%", "3,23%", "3,52%", "3,61%"] },
      ]
    },
    {
      category: "micro",
      title: "Microcrédito (Mayor Monto: 25-120 SMMLV)",
      description: "Para grandes proyectos.",
      type: "table",
      headers: ["Concepto", "AAA", "AA", "A", "BAA", "BBB"],
      rows: [
        { label: "Efectiva Anual (E.A.)", values: ["35,60%", "35,60%", "35,60%", "38,00%", "39,50%"] },
        { label: "Nominal Mensual (N.M.)", values: ["2,57%", "2,57%", "2,57%", "2,72%", "2,81%"] },
      ]
    },

    // --- ALIANZAS ---
    {
      category: "alianzas",
      title: "Cematcol",
      description: "Beneficios exclusivos Cematcol.",
      type: "table",
      headers: ["Concepto", "Aliado", "Cliente (1-15 días)", "Cliente (>16 días)"],
      rows: [
        { label: "E.A.", values: ["25,23%", "0,00%", "24,99%"] },
        { label: "M.V.", values: ["1,89%", "0,00%", "1,88%"] },
        { label: "Diaria", values: ["0,062%", "0,00%", "0,062%"] }
      ],
      notes: "Periodo de gracia: 15 primeros días asume Cematcol el interés."
    },
    {
      category: "alianzas",
      title: "Otras Alianzas",
      description: "Tasas especiales por convenio.",
      type: "card",
      items: [
        { label: "Homecenter (Rotativo)", value: "0,00%", highlight: true, sub: "Plazo max 60 días" },
        { label: "Tredi (E.A.)", value: "25,00%" },
        { label: "Farmatízate (E.A.)", value: "38,00%" },
        { label: "Automundial PN (E.A.)", value: "22,80%" },
      ]
    },

    // --- ESPECIALES ---
    {
      category: "especiales",
      title: "Nanocrédito",
      description: "Microcréditos de pago diario/semanal.",
      type: "card",
      items: [
        { label: "Nominal Diaria (N.D.)", value: "0,122%" },
        { label: "Efectiva Anual (E.A.)", value: "55,00%" },
      ]
    },
    {
      category: "especiales",
      title: "Impulsacrédito",
      description: "Bajo monto y corto plazo.",
      type: "card",
      items: [
        { label: "Primera Vez (E.A.)", value: "59,00%" },
        { label: "Renovaciones (E.A.)", value: "49,90%" },
      ]
    },
    {
      category: "especiales",
      title: "Facturatech",
      description: "Líneas Productivo y Popular.",
      type: "card",
      items: [
        { label: "Popular (E.A.)", value: "45,00%" },
        { label: "Productivo (E.A.)", value: "44,00%" },
      ]
    },
    {
      category: "especiales",
      title: "Crédito Rotativo / Libre Inversión",
      description: "Líneas de consumo general.",
      type: "card",
      items: [
        { label: "Rotativo (E.A.)", value: "24,99%" },
        { label: "Libre Inversión (E.A.)", value: "24,99%" },
        { label: "Comercial (E.A.)", value: "24,99%" },
      ]
    },

    // --- OTROS COSTOS ---
    {
      category: "otros",
      title: "Comisión MiPyme",
      description: "Comisión aplicable según monto.",
      type: "card",
      items: [
        { label: "< 4 SMMLV", value: "7,5% + IVA" },
        { label: "> 4 SMMLV", value: "4,5% + IVA" },
      ]
    },
    {
      category: "otros",
      title: "Seguros y Fianzas",
      description: "Costos de protección.",
      type: "card",
      items: [
        { label: "Seguro Vida", value: "5% Anual", sub: "Pago Mensual" },
        { label: "Fianza FNG", value: "1,5% - 6,0%", sub: "Pago único sobre valor crédito" },
      ]
    },
    {
      category: "otros",
      title: "Gastos de Cobranza (GAC)",
      description: "Solo en caso de mora > 16 días.",
      type: "table",
      headers: ["Mora", "GAC"],
      rows: [
        { label: "16-30 días", values: ["2,50%"] },
        { label: "31-60 días", values: ["8,40%"] },
        { label: "61-120 días", values: ["14,00%"] },
        { label: "Más de 120 días", values: ["17,00%"] },
        { label: "Castigada", values: ["19,00%"] },
      ]
    },
  ];

  const filteredRates = ALL_RATES.filter(item => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.type === 'card' && item.items?.some(i => i.label.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesTab && matchesSearch;
  });

  const categories = [
    { id: "all", label: "Todo" },
    { id: "micro", label: "Microcrédito" },
    { id: "alianzas", label: "Alianzas" },
    { id: "especiales", label: "Especiales" },
    { id: "otros", label: "Otros Costos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 px-4 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto z-10 relative">
          <Breadcrumbs items={[{ label: "Tasas y tarifas" }]} />

          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 bg-primary/5 text-primary">Transparencia Total</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Tasas, Precios y <span className="text-gradient">Comisiones</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Información oficial y actualizada de nuestras condiciones financieras.
            </p>
          </div>

          <div className="sticky top-24 z-30 bg-background/80 backdrop-blur-lg border border-border/50 rounded-2xl p-4 shadow-sm mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto gap-2 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeTab === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="pl-9 bg-background border-border/60 focus:border-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRates.map((rate, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={rate.title + idx}
                  className={`group bg-card border border-border/60 hover:border-primary/30 rounded-3xl p-6 transition-all hover:shadow-lg hover:shadow-primary/5 flex flex-col ${rate.type === 'table' ? 'lg:col-span-2' : ''}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        {categories.find(c => c.id === rate.category)?.label}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-2">
                        {rate.title}
                      </h3>
                      {rate.description && (
                        <p className="text-sm text-muted-foreground mt-1">{rate.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto">
                    {rate.type === 'card' ? (
                      <div className="grid grid-cols-2 gap-4">
                        {rate.items.map((item, i) => (
                          <div key={i} className="flex flex-col bg-secondary/20 p-3 rounded-xl">
                            <span className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                              {item.label}
                              {item.label.includes("E.A.") && <Info className="w-3 h-3 text-primary/40" />}
                            </span>
                            <span className={`text-lg font-bold ${item.highlight ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                              {item.value}
                            </span>
                            {item.sub && <span className="text-[10px] text-muted-foreground/60">{item.sub}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent border-b border-border/60">
                              {rate.headers.map((h, i) => (
                                <TableHead key={i} className={`text-xs font-bold text-foreground ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rate.rows.map((row, i) => (
                              <TableRow key={i} className="hover:bg-muted/20 border-b border-border/40 last:border-0">
                                <TableCell className="font-medium text-muted-foreground whitespace-nowrap py-3">{row.label}</TableCell>
                                {row.values.map((v, j) => (
                                  <TableCell key={j} className="text-center font-bold text-foreground py-3">{v}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {rate.notes && <p className="text-xs text-muted-foreground mt-3 italic">* {rate.notes}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredRates.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No encontramos resultados</h3>
              <p className="text-muted-foreground">Intenta con otra búsqueda o cambia el filtro.</p>
              <button onClick={() => { setActiveTab('all'); setSearchTerm(''); }} className="mt-4 text-primary font-semibold hover:underline">
                Ver todo
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RatesPage;
